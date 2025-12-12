import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Sparkles, CheckCircle2, Loader2, Download } from 'lucide-react';
import { Load } from '../stores/loadsStore';

interface GenerateDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  loads: Load[];
}

const mockChatHistory = [
  { sender: 'Owner', message: 'Hello, we need this shipment delivered by Friday.', time: '2024-12-10 10:00' },
  { sender: 'You', message: 'Understood. I can make that deadline.', time: '2024-12-10 10:15' },
  { sender: 'Owner', message: 'Great! Temperature must be maintained at 2-4°C.', time: '2024-12-10 10:30' },
  { sender: 'You', message: 'Noted. I have a refrigerated truck ready.', time: '2024-12-10 10:45' },
];

const mockEmailHistory = [
  { from: 'owner@company.com', subject: 'Load Details - Fresh Produce', date: '2024-12-10', body: 'Please find attached the load specifications...' },
  { from: 'owner@company.com', subject: 'Pickup Location Confirmed', date: '2024-12-11', body: 'The pickup location has been confirmed at...' },
];

export default function GenerateDocumentModal({ isOpen, onClose, loads }: GenerateDocumentModalProps) {
  const [step, setStep] = useState<'select' | 'review' | 'generating' | 'complete'>('select');
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [generatedDoc, setGeneratedDoc] = useState<string | null>(null);

  const handleSelectLoad = (load: Load) => {
    setSelectedLoad(load);
    setStep('review');
  };

  const handleGenerate = async () => {
    setStep('generating');
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGeneratedDoc(`BILL OF LADING #${Date.now()}\n\nLoad: ${selectedLoad?.title}\nFrom: ${selectedLoad?.origin}\nTo: ${selectedLoad?.destination}\nWeight: ${selectedLoad?.weight}kg\nPayment: ₾${selectedLoad?.payment}\n\nTerms and Conditions:\n${mockChatHistory.map(c => `${c.sender}: ${c.message}`).join('\n')}\n\n${mockEmailHistory.map(e => `${e.subject}: ${e.body}`).join('\n\n')}`);
    setStep('complete');
  };

  const handleDownload = () => {
    const blob = new Blob([generatedDoc || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BOL-${selectedLoad?.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Generate Document</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {step === 'select' && (
                  <div className="space-y-4">
                    <p className="text-gray-600 mb-4">Select a load to generate document for:</p>
                    {loads.map((load) => (
                      <motion.button
                        key={load.id}
                        onClick={() => handleSelectLoad(load)}
                        className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <p className="font-semibold text-gray-900">{load.title}</p>
                        <p className="text-sm text-gray-600">{load.origin} → {load.destination}</p>
                      </motion.button>
                    ))}
                  </div>
                )}

                {step === 'review' && selectedLoad && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Load Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p><span className="font-semibold">Title:</span> {selectedLoad.title}</p>
                        <p><span className="font-semibold">Route:</span> {selectedLoad.origin} → {selectedLoad.destination}</p>
                        <p><span className="font-semibold">Weight:</span> {selectedLoad.weight}kg</p>
                        <p><span className="font-semibold">Payment:</span> ₾{selectedLoad.payment}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Chat History</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {mockChatHistory.map((chat, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">{chat.sender} - {chat.time}</p>
                            <p className="text-sm text-gray-900">{chat.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Email History</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {mockEmailHistory.map((email, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-xs text-gray-500 mb-1">{email.from} - {email.date}</p>
                            <p className="text-sm font-semibold text-gray-900">{email.subject}</p>
                            <p className="text-sm text-gray-700 mt-1">{email.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      onClick={handleGenerate}
                      className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-5 h-5" />
                      Generate Document with AI
                    </motion.button>
                  </div>
                )}

                {step === 'generating' && (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-4"
                    >
                      <Sparkles className="w-16 h-16 text-purple-600" />
                    </motion.div>
                    <p className="text-xl font-semibold text-gray-900 mb-2">AI is generating your document...</p>
                    <div className="space-y-2 mt-4">
                      {['Analyzing load details...', 'Extracting chat information...', 'Processing email history...', 'Generating final document...'].map((step, i) => (
                        <motion.p
                          key={step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.5 }}
                          className="text-sm text-gray-600"
                        >
                          {step}
                        </motion.p>
                      ))}
                    </div>
                  </div>
                )}

                {step === 'complete' && generatedDoc && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <p className="text-green-700 font-semibold">Document Generated Successfully!</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                      <pre className="text-xs text-gray-700 whitespace-pre-wrap">{generatedDoc}</pre>
                    </div>
                    <motion.button
                      onClick={handleDownload}
                      className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-5 h-5" />
                      Download Document
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

