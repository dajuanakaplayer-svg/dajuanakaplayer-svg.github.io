import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

// Playlist of Mac Miller YouTube video IDs
const PLAYLIST = [
  "TQpu9xraiWI", // Add more video IDs here
];

export function BackgroundAudio() {
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<any>(null);
  const [currentVideoId, setCurrentVideoId] = useState("");

  // Pick a random video on mount
  useEffect(() => {
    const randomVideo = PLAYLIST[Math.floor(Math.random() * PLAYLIST.length)];
    setCurrentVideoId(randomVideo);
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (!currentVideoId) return;

    // Check if API is already loaded
    if ((window as any).YT) {
      initPlayer();
      return;
    }

    // Load YouTube IFrame API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // API will call this function when ready
    (window as any).onYouTubeIframeAPIReady = initPlayer;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [currentVideoId]);

  const initPlayer = () => {
    if (!currentVideoId) return;

    playerRef.current = new (window as any).YT.Player("youtube-audio-player", {
      height: "0",
      width: "0",
      videoId: currentVideoId,
      playerVars: {
        autoplay: 0, // Don't autoplay (user must unmute first)
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        loop: 1,
        playlist: currentVideoId, // Required for loop to work
      },
      events: {
        onReady: (event: any) => {
          setIsReady(true);
          event.target.mute(); // Start muted
        },
        onStateChange: (event: any) => {
          // If video ends, pick a new random video
          if (event.data === (window as any).YT.PlayerState.ENDED) {
            const randomVideo = PLAYLIST[Math.floor(Math.random() * PLAYLIST.length)];
            setCurrentVideoId(randomVideo);
            playerRef.current.loadVideoById(randomVideo);
          }
        },
      },
    });
  };

  const toggleMute = () => {
    if (!playerRef.current || !isReady) return;

    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Hidden YouTube player */}
      <div id="youtube-audio-player" style={{ display: "none" }}></div>

      {/* Floating mute/unmute button */}
      {isReady && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-50 glass hover:glass-strong shadow-glow transition-smooth"
          onClick={toggleMute}
          title={isMuted ? "Unmute background music" : "Mute background music"}
        >
          {isMuted ? (
            <VolumeX className="h-5 w-5 text-muted-foreground" />
          ) : (
            <Volume2 className="h-5 w-5 text-weed" />
          )}
        </Button>
      )}
    </>
  );
}
