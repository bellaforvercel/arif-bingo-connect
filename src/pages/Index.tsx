
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { AgentDashboard } from "@/components/dashboard/AgentDashboard";
import AdminDashboard from "./AdminDashboard";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    console.log('Index - User:', user?.id, 'Profile:', profile?.role, 'Loading:', loading);
  }, [user, profile, loading]);

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login if no user or profile
  if (!user || !profile) {
    return <LoginForm />;
  }

  // Route based on role
  if (profile.role === 'admin') {
    return <AdminDashboard />;
  }

  if (profile.role === 'agent') {
    return <AgentDashboard />;
  }

  // Fallback - should not happen but just in case
  return <LoginForm />;
};

export default Index;
