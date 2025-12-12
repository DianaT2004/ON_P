import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { useLoadsStore } from '../../stores/loadsStore';
import { 
  Package, 
  MapPin, 
  TrendingUp, 
  LogOut,
  Heart,
  Lock,
  Crown,
  Sparkles,
  Zap
} from 'lucide-react';

export default function DriverLoadsPage() {
  const { user, logout, upgradeToPremium } = useAuthStore();
  const { loads, expressInterest, myInterestedLoads } = useLoadsStore();

  const availableLoads = loads.filter(load => load.status === 'active');

  const handleShowInterest = (loadId: string) => {
    expressInterest(loadId, user!.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100">
      {/* Header */}
      <motion.header 
        className="bg-white/80 backdrop-blur-lg border-b-2 border-red-100 shadow-sm sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Available Loads
              </h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            
            <div className="flex items-center gap-3">
              {!user?.isPremium && (
                <motion.button
                  onClick={upgradeToPremium}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl font-semibold text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Crown className="w-4 h-4" />
                  Upgrade to Premium
                </motion.button>
              )}
              {user?.isPremium && (
                <span className="premium-badge">
                  <Crown className="w-3 h-3" />
                  Premium
                </span>
              )}
              <button
                onClick={logout}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available Loads</p>
                <p className="text-2xl font-bold text-gray-900">{availableLoads.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-100 hover:border-purple-200 transition-all hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Interested</p>
                <p className="text-2xl font-bold text-gray-900">{myInterestedLoads.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-100 hover:border-green-200 transition-all hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Rating</p>
                <p className="text-2xl font-bold text-gray-900">{user?.rating || 4.8}⭐</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Loads Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Loads</h2>
          
          {availableLoads.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm p-12 rounded-xl text-center border-2 border-dashed border-gray-200"
            >
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No loads available</h3>
              <p className="text-gray-600">Check back soon for new loads</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableLoads.map((load, index) => {
                const hasInterest = myInterestedLoads.includes(load.id);
                const otherDriversCount = load.interestedDrivers.length - (hasInterest ? 1 : 0);
                
                return (
                  <motion.div
                    key={load.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-xl"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{load.title}</h3>

                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{load.origin}</p>
                        <div className="flex items-center gap-2 my-1">
                          <div className="h-px flex-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                          <span className="text-xs text-gray-500 font-semibold">{load.distance} km</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-purple-400 to-blue-400"></div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{load.destination}</p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="text-xs text-gray-600">Weight</p>
                        <p className="text-sm font-bold text-gray-900">{load.weight} kg</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <p className="text-xs text-gray-600">Payment</p>
                        <p className="text-sm font-bold text-green-700">₾{load.payment}</p>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <p className="text-xs text-gray-600">Pickup</p>
                        <p className="text-sm font-bold text-gray-900">
                          {new Date(load.pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Interest Info - Premium Feature */}
                    {otherDriversCount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                      >
                        {user?.isPremium ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-600" />
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">{otherDriversCount}</span> other driver{otherDriversCount !== 1 ? 's' : ''} interested
                              </p>
                            </div>
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Sparkles className="w-4 h-4 text-purple-600" />
                            </motion.div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Lock className="w-4 h-4 text-gray-400" />
                              <p className="text-sm text-gray-500">
                                {otherDriversCount} other{otherDriversCount !== 1 ? 's' : ''} interested
                              </p>
                            </div>
                            <motion.button
                              onClick={upgradeToPremium}
                              className="text-xs text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Crown className="w-3 h-3" />
                              Upgrade to Premium
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* Action Button */}
                    <motion.button
                      onClick={() => handleShowInterest(load.id)}
                      disabled={hasInterest}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-semibold ${
                        hasInterest
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl'
                      }`}
                      whileHover={hasInterest ? {} : { scale: 1.02 }}
                      whileTap={hasInterest ? {} : { scale: 0.98 }}
                    >
                      {hasInterest ? (
                        <>
                          <Heart className="w-4 h-4 fill-current" />
                          Interest Shown ✓
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4" />
                          Show Interest
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
