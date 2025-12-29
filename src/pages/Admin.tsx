import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Loader2, Shield, CheckCircle, XCircle, FileText } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Admin() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();

  const { data: users, isLoading: usersLoading } = trpc.admin.getAllUsers.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  const utils = trpc.useUtils();

  const toggleWhitelistMutation = trpc.admin.toggleWhitelist.useMutation({
    onSuccess: () => {
      toast.success("Whitelist status updated");
      utils.admin.getAllUsers.invalidate();
    },
    onError: (error) => {
      toast.error(`Failed to update whitelist: ${error.message}`);
    },
  });

  const handleToggleWhitelist = (userId: number, currentStatus: boolean) => {
    toggleWhitelistMutation.mutate({
      userId,
      isWhitelisted: !currentStatus,
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
                You don't have permission to access the admin dashboard
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (authLoading || usersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <Link href="/admin/applications">
            <Button variant="outline" size="lg">
              <FileText className="w-4 h-4 mr-2" />
              Review Applications
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{users?.length || 0}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Whitelisted</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">
                {users?.filter((u) => u.isWhitelisted).length || 0}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Paid Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">
                {users?.filter((u) => u.hasPaid).length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage whitelist status for all users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Minecraft Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Whitelist Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">{u.name || "N/A"}</TableCell>
                      <TableCell>{u.email || "N/A"}</TableCell>
                      <TableCell>{u.minecraftUsername || "Not set"}</TableCell>
                      <TableCell>
                        <Badge variant={u.role === "admin" ? "default" : "secondary"}>
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {u.hasPaid ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>Paid</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-yellow-600">
                            <XCircle className="w-4 h-4" />
                            <span>Unpaid</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {u.isWhitelisted ? (
                          <Badge variant="default" className="bg-green-600">
                            Whitelisted
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Not Whitelisted</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={u.isWhitelisted}
                            onCheckedChange={() => handleToggleWhitelist(u.id, u.isWhitelisted)}
                            disabled={toggleWhitelistMutation.isPending}
                          />
                          <span className="text-sm text-muted-foreground">
                            {u.isWhitelisted ? "Remove" : "Add"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
