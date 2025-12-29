import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Hammer, Star } from "lucide-react";

export default function Leaderboards() {
  const topBuilders = [
    { rank: 1, name: "BuildMaster47", builds: 15, icon: "🏆" },
    { rank: 2, name: "FarmQueen", builds: 12, icon: "🥈" },
    { rank: 3, name: "RedstoneWizard", builds: 10, icon: "🥉" },
    { rank: 4, name: "SkyArchitect", builds: 9, icon: "" },
    { rank: 5, name: "TerraMaster", builds: 8, icon: "" },
  ];

  const topPlaytime = [
    { rank: 1, name: "DedicatedBuilder", hours: 450, icon: "🏆" },
    { rank: 2, name: "NightOwl", hours: 420, icon: "🥈" },
    { rank: 3, name: "AlwaysOnline", hours: 380, icon: "🥉" },
    { rank: 4, name: "RegularPlayer", hours: 340, icon: "" },
    { rank: 5, name: "WeekendWarrior", hours: 310, icon: "" },
  ];

  const topContributors = [
    { rank: 1, name: "CommunityHero", contributions: 25, icon: "🏆" },
    { rank: 2, name: "HelpfulHand", contributions: 22, icon: "🥈" },
    { rank: 3, name: "TeamPlayer", contributions: 20, icon: "🥉" },
    { rank: 4, name: "ResourceGiver", contributions: 18, icon: "" },
    { rank: 5, name: "ProjectLeader", contributions: 16, icon: "" },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 minecraft-text gold-text">
            Leaderboards
          </h1>
          <p className="text-xl text-muted-foreground">
            Celebrating our most dedicated and talented builders
          </p>
        </div>

        {/* Leaderboard Categories */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Top Builders */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Hammer className="w-6 h-6 text-primary" />
                <CardTitle>Top Builders</CardTitle>
              </div>
              <CardDescription>Most completed builds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topBuilders.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.rank <= 3 ? "bg-primary/10" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl w-8 text-center">
                        {player.icon || player.rank}
                      </span>
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {player.builds} builds
                        </div>
                      </div>
                    </div>
                    {player.rank === 1 && (
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Playtime */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-primary" />
                <CardTitle>Top Playtime</CardTitle>
              </div>
              <CardDescription>Most hours played</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPlaytime.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.rank <= 3 ? "bg-primary/10" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl w-8 text-center">
                        {player.icon || player.rank}
                      </span>
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {player.hours} hours
                        </div>
                      </div>
                    </div>
                    {player.rank === 1 && (
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-6 h-6 text-primary" />
                <CardTitle>Top Contributors</CardTitle>
              </div>
              <CardDescription>Community projects helped</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topContributors.map((player) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.rank <= 3 ? "bg-primary/10" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl w-8 text-center">
                        {player.icon || player.rank}
                      </span>
                      <div>
                        <div className="font-semibold">{player.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {player.contributions} contributions
                        </div>
                      </div>
                    </div>
                    {player.rank === 1 && (
                      <Trophy className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievement Badges */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Achievement Badges</CardTitle>
            <CardDescription>
              Special recognition for outstanding accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl mb-2">🏰</div>
                <div className="font-semibold">Master Builder</div>
                <div className="text-sm text-muted-foreground">10+ builds</div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl mb-2">⚡</div>
                <div className="font-semibold">Redstone Engineer</div>
                <div className="text-sm text-muted-foreground">5+ contraptions</div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl mb-2">🌟</div>
                <div className="font-semibold">Community Star</div>
                <div className="text-sm text-muted-foreground">15+ contributions</div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-4xl mb-2">⏰</div>
                <div className="font-semibold">Dedicated Player</div>
                <div className="text-sm text-muted-foreground">300+ hours</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>About Our Leaderboards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Leaderboards are updated weekly and celebrate different aspects of our community. 
              Remember, Elite SMP isn't about competition—these boards simply recognize the 
              dedication and creativity of our members. Every builder contributes to making 
              our world special, regardless of rankings!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
