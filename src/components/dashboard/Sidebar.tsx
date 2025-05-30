
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  GamepadIcon, 
  CreditCard, 
  BarChart3, 
  FileText, 
  Trophy, 
  LogOut,
  Wallet
} from "lucide-react";

type Section = 'dashboard' | 'cards' | 'reports' | 'contract' | 'contest';

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  walletBalance: number;
  userName: string;
}

export const Sidebar = ({ activeSection, onSectionChange, walletBalance, userName }: SidebarProps) => {
  const { signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard' as Section, label: 'Game Board', icon: GamepadIcon },
    { id: 'cards' as Section, label: 'ARIF Cards', icon: CreditCard },
    { id: 'reports' as Section, label: 'Reports', icon: BarChart3 },
    { id: 'contract' as Section, label: 'Contract Agreement', icon: FileText },
    { id: 'contest' as Section, label: 'Contest', icon: Trophy },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="text-2xl font-bold text-orange-400 mb-2">ARIF BINGO</div>
        <p className="text-gray-300 text-sm">Agent Portal</p>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-700">
        <div className="text-white font-medium mb-2">{userName}</div>
        <div className="flex items-center gap-2 text-orange-400">
          <Wallet className="h-4 w-4" />
          <span className="font-semibold">${walletBalance.toFixed(2)}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeSection === item.id 
                    ? 'bg-orange-500 text-white hover:bg-orange-600' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
          onClick={signOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
