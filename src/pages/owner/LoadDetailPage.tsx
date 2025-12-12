import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoadsStore } from '../../stores/loadsStore';
import { ArrowLeft, Star, Phone, MapPin, CheckCircle2, Truck, Award, Brain, TrendingUp } from 'lucide-react';

export default function LoadDetailPage() {
  const { loadId } = useParams();
  const navigate = useNavigate();
  const { loads, getInterestedDrivers } = useLoadsStore();
  
  const load = loads.find(l => l.id === loadId);
  const interestedDrivers = getInterestedDrivers(loadId!);

  // Add AI match scores (fake data for demo)
  const driversWithAI = interestedDrivers.map(driver => ({
    ...driver,
    aiMatchScore: Math.floor(Math.random() * 20) + 80, // 80-100
    aiRecommendation: driver.rating > 4.7 ? 'Highly Recommended' : 'Recommended',
  })).sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));

  if (!load) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Load not found</h2>
          <motion.button
            onClick={() => navigate('/owner/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Dashboard
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-red-50 to-red-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.button 
          onClick={() => navigate('/owner/dashboard')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{load.title}</h1>

          {/* Load Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-xl p-6 mb-6 shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Load Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">From</p>
                <p className="font-semibold text-lg">{load.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">To</p>
                <p className="font-semibold text-lg">{load.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Distance</p>
                <p className="font-semibold">{load.distance} km</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-semibold">{load.weight} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment</p>
                <p className="font-semibold text-green-600 text-xl">₾{load.payment}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cargo Type</p>
                <p className="font-semibold">{load.cargoType}</p>
              </div>
            </div>
          </motion.div>

          {/* Interested Drivers Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Interested Drivers ({interestedDrivers.length})
              </h2>
              {driversWithAI.length > 0 && (
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-100 rounded-full">
                  <Brain className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">AI Sorted by Match Score</span>
                </div>
              )}
            </div>
            <p className="text-gray-600">
              These drivers have shown interest in this load. AI has analyzed and ranked them by best match.
            </p>
          </div>

          {interestedDrivers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/90 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-xl p-12 text-center"
            >
              <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No drivers interested yet</h3>
              <p className="text-gray-600">Drivers will appear here when they show interest in your load</p>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              {driversWithAI.map((driver, index) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/90 backdrop-blur-sm border-2 border-gray-100 rounded-xl p-6 hover:border-red-200 hover:shadow-xl transition-all relative overflow-hidden"
                >
                  {/* AI Match Score Badge */}
                  {driver.aiMatchScore && driver.aiMatchScore >= 90 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                    >
                      <Award className="w-3 h-3" />
                      Top Match
                    </motion.div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{driver.name}</h3>
                        {driver.verified && (
                          <span className="text-green-600 text-sm flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Verified
                          </span>
                        )}
                      </div>
                      
                      {/* AI Match Score */}
                      {driver.aiMatchScore && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                          className="mb-3"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Brain className="w-4 h-4 text-purple-600" />
                            <span className="text-sm font-semibold text-purple-700">AI Match Score: {driver.aiMatchScore}%</span>
                            {driver.aiRecommendation && (
                              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                                {driver.aiRecommendation}
                              </span>
                            )}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${driver.aiMatchScore}%` }}
                              transition={{ delay: index * 0.1 + 0.6, duration: 0.8 }}
                              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                            />
                          </div>
                        </motion.div>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-semibold">{driver.rating}</span>
                        </div>
                        <span className="text-gray-600 text-sm">
                          {driver.completedLoads} completed loads
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {driver.location} ({driver.distance} km away)
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {driver.phone}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                          {driver.truckType}
                        </span>
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
                          Response: {driver.responseTime}
                        </span>
                      </div>
                    </div>
                    
                    <motion.button
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Assign Driver
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
