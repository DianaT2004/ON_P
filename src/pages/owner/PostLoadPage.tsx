import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { useAuthStore } from '../../stores/authStore';
import { useLoadsStore } from '../../stores/loadsStore';
import { ArrowLeft, Package } from 'lucide-react';

export default function PostLoadPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addLoad } = useLoadsStore();
  
  const [formData, setFormData] = useState({
    title: '',
    origin: '',
    destination: '',
    distance: 0,
    weight: 0,
    payment: 0,
    pickupDate: '',
    cargoType: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLoad = {
      id: `load-${Date.now()}`,
      ...formData,
      deliveryDate: formData.pickupDate,
      status: 'active' as const,
      ownerId: user!.id,
      ownerName: user!.name,
      interestedDrivers: [],
      createdAt: new Date().toISOString(),
    };
    
    addLoad(newLoad);
    navigate('/owner/dashboard');
  };

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate('/owner/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-lg bg-red-50">
              <Package className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Post New Load</h1>
              <p className="text-gray-600">Fill in the details below to post your load</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Load Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Load Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                placeholder="e.g., Fresh Produce - Tbilisi to Batumi"
              />
            </div>

            {/* Origin and Destination */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origin City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.origin}
                  onChange={(e) => setFormData({...formData, origin: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Tbilisi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.destination}
                  onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="Batumi"
                />
              </div>
            </div>

            {/* Distance, Weight, Payment */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (km) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.distance || ''}
                  onChange={(e) => setFormData({...formData, distance: Number(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="380"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="2500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment (₾) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.payment || ''}
                  onChange={(e) => setFormData({...formData, payment: Number(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="850"
                />
              </div>
            </div>

            {/* Pickup Date and Cargo Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.cargoType}
                  onChange={(e) => setFormData({...formData, cargoType: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="e.g., Fresh Produce"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/owner/dashboard')}
                className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Post Load
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl p-6"
        >
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ Your load will be visible to all drivers</li>
            <li>✓ Drivers can show interest in your load</li>
            <li>✓ You'll see all interested drivers and can choose the best one</li>
            <li>✓ Assign a driver and manage the delivery</li>
          </ul>
        </motion.div>
        </div>
      </div>
    </OwnerLayout>
  );
}
