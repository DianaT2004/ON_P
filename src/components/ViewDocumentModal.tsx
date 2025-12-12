import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText } from 'lucide-react';

interface ViewDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: { title: string; type: string; content: string } | null;
}

const mockDocumentContent = `BILL OF LADING #1001

SHIPPER: Fresh Harvest Ltd.
CONSIGNEE: Batumi Distribution Center

LOAD DETAILS:
- Title: Fresh Produce - Tbilisi to Batumi
- Origin: Tbilisi, Georgia
- Destination: Batumi, Georgia
- Distance: 380 km
- Weight: 2,500 kg
- Payment: ₾850

PICKUP INFORMATION:
- Date: December 20, 2024
- Time: 08:00 AM
- Location: 123 Rustaveli Avenue, Tbilisi

DELIVERY INFORMATION:
- Date: December 20, 2024
- Time: 04:00 PM
- Location: 45 Batumi Port, Batumi

SPECIAL INSTRUCTIONS:
- Temperature controlled: 2-4°C
- Handle with care
- Fragile cargo

TERMS AND CONDITIONS:
1. Carrier is responsible for safe transportation
2. Temperature must be maintained throughout journey
3. Delivery must be completed by specified time
4. Payment due upon delivery confirmation

SIGNATURES:
Shipper: _________________ Date: ___________
Carrier: _________________ Date: ___________
`;

export default function ViewDocumentModal({ isOpen, onClose, document }: ViewDocumentModalProps) {
  return (
    <AnimatePresence>
      {isOpen && document && (
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
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{document.title}</h2>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-gray-50 p-4 rounded-lg">
                  {mockDocumentContent}
                </pre>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

