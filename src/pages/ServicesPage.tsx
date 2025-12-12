import { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import RequestServiceModal from '../components/RequestServiceModal';
import CallModal from '../components/CallModal';
import { Fuel, Wrench, Truck, MapPin, Star, Phone, Send, Clock } from 'lucide-react';

const serviceCategories = [
  { id: 'fuel', label: 'Fuel', icon: Fuel },
  { id: 'mechanic', label: 'Mechanic', icon: Wrench },
  { id: 'towing', label: 'Towing', icon: Truck },
  { id: 'parking', label: 'Parking', icon: MapPin },
  { id: 'permits', label: 'Permits', icon: Wrench },
];

const services = {
  fuel: [
    {
      id: 'fuel-1',
      name: 'RapidFuel Truck Stop',
      rating: 4.7,
      distance: 2.5,
      availability: '24/7',
      address: '45 Kakheti Highway, Tbilisi',
      phone: '+995 555 111 222',
    },
    {
      id: 'fuel-2',
      name: 'PetroPlus Station',
      rating: 4.5,
      distance: 4.2,
      availability: '24/7',
      address: '12 Poti Highway, Tbilisi',
      phone: '+995 555 222 333',
    },
    {
      id: 'fuel-3',
      name: 'Energy Fuel Center',
      rating: 4.6,
      distance: 5.8,
      availability: '6 AM - 10 PM',
      address: '78 Rustavi Street, Tbilisi',
      phone: '+995 555 333 444',
    },
  ],
  mechanic: [
    {
      id: 'mech-1',
      name: 'QuickFix Auto Repair',
      rating: 4.8,
      distance: 3.1,
      availability: '8 AM - 8 PM',
      address: '23 Agmashenebeli Ave, Tbilisi',
      phone: '+995 555 444 555',
    },
  ],
  towing: [
    {
      id: 'tow-1',
      name: 'Emergency Towing Service',
      rating: 4.9,
      distance: 0,
      availability: '24/7',
      address: 'On-call service',
      phone: '+995 555 555 666',
    },
  ],
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('fuel');
  const [selectedService, setSelectedService] = useState<{ name: string; phone: string } | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  const currentServices = services[activeCategory as keyof typeof services] || [];

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Services</h1>
          <p className="text-gray-600">Quick access to nearby services</p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                {category.label}
              </motion.button>
            );
          })}
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-red-200 p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-red-50">
                  <Fuel className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold">{service.rating}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {service.distance > 0 ? `${service.distance} mi away` : service.address}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {service.availability}
                </div>
                {service.distance > 0 && (
                  <p className="text-xs text-gray-500">{service.address}</p>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  onClick={() => {
                    setSelectedService({ name: service.name, phone: service.phone });
                    setShowRequestModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4" />
                  Request Service
                </motion.button>
                <motion.button
                  onClick={() => {
                    setSelectedService({ name: service.name, phone: service.phone });
                    setShowCallModal(true);
                  }}
                  className="px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-lg hover:border-red-500 hover:text-red-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedService && (
        <>
          <RequestServiceModal
            isOpen={showRequestModal}
            onClose={() => {
              setShowRequestModal(false);
              setSelectedService(null);
            }}
            serviceName={selectedService.name}
            servicePhone={selectedService.phone}
          />
          <CallModal
            isOpen={showCallModal}
            onClose={() => {
              setShowCallModal(false);
              setSelectedService(null);
            }}
            serviceName={selectedService.name}
            servicePhone={selectedService.phone}
          />
        </>
      )}
    </Layout>
  );
}

