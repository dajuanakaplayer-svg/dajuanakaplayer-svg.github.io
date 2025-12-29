import { describe, it, expect } from "vitest";
import { Client, GatewayIntentBits } from "discord.js";
import { ENV } from "./_core/env";

describe("Discord Bot Credentials", () => {
  it("should validate Discord bot token and fetch channel", async () => {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    try {
      // Login with bot token
      await client.login(ENV.discordBotToken);
      
      // Wait a bit for client to be ready
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Try to fetch the screenshots channel
      const channel = await client.channels.fetch(ENV.discordScreenshotsChannelId);
      
      expect(channel).toBeDefined();
      expect(channel?.isTextBased()).toBe(true);
      
      // Cleanup
      await client.destroy();
    } catch (error) {
      await client.destroy();
      throw new Error(`Discord bot validation failed: ${error}`);
    }
  }, 15000); // 15 second timeout for network operations
});
