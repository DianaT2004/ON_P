import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import {
  Package,
  Users,
  BarChart3,
  MessageSquare,
  FileText,
  MapPin,
  Settings,
  Search,
  Bell,
  LogOut,
  User,
  Crown
} from 'lucide-react';

interface OwnerLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/owner/dashboard', icon: Package, label: 'Dashboard' },
  { path: '/owner/drivers', icon: Users, label: 'Drivers' },
  { path: '/owner/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/owner/chat', icon: MessageSquare, label: 'Chat' },
  { path: '/owner/documents', icon: FileText, label: 'Documents' },
  { path: '/owner/maps', icon: MapPin, label: 'Maps' },
  { path: '/owner/settings', icon: Settings, label: 'Settings' },
];

export default function OwnerLayout({ children }: OwnerLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login/owner');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0"
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-red-600">OnPoint</h1>
          <p className="text-xs text-gray-600 mt-1">Owner Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user?.email || 'user@onpoint.ge'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search loads or drivers..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => navigate('/subscription')}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all text-sm font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Crown className="w-4 h-4" />
                {user?.subscription === 'free' ? 'Upgrade' : user?.subscription}
              </motion.button>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              </button>
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

