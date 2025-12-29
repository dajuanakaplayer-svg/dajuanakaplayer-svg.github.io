import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Pickaxe, Users, Castle, Sparkles } from "lucide-react";
import DiscordWidget from "@/components/DiscordWidget";
import LiveServerPreview from "@/components/LiveServerPreview";

import { MusicPlayer } from "@/components/MusicPlayer";
import { RedstoneText } from "@/components/RedstoneText";
import { Navigation } from "@/components/Navigation";
import { ServerStatus } from "@/components/ServerStatus";
import { ImageLightbox } from "@/components/ImageLightbox";
import { useState } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const worldImages = [
    "/images/2025-03-01_21.21.53.png",
    "/images/2024-06-01_16.07.33.png",
    "/images/Minecraft_1.21-Multiplayer(3rd-partyServer)11_24_20244_28_18PM.png",
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % worldImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + worldImages.length) % worldImages.length);
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      {/* 3D Minecraft Background */}

      
      {/* Music Player */}
      <MusicPlayer />
      {/* Hero Section with Server Background */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url(/images/2025-02-16_19.18.01.png)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 minecraft-text weed-text minecraft-build-hover">
            Elite SMP
          </h1>
          <p className="text-2xl md:text-3xl text-foreground/90 mb-8 italic drop-shadow">
            A long-term Minecraft SMP built for serious builders
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-4">
              {user?.greeting && (
                <p className="text-xl text-primary/90 italic">
                  {user.greeting}
                </p>
              )}
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/profile">
                  <Button size="lg" variant="default" className="text-lg bg-weed hover:bg-weed/80 text-white transition-smooth hover:shadow-glow">
                    View Profile
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button size="lg" variant="secondary" className="text-lg glass hover:glass-strong transition-smooth hover:shadow-medium">
                    Community Gallery
                  </Button>
                </Link>
                <Link href="/coordinates">
                  <Button size="lg" variant="outline" className="text-lg glass hover:glass-strong transition-smooth hover:shadow-medium">
                    📍 Server Coordinates
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-lg text-foreground/80">
                Join our community of dedicated builders
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  size="lg" 
                  variant="default" 
                  className="text-lg bg-weed hover:bg-weed/80 text-white transition-smooth hover:shadow-glow"
                  onClick={() => window.location.href = getLoginUrl()}
                >
                  Join Elite SMP
                </Button>
                <Link href="/coordinates">
                  <Button size="lg" variant="outline" className="text-lg glass hover:glass-strong transition-smooth hover:shadow-medium">
                    📍 Server Coordinates
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Server Info Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 minecraft-text diamond-text">
            What Makes Us Different
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Track hover state for each card */}
            <Card 
              className="p-6 text-center glass hover:glass-strong transition-smooth hover:shadow-glow hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organic Community</h3>
              <RedstoneText isHovered={hoveredCard === 1}>
                Like our terraced town center, our community grows naturally. No rigid plots—just builders working together.
              </RedstoneText>
            </Card>

            <Card 
              className="p-6 text-center glass hover:glass-strong transition-smooth hover:shadow-glow hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex justify-center mb-4">
                <Castle className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Shared Resources</h3>
              <RedstoneText isHovered={hoveredCard === 2}>
                Community farms, shared storage, and collaborative projects. We thrive together building infrastructure for everyone.
              </RedstoneText>
            </Card>

            <Card 
              className="p-6 text-center glass hover:glass-strong transition-smooth hover:shadow-glow hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex justify-center mb-4">
                <Pickaxe className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lasting Legacy</h3>
              <RedstoneText isHovered={hoveredCard === 3}>
                This world is permanent. Your medieval tower, your farm, your contribution—they'll stand for years to come.
              </RedstoneText>
            </Card>

            <Card 
              className="p-6 text-center glass hover:glass-strong transition-smooth hover:shadow-glow hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Craftsmanship Over Commerce</h3>
              <RedstoneText isHovered={hoveredCard === 4}>
                No pay-to-win, no ranks, no store. Just pure creative building in a world that values artistry and attention to detail.
              </RedstoneText>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 px-4 bg-card">
        <div className="container max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 minecraft-text stone-text">
            Our World
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => openLightbox(0)}
              className="aspect-video rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            >
              <img 
                src="/images/2025-03-01_21.21.53.png" 
                alt="Server overview" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => openLightbox(1)}
              className="aspect-video rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            >
              <img 
                src="/images/2024-06-01_16.07.33.png" 
                alt="Community farms" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
            <button
              onClick={() => openLightbox(2)}
              className="aspect-video rounded-lg overflow-hidden shadow-lg cursor-pointer group"
            >
              <img 
                src="/images/Minecraft_1.21-Multiplayer(3rd-partyServer)11_24_20244_28_18PM.png" 
                alt="Town center" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </button>
          </div>

          <div className="text-center">
            <Link href="/gallery">
              <Button size="lg" variant="default">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Server Preview Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl">
          <LiveServerPreview 
            botOnline={false}
            streamUrl={import.meta.env.VITE_BOT_STREAM_URL}
          />
        </div>
      </section>

      {/* Discord Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-4xl">
          <DiscordWidget 
            serverId={import.meta.env.VITE_DISCORD_SERVER_ID}
            inviteUrl={import.meta.env.VITE_DISCORD_INVITE_URL || "https://discord.gg/elitesmp"}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 minecraft-text gold-text">
            Ready to Build Your Legacy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're a master architect, a redstone engineer, a terraformer, or someone who just loves to build—there's a place for you here. Our community is waiting to see what you'll create.
          </p>
          
          {!isAuthenticated ? (
            <Button 
              size="lg" 
              variant="default" 
              className="text-lg bg-weed hover:bg-weed/80 text-white transition-smooth hover:shadow-glow"
              onClick={() => window.location.href = getLoginUrl()}
            >
              Join Our Community
            </Button>
          ) : (
            <Link href="/apply">
              <Button size="lg" variant="default" className="text-lg bg-weed hover:bg-weed/80 text-white transition-smooth hover:shadow-glow">
                Apply for Whitelist
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Image Lightbox */}
      {lightboxOpen && (
        <ImageLightbox
          images={worldImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  );
}
