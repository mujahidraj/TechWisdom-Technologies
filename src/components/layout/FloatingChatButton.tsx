import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, WifiOff, Zap } from 'lucide-react';
import data from '@/data.json'; 

// --- CONFIGURATION ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

const SYSTEM_INSTRUCTION = `
You are the intelligent virtual assistant for "${data.site.name}".
Your goal is to answer visitor questions helpfully and briefly (max 2-3 sentences).
Company Data: ${JSON.stringify(data)}
Rules:
1. Be friendly and professional.
2. If asked about prices, summarize the "pricing" section.
3. If asked for contact info, provide email (${data.site.email}) and phone (${data.site.phone}).
4. Never mention you are an AI. Say you are part of the team.
`;

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// --- QUICK ACTIONS CONFIG ---
const QUICK_ACTIONS = [
  { label: "💰 Pricing?", text: "How much does a website cost?" },
  { label: "📞 Contact Info", text: "What is your phone number and email?" },
  { label: "🚀 Start Project", text: "I want to start a new project." },
  { label: "📍 Location", text: "Where are you located?" },
];

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useLocalLogic, setUseLocalLogic] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `👋 Hi! I'm the ${data.site.name} Assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages, isTyping, isOpen]);

  // --- 🤖 LOCAL FALLBACK LOGIC (Works 100% of the time) ---
  const generateLocalResponse = (text: string) => {
    const lower = text.toLowerCase();
    const { site, services } = data;

    if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) 
      return "Our pricing is flexible! Check out the 'Interactive Cost Estimator' on our homepage, or view our Pricing page for standard tiers.";
    if (lower.includes('email') || lower.includes('contact')) 
      return `You can email us at 📧 ${site.email}. We usually reply within 24 hours.`;
    if (lower.includes('phone') || lower.includes('call')) 
      return `Give us a call at 📞 ${site.phone}. We are available 9am-6pm.`;
    if (lower.includes('service') || lower.includes('offer')) 
      return `We specialize in ${services.slice(0,3).map(s => s.title).join(', ')}. See our Services page for more!`;
    if (lower.includes('location') || lower.includes('address') || lower.includes('where'))
      return `We are located at 📍 ${site.address}. Come say hi!`;
    
    return "Thanks for your message! Our team will review this and get back to you shortly. Is there anything else I can help with?";
  };

  // --- 🧠 HYBRID HANDLER ---
  const handleBotResponse = async (userMessage: string) => {
    setIsTyping(true);

    // 1. If we already switched to local mode, use it immediately
    if (useLocalLogic || !API_KEY) {
      setTimeout(() => {
        addBotMessage(generateLocalResponse(userMessage));
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      // 2. Try Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${SYSTEM_INSTRUCTION}\nUser: ${userMessage}\nModel:` }] }]
          })
        }
      );

      const json = await response.json();
      
      if (json.error) throw new Error(json.error.message);
      
      const botText = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!botText) throw new Error("No response");

      addBotMessage(botText);

    } catch (error) {
      console.warn("API Failed, switching to local mode:", error);
      setUseLocalLogic(true); // Switch to local mode permanently for this session
      
      // Fallback immediately so user sees a response
      addBotMessage(generateLocalResponse(userMessage));
    } finally {
      setIsTyping(false);
    }
  };

  const addBotMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() }]);
    setInputValue('');
    handleBotResponse(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[90vw] md:w-[20rem] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[440px] max-h-[85vh]"
          >
            {/* HEADER */}
            <div className="bg-[#0f172a] p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-inner">
                    <Bot size={20} />
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#0f172a] rounded-full ${useLocalLogic ? 'bg-yellow-500' : 'bg-green-500 animate-pulse'}`}></span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{data.site.name} AI</h3>
                  <div className="flex items-center gap-1 text-blue-200 text-xs">
                    {useLocalLogic ? <WifiOff size={10} /> : <Sparkles size={10} />}
                    <span>{useLocalLogic ? 'Offline Mode' : 'Powered by Gemini'}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors bg-white/10 p-1.5 rounded-full">
                <X size={18} />
              </button>
            </div>
            
            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white ${msg.sender === 'user' ? 'bg-slate-400' : 'bg-blue-600'}`}>
                      {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      msg.sender === 'user' ? 'bg-slate-900 text-white rounded-br-none' : 'bg-white text-slate-700 rounded-bl-none border border-slate-100'
                    }`}>
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1 items-center ml-8">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* QUICK ACTIONS (Scrollable) */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
               <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-fade">
                  {QUICK_ACTIONS.map((action, i) => (
                    <button 
                       key={i}
                       onClick={() => handleSendMessage(action.text)}
                       className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-100 text-blue-600 text-xs font-medium rounded-full hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
                    >
                       {action.label}
                    </button>
                  ))}
               </div>
            </div>

            {/* INPUT */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2 rounded-full transition-all flex items-center justify-center ${inputValue.trim() ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'}`}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white relative z-50"
      >
        {/* Ping Animation to attract attention */}
        {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
        )}
        
        <AnimatePresence mode="wait">
          {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingChatButton;