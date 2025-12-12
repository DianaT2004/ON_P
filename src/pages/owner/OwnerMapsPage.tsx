import { useState } from 'react';
import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { useLoadsStore } from '../../stores/loadsStore';
import { useAuthStore } from '../../stores/authStore';
import { MapPin, Navigation, Clock, Lock, Crown } from 'lucide-react';

export default function OwnerMapsPage() {
  const { loads } = useLoadsStore();
  const { user } = useAuthStore();
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const isPremium = user?.subscription === 'premium';

  const myLoads = loads.filter(load => load.ownerId === user?.id);

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cargo Tracking</h1>
          <p className="text-gray-600">Real-time tracking of your loads</p>
        </div>

        {/* Load Selection */}
        {myLoads.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Select a load to track:</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {myLoads.map((load) => (
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
                  {load.title}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {selectedLoad && (
          <>
            {isPremium ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

                      {/* Moving truck indicator */}
                      <motion.div
                        className="absolute"
                        animate={{
                          left: ['20%', '50%', '80%', '50%', '20%'],
                          top: ['80%', '50%', '20%', '50%', '80%'],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Navigation className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute bottom-20 left-20"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin className="w-8 h-8 text-blue-600" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                          <p className="text-xs font-semibold text-gray-900">{selectedLoad.origin}</p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="absolute top-20 right-20"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <MapPin className="w-8 h-8 text-green-600" />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-lg border border-gray-200">
                          <p className="text-xs font-semibold text-gray-900">{selectedLoad.destination}</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-bold text-gray-900">Real-time Status</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Current Location</p>
                        <p className="text-lg font-bold text-gray-900">Gori, Georgia</p>
                        <p className="text-xs text-gray-500">Updated 2 minutes ago</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Progress</p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '45%' }}
                            className="bg-green-600 h-2 rounded-full"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">45% complete</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">ETA</p>
                        <p className="text-lg font-bold text-gray-900">3h 25m remaining</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center">
                <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Tracking</h3>
                <p className="text-gray-600 mb-6">
                  Upgrade to Premium to track your cargo in real-time with live location updates
                </p>
                <motion.button
                  onClick={() => window.location.href = '/subscription'}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-colors inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Crown className="w-5 h-5" />
                  Upgrade to Premium
                </motion.button>
              </div>
            )}
          </>
        )}

        {myLoads.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No loads available. Upload a load to track it.</p>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}

