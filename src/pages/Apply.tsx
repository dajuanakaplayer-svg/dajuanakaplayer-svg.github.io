import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Apply() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [whyJoin, setWhyJoin] = useState("");
  const [buildingExperience, setBuildingExperience] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [minecraftUsername, setMinecraftUsername] = useState("");

  const { data: existingApplication, isLoading: appLoading } = trpc.application.getMy.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const submitMutation = trpc.application.submit.useMutation({
    onSuccess: () => {
      toast.success("Application submitted successfully!");
      setWhyJoin("");
      setBuildingExperience("");
      setPortfolioLinks("");
      setMinecraftUsername("");
      // Refetch application status
      utils.application.getMy.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to submit application: ${error.message}`);
    },
  });

  const utils = trpc.useUtils();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (whyJoin.length < 50) {
      toast.error("Please write at least 50 characters explaining why you want to join");
      return;
    }
    
    if (buildingExperience.length < 50) {
      toast.error("Please write at least 50 characters about your building experience");
      return;
    }
    
    submitMutation.mutate({
      whyJoin,
      buildingExperience,
      portfolioLinks: portfolioLinks || undefined,
      minecraftUsername,
    });
  };

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  if (authLoading || appLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show application status if exists
  if (existingApplication) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                {existingApplication.status === "pending" && (
                  <Clock className="w-8 h-8 text-yellow-600" />
                )}
                {existingApplication.status === "approved" && (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
                {existingApplication.status === "rejected" && (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
                <CardTitle className="text-3xl">Application Status</CardTitle>
              </div>
              <CardDescription>
                Submitted on {new Date(existingApplication.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-lg font-semibold mb-2">Status:</p>
                {existingApplication.status === "pending" && (
                  <p className="text-yellow-600 text-lg">⏳ Pending Review</p>
                )}
                {existingApplication.status === "approved" && (
                  <p className="text-green-600 text-lg">✅ Approved</p>
                )}
                {existingApplication.status === "rejected" && (
                  <p className="text-red-600 text-lg">❌ Rejected</p>
                )}
              </div>

              {existingApplication.status === "pending" && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">
                    Your application is being reviewed by our admin team. You'll be notified once a decision is made.
                  </p>
                </div>
              )}

              {existingApplication.status === "approved" && (
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                    <p className="text-green-800 dark:text-green-200 mb-4">
                      Congratulations! Your application has been approved. You can now proceed to payment to gain server access.
                    </p>
                  </div>
                  <Link href="/payment">
                    <Button size="lg" className="w-full">
                      Proceed to Payment
                    </Button>
                  </Link>
                </div>
              )}

              {existingApplication.status === "rejected" && existingApplication.reviewNotes && (
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">Admin Notes:</p>
                  <p className="text-red-700 dark:text-red-300">{existingApplication.reviewNotes}</p>
                </div>
              )}

              <div className="space-y-4 pt-4 border-t">
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Why You Want to Join:</p>
                  <p className="text-foreground">{existingApplication.whyJoin}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Building Experience:</p>
                  <p className="text-foreground">{existingApplication.buildingExperience}</p>
                </div>
                {existingApplication.portfolioLinks && (
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Portfolio Links:</p>
                    <p className="text-foreground break-all">{existingApplication.portfolioLinks}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-1">Minecraft Username:</p>
                  <p className="text-foreground">{existingApplication.minecraftUsername}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Show application form
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Whitelist Application</CardTitle>
            <CardDescription>
              Tell us about yourself and your building experience. Applications are reviewed by our admin team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="whyJoin">
                  Why do you want to join Elite SMP? <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  id="whyJoin"
                  value={whyJoin}
                  onChange={(e) => setWhyJoin(e.target.value)}
                  placeholder="Tell us what draws you to our server and what you hope to contribute to the community..."
                  className="min-h-[150px]"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {whyJoin.length}/2000 characters (minimum 50)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingExperience">
                  Describe your building experience <span className="text-red-600">*</span>
                </Label>
                <Textarea
                  id="buildingExperience"
                  value={buildingExperience}
                  onChange={(e) => setBuildingExperience(e.target.value)}
                  placeholder="Share your building style, favorite projects, techniques you enjoy, or what inspires your builds..."
                  className="min-h-[150px]"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  {buildingExperience.length}/2000 characters (minimum 50)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolioLinks">
                  Portfolio Links (optional)
                </Label>
                <Textarea
                  id="portfolioLinks"
                  value={portfolioLinks}
                  onChange={(e) => setPortfolioLinks(e.target.value)}
                  placeholder="Links to screenshots, videos, or other showcases of your builds (Imgur, YouTube, etc.)"
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  {portfolioLinks.length}/1000 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minecraftUsername">
                  Minecraft Username <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="minecraftUsername"
                  value={minecraftUsername}
                  onChange={(e) => setMinecraftUsername(e.target.value)}
                  placeholder="Your Minecraft Java Edition username"
                  required
                  maxLength={16}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Once your application is approved, you'll be able to proceed to payment ($15 one-time fee) to gain server access.
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
