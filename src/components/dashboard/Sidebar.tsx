
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: 'dashboard' | 'cards' | 'reports' | 'contract' | 'contest') => void;
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🎯' },
    { id: 'cards', label: 'ARIF Cards', icon: '🎴' },
    { id: 'reports', label: 'Report', icon: '📊' },
    { id: 'contract', label: 'Contract Agreement', icon: '📄' },
    { id: 'contest', label: 'Contest', icon: '🏆' },
  ];

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-orange-400">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back</p>
        <div className="mt-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
          <span className="text-white">Wendo1</span>
        </div>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeSection === item.id ? "default" : "ghost"}
            className={`w-full justify-start text-left ${
              activeSection === item.id 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
            onClick={() => onSectionChange(item.id as any)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-8">
        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
          ← Back
        </Button>
      </div>
    </div>
  );
};
