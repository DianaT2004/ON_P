import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuthStore } from '../stores/authStore';
import { Crown, Check, Sparkles, Zap, Lock } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic load browsing',
      'Show interest in loads',
      'Basic filters',
      'Standard support',
    ],
    limitations: [
      'Limited to 4 visible interested drivers',
      'No premium route optimization',
      'No advanced analytics',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    period: 'month',
    popular: true,
    features: [
      'All Free features',
      'See all interested drivers',
      'AI-powered route optimization',
      'Advanced filters & sorting',
      'Chat scan for important info',
      'Priority support',
      'Best route recommendations',
      'Fuel station finder',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 20,
    period: 'month',
    features: [
      'All Pro features',
      'Real-time cargo tracking',
      'Advanced financial analytics',
      'Hotel recommendations',
      'Unlimited driver visibility',
      '24/7 premium support',
      'Custom reports',
      'API access',
    ],
  },
];

export default function SubscriptionPage() {
  const { user, updateSubscription } = useAuthStore();

  const handleSubscribe = (planId: string) => {
    updateSubscription(planId as 'free' | 'pro' | 'premium');
    // In real app, this would redirect to payment
    alert(`Subscribed to ${planId}! (Demo mode)`);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-gray-600 text-lg">Unlock powerful features to grow your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const isCurrent = user?.subscription === plan.id;
            const isProOrPremium = plan.id === 'pro' || plan.id === 'premium';
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-xl border-2 p-6 ${
                  plan.popular
                    ? 'border-red-500 shadow-xl scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {isProOrPremium && <Crown className="w-6 h-6 text-yellow-500" />}
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600">/{plan.period}</span>
                    )}
                  </div>
                  {isCurrent && (
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      Current Plan
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations && plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-500 line-through">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                      : plan.id === 'free'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                  whileHover={{ scale: isCurrent ? 1 : 1.02 }}
                  whileTap={{ scale: isCurrent ? 1 : 0.98 }}
                >
                  {isCurrent ? 'Current Plan' : plan.id === 'free' ? 'Free Forever' : `Subscribe for $${plan.price}/mo`}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">All plans include:</p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {['Secure payments', 'Cancel anytime', '30-day money-back guarantee', '24/7 support'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

