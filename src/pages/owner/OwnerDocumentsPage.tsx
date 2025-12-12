import { useState } from 'react';
import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { FileText, Eye, Download, Archive } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  size: string;
  date: string;
  archived: boolean;
}

const documents: Document[] = [
  {
    id: 'doc-1',
    title: 'Bill of Lading #1001',
    type: 'Bill of Lading',
    size: '245 KB',
    date: 'Nov 15, 2025',
    archived: false,
  },
  {
    id: 'doc-2',
    title: 'Driver Agreement #1001',
    type: 'Agreement',
    size: '128 KB',
    date: 'Nov 15, 2025',
    archived: false,
  },
];

export default function OwnerDocumentsPage() {
  const [docs, setDocs] = useState(documents);
  const [activeTab, setActiveTab] = useState<'current' | 'archive'>('current');
  const [downloading, setDownloading] = useState<string | null>(null);

  const currentDocs = docs.filter(doc => !doc.archived);
  const archivedDocs = docs.filter(doc => doc.archived);

  const handleDownload = async (docId: string) => {
    setDownloading(docId);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setDownloading(null);
  };

  const handleArchive = async (docId: string) => {
    setDocs(docs.map(doc => 
      doc.id === docId ? { ...doc, archived: true } : doc
    ));
  };

  const displayDocs = activeTab === 'current' ? currentDocs : archivedDocs;

  return (
    <OwnerLayout>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">Manage your load documentation</p>
        </div>

        <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'current'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Current ({currentDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('archive')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'archive'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Archive ({archivedDocs.length})
          </button>
        </div>

        <div className="space-y-4">
          {displayDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-red-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-600">
                      {doc.type} • {doc.size} • {doc.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDownload(doc.id)}
                    disabled={downloading === doc.id}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {downloading === doc.id ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Download className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                  </motion.button>
                  {activeTab === 'current' && (
                    <motion.button
                      onClick={() => handleArchive(doc.id)}
                      className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Archive className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {displayDocs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No {activeTab === 'current' ? 'current' : 'archived'} documents</p>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}

