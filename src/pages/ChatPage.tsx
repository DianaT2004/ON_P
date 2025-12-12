import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { useAuthStore } from '../stores/authStore';
import { Send, Sparkles, Lock, Loader2, FileText } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderInitial: string;
  text: string;
  time: string;
  isOwn: boolean;
}

const initialMessages: Message[] = [
  {
    id: 'msg-1',
    sender: 'Fleet Assistant',
    senderInitial: 'FA',
    text: 'Welcome! I am here to help you find and manage loads efficiently.',
    time: '12:00 PM',
    isOwn: false,
  },
  {
    id: 'msg-2',
    sender: 'Customer Dispatch',
    senderInitial: 'CD',
    text: 'Good morning! We have 6 new loads matching your preferences...',
    time: '12:15 PM',
    isOwn: false,
  },
  {
    id: 'msg-3',
    sender: 'You',
    senderInitial: 'Y',
    text: 'Thanks! Looking at the LA to Vegas load now.',
    time: '12:20 PM',
    isOwn: true,
  },
  {
    id: 'msg-4',
    sender: 'Fleet Logistics',
    senderInitial: 'FL',
    text: 'Great! The produce is ready for pickup at 8 AM tomorrow. Temperature must be maintained at 34-38°F.',
    time: '12:25 PM',
    isOwn: false,
  },
  {
    id: 'msg-5',
    sender: 'Fleet Assistant',
    senderInitial: 'FA',
    text: 'Reminder: Your next load pickup is scheduled for tomorrow at 8:00 AM in Los Angeles.',
    time: '10:00 PM',
    isOwn: false,
  },
];

const botResponses: Record<string, string> = {
  'hello': 'Hello! How can I help you today?',
  'hi': 'Hi there! What do you need assistance with?',
  'loads': 'I can help you find loads. Try using the AI Scan feature on the Loads Feed page!',
  'help': 'I can help you with: finding loads, managing documents, route planning, and more. What do you need?',
  'thanks': "You're welcome! Is there anything else I can help with?",
  'thank you': "You're welcome! Is there anything else I can help with?",
  'payment': 'Payment information is available in your load details. Check the Documents page for invoices.',
  'route': 'You can view routes and get navigation on the Maps page. Premium users get optimized routes!',
  'default': "I'm here to help! Try asking about loads, routes, payments, or documents. You can also use the Scan Chat feature (Pro) to extract important information from our conversation.",
};

export default function ChatPage() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isPro = user?.subscription === 'pro' || user?.subscription === 'premium';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      senderInitial: 'Y',
      text: message,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Bot response
    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      let response = botResponses.default;
      
      for (const [key, value] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      const botMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'Fleet Assistant',
        senderInitial: 'FA',
        text: response,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isOwn: false,
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleScanChat = async () => {
    if (!isPro) {
      alert('Scan Chat is a Pro feature. Upgrade to unlock!');
      return;
    }

    setIsScanning(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const importantInfo = {
      loadMentions: messages.filter(m => m.text.toLowerCase().includes('load')).length,
      paymentMentions: messages.filter(m => m.text.toLowerCase().includes('payment') || m.text.toLowerCase().includes('₾')).length,
      timeMentions: messages.filter(m => /\d{1,2}:\d{2}/.test(m.text) || m.text.toLowerCase().includes('am') || m.text.toLowerCase().includes('pm')).length,
      locations: ['Tbilisi', 'Batumi', 'Kutaisi'].filter(loc => 
        messages.some(m => m.text.includes(loc))
      ),
    };

    setScanResult(`📊 CHAT ANALYSIS REPORT

🔍 Important Information Extracted:

📦 Load Mentions: ${importantInfo.loadMentions}
💰 Payment References: ${importantInfo.paymentMentions}
⏰ Time References: ${importantInfo.timeMentions}
📍 Locations Mentioned: ${importantInfo.locations.join(', ') || 'None'}

💡 Key Insights:
${importantInfo.loadMentions > 0 ? '- Multiple loads discussed in conversation\n' : ''}${importantInfo.paymentMentions > 0 ? '- Payment details mentioned\n' : ''}${importantInfo.timeMentions > 0 ? '- Time-sensitive information found\n' : ''}${importantInfo.locations.length > 0 ? '- Locations: ' + importantInfo.locations.join(', ') + '\n' : ''}

✅ Report generated at ${new Date().toLocaleString()}`);
    
    setIsScanning(false);
  };

  return (
    <Layout>
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Chat with dispatch and shippers</p>
          </div>
          <motion.button
            onClick={handleScanChat}
            disabled={isScanning}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              isPro
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            whileHover={{ scale: isScanning ? 1 : 1.05 }}
            whileTap={{ scale: isScanning ? 1 : 0.95 }}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                {!isPro && <Lock className="w-4 h-4" />}
                <Sparkles className="w-4 h-4" />
                Scan Chat
              </>
            )}
          </motion.button>
        </div>

        {/* Scan Result */}
        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-900">Chat Analysis Report</h3>
              </div>
              <button
                onClick={() => setScanResult(null)}
                className="text-purple-600 hover:text-purple-700"
              >
                ×
              </button>
            </div>
            <pre className="text-sm text-purple-800 whitespace-pre-wrap">{scanResult}</pre>
          </motion.div>
        )}

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-xl border-2 border-gray-200 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isOwn && (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-gray-700">{msg.senderInitial}</span>
                  </div>
                )}
                <div className={`max-w-md ${msg.isOwn ? 'order-2' : ''}`}>
                  {!msg.isOwn && (
                    <p className="text-xs text-gray-600 mb-1">{msg.sender}</p>
                  )}
                  <div
                    className={`rounded-lg p-3 ${
                      msg.isOwn
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </p>
                </div>
                {msg.isOwn && (
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-white">{msg.senderInitial}</span>
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
              />
              <motion.button
                type="submit"
                className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
