import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { useLoadsStore } from '../../stores/loadsStore';
import { 
  Plus, LogOut, Eye, Package, DollarSign, Users, TrendingUp, MapPin, 
  Sparkles, Brain, BarChart3, Star, Award, Zap, Lock, CheckCircle2,
  Truck, Phone, Calendar, TrendingDown, Activity, Target
} from 'lucide-react';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { loads } = useLoadsStore();
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedLoadId, setSelectedLoadId] = useState<string | null>(null);
  
  const myLoads = loads.filter(load => load.ownerId === user?.id);
  const totalRevenue = myLoads.reduce((sum, load) => sum + load.payment, 0);
  const totalInterest = myLoads.reduce((sum, load) => sum + load.interestedDrivers.length, 0);
  const avgRevenue = myLoads.length > 0 ? totalRevenue / myLoads.length : 0;

  // AI Scan Animation
  const handleAIScan = (loadId: string) => {
    setIsScanning(true);
    setSelectedLoadId(loadId);
    setScanComplete(false);
    
    // Simulate AI scanning process
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setTimeout(() => setScanComplete(false), 3000);
    }, 3000);
  };

  const stats = [
    {
      title: 'Active Loads',
      value: myLoads.length,
      change: '+12%',
      icon: Package,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Revenue',
      value: `₾${totalRevenue.toLocaleString()}`,
      change: '+23%',
      icon: DollarSign,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
    },
    {
      title: 'Interested Drivers',
      value: totalInterest,
      change: `${myLoads.length > 0 ? (totalInterest / myLoads.length).toFixed(1) : 0} avg`,
      icon: Users,
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+5%',
      icon: TrendingUp,
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
    }
  ];

  // Financial Analysis Data (fake)
  const financialData = {
    monthlyRevenue: 125000,
    monthlyGrowth: 18.5,
    avgLoadValue: avgRevenue,
    profitMargin: 32.4,
    topPerformingRoute: 'Tbilisi → Batumi',
    costSavings: 12500,
  };

  // Driver Reviews Data (fake)
  const driverReviews = [
    {
      id: 'rev-1',
      driverName: 'Dachi Ghambashidze',
      rating: 4.9,
      review: 'Excellent service, always on time and professional.',
      date: '2024-12-10',
      loadTitle: 'Fresh Produce - Tbilisi to Batumi',
    },
    {
      id: 'rev-2',
      driverName: 'Nino Kharaishvili',
      rating: 5.0,
      review: 'Best driver we\'ve worked with. Highly recommended!',
      date: '2024-12-08',
      loadTitle: 'Electronics - Batumi to Tbilisi',
    },
    {
      id: 'rev-3',
      driverName: 'Giorgi Beridze',
      rating: 4.7,
      review: 'Reliable and efficient. Will use again.',
      date: '2024-12-05',
      loadTitle: 'Construction Materials - Tbilisi to Kutaisi',
    },
  ];

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
                Load Owner Portal
              </h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            
            <div className="flex items-center gap-3">
              {user?.isPremium && (
                <span className="premium-badge">
                  <Award className="w-3 h-3" />
                  Premium
                </span>
              )}
              <motion.button
                onClick={() => navigate('/owner/post-load')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                Post New Load
              </motion.button>
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
        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Financial Analytics & Driver Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Analytics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-gray-100 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-green-600">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Financial Analytics</h2>
              </div>
              <Sparkles className="w-5 h-5 text-green-600" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-green-700">₾{financialData.monthlyRevenue.toLocaleString()}</p>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Growth Rate</p>
                  <p className="text-xl font-bold text-blue-700">+{financialData.monthlyGrowth}%</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Profit Margin</p>
                  <p className="text-xl font-bold text-purple-700">{financialData.profitMargin}%</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Top Route</p>
                    <p className="font-bold text-gray-900">{financialData.topPerformingRoute}</p>
                  </div>
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Cost Savings (AI)</p>
                    <p className="text-xl font-bold text-green-700">₾{financialData.costSavings.toLocaleString()}</p>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Activity className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Driver Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-gray-100 p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Driver Reviews</h2>
              </div>
              <Award className="w-5 h-5 text-yellow-600" />
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {driverReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{review.driverName}</p>
                      <p className="text-xs text-gray-600">{review.loadTitle}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm font-bold text-gray-700">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.review}</p>
                  <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Your Loads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Loads</h2>
          </div>

          {myLoads.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm p-12 rounded-xl text-center border-2 border-dashed border-gray-200">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No loads yet</h3>
              <p className="text-gray-600 mb-6">Start by posting your first load</p>
              <motion.button
                onClick={() => navigate('/owner/post-load')}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                Post Your First Load
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myLoads.map((load, index) => (
                <motion.div
                  key={load.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-xl"
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {load.status}
                    </span>
                    {load.interestedDrivers.length > 0 && (
                      <motion.span 
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 flex items-center gap-1"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Users className="w-3 h-3" />
                        {load.interestedDrivers.length} interested
                      </motion.span>
                    )}
                  </div>

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

                  {/* AI Scan Button */}
                  <div className="flex gap-2 mb-3">
                    <motion.button
                      onClick={() => handleAIScan(load.id)}
                      disabled={isScanning && selectedLoadId === load.id}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-semibold text-sm shadow-lg"
                      whileHover={{ scale: isScanning && selectedLoadId === load.id ? 1 : 1.05 }}
                      whileTap={{ scale: isScanning && selectedLoadId === load.id ? 1 : 0.95 }}
                    >
                      {isScanning && selectedLoadId === load.id ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Brain className="w-4 h-4" />
                          </motion.div>
                          Scanning...
                        </>
                      ) : scanComplete && selectedLoadId === load.id ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Scan Complete!
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4" />
                          AI Scan Drivers
                        </>
                      )}
                    </motion.button>
                  </div>

                  {/* AI Scan Animation Overlay */}
                  <AnimatePresence>
                    {isScanning && selectedLoadId === load.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mb-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-purple-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-5 h-5 text-purple-600" />
                          </motion.div>
                          <p className="text-sm font-semibold text-purple-900">AI Analyzing Drivers...</p>
                        </div>
                        <div className="space-y-2">
                          {['Analyzing driver profiles...', 'Calculating match scores...', 'Optimizing route efficiency...'].map((step, i) => (
                            <motion.div
                              key={step}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.8 }}
                              className="flex items-center gap-2 text-xs text-purple-700"
                            >
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                                className="w-2 h-2 bg-purple-600 rounded-full"
                              />
                              {step}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => navigate(`/owner/load/${load.id}`)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all group font-semibold"
                  >
                    <Eye className="w-4 h-4" />
                    View Details & Interested Drivers
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
