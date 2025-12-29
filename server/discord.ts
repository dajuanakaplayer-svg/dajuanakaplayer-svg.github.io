import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import type { Message, Collection } from "discord.js";
import { ENV } from "./_core/env";
import { storagePut } from "./storage";

let discordClient: Client | null = null;

async function getDiscordClient() {
  if (discordClient && discordClient.isReady()) {
    return discordClient;
  }

  discordClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  await discordClient.login(ENV.discordBotToken);
  
  // Wait for client to be ready
  await new Promise((resolve) => {
    discordClient!.once("ready", resolve);
  });

  return discordClient;
}

export interface DiscordReaction {
  emoji: string;
  count: number;
}

export interface DiscordImage {
  url: string;
  filename: string;
  author: string;
  authorId: string;
  timestamp: Date;
  caption: string;
  messageId: string;
  reactions: DiscordReaction[];
}

export async function fetchDiscordImages(limit = 100): Promise<DiscordImage[]> {
  const client = await getDiscordClient();
  const channel = await client.channels.fetch(ENV.discordScreenshotsChannelId);

  if (!channel || !channel.isTextBased()) {
    throw new Error("Invalid channel or channel is not text-based");
  }

  const textChannel = channel as TextChannel;
  const images: DiscordImage[] = [];
  
  let lastMessageId: string | undefined;
  let fetchedCount = 0;

  // Fetch messages in batches
  while (fetchedCount < limit) {
    const options: { limit: number; before?: string } = { 
      limit: Math.min(100, limit - fetchedCount) 
    };
    if (lastMessageId) {
      options.before = lastMessageId;
    }

    const messages: Collection<string, Message> = await textChannel.messages.fetch(options);
    
    if (messages.size === 0) break;

    messages.forEach((message) => {
      // Check if message has attachments with images
      message.attachments.forEach((attachment) => {
        if (attachment.contentType?.startsWith("image/")) {
          // Extract reactions from message
          const reactions: DiscordReaction[] = [];
          message.reactions.cache.forEach((reaction) => {
            // Only include emoji reactions (not custom emojis with IDs)
            const emoji = reaction.emoji.name;
            if (emoji) {
              reactions.push({
                emoji,
                count: reaction.count,
              });
            }
          });
          
          images.push({
            url: attachment.url,
            filename: attachment.name || "unknown.png",
            author: message.author.username,
            authorId: message.author.id,
            timestamp: message.createdAt,
            caption: message.content || "",
            messageId: message.id,
            reactions,
          });
        }
      });
    });

    // Get last message ID for pagination
    const lastMessage = messages.last();
    if (lastMessage) {
      lastMessageId = lastMessage.id;
    }
    fetchedCount += messages.size;
  }

  return images;
}

export async function downloadAndUploadImage(imageUrl: string, filename: string): Promise<string> {
  // Download image from Discord
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Generate unique filename
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const extension = filename.split(".").pop() || "png";
  const uniqueFilename = `discord-import/${timestamp}-${randomSuffix}.${extension}`;

  // Upload to S3
  const contentType = response.headers.get("content-type") || "image/png";
  const { url } = await storagePut(uniqueFilename, buffer, contentType);

  return url;
}

export async function disconnectDiscordClient() {
  if (discordClient) {
    await discordClient.destroy();
    discordClient = null;
  }
}
