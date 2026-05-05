import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
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
      {/* Left Side - Clean card design, no background image */}
      <div className="hidden md:flex w-1/2 bg-primary flex-col justify-between p-12">
        {/* Logo with actual favicon image */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img src={logoImage} alt="LandNest Logo" className="h-10 w-10 object-contain" />
            <span className="font-display font-bold text-2xl text-white">LandNest</span>
          </div>
        </Link>

        {/* Center content */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-5xl font-display font-bold text-white mb-4 leading-tight">
              Find Your<br />Perfect Nest.
            </h1>
            <p className="text-white/70 text-lg max-w-sm leading-relaxed">
              Rajnandgaon's most trusted platform for buying, selling, and renting properties.
            </p>
          </div>

          {/* Feature cards */}
          <div className="flex flex-col gap-3 mt-2">
            {[
              { icon: "🏡", title: "Verified Listings", desc: "Every property personally verified" },
              { icon: "📍", title: "Local Expertise", desc: "Deep roots in Rajnandgaon & Chhattisgarh" },
              { icon: "🤝", title: "Trusted by Families", desc: "Helping families find their dream home" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/60 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer tagline */}
        <p className="text-white/40 text-sm">
          © 2025 LandNest Properties · Rajnandgaon, CG
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md">
          <div className="mb-6 md:mb-8 md:hidden flex justify-center">
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
                      <Input name="email" id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input name="password" id="password" type="password" placeholder="Enter your password" required />
                    </div>
                    <Button type="submit" className="w-full bg-primary text-white" disabled={loginMutation.isPending}>
                      {loginMutation.isPending ? "Logging in..." : "Log In"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="justify-center">
                  <Link href="/forgot-password">
                    <Button variant="link" className="text-sm text-muted-foreground">Forgot your password?</Button>
                  </Link>
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
                      <Input name="name" id="name" placeholder="Enter your full name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input name="phone" id="phone" type="tel" placeholder="10-digit mobile number" pattern="[0-9]{10}" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input name="email" id="signup-email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input name="password" id="signup-password" type="password" placeholder="Minimum 6 characters" minLength={6} required />
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
