/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, WifiOff, Zap } from 'lucide-react';
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
            className="w-[90vw] md:w-[22rem] bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[500px] max-h-[80vh]"
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
                  <h3 className="text-white font-bold text-sm">{data.site.name} Support</h3>
                  <div className="flex items-center gap-1 text-blue-200 text-xs">
                    {useLocalLogic ? <WifiOff size={10} /> : <Zap size={10} />}
                    <span>{useLocalLogic ? 'TechWisdom AI Sleeping' : 'TechWisdom AI Online'}</span>
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

            {/* QUICK ACTIONS */}
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