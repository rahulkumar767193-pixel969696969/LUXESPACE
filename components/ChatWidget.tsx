
import React, { useState, useEffect, useRef } from 'react';
import { User, ChatMessage } from '../types';
import { MockAPI } from '../api';
import { CHAT_RESPONSES } from '../constants';
import { GoogleGenAI } from "@google/genai";

const ChatWidget = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchHistory();
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const fetchHistory = async () => {
    const history = await MockAPI.getChatHistory(user.id);
    if (history.length === 0) {
      const welcome: ChatMessage = {
        id: 'w1', 
        userId: user.id, 
        sender: 'bot', 
        text: `Welcome back, ${user.name}. I am your dedicated LuxeSpace AI consultant. 

I can help you with:
• Spatial synthesis & aesthetic curation
• Choosing the right style (Modern, Minimal, Luxury, etc.)
• Budgeting for your design project
• Technical support

For immediate assistance, you can reach our helpline at **+1 (800) LUXE-TECH** or email us at **care@luxespace.ai**.

How may I assist in refining your architectural vision today?`, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([welcome]);
      await MockAPI.saveChatMessage(user.id, welcome);
    } else {
      setMessages(history);
    }
  };

  const callAIWithRetry = async (prompt: string, history: ChatMessage[], retries = 2) => {
    // Map history to Google GenAI format
    const contents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: prompt }] });

    for (let i = 0; i <= retries; i++) {
      try {
        // Initialize AI instance right before the call as per guidelines
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents,
          config: {
            systemInstruction: `You are the LuxeSpaceAI design consultant. You are sophisticated, professional, and world-class in interior design. Your tone is refined, helpful, and concise. 

Key Information:
- Helpline: +1 (800) LUXE-TECH
- Email: care@luxespace.ai
- Services: Neural spatial synthesis, aesthetic interpolation, photorealistic rendering.
- Styles: Modern, Minimal, Luxury, Scandinavian, Industrial, Bohemian.
- Process: Capture -> Calibrate -> Synthesize -> Refine.

Always provide the helpline or email if the user has technical issues or needs human assistance.`,
          },
        });
        return response.text;
      } catch (err) {
        if (i === retries) throw err;
        // Graceful exponential backoff
        await new Promise(r => setTimeout(r, 1000 * (i + 1)));
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    await MockAPI.saveChatMessage(user.id, userMsg);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Use the manual history approach to avoid RPC session state issues
      const replyText = await callAIWithRetry(currentInput, messages);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: user.id,
        sender: 'bot',
        text: replyText || "I encountered a minor signal interruption. Could you please repeat that?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      await MockAPI.saveChatMessage(user.id, botMsg);
    } catch (error) {
      console.error("Chat AI error:", error);
      // Premium Fallback Logic
      const lower = currentInput.toLowerCase();
      let reply = CHAT_RESPONSES.default;
      for (const k in CHAT_RESPONSES) {
        if (lower.includes(k)) { reply = CHAT_RESPONSES[k]; break; }
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        userId: user.id,
        sender: 'bot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      await MockAPI.saveChatMessage(user.id, botMsg);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {isOpen ? (
        <div className="bg-[#0F0F0F] w-[400px] h-[600px] rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] flex flex-col border border-white/5 overflow-hidden animate-in slide-in-from-bottom-8 zoom-in-95 duration-500">
          {/* Stylist Header */}
          <div className="bg-[#151515] p-8 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="relative bot-float">
                <div className="bot-avatar-container">
                  <div className="bot-antenna"></div>
                  <div className="flex gap-1.5 mt-2">
                    <div className="bot-eye bot-eye-blink"></div>
                    <div className="bot-eye bot-eye-blink"></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#151515] bot-pulse"></div>
              </div>
              <div>
                <h4 className="font-bold text-white tracking-tight">AI Concierge</h4>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30">System v3.1 Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all flex items-center justify-center">
              <i className="fas fa-times text-xs"></i>
            </button>
          </div>

          {/* Messages: Premium Dark Theme */}
          <div className="flex-grow p-8 overflow-y-auto space-y-8 bg-[#0A0A0A]">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] space-y-2`}>
                  <div className={`p-5 rounded-[1.5rem] text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-white text-black rounded-tr-none font-medium' 
                      : 'bg-[#151515] text-white/80 rounded-tl-none border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                  <p className={`text-[9px] font-black uppercase tracking-widest opacity-20 ${m.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#151515] p-5 rounded-[1.5rem] rounded-tl-none border border-white/5 flex gap-2">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input: Clean & Minimal */}
          <div className="p-8 bg-[#151515] border-t border-white/5">
            <div className="flex gap-4">
              <input 
                type="text" 
                className="flex-grow p-4 bg-[#0A0A0A] rounded-2xl outline-none border border-white/5 focus:border-[#D4AF37]/50 transition-all text-sm font-light text-white placeholder:text-white/10"
                placeholder="Message concierge..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim()} 
                className="w-14 h-14 bg-white text-black rounded-2xl hover:bg-[#D4AF37] transition-all flex items-center justify-center disabled:opacity-10 disabled:grayscale"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-white text-black rounded-[2rem] shadow-2xl flex items-center justify-center hover:bg-[#D4AF37] transition-all transform hover:scale-105 active:scale-95 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bot-float">
            <div className="bot-avatar-container !bg-transparent !border-none">
              <div className="bot-antenna !bg-black after:!bg-black after:!box-shadow-none"></div>
              <div className="flex gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full bot-eye-blink"></div>
                <div className="w-1.5 h-1.5 bg-black rounded-full bot-eye-blink"></div>
              </div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#D4AF37] rounded-full border-4 border-[#0A0A0A] flex items-center justify-center">
            <div className="w-1 h-1 bg-black rounded-full animate-ping"></div>
          </div>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
