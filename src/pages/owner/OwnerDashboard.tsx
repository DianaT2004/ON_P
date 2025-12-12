import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../stores/authStore';
import { useLoadsStore } from '../../stores/loadsStore';
import { Plus, LogOut, Eye, Package, DollarSign, Users, TrendingUp, MapPin } from 'lucide-react';

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { loads } = useLoadsStore();
  
  const myLoads = loads.filter(load => load.ownerId === user?.id);
  const totalRevenue = myLoads.reduce((sum, load) => sum + load.payment, 0);
  const totalInterest = myLoads.reduce((sum, load) => sum + load.interestedDrivers.length, 0);

  const stats = [
    {
      title: 'Active Loads',
      value: myLoads.length,
      change: '+12%',
      icon: Package,
      color: 'blue',
    },
    {
      title: 'Total Revenue',
      value: `₾${totalRevenue.toLocaleString()}`,
      change: '+23%',
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Interested Drivers',
      value: totalInterest,
      change: `${myLoads.length > 0 ? (totalInterest / myLoads.length).toFixed(1) : 0} avg`,
      icon: Users,
      color: 'purple',
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+5%',
      icon: TrendingUp,
      color: 'orange',
    }
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Load Owner Portal</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/owner/post-load')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
              >
                <Plus className="w-4 h-4" />
                Post New Load
              </button>
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
                className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
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

        {/* Your Loads */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Loads</h2>
          </div>

          {myLoads.length === 0 ? (
            <div className="bg-white p-12 rounded-xl text-center border-2 border-dashed border-gray-200">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No loads yet</h3>
              <p className="text-gray-600 mb-6">Start by posting your first load</p>
              <button
                onClick={() => navigate('/owner/post-load')}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Post Your First Load
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myLoads.map((load, index) => (
                <motion.div
                  key={load.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-lg"
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {load.status}
                    </span>
                    {load.interestedDrivers.length > 0 && (
                      <motion.span 
                        className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Users className="inline w-3 h-3 mr-1" />
                        {load.interestedDrivers.length} interested
                      </motion.span>
                    )}
                  </div>

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

                  <button
                    onClick={() => navigate(`/owner/load/${load.id}`)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all group"
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
