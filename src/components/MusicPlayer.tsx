import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface MusicPlayerProps {
  musicUrl?: string;
}

export function MusicPlayer({ musicUrl }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Get music URL from environment or use default
  const defaultMusicUrl = import.meta.env.VITE_BACKGROUND_MUSIC_URL;
  const finalMusicUrl = musicUrl || defaultMusicUrl;

  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume / 100;
    }
  }, [isMuted, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!finalMusicUrl) {
    return null; // Don't render if no music URL is provided
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={finalMusicUrl}
        loop
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating Music Player */}
      <Card
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center gap-3 bg-card/95 backdrop-blur-sm">
          {/* Toggle Visibility */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-10 top-1/2 -translate-y-1/2 bg-card/95 backdrop-blur-sm"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? "→" : "♪"}
          </Button>

          {/* Play/Pause */}
          <Button
            variant="outline"
            size="icon"
            onClick={togglePlay}
            className="minecraft-text"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 min-w-[120px]">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="flex-shrink-0"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0] || 0)}
              max={100}
              step={1}
              className="w-20"
              disabled={isMuted}
            />
          </div>

          {/* Now Playing */}
          <div className="text-xs text-muted-foreground hidden sm:block">
            <div className="font-semibold">Background Music</div>
            <div className="text-[10px]">
              {isPlaying ? "Now Playing" : "Paused"}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
