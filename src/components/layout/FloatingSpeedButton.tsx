import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  X, 
  Phone, 
  Mail, 
  FileText, 
  Calculator, 
  CreditCard, 
  LifeBuoy,   
  Headphones 
} from 'lucide-react';
import data from '@/data.json'; 

const FloatingSpeedButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  const handleEstimatorClick = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById('estimator');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('estimator');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const ACTIONS = [
    { 
      id: 'estimator', 
      label: 'Cost Estimator', 
      icon: Calculator, 
      gradient: 'from-purple-600 to-indigo-600', 
      action: handleEstimatorClick 
    },
    { 
      id: 'pricing', 
      label: 'Pricing Plans', 
      icon: CreditCard, 
      gradient: 'from-emerald-500 to-teal-600', 
      action: () => { setIsOpen(false); navigate('/pricing'); } 
    },
    { 
      id: 'support', 
      label: 'Get Support', 
      icon: LifeBuoy, 
      gradient: 'from-red-500 to-pink-600', 
      action: () => { setIsOpen(false); navigate('/contact'); } 
    },
    { 
      id: 'quote', 
      label: 'Request Quote', 
      icon: FileText, 
      gradient: 'from-blue-600 to-cyan-500', 
      action: () => { setIsOpen(false); navigate('/contact'); } 
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      icon: MessageCircle, 
      gradient: 'from-green-500 to-emerald-600', 
      action: () => window.open(`https://wa.me/${cleanPhone(data.site.phone)}`, '_blank') 
    },
    { 
      id: 'phone', 
      label: 'Call Us', 
      icon: Phone, 
      gradient: 'from-sky-500 to-blue-600', 
      action: () => window.open(`tel:${data.site.phone}`, '_self') 
    },
    { 
      id: 'email', 
      label: 'Email Us', 
      icon: Mail, 
      gradient: 'from-orange-500 to-amber-500', 
      action: () => window.open(`mailto:${data.site.email}`, '_self') 
    }
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-4 font-sans">
      
      {/* --- POPUP MENU ITEMS --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-start gap-3 mb-2 ml-1">
            {ACTIONS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, scale: 0.5 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.5, transition: { duration: 0.1 } }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.05 + (index * 0.03) 
                }}
                className="flex items-center gap-3 cursor-pointer group"
                onClick={item.action}
              >
                {/* Icon Button */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${item.gradient} ring-2 ring-white/10 group-hover:scale-110 group-hover:ring-white/30 transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                  <item.icon size={18} className="relative z-10" />
                </div>

                {/* Glassmorphic Label */}
                <div className="px-3 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/10 text-slate-200 text-xs font-bold shadow-xl group-hover:bg-slate-800/80 group-hover:text-white group-hover:border-white/20 transition-all origin-left whitespace-nowrap">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* --- MAIN TOGGLE BUTTON --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] bg-[#020617] border border-white/10 relative z-50 group"
      >
        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-full transition-opacity duration-500 ${isOpen ? 'bg-red-500/20 opacity-100' : 'bg-blue-500/20 opacity-0 group-hover:opacity-100'}`} />
        
        {/* Pulse Animation (Only when closed) */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-75" />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div 
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} className="text-red-400" />
            </motion.div>
          ) : (
            <motion.div 
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Headphones size={24} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingSpeedButton;