
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { GameBoard } from "@/components/dashboard/GameBoard";
import { ArifCards } from "@/components/dashboard/ArifCards";
import { Reports } from "@/components/dashboard/Reports";
import { ContractAgreement } from "@/components/dashboard/ContractAgreement";
import { Contest } from "@/components/dashboard/Contest";

type Section = 'dashboard' | 'cards' | 'reports' | 'contract' | 'contest';

export const AgentDashboard = () => {
  const { user, profile } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  if (!user || !profile || profile.role !== 'agent') {
    return <Navigate to="/auth" replace />;
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <GameBoard />;
      case 'cards':
        return <ArifCards />;
      case 'reports':
        return <Reports />;
      case 'contract':
        return <ContractAgreement />;
      case 'contest':
        return <Contest />;
      default:
        return <GameBoard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        walletBalance={profile.wallet_balance}
        userName={profile.full_name}
      />
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};
