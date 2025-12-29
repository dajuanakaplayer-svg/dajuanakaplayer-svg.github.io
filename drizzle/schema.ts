import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with whitelist and payment tracking for Elite SMP server access.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  
  // Elite SMP specific fields
  greeting: text("greeting"), // Custom greeting message displayed on login
  isWhitelisted: boolean("isWhitelisted").default(false).notNull(), // Server whitelist status
  hasPaid: boolean("hasPaid").default(false).notNull(), // Payment completion status
  minecraftUsername: varchar("minecraftUsername", { length: 16 }), // Minecraft IGN for whitelist
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Gallery images uploaded by community members
 */
export const galleryImages = mysqlTable("gallery_images", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table
  
  // S3 storage references
  s3Key: text("s3Key").notNull(), // S3 object key
  s3Url: text("s3Url").notNull(), // Public URL to access image
  
  // Image metadata
  title: varchar("title", { length: 255 }),
  description: text("description"),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: int("fileSize").notNull(), // Size in bytes
  width: int("width"), // Image width in pixels
  height: int("height"), // Image height in pixels
  
  // Discord metadata (for imported images)
  discordReactions: text("discordReactions"), // JSON string of reactions: [{emoji: string, count: number}]
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;

/**
 * Payment records for server whitelist access
 */
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table
  
  // Stripe payment details
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }).unique(),
  stripeCheckoutSessionId: varchar("stripeCheckoutSessionId", { length: 255 }).unique(),
  
  // Payment information
  amount: int("amount").notNull(), // Amount in cents
  currency: varchar("currency", { length: 3 }).default("usd").notNull(),
  status: mysqlEnum("status", ["pending", "succeeded", "failed", "refunded"]).default("pending").notNull(),
  
  // Metadata
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  receiptUrl: text("receiptUrl"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;

/**
 * Whitelist applications submitted by users before payment
 */
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users table
  
  // Application content
  whyJoin: text("whyJoin").notNull(), // Why they want to join the server
  buildingExperience: text("buildingExperience").notNull(), // Their building experience
  portfolioLinks: text("portfolioLinks"), // Links to builds/screenshots (optional)
  minecraftUsername: varchar("minecraftUsername", { length: 16 }).notNull(), // Minecraft IGN
  
  // Application status
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  
  // Admin review
  reviewedBy: int("reviewedBy"), // Admin user ID who reviewed
  reviewNotes: text("reviewNotes"), // Admin notes on the application
  reviewedAt: timestamp("reviewedAt"),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;
