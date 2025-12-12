import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { useAuthStore } from '../../stores/authStore';
import { User, Mail, Phone, Building2, Shield, Bell, CreditCard, Globe } from 'lucide-react';

export default function OwnerSettingsPage() {
  const { user } = useAuthStore();

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Company Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={user?.phone || ''}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
              {user?.company && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building2 className="inline w-4 h-4 mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    defaultValue={user.company}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  />
                </div>
              )}
              <motion.button
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Security</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Notifications</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Billing</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Language</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verified</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    {user?.verified ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subscription</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user?.subscription === 'premium' ? 'bg-yellow-100 text-yellow-700' :
                    user?.subscription === 'pro' ? 'bg-purple-100 text-purple-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user?.subscription?.toUpperCase() || 'FREE'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <span className="text-sm font-semibold text-gray-900">{user?.rating || 0}⭐</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}

