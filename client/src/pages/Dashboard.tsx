import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PropertyCard } from "@/components/PropertyCard";
import { PlusCircle, Settings, LogOut, Trash2, Edit, Loader2, Upload, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserProperties, deleteProperty, updateProperty, uploadAvatar, updateUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [propertyToUpdate, setPropertyToUpdate] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  
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

  const deleteMutation = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/properties"] });
      toast({
        title: "Property deleted",
        description: "Your property has been removed successfully.",
      });
      setDeleteDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Delete failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      updateProperty(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user/properties"] });
      toast({
        title: "Status updated",
        description: "Property status has been changed successfully.",
      });
      setStatusDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const avatarMutation = useMutation({
    mutationFn: uploadAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been changed.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => setLocation("/"),
    });
  };

  const handleDelete = (property: any) => {
    setPropertyToDelete(property);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (propertyToDelete) {
      deleteMutation.mutate(propertyToDelete.id);
    }
  };

  const handleStatusChange = (property: any) => {
    setPropertyToUpdate(property);
    setNewStatus(property.status);
    setStatusDialogOpen(true);
  };

  const confirmStatusChange = () => {
    if (propertyToUpdate) {
      updateStatusMutation.mutate({ id: propertyToUpdate.id, status: newStatus });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      avatarMutation.mutate(file);
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileData);
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border text-center">
              <div className="relative w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden group cursor-pointer"
                   onClick={() => fileInputRef.current?.click()}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <h2 className="font-bold text-xl">{user.name}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
              <p className="text-xs text-muted-foreground mb-4">Click avatar to change photo</p>
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
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <Button 
                            size="icon" 
                            variant="secondary" 
                            className="h-8 w-8 shadow-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleStatusChange(property);
                            }}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="icon" 
                            variant="destructive" 
                            className="h-8 w-8 shadow-lg"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDelete(property);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {property.status === 'sold' && (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-xl rotate-[-15deg] shadow-2xl z-10">
                            SOLD
                          </div>
                        )}
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
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input 
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input value={user.email} disabled />
                      <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-primary text-white"
                      disabled={updateProfileMutation.isPending}
                    >
                      {updateProfileMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{propertyToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Property Status</DialogTitle>
            <DialogDescription>
              Update the status of "{propertyToUpdate?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label>Status</Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmStatusChange}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Status"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
