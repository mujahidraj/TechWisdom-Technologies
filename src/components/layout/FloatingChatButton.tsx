/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare, Bot, Sparkles } from 'lucide-react';
import data from '@/data.json';

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// --- DATA PREPARATION ---
const getTextOnlyData = () => {
  const clean = JSON.parse(JSON.stringify(data));
  const stripImages = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) stripImages(obj[key]);
      else if (['image', 'icon', 'img', 'logo'].some(k => key.toLowerCase().includes(k))) delete obj[key];
    }
  };
  stripImages(clean);
  return clean;
};

const textData = getTextOnlyData();
const SYSTEM_PROMPT = `You are the AI Assistant for TechWisdom. Use this data to answer accurately: ${JSON.stringify(textData)}. Be concise and professional. If you don't know, ask to contact ${data.site.email}.`;

const QUICK_ACTIONS = [
  { label: "🚀 Start Project", text: "I want to start a new project with TechWisdom." },
  { label: "💰 Pricing", text: "What are your standard pricing packages?" },
  { label: "🛠️ Services", text: "Can you list all the core services you offer?" },
  { label: "📅 Book Demo", text: "How can I book a live walkthrough or demo?" }
];

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'initial',
      text: `Welcome to ${data.site.name}. How can I assist you with our services today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => { if (isOpen) scrollToBottom(); }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    if (!API_KEY) {
      setTimeout(() => {
        setMessages(prev => [...prev, { id: `b-${Date.now()}`, text: "Offline mode active. Please reach out via our contact page.", sender: 'bot', timestamp: new Date() }]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: text }
          ],
          temperature: 0.6, max_tokens: 250
        })
      });

      const json = await response.json();
      const botText = json?.choices?.[0]?.message?.content || "I couldn't process that. Please contact support.";

      setMessages(prev => [...prev, { id: `b-${Date.now()}`, text: botText, sender: 'bot', timestamp: new Date() }]);
    } catch (e) {
      setMessages(prev => [...prev, { id: `e-${Date.now()}`, text: "Connection error. Try again later.", sender: 'bot', timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-20 right-0 w-[320px] h-[min(480px,75vh)] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-3 border-b border-white/10 bg-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest block">{data.site.name}</span>
                  <span className="text-[8px] text-blue-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                    <Sparkles size={8} /> AI Assistant
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gradient-to-b from-transparent to-black/20 
              [&::-webkit-scrollbar]:w-1.5
              [&::-webkit-scrollbar-track]:bg-white/5
              [&::-webkit-scrollbar-thumb]:bg-blue-600
              [&::-webkit-scrollbar-thumb]:rounded-full
              hover:[&::-webkit-scrollbar-thumb]:bg-blue-500
              transition-all
            ">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-3 py-2.5 rounded-2xl text-[12px] leading-relaxed shadow-sm ${msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-white/10 text-white/90 rounded-tl-none border border-white/5 backdrop-blur-md'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-1.5 p-2.5 bg-white/5 rounded-full w-12 justify-center border border-white/5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Pills (Preset Questions) */}
            <div className="px-3 py-2 bg-black/20 border-t border-white/5">
              <div className="flex gap-2 overflow-x-auto pb-2 
                [&::-webkit-scrollbar]:h-1
                [&::-webkit-scrollbar-track]:bg-white/5
                [&::-webkit-scrollbar-thumb]:bg-blue-600/50
                [&::-webkit-scrollbar-thumb]:rounded-full
                hover:[&::-webkit-scrollbar-thumb]:bg-blue-600
                transition-all
              ">
                {QUICK_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(action.text)}
                    className="whitespace-nowrap px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] text-blue-300 font-bold hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-sm"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-slate-900/80 backdrop-blur-xl">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1 pl-3 border border-white/10 focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder:text-white/20"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${inputValue.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'bg-white/5 text-white/20'
                    }`}
                >
                  <Send size={14} className={inputValue.trim() ? 'translate-x-0.5' : ''} />
                </button>
              </div>
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
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl relative z-50 transition-all duration-500 border border-white/10 ${isOpen ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
          }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }}>
              <MessageSquare size={28} className="text-blue-400 fill-blue-400/10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default FloatingChatButton;