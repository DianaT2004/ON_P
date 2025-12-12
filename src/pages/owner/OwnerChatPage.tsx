import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import OwnerLayout from './OwnerLayout';
import { Send, Sparkles } from 'lucide-react';

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
    text: 'Welcome to Owner Portal! I can help you manage loads, find drivers, and analyze your business.',
    time: '10:00 AM',
    isOwn: false,
  },
];

const botResponses: Record<string, string> = {
  'hello': 'Hello! How can I assist you with your loads today?',
  'hi': 'Hi! What do you need help with?',
  'drivers': 'You can view all interested drivers on the Drivers page. Pro users can see unlimited drivers!',
  'analytics': 'Check the Analytics page for financial insights. Premium users get advanced analytics!',
  'load': 'You can upload new loads from the Dashboard. Click "Upload Load" to get started.',
  'help': 'I can help with: uploading loads, finding drivers, financial analysis, and more. What do you need?',
  'default': "I'm here to help! Try asking about drivers, analytics, loads, or use the AI features for recommendations.",
};

export default function OwnerChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  return (
    <OwnerLayout>
      <div className="p-6 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat</h1>
          <p className="text-gray-600">Chat with AI assistant and drivers</p>
        </div>

        <div className="flex-1 bg-white rounded-xl border-2 border-gray-200 flex flex-col overflow-hidden">
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
    </OwnerLayout>
  );
}

