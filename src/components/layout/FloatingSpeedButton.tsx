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
      color: 'bg-purple-600', 
      action: handleEstimatorClick 
    },
    { 
      id: 'pricing', 
      label: 'Pricing Plans', 
      icon: CreditCard, 
      color: 'bg-emerald-600', 
      action: () => { setIsOpen(false); navigate('/pricing'); } 
    },
    { 
      id: 'support', 
      label: 'Get Support', 
      icon: LifeBuoy, 
      color: 'bg-red-500', 
      action: () => { setIsOpen(false); navigate('/contact'); } 
    },
    { 
      id: 'quote', 
      label: 'Request Quote', 
      icon: FileText, 
      color: 'bg-indigo-600', 
      action: () => { setIsOpen(false); navigate('/contact'); } 
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      icon: MessageCircle, 
      color: 'bg-green-500', 
      action: () => window.open(`https://wa.me/${cleanPhone(data.site.phone)}`, '_blank') 
    },
    { 
      id: 'phone', 
      label: 'Call Us', 
      icon: Phone, 
      color: 'bg-blue-500', 
      action: () => window.open(`tel:${data.site.phone}`, '_self') 
    },
    { 
      id: 'email', 
      label: 'Email Us', 
      icon: Mail, 
      color: 'bg-orange-500', 
      action: () => window.open(`mailto:${data.site.email}`, '_self') 
    }
  ];

  return (
    // POSITION: Left side (left-6)
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4 font-sans">
      
      {/* --- POPUP MENU ITEMS --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-start gap-3 mb-2 ml-1">
            {ACTIONS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.8 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="flex items-center gap-3 cursor-pointer"
                onClick={item.action}
              >
                {/* Icon Button (First on left) */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${item.color} hover:scale-110 transition-transform`}>
                  <item.icon size={18} />
                </div>

                {/* Text Label (Always Visible) */}
                <div className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md border border-slate-100 whitespace-nowrap">
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
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative z-50 transition-colors duration-300 ${
          isOpen ? 'bg-slate-700 text-white' : 'bg-white text-slate-800 border-2 border-slate-100 hover:border-blue-400'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div 
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div 
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Changed to Headphones icon with Blue Color */}
              <Headphones size={24} className="text-blue-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingSpeedButton;