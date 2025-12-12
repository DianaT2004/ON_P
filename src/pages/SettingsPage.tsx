import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuthStore } from '../stores/authStore';
import { User, Mail, Phone, Building2, Shield, Bell, CreditCard, Globe, Truck, Check, Save } from 'lucide-react';

const truckTypes = [
  'Refrigerated Truck',
  'Flatbed Truck',
  'Box Truck',
  'Dry Van',
  'Step Deck',
  'Lowboy',
  'Tanker',
  'Car Hauler',
];

export default function SettingsPage() {
  const { user, updateTruckTypes } = useAuthStore();
  const [selectedTrucks, setSelectedTrucks] = useState<string[]>(user?.truckTypes || []);
  const [saved, setSaved] = useState(false);

  const handleTruckToggle = (truckType: string) => {
    setSelectedTrucks(prev =>
      prev.includes(truckType)
        ? prev.filter(t => t !== truckType)
        : [...prev, truckType]
    );
    setSaved(false);
  };

  const handleSave = () => {
    updateTruckTypes(selectedTrucks);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Section */}
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
                  Full Name
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

          {/* Settings Menu */}
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

            {/* Truck Types Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Truck Types</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Select one or more truck types you operate:</p>
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                {truckTypes.map((truck) => (
                  <motion.button
                    key={truck}
                    onClick={() => handleTruckToggle(truck)}
                    className={`w-full text-left px-3 py-2 rounded-lg border-2 transition-all ${
                      selectedTrucks.includes(truck)
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{truck}</span>
                      {selectedTrucks.includes(truck) && (
                        <Check className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              <motion.button
                onClick={handleSave}
                className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Truck Types
                  </>
                )}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
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
    </Layout>
  );
}
