import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-pale-blue/30 overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-strong-blue to-soft-blue p-4">
              <h3 className="text-white font-semibold">Chat with us</h3>
              <p className="text-white/80 text-sm">We typically reply within minutes</p>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div className="bg-pale-blue/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-navy">
                  👋 Hi there! How can we help you today?
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg border border-pale-blue/50 text-sm text-navy hover:bg-pale-blue/20 transition-colors">
                  📋 Get a quote
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg border border-pale-blue/50 text-sm text-navy hover:bg-pale-blue/20 transition-colors">
                  💬 General inquiry
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg border border-pale-blue/50 text-sm text-navy hover:bg-pale-blue/20 transition-colors">
                  🛠️ Technical support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isOpen
            ? 'bg-navy'
            : 'bg-gradient-to-r from-strong-blue to-soft-blue pulse-glow'
        }`}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingChatButton;
