import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Properties from "@/pages/Properties";
import PropertyDetails from "@/pages/PropertyDetails";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import AddProperty from "@/pages/AddProperty";
import ForgotPassword from "@/pages/ForgotPassword";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/properties" component={Properties} />
      <Route path="/property/:id" component={PropertyDetails} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/add-property" component={AddProperty} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
