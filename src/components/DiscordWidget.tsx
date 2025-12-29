import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface DiscordWidgetProps {
  serverId?: string;
  inviteUrl?: string;
}

export default function DiscordWidget({ 
  serverId = "YOUR_DISCORD_SERVER_ID", 
  inviteUrl = "https://discord.gg/YOUR_INVITE_CODE" 
}: DiscordWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>Join Our Discord</CardTitle>
            <CardDescription>Connect with the community</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {serverId && serverId !== "YOUR_DISCORD_SERVER_ID" ? (
          <iframe
            src={`https://discord.com/widget?id=${serverId}&theme=dark`}
            width="100%"
            height="500"
            style={{ border: 0 }}
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            className="rounded-lg"
          />
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Join our Discord server to chat with other builders, share ideas, coordinate projects, and stay updated on server events.
            </p>
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-6 py-3 transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord Server
            </a>
            <p className="text-sm text-muted-foreground">
              To enable the live Discord widget, add your Discord Server ID to the environment variables.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
