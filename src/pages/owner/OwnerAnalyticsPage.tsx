import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { useAuthStore } from '../../stores/authStore';
import { useLoadsStore } from '../../stores/loadsStore';
import { BarChart3, DollarSign, TrendingUp, TrendingDown, Lock, Crown } from 'lucide-react';

export default function OwnerAnalyticsPage() {
  const { user } = useAuthStore();
  const { loads } = useLoadsStore();
  const isPro = user?.subscription === 'pro' || user?.subscription === 'premium';
  
  const myLoads = loads.filter(load => load.ownerId === user?.id);
  const totalRevenue = myLoads.reduce((sum, load) => sum + load.payment, 0);
  const avgRevenue = myLoads.length > 0 ? totalRevenue / myLoads.length : 0;

  const basicAnalytics = {
    monthlyRevenue: totalRevenue * 1.2,
    monthlyGrowth: 18.5,
    avgLoadValue: avgRevenue,
    totalLoads: myLoads.length,
  };

  const advancedAnalytics = {
    profitMargin: 32.4,
    costSavings: 12500,
    topPerformingRoute: 'Tbilisi → Batumi',
    driverRetention: 87.3,
    loadCompletionRate: 94.2,
    averageResponseTime: '2.3 hours',
    revenueForecast: 145000,
    marketShare: 12.5,
  };

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>

        {/* Basic Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-6 rounded-xl border-2 border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-900">₾{basicAnalytics.monthlyRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-2">+{basicAnalytics.monthlyGrowth}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl border-2 border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Average Load Value</p>
            <p className="text-2xl font-bold text-gray-900">₾{Math.round(basicAnalytics.avgLoadValue)}</p>
            <p className="text-xs text-blue-600 mt-2">Per load</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border-2 border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Loads</p>
            <p className="text-2xl font-bold text-gray-900">{basicAnalytics.totalLoads}</p>
            <p className="text-xs text-purple-600 mt-2">Active</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl border-2 border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-orange-600" />
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
            <p className="text-2xl font-bold text-gray-900">+{basicAnalytics.monthlyGrowth}%</p>
            <p className="text-xs text-orange-600 mt-2">This month</p>
          </motion.div>
        </div>

        {/* Advanced Analytics (Pro/Premium) */}
        {isPro ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Crown className="w-6 h-6 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
                <p className="text-2xl font-bold text-green-700">{advancedAnalytics.profitMargin}%</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Cost Savings (AI)</p>
                <p className="text-2xl font-bold text-blue-700">₾{advancedAnalytics.costSavings.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Top Route</p>
                <p className="text-lg font-bold text-purple-700">{advancedAnalytics.topPerformingRoute}</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Driver Retention</p>
                <p className="text-2xl font-bold text-orange-700">{advancedAnalytics.driverRetention}%</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-yellow-700">{advancedAnalytics.loadCompletionRate}%</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
                <p className="text-xl font-bold text-pink-700">{advancedAnalytics.averageResponseTime}</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Revenue Forecast</p>
                <p className="text-xl font-bold text-indigo-700">₾{advancedAnalytics.revenueForecast.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Market Share</p>
                <p className="text-2xl font-bold text-teal-700">{advancedAnalytics.marketShare}%</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border-2 border-gray-200 p-12 text-center"
          >
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-gray-600 mb-6">
              Unlock detailed financial insights, profit margins, cost savings, and revenue forecasts
            </p>
            <motion.button
              onClick={() => window.location.href = '/subscription'}
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-colors inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-5 h-5" />
              Upgrade to Pro
            </motion.button>
          </motion.div>
        )}
      </div>
    </OwnerLayout>
  );
}

