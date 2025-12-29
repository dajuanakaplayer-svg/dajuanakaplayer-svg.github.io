import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createUserContext(userId: number = 2): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "user@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    greeting: null,
    minecraftUsername: null,
    hasPaid: false,
    isWhitelisted: false,
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    greeting: null,
    minecraftUsername: null,
    hasPaid: true,
    isWhitelisted: true,
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("application.submit", () => {
  it("allows user to submit application with valid data", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.application.submit({
      whyJoin: "I love building medieval structures and want to contribute to a long-term community.",
      buildingExperience: "I've been playing Minecraft for 5 years and specialize in medieval and fantasy builds.",
      portfolioLinks: "https://imgur.com/gallery/mybuilds",
      minecraftUsername: "TestBuilder123",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects application with short whyJoin text", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.application.submit({
        whyJoin: "Short text",
        buildingExperience: "I've been playing Minecraft for 5 years and specialize in medieval builds.",
        minecraftUsername: "TestBuilder123",
      })
    ).rejects.toThrow();
  });

  it("rejects application with short buildingExperience text", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.application.submit({
        whyJoin: "I love building medieval structures and want to contribute to a long-term community.",
        buildingExperience: "Short",
        minecraftUsername: "TestBuilder123",
      })
    ).rejects.toThrow();
  });

  it("rejects application with invalid Minecraft username", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.application.submit({
        whyJoin: "I love building medieval structures and want to contribute to a long-term community.",
        buildingExperience: "I've been playing Minecraft for 5 years and specialize in medieval builds.",
        minecraftUsername: "ab", // Too short
      })
    ).rejects.toThrow();
  });
});

describe("admin.reviewApplication", () => {
  it("allows admin to approve application", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.reviewApplication({
      applicationId: 1,
      status: "approved",
      reviewNotes: "Great application!",
    });

    expect(result).toEqual({ success: true });
  });

  it("allows admin to reject application", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.reviewApplication({
      applicationId: 1,
      status: "rejected",
      reviewNotes: "Not enough detail provided.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects non-admin access to review", async () => {
    const ctx = createUserContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.reviewApplication({
        applicationId: 1,
        status: "approved",
      })
    ).rejects.toThrow("Admin access required");
  });
});
