import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Radio, MapPin, Compass } from "lucide-react";
import { useState } from "react";

interface LiveServerPreviewProps {
  botOnline?: boolean;
  streamUrl?: string;
}

export default function LiveServerPreview({ 
  botOnline = false,
  streamUrl 
}: LiveServerPreviewProps) {
  const [botLocation, setBotLocation] = useState("Spawn Area");
  const [botActivity, setBotActivity] = useState("Exploring the community farms");

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-accent/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eye className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="minecraft-text text-2xl">Live Server Preview</CardTitle>
              <CardDescription>Watch our AI bot explore the server in real-time</CardDescription>
            </div>
          </div>
          <Badge 
            variant={botOnline ? "default" : "secondary"}
            className="flex items-center gap-2"
          >
            <Radio className={`w-4 h-4 ${botOnline ? 'animate-pulse' : ''}`} />
            {botOnline ? "Bot Online" : "Bot Offline"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Video Stream Area */}
        <div className="aspect-video bg-muted rounded-lg overflow-hidden relative border-4 border-border">
          {streamUrl && botOnline ? (
            <iframe
              src={streamUrl}
              className="w-full h-full"
              style={{ border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-muted to-muted/50">
              <Eye className="w-16 h-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Virtual Tour Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Our AI bot will soon be exploring the server 24/7, giving you a live peek at our builds, 
                community areas, and the world we've created together.
              </p>
              <p className="text-sm text-muted-foreground max-w-lg">
                The bot is controlled by players in-game via a secure peer-to-peer connection. 
                Watch as community members guide the bot through our world, showcasing builds and exploring together.
              </p>
            </div>
          )}
          
          {/* Live Indicator Overlay */}
          {botOnline && (
            <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full flex items-center gap-2 font-semibold text-sm">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
          )}
        </div>

        {/* Bot Status Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Current Location</p>
                <p className="font-semibold">{botLocation}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Compass className="w-8 h-8 text-accent flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Bot Activity</p>
                <p className="font-semibold">{botActivity}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">How It Works</h4>
          <p className="text-sm text-muted-foreground">
            Players on the server can control the bot in-game to showcase different areas, builds, and community projects. 
            The live feed is streamed securely via peer-to-peer connection, giving you an authentic preview of our world 
            without compromising server security.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
