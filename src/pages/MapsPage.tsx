import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { useLoadsStore } from '../stores/loadsStore';
import { useAuthStore } from '../stores/authStore';
import { MapPin, Navigation, Clock, Fuel, Bed, Lock, Crown, Star, DollarSign } from 'lucide-react';

export default function MapsPage() {
  const { loads } = useLoadsStore();
  const { user } = useAuthStore();
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const isPremium = user?.subscription === 'pro' || user?.subscription === 'premium';

  const premiumFeatures = {
    bestRoute: {
      distance: 375,
      time: '6h 15m',
      savings: '5 km shorter',
    },
    fuelStations: [
      { name: 'RapidFuel', distance: 2.5, price: '₾2.85/L', rating: 4.7 },
      { name: 'PetroPlus', distance: 4.2, price: '₾2.90/L', rating: 4.5 },
      { name: 'Energy Fuel', distance: 5.8, price: '₾2.80/L', rating: 4.6 },
    ],
    hotels: [
      { name: 'Rest Inn Gori', distance: 3.2, price: '₾45/night', rating: 4.3 },
      { name: 'Highway Hotel', distance: 4.5, price: '₾52/night', rating: 4.5 },
      { name: 'Trucker Lodge', distance: 2.8, price: '₾38/night', rating: 4.2 },
    ],
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Route Map</h1>
          <p className="text-gray-600">Current route with rest stops and services</p>
        </div>

        {/* Loads Selection */}
        {loads.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Select a load to view route:</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {loads.map((load) => (
                <motion.button
                  key={load.id}
                  onClick={() => setSelectedLoad(load)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    selectedLoad?.id === load.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {load.origin} → {load.destination}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {selectedLoad && (
          <>
            {/* En Route Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-100">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">En Route</p>
                    <p className="text-xl font-bold text-gray-900">{selectedLoad.origin} - {selectedLoad.destination}</p>
                  </div>
                </div>
                <motion.button
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Navigation className="w-5 h-5" />
                  Navigate
                </motion.button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Display */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6 h-[600px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50">
                    <svg className="absolute inset-0 w-full h-full">
                      <motion.path
                        d="M 100 500 Q 300 300 600 100"
                        stroke="url(#gradient)"
                        strokeWidth="4"
                        strokeDasharray="10 5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <motion.div
                      className="absolute bottom-20 left-20"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="relative">
                        <MapPin className="w-8 h-8 text-blue-600" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                          <p className="text-xs font-semibold text-gray-900">{selectedLoad.origin} Pickup</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="relative">
                        <Bed className="w-8 h-8 text-yellow-600" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                          <p className="text-xs font-semibold text-gray-900">Gori Rest</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute top-20 right-20"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    >
                      <div className="relative">
                        <MapPin className="w-8 h-8 text-green-600" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                          <p className="text-xs font-semibold text-gray-900">{selectedLoad.destination} Delivery</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Route Details */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-bold text-gray-900">Route Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Distance</p>
                      <p className="text-2xl font-bold text-red-600">{selectedLoad.distance} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estimated Time</p>
                      <p className="text-xl font-bold text-gray-900">6h 20m</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Fuel Stops</p>
                      <p className="text-lg font-semibold text-green-600">1 stop</p>
                    </div>
                  </div>
                </motion.div>

                {/* Premium Features */}
                {isPremium ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 p-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Crown className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-lg font-bold text-gray-900">Best Route</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Optimized Distance</p>
                        <p className="text-xl font-bold text-gray-900">{premiumFeatures.bestRoute.distance} km</p>
                        <p className="text-xs text-green-600">{premiumFeatures.bestRoute.savings}</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-xl border-2 border-gray-200 p-6"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Cheapest Fuel Stations</h3>
                      <div className="space-y-3">
                        {premiumFeatures.fuelStations.map((station, i) => (
                          <div key={i} className="p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-gray-900">{station.name}</p>
                              <p className="text-sm font-bold text-green-700">{station.price}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {station.distance} km
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-2" />
                              {station.rating}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-xl border-2 border-gray-200 p-6"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Hotels with Good Reviews</h3>
                      <div className="space-y-3">
                        {premiumFeatures.hotels.map((hotel, i) => (
                          <div key={i} className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-gray-900">{hotel.name}</p>
                              <p className="text-sm font-bold text-blue-700">{hotel.price}</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {hotel.distance} km
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 ml-2" />
                              {hotel.rating}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-xl border-2 border-gray-200 p-6"
                  >
                    <div className="text-center">
                      <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Features</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Unlock best routes, cheapest fuel stations, and hotel recommendations
                      </p>
                      <motion.button
                        onClick={() => window.location.href = '/subscription'}
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-colors flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Crown className="w-5 h-5" />
                        Upgrade to Premium
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Upcoming Waypoints */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Waypoints</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Pickup</p>
                        <p className="text-sm text-gray-600">{selectedLoad.origin}, Georgia</p>
                        <p className="text-xs text-gray-500">In 15 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Bed className="w-5 h-5 text-yellow-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Rest Stop</p>
                        <p className="text-sm text-gray-600">Gori, Georgia</p>
                        <p className="text-xs text-gray-500">In 3 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Delivery</p>
                        <p className="text-sm text-gray-600">{selectedLoad.destination}, Georgia</p>
                        <p className="text-xs text-gray-500">In 6 hours 20 min</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}

        {!selectedLoad && loads.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No loads available. Scan for loads first.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
