/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, WifiOff, Zap, Sparkles } from 'lucide-react';
import data from '@/data.json'; 

// --- CONFIGURATION ---
const API_KEY = import.meta.env.VITE_GROQ_API_KEY; 

// --- DATA PREPARATION ---
// STRICT RULE: Only remove images/icons. Keep ALL text.
const getTextOnlyData = () => {
  const clean = JSON.parse(JSON.stringify(data));
  
  // Recursively remove keys that contain image URLs or Icon names
  const stripImages = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        stripImages(obj[key]);
      } else if (
        key.toLowerCase().includes('image') || 
        key.toLowerCase().includes('icon') || 
        key.toLowerCase().includes('img') || 
        key.toLowerCase().includes('logo')
      ) {
        delete obj[key];
      }
    }
  };
  
  stripImages(clean);
  return clean;
};

const textData = getTextOnlyData();

const SYSTEM_INSTRUCTION = `
You are the Senior AI Consultant for "${data.site.name}".
Your goal is to convert visitors into clients by providing helpful, accurate, and concise information.

--- KNOWLEDGE BASE (TEXT ONLY) ---
${JSON.stringify(textData)}

--- GUIDELINES ---
1. **Tone:** Professional, enthusiastic, and helpful.
2. **Accuracy:** Use the data provided above. Quote specific pricing numbers, project titles, and descriptions.
3. **Length:** Keep answers extremely short (2-3 sentences max).
4. **Unknowns:** If the answer is NOT in the data, ask them to email ${data.site.email}.
`;

const QUICK_ACTIONS = [
  { label: "💰 Pricing?", text: "What are your pricing packages?" },
  { label: "📞 Contact Info", text: "What is your phone number and email?" },
  { label: "🚀 Start Project", text: "I want to start a new project." },
  { label: "📂 Portfolio", text: "Show me your recent work." },
];

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [useLocalLogic, setUseLocalLogic] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `👋 Hi! I'm the ${data.site.name} Assistant. I have full access to our project portfolio and pricing. How can I help?`,
      sender: 'bot'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => { 
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // --- LOCAL FALLBACK ---
  const handleLocalResponse = (text: string) => {
    const lower = text.toLowerCase();
    let response = "Thanks! Our team will review your message and get back to you shortly.";
    
    if (lower.includes('price') || lower.includes('cost')) response = `We offer flexible packages starting from ${data.pricing.projectTiers[0].price} BDT. Check out our Pricing page for details.`;
    else if (lower.includes('email') || lower.includes('contact') || lower.includes('phone')) response = `You can reach us at 📧 ${data.site.email} or call 📞 ${data.site.phone}.`;
    else if (lower.includes('service') || lower.includes('offer')) response = `We specialize in ${data.services.slice(0, 3).map((s:any) => s.title).join(', ')} and more.`;
    else if (lower.includes('location') || lower.includes('address')) response = `We are located at 📍 ${data.site.address}.`;

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: response, sender: 'bot' }]);
      setIsTyping(false);
    }, 600);
  };

  // --- GROQ API HANDLER ---
  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), text, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    if (!API_KEY) {
      handleLocalResponse(text);
      return;
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct", 
          messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: text }
          ],
          temperature: 0.5,
          max_tokens: 250
        })
      });

      if (!response.ok) {
        setUseLocalLogic(true);
        handleLocalResponse(text);
        return;
      }

      const json = await response.json();
      const botText = json.choices?.[0]?.message?.content;
      
      if (!botText) throw new Error("No response text");

      setMessages(prev => [...prev, { id: Date.now().toString(), text: botText, sender: 'bot' }]);

    } catch (error) {
      setUseLocalLogic(true); 
      handleLocalResponse(text);
    } finally {
      setIsTyping(false);
    }
  };

  return (
 
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[90vw] md:w-[24rem] bg-[#020617]/90 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 flex flex-col h-[600px] max-h-[80vh] ring-1 ring-white/5"
          >
            {/* HEADER */}
            <div className="bg-slate-900/50 p-4 flex items-center justify-between shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
                    <Bot size={20} />
                  </div>
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-900 rounded-full ${useLocalLogic ? 'bg-yellow-500' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`}>
                    {!useLocalLogic && <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">{data.site.name} AI</h3>
                  <div className="flex items-center gap-1.5 text-xs">
                    {useLocalLogic ? (
                      <span className="text-yellow-400 flex items-center gap-1"><WifiOff size={10} /> Offline Mode</span>
                    ) : (
                      <span className="text-emerald-400 flex items-center gap-1"><Zap size={10} /> Online & Ready</span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-slate-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              <div className="text-center text-xs text-slate-500 my-4 flex items-center gap-2 justify-center">
                <Sparkles size={12} /> Powered by TechWisdom AI
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-white shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-slate-700' 
                        : 'bg-gradient-to-br from-blue-600 to-purple-600'
                    }`}>
                      {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 text-sm shadow-md leading-relaxed border ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 border-blue-500 text-white rounded-br-none' 
                        : 'bg-slate-800/80 border-white/10 text-slate-200 rounded-bl-none backdrop-blur-md'
                    }`}>
                      <span className="whitespace-pre-wrap">{msg.text}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-slate-800/80 border border-white/10 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1.5 items-center ml-8 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* QUICK ACTIONS */}
            <div className="px-4 py-3 bg-slate-900/30 border-t border-white/5 backdrop-blur-sm">
               <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar mask-fade">
                  {QUICK_ACTIONS.map((action, i) => (
                    <button 
                       key={i}
                       onClick={() => handleSendMessage(action.text)}
                       className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/60 border border-white/10 text-blue-300 text-xs font-medium rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-sm hover:shadow-blue-500/20"
                    >
                       {action.label}
                    </button>
                  ))}
               </div>
            </div>

            {/* INPUT AREA */}
            <div className="p-4 bg-slate-900/90 border-t border-white/10 shrink-0 backdrop-blur-xl">
              <div className="flex items-center gap-2 bg-slate-950 rounded-full px-4 py-2 border border-white/10 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2 rounded-full transition-all flex items-center justify-center ${
                    inputValue.trim() 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send size={16} className={inputValue.trim() ? 'translate-x-0.5' : ''} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING TOGGLE BUTTON WITH EXTERNAL PULSE --- */}
      <div className="relative z-50 group">
        {/* Pulse Animation (Outside the button to avoid overflow clipping) */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-blue-600 opacity-20 animate-ping duration-[1.5s]"></span>
            <span className="absolute inset-0 rounded-full bg-blue-500 opacity-10 animate-pulse duration-[2s]"></span>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.5)] bg-[#0f172a] text-white relative border border-white/10 overflow-hidden"
        >
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Inner Circle for Depth */}
          <div className="absolute inset-[2px] bg-[#0f172a] rounded-full z-0 flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-50 rounded-full"></div>
          </div>

          <AnimatePresence mode="wait">
            {isOpen ? (
              <X size={28} className="relative z-10 text-white" />
            ) : (
              <MessageCircle size={28} className="relative z-10 text-blue-400 group-hover:text-white transition-colors fill-current" />
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingChatButton;