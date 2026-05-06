import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  MessageCircle, 
  X, 
  Phone, 
  Calculator, 
  Layers,
  CalendarDays,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CreditCard,
  LifeBuoy,
  FileText,
  Mail,
  MoreHorizontal
} from 'lucide-react';
import data from '@/data.json'; 
import RequirementAssistantDialog from './RequirementAssistantDialog';

const FloatingSpeedButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  const handleEstimatorClick = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById('estimator-tool');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('estimator-tool');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  };

  const handleAiAssistantClick = () => {
    setIsOpen(false);
    setAssistantOpen(true);
  };

  const BENTO_ACTIONS = [
    {
      id: 'ai-assistant',
      label: 'AI Strategy Assistant',
      icon: Zap,
      className: 'col-span-2 row-span-2 bg-blue-600/10 border-blue-500/20',
      iconClass: 'text-yellow-400 bg-yellow-400/10',
      action: handleAiAssistantClick,
    },
    { 
      id: 'estimator', 
      label: 'Calculator', 
      icon: Calculator, 
      className: 'col-span-1 row-span-1',
      iconClass: 'text-blue-400 bg-blue-400/10',
      action: handleEstimatorClick 
    },
    { 
      id: 'pricing', 
      label: 'Pricing', 
      icon: CreditCard, 
      className: 'col-span-1 row-span-1',
      iconClass: 'text-indigo-400 bg-indigo-400/10',
      action: () => { setIsOpen(false); navigate('/pricing'); } 
    },
    {
      id: 'demo-projects',
      label: 'Showcase',
      icon: Layers,
      className: 'col-span-1 row-span-1',
      iconClass: 'text-purple-400 bg-purple-400/10',
      action: () => { setIsOpen(false); navigate('/demo-projects'); },
    },
    {
      id: 'live-walkthrough',
      label: 'Book Demo',
      icon: CalendarDays,
      className: 'col-span-1 row-span-1',
      iconClass: 'text-emerald-400 bg-emerald-400/10',
      action: () => { setIsOpen(false); navigate('/contact#live-walkthrough'); },
    },
    { 
      id: 'quote', 
      label: 'Get Quote', 
      icon: FileText, 
      className: 'col-span-1 row-span-1',
      iconClass: 'text-orange-400 bg-orange-400/10',
      action: () => { setIsOpen(false); navigate('/contact'); } 
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: LifeBuoy, 
      className: 'col-span-1 row-span-1',
      iconClass: 'text-rose-400 bg-rose-400/10',
      action: () => { setIsOpen(false); navigate('/contact'); } 
    },
    { 
      id: 'whatsapp', 
      label: 'WhatsApp', 
      icon: MessageCircle, 
      className: 'col-span-1 row-span-1',
      iconClass: 'text-green-400 bg-green-400/10',
      action: () => window.open(`https://wa.me/${cleanPhone(data.site.phone)}`, '_blank') 
    },
    { 
      id: 'phone', 
      label: 'Call Us', 
      icon: Phone, 
      className: 'col-span-1 row-span-1',
      iconClass: 'text-sky-400 bg-sky-400/10',
      action: () => window.open(`tel:${data.site.phone}`, '_self') 
    },
    { 
      id: 'email', 
      label: 'Email Us', 
      icon: Mail, 
      className: 'col-span-1 row-span-1',
      iconClass: 'text-pink-400 bg-pink-400/10',
      action: () => window.open(`mailto:${data.site.email}`, '_self') 
    }
  ];

  return (
    <div className="fixed bottom-8 left-8 z-[9999] font-sans print:hidden">
      
      <RequirementAssistantDialog
        open={assistantOpen}
        onOpenChange={setAssistantOpen}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(20px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 40, filter: 'blur(20px)' }}
            className="mb-6 p-4 bg-navy/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_40px_120px_rgba(0,0,0,0.7)] w-[90vw] max-w-[480px] max-h-[80vh] overflow-y-auto
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-white/5
              [&::-webkit-scrollbar-thumb]:bg-blue-600/50
              [&::-webkit-scrollbar-thumb]:rounded-full
              hover:[&::-webkit-scrollbar-thumb]:bg-blue-500/80
            "
          >
            <div className="flex items-center justify-between px-2 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/20">
                  <ShieldCheck size={16} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold text-white tracking-tight uppercase">TechWisdom Control Center</h4>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/30 italic">Priority Access</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">Connected</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {BENTO_ACTIONS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={item.action}
                  className={`
                    ${item.className}
                    relative group cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 flex flex-col items-center justify-center p-3 gap-1.5
                  `}
                >
                  <div className={`p-2 rounded-xl transition-transform duration-500 group-hover:scale-110 ${item.iconClass}`}>
                    <item.icon size={18} />
                  </div>
                  
                  <span className="text-[8px] font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-tight text-center leading-tight">
                    {item.label}
                  </span>

                  <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
                    <ArrowUpRight size={8} className="text-white/40" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse Effect */}
      {!isOpen && (
        <>
          <div className="absolute inset-0 rounded-[1.5rem] bg-blue-500/20 animate-ping duration-[2000ms]" />
          <div className="absolute inset-0 rounded-[1.5rem] bg-blue-500/10 animate-pulse duration-[3000ms]" />
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl relative z-50 transition-all duration-500 ${
          isOpen ? 'bg-white text-navy' : 'bg-navy text-white border border-white/10'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}>
              <MoreHorizontal size={28} className="text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingSpeedButton;