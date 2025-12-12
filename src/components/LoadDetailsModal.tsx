import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Package, DollarSign, Heart, Lock, Users, Star } from 'lucide-react';
import { Load } from '../stores/loadsStore';
import { useAuthStore } from '../stores/authStore';
import { useLoadsStore } from '../stores/loadsStore';

interface LoadDetailsModalProps {
  load: Load | null;
  isOpen: boolean;
  onClose: () => void;
  onShowInterest: () => void;
}

export default function LoadDetailsModal({ load, isOpen, onClose, onShowInterest }: LoadDetailsModalProps) {
  const { user } = useAuthStore();
  const { loads } = useLoadsStore();
  
  if (!load) return null;
  
  const hasInterest = user ? load.interestedDrivers.includes(user.id) : false;
  const otherInterested = load.interestedDrivers.length - (hasInterest ? 1 : 0);
  const isPremium = user?.subscription === 'pro' || user?.subscription === 'premium';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{load.title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Route */}
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{load.origin}, Georgia</p>
                    <div className="h-px bg-gray-300 my-2"></div>
                    <p className="font-semibold text-gray-900">{load.destination}, Georgia</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Distance</p>
                    <p className="text-xl font-bold text-gray-900">{load.distance} km</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <p className="text-sm text-gray-600">Weight</p>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{(load.weight / 1000).toFixed(1)}t</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <p className="text-sm text-gray-600">Payment</p>
                    </div>
                    <p className="text-xl font-bold text-green-700">₾{load.payment}</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <p className="text-sm text-gray-600">Pickup</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {new Date(load.pickupDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <p className="text-sm text-gray-600">Delivery</p>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {new Date(load.deliveryDate).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Cargo Type */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Cargo Type</p>
                  <p className="text-lg font-semibold text-gray-900">{load.cargoType}</p>
                </div>

                {/* Owner Info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Load Owner</p>
                  <p className="text-lg font-semibold text-gray-900">{load.ownerName}</p>
                </div>

                {/* Other Interested Drivers */}
                {otherInterested > 0 && (
                  <div className="p-4 border-2 border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isPremium ? (
                          <>
                            <Users className="w-5 h-5 text-purple-600" />
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">{otherInterested}</span> other driver{otherInterested !== 1 ? 's' : ''} interested
                            </p>
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5 text-gray-400" />
                            <p className="text-sm text-gray-500">
                              {otherInterested} other{otherInterested !== 1 ? 's' : ''} interested
                            </p>
                          </>
                        )}
                      </div>
                      {!isPremium && (
                        <button
                          onClick={() => window.location.href = '/subscription'}
                          className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
                        >
                          Upgrade to Pro
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <motion.button
                  onClick={onShowInterest}
                  disabled={hasInterest}
                  className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                    hasInterest
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg'
                  }`}
                  whileHover={hasInterest ? {} : { scale: 1.02 }}
                  whileTap={hasInterest ? {} : { scale: 0.98 }}
                >
                  {hasInterest ? (
                    <div className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5 fill-current" />
                      Interest Already Shown ✓
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      Show Interest
                    </div>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

