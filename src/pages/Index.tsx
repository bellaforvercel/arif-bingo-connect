import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { AgentDashboard } from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "./AdminDashboard";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log('[Index] State update:', { 
      userId: user?.id, 
      userRole: user?.role, 
      loading 
    });
  }, [user, loading]);

  // Show loading while checking auth state
  if (loading) {
    console.log('[Index] Showing loading screen');
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-white">Loading...</p>
          <p className="text-gray-400 text-sm mt-2">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login if no user
  if (!user) {
    console.log('[Index] No user found, showing login');
    return <LoginForm />;
  }

  // Route based on role
  if (user.role === 'admin') {
    console.log('[Index] Routing to admin dashboard');
    return <AdminDashboard />;
  }

  if (user.role === 'agent') {
    console.log('[Index] Routing to agent dashboard');
    return <AgentDashboard />;
  }

  // Fallback - should not happen but just in case
  console.log('[Index] Fallback to login form');
  return <LoginForm />;
};

export default Index;