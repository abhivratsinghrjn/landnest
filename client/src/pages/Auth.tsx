import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, ArrowLeft } from "lucide-react";
import logoImage from "@assets/generated_images/minimalist_real_estate_logo_icon.png";
import { useAuth } from "@/hooks/use-auth";

export default function Auth() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get("mode") || "login";
  const [activeTab, setActiveTab] = useState(mode);
  const { user, loginMutation, registerMutation } = useAuth();

  useEffect(() => {
    if (user) {
      setLocation("/dashboard");
    }
  }, [user, setLocation]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    loginMutation.mutate({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    registerMutation.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phone: formData.get("phone") as string,
      username: formData.get("email") as string,
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Side - Image */}
      <div className="hidden md:block w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-151358468e774-c2796d71eb28?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-50 mix-blend-overlay" />
        <div className="relative z-10 p-12 text-white h-full flex flex-col justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <img src={logoImage} alt="Logo" className="h-10 w-10 brightness-0 invert" />
              <span className="font-display font-bold text-2xl">LandNest</span>
            </div>
          </Link>
          <div>
            <h1 className="text-5xl font-display font-bold mb-4">Welcome Home.</h1>
            <p className="text-xl opacity-80 max-w-md">Join our community to find, list, and explore the best properties in the region.</p>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8 md:hidden flex justify-center">
            <Link href="/">
              <img src={logoImage} alt="Logo" className="h-12 w-12" />
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Welcome Back</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input name="email" id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input name="password" id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white" disabled={loginMutation.isPending}>
                      {loginMutation.isPending ? "Logging in..." : "Log In"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="link" className="text-sm text-muted-foreground">Forgot your password?</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Create Account</CardTitle>
                  <CardDescription>Start your journey with LandNest today</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input name="name" id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input name="phone" id="phone" placeholder="9876543210" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input name="email" id="signup-email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input name="password" id="signup-password" type="password" minLength={6} required />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white" disabled={registerMutation.isPending}>
                      {registerMutation.isPending ? "Creating account..." : "Sign Up"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
