import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore, DEMO_USERS } from '../stores/authStore';
import { Truck, Building2, Sparkles, Loader2, Zap, Shield, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-5xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Section */}
        <div className="text-center mb-12">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="mb-4"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
              OnPoint
            </h1>
            <div className="flex items-center justify-center gap-2 text-red-600">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <p className="text-lg font-semibold">AI-Powered Logistics Marketplace</p>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Two Column Layout for Driver and Owner */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Driver Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-red-100 hover:border-red-300 transition-all h-full"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-4 shadow-lg"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(239, 68, 68, 0.7)",
                      "0 0 0 10px rgba(239, 68, 68, 0)",
                      "0 0 0 0 rgba(239, 68, 68, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Truck className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">I'm a Driver</h2>
                <p className="text-gray-600 mb-6">Find loads and manage deliveries</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Zap, text: 'Find loads instantly' },
                  { icon: TrendingUp, text: 'Best rates guaranteed' },
                  { icon: Shield, text: 'Verified load owners' },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="p-2 rounded-lg bg-red-50">
                      <feature.icon className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => {
                  setSelectedRole('driver');
                  setTimeout(() => handleLogin('driver'), 500);
                }}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                {isLoading && selectedRole === 'driver' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Continue as Driver
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Demo: driver@onpoint.ge</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Owner Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border-2 border-orange-100 hover:border-orange-300 transition-all h-full"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 shadow-lg"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0 rgba(249, 115, 22, 0.7)",
                      "0 0 0 10px rgba(249, 115, 22, 0)",
                      "0 0 0 0 rgba(249, 115, 22, 0)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Building2 className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">I'm a Load Owner</h2>
                <p className="text-gray-600 mb-6">Post loads and find drivers</p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Zap, text: 'AI-powered matching' },
                  { icon: TrendingUp, text: 'Financial analytics' },
                  { icon: Shield, text: 'Driver reviews & ratings' },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="p-2 rounded-lg bg-orange-50">
                      <feature.icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                onClick={() => {
                  setSelectedRole('owner');
                  setTimeout(() => handleLogin('owner'), 500);
                }}
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                {isLoading && selectedRole === 'owner' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Continue as Owner
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Demo: owner@onpoint.ge</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-6 text-center"
        >
          {[
            { icon: '🤖', label: 'AI Matching', desc: 'Smart driver selection' },
            { icon: '⚡', label: 'Real-time', desc: 'Live updates' },
            { icon: '💰', label: 'Best Rates', desc: 'Competitive pricing' },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-red-100"
            >
              <div className="text-4xl mb-2">{feature.icon}</div>
              <p className="font-bold text-gray-900 text-sm">{feature.label}</p>
              <p className="text-xs text-gray-600 mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
