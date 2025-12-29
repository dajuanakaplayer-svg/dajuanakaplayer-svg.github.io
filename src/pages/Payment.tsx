import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { CheckCircle, Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Payment() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const createCheckoutMutation = trpc.payment.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.info("Redirecting to checkout...");
        window.open(data.url, "_blank");
      }
    },
    onError: (error) => {
      toast.error(`Checkout failed: ${error.message}`);
    },
  });

  const handleCheckout = () => {
    createCheckoutMutation.mutate();
  };

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If user already paid, show success message
  if (user?.hasPaid) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-3xl">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <CardTitle className="text-3xl">You're All Set!</CardTitle>
              <CardDescription>
                You already have server access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">
                Your payment has been processed and you've been whitelisted on the server.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setLocation("/profile")}>
                  View Profile
                </Button>
                <Button variant="secondary" onClick={() => setLocation("/")}>
                  Back to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Get Server Access
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Pricing Card */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Elite SMP Access</CardTitle>
              <CardDescription>One-time payment for permanent access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">$15</div>
                <p className="text-muted-foreground">One-time payment</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Permanent whitelist on the server</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Access to all community features</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Upload to community gallery</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Custom profile greeting</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Support server development</span>
                </div>
              </div>

              <Button
                className="w-full text-lg py-6"
                size="lg"
                onClick={handleCheckout}
                disabled={createCheckoutMutation.isPending}
              >
                {createCheckoutMutation.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Secure payment powered by Stripe
              </p>
            </CardContent>
          </Card>

          {/* Info Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Pay?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Elite SMP is a curated community of dedicated builders. The one-time payment helps us:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Cover server hosting costs</li>
                  <li>Maintain server performance and uptime</li>
                  <li>Keep the community small and focused</li>
                  <li>Prevent griefing and ensure quality players</li>
                  <li>Fund future server improvements</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Complete Payment</p>
                    <p className="text-sm text-muted-foreground">
                      You'll be redirected to Stripe's secure checkout
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">Automatic Whitelist</p>
                    <p className="text-sm text-muted-foreground">
                      Your Minecraft username will be added to the server whitelist
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold">Start Building!</p>
                    <p className="text-sm text-muted-foreground">
                      Connect to play.elitesmp.com and join the community
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
