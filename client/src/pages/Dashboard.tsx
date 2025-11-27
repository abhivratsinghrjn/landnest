import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyCard } from "@/components/PropertyCard";
import { PlusCircle, Settings, LogOut, Trash2, Edit, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { getUserProperties } from "@/lib/api";
import { useEffect } from "react";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    }
  }, [user, setLocation]);
  
  const { data: myListings = [], isLoading } = useQuery({
    queryKey: ["/api/user/properties"],
    queryFn: getUserProperties,
    enabled: !!user,
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => setLocation("/"),
    });
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="font-bold text-xl">{user.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
              <Button variant="outline" size="sm" className="w-full gap-2">
                <Settings className="h-4 w-4" /> Edit Profile
              </Button>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <Button 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" 
                variant="ghost"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
              >
                <LogOut className="h-4 w-4 mr-2" />
                {logoutMutation.isPending ? "Logging out..." : "Log Out"}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-display font-bold">My Dashboard</h1>
              <Button onClick={() => setLocation("/add-property")} className="gap-2 bg-primary text-white">
                <PlusCircle className="h-4 w-4" />
                Add New Listing
              </Button>
            </div>

            <Tabs defaultValue="listings" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="profile">Profile Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="space-y-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : myListings.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {myListings.map((property: any) => (
                      <div key={property.id} className="relative group">
                        <PropertyCard property={property} />
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="secondary" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="destructive" className="h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                    <p className="text-muted-foreground mb-4">You haven't listed any properties yet.</p>
                    <Button onClick={() => setLocation("/add-property")}>Create your first listing</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="profile">
                <div className="bg-card p-6 rounded-xl border border-border max-w-xl">
                  <h3 className="text-lg font-semibold mb-6">Edit Profile Information</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input defaultValue={user.phone} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue={user.email} disabled />
                    </div>
                    <Button type="submit" className="bg-primary text-white">Save Changes</Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
