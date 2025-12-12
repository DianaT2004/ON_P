import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Globe, Loader2, CheckCircle2 } from 'lucide-react';

interface RequestServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  servicePhone: string;
}

const languages = ['English', 'Georgian', 'Russian', 'Turkish', 'Armenian'];

export default function RequestServiceModal({ isOpen, onClose, serviceName, servicePhone }: RequestServiceModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2000);
  };

  const generateMessage = () => {
    const messages: Record<string, string> = {
      'English': `Hello, I need ${serviceName} service. Please contact me at your earliest convenience.`,
      'Georgian': `გამარჯობა, მჭირდება ${serviceName} სერვისი. გთხოვთ დამიკავშირდეთ რაც შეიძლება მალე.`,
      'Russian': `Здравствуйте, мне нужен сервис ${serviceName}. Пожалуйста, свяжитесь со мной как можно скорее.`,
      'Turkish': `Merhaba, ${serviceName} hizmetine ihtiyacım var. Lütfen en kısa sürede benimle iletişime geçin.`,
      'Armenian': `Բարև, ինձ անհրաժեշտ է ${serviceName} ծառայություն: Խնդրում եմ կապ հաստատել հնարավորինս շուտ:`,
    };
    setMessage(messages[selectedLanguage] || messages['English']);
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Request Service</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="inline w-4 h-4 mr-2" />
                    Select Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter your message..."
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none h-24"
                  />
                  <button
                    onClick={generateMessage}
                    className="mt-2 text-sm text-red-600 hover:text-red-700 font-semibold"
                  >
                    Generate Message
                  </button>
                </div>

                {isSent ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-green-700 font-semibold">Message Sent!</p>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={handleSend}
                    disabled={isSending || !message}
                    className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    whileHover={{ scale: isSending ? 1 : 1.02 }}
                    whileTap={{ scale: isSending ? 1 : 0.98 }}
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

