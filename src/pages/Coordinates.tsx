import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Check, Search, ChevronDown, ChevronUp } from "lucide-react";


interface Coordinate {
  name: string;
  coords: string;
  dimension: "Overworld" | "Nether";
  category: string;
  notes?: string;
}

const coordinates: Coordinate[] = [
  // Community Farms
  { name: "Creeper Farm", coords: "-2206 -381", dimension: "Overworld", category: "Farms" },
  { name: "Raid Farm", coords: "843 -1852", dimension: "Overworld", category: "Farms" },
  { name: "Slime Farm", coords: "1180 -459", dimension: "Overworld", category: "Farms" },
  { name: "Drowned Farm", coords: "-868 -501", dimension: "Overworld", category: "Farms" },
  { name: "Squid Farm", coords: "-1206 -312", dimension: "Overworld", category: "Farms" },
  { name: "Mega Mob Farm", coords: "-905 -689", dimension: "Overworld", category: "Farms", notes: "8 render dist. when afking" },
  { name: "Concrete Farm", coords: "-1939 -129", dimension: "Overworld", category: "Farms" },
  { name: "Mega CB Farm", coords: "-1835 -138", dimension: "Overworld", category: "Farms" },
  { name: "Clay Farm", coords: "-1145 -242", dimension: "Overworld", category: "Farms" },
  { name: "Magma Farm", coords: "-195 -303", dimension: "Nether", category: "Farms", notes: "Nether Roof - Render 8 if afking" },
  { name: "Witch Farm", coords: "-753 648", dimension: "Nether", category: "Farms", notes: "Render 8 if AFK" },
  { name: "Glow Squid Farm", coords: "-849 -223", dimension: "Overworld", category: "Farms" },
  { name: "Shulker Farm", coords: "-1067 -226", dimension: "Overworld", category: "Farms" },
  { name: "Ghast Farm", coords: "-55 -195", dimension: "Nether", category: "Farms", notes: "Nether Roof" },
  
  // Player Bases
  { name: "Main Base", coords: "-1595 -268", dimension: "Overworld", category: "Bases" },
  { name: "Dajuan's Base", coords: "-88173 -1447", dimension: "Overworld", category: "Bases" },
  
  // Resource Locations
  { name: "Gravel LOT", coords: "-1300 -2090 && -1755 -1180", dimension: "Overworld", category: "Resources" },
  { name: "Sand LOT", coords: "-1380 -930", dimension: "Overworld", category: "Resources" },
  { name: "Calcite Mountain", coords: "-1985 -1955", dimension: "Overworld", category: "Resources" },
  { name: "Stone & Andesite Mine", coords: "-1438 -850", dimension: "Nether", category: "Resources", notes: "6 beacons - Connected below hub" },
  { name: "Sand Dup", coords: "44 -1742", dimension: "Overworld", category: "Resources" },
  { name: "Sand Dup (Nether)", coords: "5 47 -212", dimension: "Nether", category: "Resources" },
  
  // Nether Locations
  { name: "Nether Hub", coords: "-195 -30", dimension: "Nether", category: "Nether" },
  { name: "Nether Portal", coords: "640 750", dimension: "Nether", category: "Nether" },
  { name: "Nether Portal", coords: "14 70 -138", dimension: "Nether", category: "Nether" },
  { name: "Nether Portal", coords: "-314 20", dimension: "Nether", category: "Nether" },
  { name: "Nether Portal", coords: "-459 206", dimension: "Nether", category: "Nether" },
  { name: "Ice Biome", coords: "-2568 277", dimension: "Overworld", category: "Nether" },
  { name: "Piglin Bartering", coords: "-126 25", dimension: "Nether", category: "Nether" },
  
  // Points of Interest
  { name: "Spawn", coords: "6 1", dimension: "Overworld", category: "POI" },
  { name: "Sandstone Mine", coords: "150 -1100", dimension: "Overworld", category: "POI" },
  { name: "Trail Ruins", coords: "-4355 -1550", dimension: "Overworld", category: "POI" },
  { name: "First Mushroom Island", coords: "-3094 2612", dimension: "Overworld", category: "POI" },
  { name: "Big Desert", coords: "5500 6000", dimension: "Overworld", category: "POI" },
];

export default function Coordinates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedCoord, setCopiedCoord] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["Farms"]));

  const categories = ["Farms", "Bases", "Resources", "Nether", "POI"];
  
  const categoryIcons: Record<string, string> = {
    "Farms": "🌾",
    "Bases": "🏠",
    "Resources": "⛏️",
    "Nether": "🔥",
    "POI": "📍"
  };

  const filteredCoordinates = coordinates.filter((coord) => {
    const matchesSearch = coord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coord.coords.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const groupedCoordinates = categories.reduce((acc, category) => {
    acc[category] = filteredCoordinates.filter(coord => coord.category === category);
    return acc;
  }, {} as Record<string, Coordinate[]>);

  const copyToClipboard = (coords: string, name: string) => {
    navigator.clipboard.writeText(coords);
    setCopiedCoord(name);
    setTimeout(() => setCopiedCoord(null), 2000);
  };

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />

      
      <div className="relative z-10 container py-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 minecraft-text weed-text">
              Server Coordinates
            </h1>
            <p className="text-sm text-muted-foreground">
              Important locations, farms, and points of interest
            </p>
          </div>

          {/* Search */}
          <Card className="p-4 mb-6 bg-card/95 backdrop-blur">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search coordinates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Collapsible Categories */}
          <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {categories.map((category) => {
              const coords = groupedCoordinates[category];
              if (coords.length === 0) return null;
              
              const isExpanded = expandedCategories.has(category);
              
              return (
                <Card key={category} className="overflow-hidden glass shadow-medium hover-lift transition-smooth">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{categoryIcons[category]}</span>
                      <div className="text-left">
                        <h3 className="font-bold text-base">{category}</h3>
                        <p className="text-xs text-muted-foreground">{coords.length} locations</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {/* Category Content */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      {coords.map((coord, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm truncate">
                                  {coord.name}
                                </h4>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded shrink-0 ${
                                    coord.dimension === "Nether"
                                      ? "bg-destructive/20 text-destructive"
                                      : "bg-primary/20 text-primary"
                                  }`}
                                >
                                  {coord.dimension}
                                </span>
                              </div>
                              <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                                {coord.coords}
                              </code>
                              {coord.notes && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  {coord.notes}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(coord.coords, coord.name)}
                              className="shrink-0 h-8 px-3"
                            >
                              {copiedCoord === coord.name ? (
                                <>
                                  <Check className="w-3 h-3 mr-1" />
                                  <span className="text-xs">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 mr-1" />
                                  <span className="text-xs">Copy</span>
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
