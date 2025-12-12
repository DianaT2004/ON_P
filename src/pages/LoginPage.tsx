import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore, DEMO_USERS } from '../stores/authStore';
import { Truck, Building2, Sparkles, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [selectedRole, setSelectedRole] = useState<'driver' | 'owner' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (role: 'driver' | 'owner') => {
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      const user = role === 'driver' ? DEMO_USERS.driver : DEMO_USERS.owner;
      login(user);
      setIsLoading(false);
      navigate(role === 'driver' ? '/driver/loads' : '/owner/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">OnPoint</h1>
          </motion.div>
          <p className="text-gray-600">AI-Powered Logistics Marketplace</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Choose your account type to continue
          </p>

          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <motion.div
                key="role-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Driver Option */}
                <motion.button
                  onClick={() => setSelectedRole('driver')}
                  className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Truck className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        I'm a Driver
                      </h3>
                      <p className="text-sm text-gray-600">
                        Find loads and manage deliveries
                      </p>
                    </div>
                    <Sparkles className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>
                </motion.button>

                {/* Owner Option */}
                <motion.button
                  onClick={() => setSelectedRole('owner')}
                  className="w-full p-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        I'm a Load Owner
                      </h3>
                      <p className="text-sm text-gray-600">
                        Post loads and find drivers
                      </p>
                    </div>
                    <Sparkles className="w-6 h-6 text-gray-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className={`p-4 rounded-lg ${selectedRole === 'driver' ? 'bg-red-50 border-2 border-red-200' : 'bg-orange-50 border-2 border-orange-200'}`}>
                  <div className="flex items-center gap-3">
                    {selectedRole === 'driver' ? (
                      <>
                        <Truck className="w-6 h-6 text-red-600" />
                        <div>
                          <p className="font-semibold text-red-900">Driver Account</p>
                          <p className="text-sm text-red-700">Access loads and routes</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Building2 className="w-6 h-6 text-orange-600" />
                        <div>
                          <p className="font-semibold text-orange-900">Load Owner Account</p>
                          <p className="text-sm text-orange-700">Manage shipments</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleLogin(selectedRole)}
                    disabled={isLoading}
                    className={`w-full h-12 rounded-lg font-semibold transition-all duration-300 ${
                      selectedRole === 'driver'
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                        : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                    } text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Continue with Demo Account'
                    )}
                  </button>

                  <button
                    onClick={() => setSelectedRole(null)}
                    className="w-full text-sm text-gray-600 hover:text-gray-900 underline"
                  >
                    Change account type
                  </button>
                </div>

                <div className={`p-4 ${selectedRole === 'driver' ? 'bg-red-50' : 'bg-orange-50'} rounded-lg`}>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Demo Account:</p>
                  <p className="text-xs text-gray-700">
                    Email: {selectedRole === 'driver' ? 'driver@onpoint.ge' : 'owner@onpoint.ge'}
                  </p>
                  <p className="text-xs text-gray-700">
                    Password: demo123
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: '🤖', label: 'AI Matching' },
            { icon: '⚡', label: 'Real-time' },
            { icon: '💰', label: 'Best Rates' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="text-white"
            >
              <div className="text-3xl mb-1">{feature.icon}</div>
              <p className="text-xs font-medium text-gray-700">{feature.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
