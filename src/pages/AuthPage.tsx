
import { useAuth } from "@/hooks/useAuth";
import { LoginForm } from "@/components/auth/LoginForm";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (user && profile) {
    return <Navigate to="/" replace />;
  }

  return <LoginForm />;
};

export default AuthPage;
