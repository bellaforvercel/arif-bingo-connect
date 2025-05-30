
import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AgentDashboard } from "@/components/dashboard/AgentDashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'agent' | 'admin'>('agent');

  const handleLogin = (role: 'agent' | 'admin') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <AgentDashboard />;
};

export default Index;
