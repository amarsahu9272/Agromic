
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

const AgroBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am AgroBot, your irrigation assistant. How can I help you save water today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Fix: Always initialize GoogleGenAI with apiKey from process.env.API_KEY directly
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        // Fix: Use the recommended 'gemini-3-flash-preview' model for basic text tasks
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: 'You are AgroBot, a helpful assistant for Agromic Industry Pvt Ltd. You specialize in drip irrigation and mini sprinklers. Answer farmers questions about water-efficient farming, crop types, and system benefits. Keep answers simple, practical, and helpful. If the question is not about farming or irrigation, politely steer them back to Agromic products.',
        },
      });

      const response = await chat.sendMessage({ message: input });
      // Fix: Access .text as a property on the response object
      const modelText = response.text || "I'm sorry, I couldn't process that. Please try again.";
      
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error('AgroBot Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to service. Please check your internet connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-emerald-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] sm:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col border border-stone-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-sm">AgroBot</h3>
                <p className="text-xs text-emerald-100">AI Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-stone-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white border border-stone-200 text-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-stone-200 px-4 py-2 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100 flex items-center space-x-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about drip irrigation..."
              className="flex-grow bg-stone-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgroBot;
