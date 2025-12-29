import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function ServerStatus() {
  const { data: status, refetch } = trpc.server.status.useQuery(undefined, {
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  const [showPlayerList, setShowPlayerList] = useState(false);

  // Refetch on mount and when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refetch();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [refetch]);

  if (!status) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 rounded-full bg-stone-500 animate-pulse" />
        <span className="text-stone-400">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Status Indicator */}
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            status.online
              ? "bg-grass-500 shadow-[0_0_8px_rgba(124,252,0,0.6)]"
              : "bg-red-500"
          } ${status.online ? "animate-pulse" : ""}`}
        />
        <span className="text-sm font-medium text-stone-200">
          {status.online ? "Online" : "Offline"}
        </span>
      </div>

      {/* Player Count with Dropdown */}
      {status.online && (
        <div className="relative">
          <button
            onClick={() => setShowPlayerList(!showPlayerList)}
            className="flex items-center gap-2 px-3 py-1 bg-stone-800/50 border-2 border-stone-700 hover:bg-stone-700/50 transition-colors"
            title="Click to see online players"
          >
            <svg
              className="w-4 h-4 text-grass-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="text-sm font-bold text-grass-400">
              {status.players.online}
            </span>
            <span className="text-xs text-stone-400">
              / {status.players.max}
            </span>
            {showPlayerList ? (
              <ChevronUp className="w-3 h-3 text-stone-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-stone-400" />
            )}
          </button>

          {/* Player List Dropdown */}
          {showPlayerList && (
            <div className="absolute top-full mt-2 right-0 w-64 bg-stone-900 border-2 border-stone-700 shadow-lg z-50 max-h-96 overflow-y-auto">
              <div className="p-3">
                <div className="text-xs font-bold text-stone-400 mb-2 uppercase">
                  Online Players ({status.players.online})
                </div>
                {status.players.list && status.players.list.length > 0 ? (
                  <ul className="space-y-2">
                    {status.players.list.map((player: any, index: number) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 p-2 bg-stone-800/50 hover:bg-stone-800 transition-colors"
                      >
                        {/* Player Head/Avatar */}
                        {player.uuid && (
                          <img
                            src={`https://crafatar.com/avatars/${player.uuid}?size=24&overlay`}
                            alt={player.name_clean || player.name_raw}
                            className="w-6 h-6 pixelated"
                            onError={(e) => {
                              // Fallback to default player head if UUID doesn't work
                              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2378c850'%3E%3Crect width='24' height='24'/%3E%3Crect x='8' y='8' width='3' height='3' fill='%23000'/%3E%3Crect x='13' y='8' width='3' height='3' fill='%23000'/%3E%3Crect x='9' y='14' width='6' height='2' fill='%23000'/%3E%3C/svg%3E";
                            }}
                          />
                        )}
                        <span className="text-sm text-stone-200 font-medium">
                          {player.name_clean || player.name_raw}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-stone-400 text-center py-4">
                    No player list available
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Server IP Copy Button */}
      <button
        onClick={() => {
          navigator.clipboard.writeText("play.elitesmp.com");
          // Show toast notification
          const toast = document.createElement("div");
          toast.textContent = "Server IP copied!";
          toast.className =
            "fixed top-4 right-4 bg-grass-500 text-white px-4 py-2 font-bold z-50 shadow-lg";
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 2000);
        }}
        className="px-3 py-1 bg-dirt-600 hover:bg-dirt-500 border-2 border-dirt-800 text-white text-sm font-bold transition-colors"
        title="Click to copy server IP"
      >
        play.elitesmp.com
      </button>
    </div>
  );
}
