import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Loader2, Shield, CheckCircle, XCircle, Clock, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function AdminApplications() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewAction, setReviewAction] = useState<"approved" | "rejected">("approved");

  const { data: applications, isLoading: appsLoading } = trpc.admin.getAllApplications.useQuery(
    undefined,
    {
      enabled: isAuthenticated && user?.role === "admin",
    }
  );

  const utils = trpc.useUtils();

  const reviewMutation = trpc.admin.reviewApplication.useMutation({
    onSuccess: () => {
      toast.success(`Application ${reviewAction}`);
      setReviewDialogOpen(false);
      setSelectedApp(null);
      setReviewNotes("");
      utils.admin.getAllApplications.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to review application: ${error.message}`);
    },
  });

  const handleReview = (app: any, action: "approved" | "rejected") => {
    setSelectedApp(app);
    setReviewAction(action);
    setReviewDialogOpen(true);
  };

  const confirmReview = () => {
    if (!selectedApp) return;
    
    reviewMutation.mutate({
      applicationId: selectedApp.id,
      status: reviewAction,
      reviewNotes: reviewNotes || undefined,
    });
  };

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  // Show access denied if not admin
  if (!authLoading && user?.role !== "admin") {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-2xl">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Shield className="w-16 h-16 text-red-600" />
              </div>
              <CardTitle className="text-3xl">Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access the admin applications page
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (authLoading || appsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const pendingApps = applications?.filter((app) => app.status === "pending") || [];
  const reviewedApps = applications?.filter((app) => app.status !== "pending") || [];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FileText className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Application Review</h1>
          </div>
          <Link href="/admin">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-600">{pendingApps.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">
                {applications?.filter((app) => app.status === "approved").length || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-600">
                {applications?.filter((app) => app.status === "rejected").length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Applications */}
        {pendingApps.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>
            <div className="space-y-4">
              {pendingApps.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {app.user?.name || "Unknown User"}
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Submitted {new Date(app.createdAt).toLocaleDateString()} • Minecraft: {app.minecraftUsername}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground mb-1">Why Join:</p>
                      <p className="text-sm">{app.whyJoin}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground mb-1">Building Experience:</p>
                      <p className="text-sm">{app.buildingExperience}</p>
                    </div>
                    {app.portfolioLinks && (
                      <div>
                        <p className="font-semibold text-sm text-muted-foreground mb-1">Portfolio:</p>
                        <p className="text-sm break-all text-blue-600">{app.portfolioLinks}</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={() => handleReview(app, "approved")}
                        variant="default"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReview(app, "rejected")}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Reviewed Applications */}
        {reviewedApps.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Reviewed Applications</h2>
            <div className="space-y-4">
              {reviewedApps.map((app) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {app.user?.name || "Unknown User"}
                          {app.status === "approved" ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </Badge>
                          ) : (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Rejected
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          Reviewed {app.reviewedAt ? new Date(app.reviewedAt).toLocaleDateString() : "N/A"} • Minecraft: {app.minecraftUsername}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {app.reviewNotes && (
                    <CardContent>
                      <p className="font-semibold text-sm text-muted-foreground mb-1">Review Notes:</p>
                      <p className="text-sm">{app.reviewNotes}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {applications?.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No applications yet</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {reviewAction === "approved" ? "Approve" : "Reject"} Application
            </DialogTitle>
            <DialogDescription>
              {reviewAction === "approved"
                ? "This user will be able to proceed to payment."
                : "Please provide a reason for rejection (optional)."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reviewNotes">
                {reviewAction === "approved" ? "Notes (optional)" : "Reason for Rejection"}
              </Label>
              <Textarea
                id="reviewNotes"
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder={
                  reviewAction === "approved"
                    ? "Add any notes about this application..."
                    : "Explain why this application was rejected..."
                }
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmReview}
              disabled={reviewMutation.isPending}
              variant={reviewAction === "approved" ? "default" : "destructive"}
            >
              {reviewMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Confirm ${reviewAction === "approved" ? "Approval" : "Rejection"}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
