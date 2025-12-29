import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { ServerStatus } from "@/components/ServerStatus";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-border shadow-medium">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <a className="text-2xl font-bold minecraft-text weed-text hover:opacity-80 transition-smooth">
              Elite SMP
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Community Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Community</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/gallery">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Gallery</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Browse community builds and screenshots
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/stories">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Player Stories</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Read about amazing builds and experiences
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/leaderboards">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Leaderboards</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                See top builders and contributors
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Server Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Server</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/map">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">World Map</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Explore our world and notable locations
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/timeline">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Timeline</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Server history and milestones
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/events">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Events</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Upcoming contests and activities
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/rules">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Rules</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Server guidelines and policies
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/faq">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">FAQ</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Frequently asked questions
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/coordinates">
                            <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                              <div className="text-sm font-medium leading-none">Coordinates</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Important server locations and farms
                              </p>
                            </a>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Server Status */}
            <ServerStatus />

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    {user?.name || "Profile"}
                  </Button>
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => window.location.href = getLoginUrl()}>
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-border">
            {/* Server Status in Mobile */}
            <div className="px-2 pb-3 border-b border-border">
              <ServerStatus />
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-sm text-muted-foreground px-2">Community</div>
              <Link href="/gallery">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Gallery
                </a>
              </Link>
              <Link href="/stories">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Player Stories
                </a>
              </Link>
              <Link href="/leaderboards">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Leaderboards
                </a>
              </Link>
            </div>

            <div className="space-y-2">
              <div className="font-semibold text-sm text-muted-foreground px-2">Server</div>
              <Link href="/map">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  World Map
                </a>
              </Link>
              <Link href="/timeline">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Timeline
                </a>
              </Link>
              <Link href="/events">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Events
                </a>
              </Link>
              <Link href="/rules">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  Rules
                </a>
              </Link>
              <Link href="/faq">
                <a className="block px-4 py-2 hover:bg-accent rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  FAQ
                </a>
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="space-y-2 pt-2 border-t border-border">
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    {user?.name || "Profile"}
                  </Button>
                </Link>
                {user?.role === "admin" && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" className="w-full" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="pt-2 border-t border-border">
                <Button size="sm" className="w-full" onClick={() => window.location.href = getLoginUrl()}>
                  Login
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
