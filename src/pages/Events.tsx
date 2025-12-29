import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function Events() {
  const upcomingEvents = [
    {
      title: "Monthly Build Contest",
      date: "January 15, 2025",
      time: "7:00 PM EST",
      location: "Contest Arena",
      description: "Theme: Underwater Structures. Show off your creativity building beneath the waves!",
      type: "Contest",
      participants: "Open to all",
    },
    {
      title: "Community Project: Town Hall",
      date: "January 20, 2025",
      time: "6:00 PM EST",
      location: "Spawn Town",
      description: "Join us in building a grand town hall for community meetings and events.",
      type: "Build Event",
      participants: "All welcome",
    },
    {
      title: "Treasure Hunt",
      date: "January 25, 2025",
      time: "8:00 PM EST",
      location: "Various",
      description: "Follow the clues to find hidden treasures across the world. Prizes for winners!",
      type: "Game",
      participants: "Teams of 2-4",
    },
  ];

  const pastEvents = [
    {
      title: "Winter Festival",
      date: "December 20, 2024",
      description: "Celebrated the holidays with a winter-themed building competition and gift exchange.",
      winner: "IceBuilder99",
    },
    {
      title: "Redstone Challenge",
      date: "November 15, 2024",
      description: "Players competed to create the most innovative redstone contraption.",
      winner: "RedstoneWizard",
    },
    {
      title: "Medieval Fair",
      date: "October 30, 2024",
      description: "A week-long event featuring medieval builds, tournaments, and roleplay.",
      winner: "BuildMaster47",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 minecraft-text grass-text">
            Events Calendar
          </h1>
          <p className="text-xl text-muted-foreground">
            Join us for community events, contests, and collaborative builds
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Upcoming Events
          </h2>
          
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-[200px_1fr] gap-0">
                  {/* Date Section */}
                  <div className="bg-primary/10 p-6 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <Badge className="mt-3">{event.type}</Badge>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-2xl">{event.title}</CardTitle>
                      <CardDescription className="flex flex-wrap gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-muted-foreground" />
            Past Events
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="text-sm text-muted-foreground mb-2">
                    {event.date}
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Winner: {event.winner}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Event Types */}
        <div className="grid md:grid-cols-4 gap-4 mt-12">
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🏆</div>
              <CardTitle className="text-lg">Build Contests</CardTitle>
              <CardDescription>Monthly themed competitions</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🎮</div>
              <CardTitle className="text-lg">Game Events</CardTitle>
              <CardDescription>Treasure hunts & challenges</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🏗️</div>
              <CardTitle className="text-lg">Community Builds</CardTitle>
              <CardDescription>Collaborative projects</CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="text-center">
            <CardHeader>
              <div className="text-3xl mb-2">🎉</div>
              <CardTitle className="text-lg">Celebrations</CardTitle>
              <CardDescription>Seasonal festivals</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Event Submission */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Suggest an Event</CardTitle>
            <CardDescription>
              Have an idea for a community event? We'd love to hear it!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Contact an admin in Discord to propose your event idea. We're always looking for 
              creative ways to bring the community together and celebrate our builders.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
