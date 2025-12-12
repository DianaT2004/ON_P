import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import LoadDetailsModal from '../components/LoadDetailsModal';
import { useLoadsStore } from '../stores/loadsStore';
import { useAuthStore } from '../stores/authStore';
import { Sparkles, Filter, ChevronDown, MapPin, Star, Package, X } from 'lucide-react';

export default function LoadsFeedPage() {
  const { loads, aiScannedLoads, scanAILoads, expressInterest } = useLoadsStore();
  const { user } = useAuthStore();
  const [isScanning, setIsScanning] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('AI Score');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterLabels, setFilterLabels] = useState({
    price: false,
    distance: false,
    reviews: false,
    rating: false,
  });

  const handleAIScan = async () => {
    setIsScanning(true);
    await scanAILoads();
    setIsScanning(false);
  };

  const calculateAIMatch = (load: typeof loads[0]) => {
    const baseScore = 75 + Math.random() * 20;
    return Math.min(100, baseScore);
  };

  const displayedLoads = loads.filter(load => 
    aiScannedLoads.length === 0 || aiScannedLoads.includes(load.id)
  );

  // Apply sorting based on selected filter
  const sortedLoads = [...displayedLoads].sort((a, b) => {
    if (sortBy === 'AI Score') {
      return calculateAIMatch(b) - calculateAIMatch(a);
    } else if (sortBy === 'Highest Pay' || filterLabels.price) {
      return b.payment - a.payment;
    } else if (sortBy === 'Closest' || filterLabels.distance) {
      return a.distance - b.distance;
    } else if (filterLabels.reviews || filterLabels.rating) {
      // Fake review/rating comparison
      return Math.random() - 0.5;
    }
    return 0;
  });

  const getMatchBadge = (score: number) => {
    if (score >= 90) {
      return { text: 'Excellent Match', color: 'bg-green-100 text-green-700' };
    } else if (score >= 80) {
      return { text: 'Good Match', color: 'bg-blue-100 text-blue-700' };
    }
    return { text: 'Fair Match', color: 'bg-yellow-100 text-yellow-700' };
  };

  const handleViewDetails = (load: typeof loads[0]) => {
    setSelectedLoad(load);
    setIsModalOpen(true);
  };

  const handleShowInterest = () => {
    if (selectedLoad && user) {
      expressInterest(selectedLoad.id, user.id);
      setTimeout(() => setIsModalOpen(false), 500);
    }
  };

  const toggleFilter = (label: keyof typeof filterLabels) => {
    setFilterLabels(prev => ({ ...prev, [label]: !prev[label] }));
    // Update sort when filter is clicked
    if (label === 'price') setSortBy('Highest Pay');
    if (label === 'distance') setSortBy('Closest');
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Loads</h1>
          <p className="text-gray-600">
            {displayedLoads.length} loads optimized by AI
          </p>
        </div>

        {/* Filters and AI Scan */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-red-500 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-4 h-4" />
              Filters
            </motion.button>
            
            {/* Filter Labels */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 flex-wrap"
              >
                {Object.entries(filterLabels).map(([key, active]) => (
                  <motion.button
                    key={key}
                    onClick={() => toggleFilter(key as keyof typeof filterLabels)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      active
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </motion.button>
                ))}
              </motion.div>
            )}
            
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:border-red-500 transition-colors"
              >
                {sortBy}
                <ChevronDown className="w-4 h-4" />
              </button>
              {filterOpen && (
                <div className="absolute top-full mt-2 w-48 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-10">
                  {['AI Score', 'Highest Pay', 'Closest', 'Earliest Pickup'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                        sortBy === option ? 'text-red-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <motion.button
            onClick={handleAIScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            whileHover={{ scale: isScanning ? 1 : 1.05 }}
            whileTap={{ scale: isScanning ? 1 : 0.95 }}
          >
            {isScanning ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                Scanning...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                AI Scan
              </>
            )}
          </motion.button>
        </div>

        {/* AI Scanning Animation */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-purple-600" />
              </motion.div>
              <p className="text-lg font-semibold text-purple-900">AI Analyzing Available Loads...</p>
            </div>
            <div className="space-y-2">
              {['Scanning driver profiles...', 'Calculating match scores...', 'Optimizing routes...', 'Filtering best opportunities...'].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.5 }}
                  className="flex items-center gap-2 text-sm text-purple-700"
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

        {/* Empty State */}
        {displayedLoads.length === 0 && !isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No loads available yet</h3>
            <p className="text-gray-600 mb-6">Click AI Scan to find the best loads optimized for you</p>
            <motion.button
              onClick={handleAIScan}
              disabled={isScanning}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              Start AI Scan
            </motion.button>
          </motion.div>
        )}

        {/* Loads Grid */}
        <AnimatePresence>
          {sortedLoads.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedLoads.map((load, index) => {
                const aiScore = calculateAIMatch(load);
                const matchBadge = getMatchBadge(aiScore);
                
                return (
                  <motion.div
                    key={load.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white rounded-xl border-2 border-gray-200 hover:border-red-200 p-6 shadow-sm hover:shadow-lg transition-all"
                  >
                    {/* AI Match Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${matchBadge.color}`}>
                        {aiScore.toFixed(1)}% {matchBadge.text}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-700">{aiScore.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Load Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      {load.title}
                    </h3>

                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-semibold text-gray-900">{load.origin}, Georgia</span>
                        </div>
                        <div className="h-px bg-gray-300 my-2"></div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-gray-900">{load.destination}, Georgia</span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <p className="text-xs text-gray-600">Distance</p>
                        <p className="text-sm font-bold text-gray-900">{load.distance} km</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 rounded">
                        <p className="text-xs text-gray-600">Weight</p>
                        <p className="text-sm font-bold text-gray-900">{(load.weight / 1000).toFixed(1)}t</p>
                      </div>
                      <div className="text-center p-2 bg-orange-50 rounded">
                        <p className="text-xs text-gray-600">Pickup</p>
                        <p className="text-sm font-bold text-gray-900">
                          {new Date(load.pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600">Payment</p>
                        <p className="text-xl font-bold text-red-600">₾ {load.payment}</p>
                      </div>
                      <motion.button
                        onClick={() => handleViewDetails(load)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Load Details Modal */}
      <LoadDetailsModal
        load={selectedLoad}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onShowInterest={handleShowInterest}
      />
    </Layout>
  );
}
