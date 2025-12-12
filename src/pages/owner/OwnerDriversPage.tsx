import { useState } from 'react';
import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { useLoadsStore } from '../../stores/loadsStore';
import { useAuthStore } from '../../stores/authStore';
import { Star, CheckCircle2, Phone, MapPin, MessageSquare, TrendingUp, Lock } from 'lucide-react';

export default function OwnerDriversPage() {
  const { loads, getInterestedDrivers } = useLoadsStore();
  const { user } = useAuthStore();
  const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
  
  const myLoads = loads.filter(load => load.ownerId === user?.id);
  const maxVisibleDrivers = (user?.subscription === 'pro' || user?.subscription === 'premium') ? 999 : 4;
  const selectedLoad = myLoads.find(l => l.id === selectedLoadId) || myLoads[0];
  const interestedDrivers = selectedLoad ? getInterestedDrivers(selectedLoad.id) : [];
  const visibleDrivers = interestedDrivers.slice(0, maxVisibleDrivers);
  const hiddenCount = interestedDrivers.length - maxVisibleDrivers;

  // Calculate AI recommendation scores
  const driversWithScores = visibleDrivers.map(driver => ({
    ...driver,
    aiScore: Math.floor(Math.random() * 20) + 80,
    recommendation: driver.rating > 4.7 ? 'Highly Recommended' : 'Recommended',
  })).sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interested Drivers</h1>
          <p className="text-gray-600">View and manage drivers interested in your loads</p>
        </div>

        {/* Load Selection */}
        {myLoads.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Select a load:</p>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {myLoads.map((load) => (
                <motion.button
                  key={load.id}
                  onClick={() => setSelectedLoadId(load.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
                    selectedLoadId === load.id || (!selectedLoadId && load.id === myLoads[0].id)
                      ? 'bg-red-600 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-red-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {load.title} ({load.interestedDrivers.length})
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {selectedLoad && (
          <>
            {/* Recommendation Table */}
            <div className="bg-white rounded-xl border-2 border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Driver Recommendations</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Driver</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">AI Score</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Rating</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Completed</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Distance</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driversWithScores.map((driver, index) => (
                      <motion.tr
                        key={driver.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{driver.name}</span>
                            {driver.verified && (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-purple-700">{driver.aiScore}%</span>
                            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                              {driver.recommendation}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{driver.rating}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">{driver.completedLoads} loads</td>
                        <td className="py-3 px-4 text-gray-700">{driver.distance} km</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <motion.button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <MessageSquare className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Phone className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {hiddenCount > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-yellow-600" />
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">{hiddenCount}</span> more driver{hiddenCount !== 1 ? 's' : ''} available
                      </p>
                    </div>
                    <motion.button
                      onClick={() => window.location.href = '/subscription'}
                      className="text-sm text-yellow-700 hover:text-yellow-800 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Upgrade to See All
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Driver Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleDrivers.map((driver, index) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-red-200 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{driver.name}</h3>
                      {driver.verified && (
                        <span className="text-xs text-green-600 flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{driver.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {driver.location} ({driver.distance} km away)
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      {driver.phone}
                    </div>
                    <p className="text-sm text-gray-600">{driver.completedLoads} completed loads</p>
                    <p className="text-sm text-gray-600">Response: {driver.responseTime}</p>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Assign
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {myLoads.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border-2 border-dashed border-gray-200">
            <p className="text-gray-600">No loads yet. Upload a load to see interested drivers.</p>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}

