import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { useLoadsStore } from '../../stores/loadsStore';
import { 
  Package, 
  MapPin, 
  TrendingUp, 
  LogOut,
  Heart,
  Lock
} from 'lucide-react';

export default function DriverLoadsPage() {
  const { user, logout } = useAuthStore();
  const { loads, expressInterest, myInterestedLoads } = useLoadsStore();

  const availableLoads = loads.filter(load => load.status === 'active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Header */}
      <motion.header 
        className="bg-white border-b-2 border-gray-100 shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Available Loads</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            
            <button
              onClick={logout}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl border-2 border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-50">
                <Package className="w-6 h-6 text-blue-600" />
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
            className="bg-white p-6 rounded-xl border-2 border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-purple-50">
                <Heart className="w-6 h-6 text-purple-600" />
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
            className="bg-white p-6 rounded-xl border-2 border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-green-50">
                <TrendingUp className="w-6 h-6 text-green-600" />
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
            <div className="bg-white p-12 rounded-xl text-center border-2 border-dashed border-gray-200">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No loads available</h3>
              <p className="text-gray-600">Check back soon for new loads</p>
            </div>
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
                    className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-lg"
                  >
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{load.title}</h3>

                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{load.origin}</p>
                        <div className="flex items-center gap-2 my-1">
                          <div className="h-px flex-1 bg-gray-300"></div>
                          <span className="text-xs text-gray-500">{load.distance} km</span>
                          <div className="h-px flex-1 bg-gray-300"></div>
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
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        {user?.isPremium ? (
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">{otherDriversCount}</span> other driver{otherDriversCount !== 1 ? 's' : ''} interested
                          </p>
                        ) : (
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              <Lock className="inline w-3 h-3 mr-1" />
                              {otherDriversCount} other{otherDriversCount !== 1 ? 's' : ''} interested
                            </p>
                            <button className="text-xs text-purple-600 hover:text-purple-700 font-semibold">
                              Upgrade to Premium
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => expressInterest(load.id, user!.id)}
                      disabled={hasInterest}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all font-semibold ${
                        hasInterest
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transform hover:scale-[1.02]'
                      }`}
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
                    </button>
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
