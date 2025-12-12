import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, PhoneOff, Volume2 } from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePhone: string;
}

export default function CallModal({ isOpen, onClose, serviceName, servicePhone }: CallModalProps) {
  const [callDuration, setCallDuration] = useState(0);
  const [isCalling, setIsCalling] = useState(true);

  useEffect(() => {
    if (isOpen && isCalling) {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, isCalling]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8">
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center"
                >
                  <Phone className="w-12 h-12 text-red-600" />
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{serviceName}</h3>
                  <p className="text-gray-600">{servicePhone}</p>
                </div>

                {isCalling && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Call Duration</p>
                    <p className="text-2xl font-bold text-gray-900">{formatTime(callDuration)}</p>
                  </div>
                )}

                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    onClick={onClose}
                    className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <PhoneOff className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    className="p-4 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Volume2 className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

