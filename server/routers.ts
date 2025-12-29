import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin access required",
    });
  }
  return next({ ctx });
});
import * as db from "./db";
import * as galleryDb from "./galleryDb";
import { storagePut } from "./storage";
import { nanoid } from "nanoid";
import * as paymentDb from "./paymentDb";
import { getServerAccessPrice } from "./products";
import Stripe from "stripe";
import * as applicationDb from "./applicationDb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  gallery: router({
    // Get all gallery images
    list: publicProcedure.query(async () => {
      const images = await galleryDb.getAllGalleryImages();
      // Join with user data
      const imagesWithUsers = await Promise.all(
        images.map(async (img) => {
          const user = await db.getUserById(img.userId);
          return {
            ...img,
            uploaderName: user?.name || "Unknown",
          };
        })
      );
      return imagesWithUsers;
    }),

    // Get user's own gallery images
    myImages: protectedProcedure.query(async ({ ctx }) => {
      return await galleryDb.getUserGalleryImages(ctx.user.id);
    }),

    // Upload image
    upload: protectedProcedure
      .input(z.object({
        imageData: z.string(), // Base64 encoded image
        title: z.string().max(255).optional(),
        description: z.string().max(1000).optional(),
        mimeType: z.string(),
        fileSize: z.number(),
        width: z.number().optional(),
        height: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Validate file size (max 10MB)
        if (input.fileSize > 10 * 1024 * 1024) {
          throw new Error("File size must be less than 10MB");
        }

        // Validate mime type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(input.mimeType)) {
          throw new Error("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.");
        }

        // Convert base64 to buffer
        const base64Data = input.imageData.split(",")[1] || input.imageData;
        const buffer = Buffer.from(base64Data, "base64");

        // Generate unique S3 key
        const fileExt = input.mimeType.split("/")[1];
        const s3Key = `gallery/${ctx.user.id}/${nanoid()}.${fileExt}`;

        // Upload to S3
        const { url } = await storagePut(s3Key, buffer, input.mimeType);

        // Save to database
        await galleryDb.createGalleryImage({
          userId: ctx.user.id,
          s3Key,
          s3Url: url,
          title: input.title || null,
          description: input.description || null,
          mimeType: input.mimeType,
          fileSize: input.fileSize,
          width: input.width || null,
          height: input.height || null,
        });

        return { success: true, url };
      }),

    // Delete image
    delete: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        await galleryDb.deleteGalleryImage(input.id, ctx.user.id);
        return { success: true };
      }),

    // Import Discord screenshots (admin only)
    importFromDiscord: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(500).optional().default(100),
      }))
      .mutation(async ({ ctx, input }) => {
        const { fetchDiscordImages, downloadAndUploadImage } = await import("./discord");
        
        // Fetch images from Discord
        const discordImages = await fetchDiscordImages(input.limit);
        
        let imported = 0;
        let skipped = 0;
        
        for (const discordImage of discordImages) {
          try {
            // Download from Discord and upload to S3
            const s3Url = await downloadAndUploadImage(discordImage.url, discordImage.filename);
            const s3Key = s3Url.split("/").slice(-2).join("/"); // Extract key from URL
            
            // Create gallery entry
            await galleryDb.createGalleryImage({
              userId: ctx.user.id, // Imported by admin
              s3Key,
              s3Url,
              title: discordImage.author, // Just the author name
              description: discordImage.caption || `Posted on ${discordImage.timestamp.toLocaleDateString()}`,
              mimeType: "image/png",
              fileSize: 0, // Unknown from Discord
              width: null,
              height: null,
              discordReactions: discordImage.reactions.length > 0 ? JSON.stringify(discordImage.reactions) : null,
            });
            
            imported++;
          } catch (error) {
            console.error(`Failed to import image ${discordImage.messageId}:`, error);
            skipped++;
          }
        }
        
        return { 
          success: true, 
          imported, 
          skipped,
          total: discordImages.length 
        };
      }),
  }),

  application: router({    // Submit a new application
    submit: protectedProcedure
      .input(z.object({
        whyJoin: z.string().min(50).max(2000),
        buildingExperience: z.string().min(50).max(2000),
        portfolioLinks: z.string().max(1000).optional(),
        minecraftUsername: z.string().min(3).max(16),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check if user already has an application
        const existingApp = await applicationDb.getUserApplication(ctx.user.id);
        if (existingApp && existingApp.status === "pending") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You already have a pending application",
          });
        }
        
        await applicationDb.createApplication({
          userId: ctx.user.id,
          whyJoin: input.whyJoin,
          buildingExperience: input.buildingExperience,
          portfolioLinks: input.portfolioLinks || null,
          minecraftUsername: input.minecraftUsername,
          status: "pending",
        });
        
        return { success: true };
      }),
    
    // Get user's own application
    getMy: protectedProcedure.query(async ({ ctx }) => {
      return await applicationDb.getUserApplication(ctx.user.id);
    }),
  }),

  admin: router({
    // Get all users for admin dashboard
    getAllUsers: adminProcedure.query(async () => {
      return await db.getAllUsers();
    }),
    
    // Get all applications
    getAllApplications: adminProcedure.query(async () => {
      const applications = await applicationDb.getAllApplications();
      // Join with user data
      const applicationsWithUsers = await Promise.all(
        applications.map(async (app) => {
          const user = await db.getUserById(app.userId);
          return {
            ...app,
            user: user ? { name: user.name, email: user.email } : null,
          };
        })
      );
      return applicationsWithUsers;
    }),
    
    // Review application (approve/reject)
    reviewApplication: adminProcedure
      .input(z.object({
        applicationId: z.number(),
        status: z.enum(["approved", "rejected"]),
        reviewNotes: z.string().max(1000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await applicationDb.updateApplicationStatus(
          input.applicationId,
          input.status,
          ctx.user.id,
          input.reviewNotes
        );
        return { success: true };
      }),

    // Toggle user whitelist status
    toggleWhitelist: adminProcedure
      .input(z.object({
        userId: z.number(),
        isWhitelisted: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        await db.updateUserWhitelistStatus(input.userId, input.isWhitelisted);
        return { success: true };
      }),
  }),

  payment: router({
    // Create checkout session for server access
    createCheckoutSession: protectedProcedure.mutation(async ({ ctx }) => {
      const origin = ctx.req.headers.origin || "http://localhost:3000";
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: getServerAccessPrice(),
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment/cancel`,
        customer_email: ctx.user.email || undefined,
        client_reference_id: ctx.user.id.toString(),
        metadata: {
          user_id: ctx.user.id.toString(),
          customer_email: ctx.user.email || "",
          customer_name: ctx.user.name || "",
        },
        allow_promotion_codes: true,
      });

      return { url: session.url };
    }),

    // Get user's payment history
    getPaymentHistory: protectedProcedure.query(async ({ ctx }) => {
      return await paymentDb.getUserPayments(ctx.user.id);
    }),
  }),

  profile: router({
    // Get current user's profile
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserById(ctx.user.id);
    }),
    
    // Update user's greeting message
    updateGreeting: protectedProcedure
      .input(z.object({
        greeting: z.string().min(1).max(500),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserGreeting(ctx.user.id, input.greeting);
        return { success: true };
      }),
    
    // Update user's Minecraft username
    updateMinecraftUsername: protectedProcedure
      .input(z.object({
        minecraftUsername: z.string().min(3).max(16),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateUserMinecraftUsername(ctx.user.id, input.minecraftUsername);
        return { success: true };
      }),
  }),

  server: router({
    // Get live server status from mcstatus.io
    status: publicProcedure.query(async () => {
      try {
        const serverIp = process.env.VITE_MINECRAFT_SERVER_IP || "37.10.123.182:54783";
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIp}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch server status: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        return {
          online: data.online || false,
          players: {
            online: data.players?.online || 0,
            max: data.players?.max || 0,
            list: data.players?.list || [],
          },
          version: data.version?.name_clean || data.version?.name_raw || "Unknown",
          motd: data.motd?.clean || data.motd?.raw || "",
          icon: data.icon || null,
        };
      } catch (error) {
        console.error("Error fetching server status:", error);
        // Return offline status on error
        return {
          online: false,
          players: { online: 0, max: 0, list: [] },
          version: "Unknown",
          motd: "",
          icon: null,
        };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
