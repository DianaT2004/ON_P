import { useState } from 'react';
import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { useAuthStore } from '../../stores/authStore';
import { useLoadsStore } from '../../stores/loadsStore';
import { Plus, Package, Users, DollarSign, TrendingUp, Eye, MessageSquare, FileText, BarChart3, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OwnerDashboardPage() {
  const { user } = useAuthStore();
  const { loads } = useLoadsStore();
  const navigate = useNavigate();
  
  const myLoads = loads.filter(load => load.ownerId === user?.id);
  const totalRevenue = myLoads.reduce((sum, load) => sum + load.payment, 0);
  const totalInterest = myLoads.reduce((sum, load) => sum + load.interestedDrivers.length, 0);
  const maxVisibleDrivers = (user?.subscription === 'pro' || user?.subscription === 'premium') ? 999 : 4;

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
    <OwnerLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Owner Dashboard</h1>
            <p className="text-gray-600">Manage your loads and drivers</p>
          </div>
          <motion.button
            onClick={() => navigate('/owner/post-load')}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            Upload Load
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.button
            onClick={() => navigate('/owner/drivers')}
            className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all text-left"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-semibold text-gray-900">View Drivers</p>
            <p className="text-xs text-gray-600">See interested drivers</p>
          </motion.button>
          <motion.button
            onClick={() => navigate('/owner/analytics')}
            className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all text-left"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-semibold text-gray-900">Analytics</p>
            <p className="text-xs text-gray-600">Financial analysis</p>
          </motion.button>
          <motion.button
            onClick={() => navigate('/owner/chat')}
            className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all text-left"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <MessageSquare className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-semibold text-gray-900">Chat</p>
            <p className="text-xs text-gray-600">Message drivers</p>
          </motion.button>
          <motion.button
            onClick={() => navigate('/owner/documents')}
            className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all text-left"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <FileText className="w-6 h-6 text-orange-600 mb-2" />
            <p className="font-semibold text-gray-900">Documents</p>
            <p className="text-xs text-gray-600">Manage docs</p>
          </motion.button>
        </div>

        {/* Your Loads */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Loads</h2>
          {myLoads.length === 0 ? (
            <div className="bg-white p-12 rounded-xl text-center border-2 border-dashed border-gray-200">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No loads yet</h3>
              <p className="text-gray-600 mb-6">Start by uploading your first load</p>
              <motion.button
                onClick={() => navigate('/owner/post-load')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                Upload Your First Load
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myLoads.map((load, index) => (
                <motion.div
                  key={load.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-red-200 transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {load.status}
                    </span>
                    {load.interestedDrivers.length > 0 && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                        {load.interestedDrivers.length} interested
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{load.title}</h3>
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{load.origin}</p>
                      <div className="h-px bg-gray-300 my-1"></div>
                      <p className="text-sm font-semibold text-gray-900">{load.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-600">Payment</p>
                      <p className="text-xl font-bold text-green-700">₾{load.payment}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => navigate(`/owner/load/${load.id}`)}
                        className="px-4 py-2 border-2 border-gray-200 hover:border-red-500 hover:text-red-700 rounded-lg transition-all flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </OwnerLayout>
  );
}

