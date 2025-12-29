import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          q: "How do I join Elite SMP?",
          a: "First, create an account on our website and submit a whitelist application. Once approved by our staff, you'll need to complete a one-time payment of $15 to gain access. After payment, you'll be whitelisted and can join the server at play.elitesmp.com",
        },
        {
          q: "What Minecraft version does the server run?",
          a: "We currently run Minecraft Java Edition 1.21. Make sure your client is updated to the latest version to connect.",
        },
        {
          q: "Is there a Discord server?",
          a: "Yes! Join our Discord community to chat with other players, get help, participate in events, and stay updated on server news.",
        },
        {
          q: "Where should I build when I first join?",
          a: "Start by exploring spawn town and the surrounding areas. You can build near the community or venture out to find your own spot. Just make sure to respect others' build areas and ask before building too close to existing projects.",
        },
      ],
    },
    {
      category: "Gameplay & Rules",
      questions: [
        {
          q: "Is PvP allowed?",
          a: "PvP is only allowed with mutual consent. Don't attack other players unless they agree to it. Griefing and unwanted PvP will result in a ban.",
        },
        {
          q: "Can I use mods or texture packs?",
          a: "Client-side mods that don't give unfair advantages are allowed (e.g., Optifine, minimaps, inventory sorters). Texture packs and shaders are completely fine. Hacks, x-ray, and cheating mods are strictly prohibited.",
        },
        {
          q: "Are there any banned items or blocks?",
          a: "TNT duping and certain lag-causing contraptions may be restricted. Check with staff before building massive redstone farms or mob grinders.",
        },
        {
          q: "What happens if I break the rules?",
          a: "Depending on the severity, you may receive a warning, temporary ban, or permanent ban. We aim to be fair and give players chances to improve, but serious violations result in immediate removal.",
        },
      ],
    },
    {
      category: "Community & Resources",
      questions: [
        {
          q: "How do community farms work?",
          a: "Community farms are shared resources for everyone. You can harvest crops, but please replant what you take. Don't modify or expand community farms without permission from staff.",
        },
        {
          q: "Can I claim land?",
          a: "We don't have a formal land claiming system. Instead, we rely on mutual respect. Mark your build area clearly and communicate with neighbors. Most conflicts are resolved through friendly discussion.",
        },
        {
          q: "How do I participate in events?",
          a: "Check the Events Calendar on our website and our Discord announcements. Events are open to all whitelisted players unless otherwise specified.",
        },
        {
          q: "Can I collaborate on builds with others?",
          a: "Absolutely! Collaboration is encouraged. Many of our best builds are team efforts. Use Discord to coordinate with other builders.",
        },
      ],
    },
    {
      category: "Technical & Support",
      questions: [
        {
          q: "The server says I'm not whitelisted. What do I do?",
          a: "Make sure you've completed your application, received approval, and finished the payment process. Check your email for confirmation. If you're still having issues, contact staff in Discord.",
        },
        {
          q: "I'm experiencing lag. How can I improve performance?",
          a: "Try reducing your render distance, closing other programs, allocating more RAM to Minecraft, or using Optifine. If server-wide lag occurs, report it to staff.",
        },
        {
          q: "Can I transfer my builds from another server?",
          a: "We prefer that all builds on Elite SMP are created here to maintain the organic growth of our world. However, you can use previous builds as inspiration.",
        },
        {
          q: "How often does the server reset?",
          a: "Elite SMP is a long-term world. We don't plan to reset unless absolutely necessary (major Minecraft updates that require it). Your builds are meant to last.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 minecraft-text diamond-text">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about Elite SMP
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                    >
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still Have Questions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Still Have Questions?</CardTitle>
            <CardDescription>
              Can't find what you're looking for?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Join our Discord server and ask in the #support channel. Our staff and community 
              members are always happy to help new and existing players with any questions or concerns.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
