import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";

describe("server.status", () => {
  it("should return server status data structure", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const status = await caller.server.status();

    // Verify the response structure
    expect(status).toHaveProperty("online");
    expect(status).toHaveProperty("players");
    expect(status).toHaveProperty("version");
    expect(status).toHaveProperty("motd");
    expect(status).toHaveProperty("icon");

    // Verify players object structure
    expect(status.players).toHaveProperty("online");
    expect(status.players).toHaveProperty("max");
    expect(status.players).toHaveProperty("list");

    // Verify data types
    expect(typeof status.online).toBe("boolean");
    expect(typeof status.players.online).toBe("number");
    expect(typeof status.players.max).toBe("number");
    expect(Array.isArray(status.players.list)).toBe(true);
    expect(typeof status.version).toBe("string");
    expect(typeof status.motd).toBe("string");
  });

  it("should return valid player counts", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const status = await caller.server.status();

    // Player counts should be non-negative
    expect(status.players.online).toBeGreaterThanOrEqual(0);
    expect(status.players.max).toBeGreaterThanOrEqual(0);

    // Online players should not exceed max
    if (status.online) {
      expect(status.players.online).toBeLessThanOrEqual(status.players.max);
    }
  });

  it("should handle offline server gracefully", async () => {
    const caller = appRouter.createCaller({
      user: null,
      req: {} as any,
      res: {} as any,
    });

    const status = await caller.server.status();

    // Even if server is offline, should return valid structure
    if (!status.online) {
      expect(status.players.online).toBe(0);
      expect(status.players.list).toEqual([]);
    }
  });
});
