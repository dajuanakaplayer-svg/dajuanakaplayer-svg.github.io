import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: "test-user",
    email: "test@example.com",
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

describe("profile.updateGreeting", () => {
  it("updates user greeting successfully", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.profile.updateGreeting({
      greeting: "Welcome to my profile!",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects empty greeting", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.profile.updateGreeting({ greeting: "" })
    ).rejects.toThrow();
  });

  it("rejects greeting exceeding max length", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const longGreeting = "a".repeat(501);

    await expect(
      caller.profile.updateGreeting({ greeting: longGreeting })
    ).rejects.toThrow();
  });
});

describe("profile.updateMinecraftUsername", () => {
  it("updates Minecraft username successfully", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.profile.updateMinecraftUsername({
      minecraftUsername: "TestPlayer123",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects empty username", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.profile.updateMinecraftUsername({ minecraftUsername: "" })
    ).rejects.toThrow();
  });

  it("rejects username exceeding max length", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const longUsername = "a".repeat(17);

    await expect(
      caller.profile.updateMinecraftUsername({ minecraftUsername: longUsername })
    ).rejects.toThrow();
  });
});
