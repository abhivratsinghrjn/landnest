import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { X, Send, Loader2, ExternalLink, ChevronDown } from "lucide-react";

interface Message {
  role: "user" | "bhoomi";
  text: string;
  navigate?: { url: string; label: string };
  timestamp: Date;
}

interface ConversationEntry {
  role: "user" | "model";
  parts: { text: string }[];
}

// Bhoomi avatar — professional AI agent illustration (SVG, no copyright)
function BhoomiAvatar({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="url(#bgGrad)" />
      {/* Face */}
      <ellipse cx="50" cy="42" rx="22" ry="24" fill="#FDDBB4" />
      {/* Hair */}
      <ellipse cx="50" cy="24" rx="22" ry="14" fill="#3D2314" />
      <ellipse cx="28" cy="38" rx="7" ry="16" fill="#3D2314" />
      <ellipse cx="72" cy="38" rx="7" ry="16" fill="#3D2314" />
      {/* Bun */}
      <circle cx="50" cy="14" r="9" fill="#3D2314" />
      {/* Eyes */}
      <ellipse cx="42" cy="42" rx="3.5" ry="4" fill="#2C1810" />
      <ellipse cx="58" cy="42" rx="3.5" ry="4" fill="#2C1810" />
      {/* Eye shine */}
      <circle cx="43.5" cy="40.5" r="1.2" fill="white" />
      <circle cx="59.5" cy="40.5" r="1.2" fill="white" />
      {/* Eyebrows */}
      <path d="M38 37 Q42 35 46 37" stroke="#3D2314" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M54 37 Q58 35 62 37" stroke="#3D2314" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Nose */}
      <ellipse cx="50" cy="48" rx="2" ry="1.5" fill="#E8A882" />
      {/* Smile */}
      <path d="M44 54 Q50 59 56 54" stroke="#C47A5A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Lips */}
      <path d="M45 54.5 Q50 57 55 54.5" fill="#E07B6A" />
      {/* Neck */}
      <rect x="44" y="64" width="12" height="8" rx="4" fill="#FDDBB4" />
      {/* Saree / outfit */}
      <path d="M20 100 Q30 72 50 70 Q70 72 80 100 Z" fill="url(#sariGrad)" />
      {/* Blouse */}
      <path d="M36 70 Q50 66 64 70 L66 80 Q50 76 34 80 Z" fill="#1B5E20" />
      {/* Saree border */}
      <path d="M20 100 Q30 72 34 70" stroke="#FFD700" strokeWidth="1.5" fill="none" />
      {/* Bindi */}
      <circle cx="50" cy="34" r="2" fill="#E53935" />
      {/* Earrings */}
      <circle cx="28" cy="46" r="3" fill="#FFD700" />
      <circle cx="72" cy="46" r="3" fill="#FFD700" />
      {/* Necklace */}
      <path d="M38 68 Q50 74 62 68" stroke="#FFD700" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="73" r="2" fill="#FFD700" />
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2d5f3f" />
          <stop offset="100%" stopColor="#4a8c5f" />
        </linearGradient>
        <linearGradient id="sariGrad" x1="0" y1="70" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C62828" />
          <stop offset="100%" stopColor="#E53935" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Bhoomi() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      if (!hasGreeted) {
        const greeting = user
          ? `Namaste, **${user.name}** ji! 🙏 I'm **Bhoomi**, your personal property guide at LandNest Properties.\n\nI can help you:\n• Find properties within your budget\n• Explore sale, rent, or farm land options\n• Navigate directly to any listing\n• Answer all your real estate questions\n\nWhat kind of property are you looking for today?`
          : `Namaste! 🙏 I'm **Bhoomi**, your personal property guide at LandNest Properties.\n\nI can help you find the perfect property in Rajnandgaon, Chhattisgarh — whether you're looking to buy, rent, or invest in farmland.\n\nWhat are you looking for today?`;

        setMessages([
          {
            role: "bhoomi",
            text: greeting,
            timestamp: new Date(),
          },
        ]);
        setHasGreeted(true);
      }
    }
  }, [isOpen, user, hasGreeted]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    await sendText(trimmed);
    setInput("");
  };

  const sendText = async (trimmed: string) => {
    if (!trimmed || isLoading) return;

    const userMsg: Message = { role: "user", text: trimmed, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    const newHistory: ConversationEntry[] = [
      ...conversationHistory,
      { role: "user", parts: [{ text: trimmed }] },
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, conversationHistory }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();

      const bhoomiMsg: Message = {
        role: "bhoomi",
        text: data.reply,
        navigate: data.navigate,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, bhoomiMsg]);
      setConversationHistory([
        ...newHistory,
        { role: "model", parts: [{ text: data.reply }] },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bhoomi",
          text: "I'm sorry, something went wrong. Please try again or contact us at 6261642203.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNavigate = (url: string) => {
    setIsOpen(false);
    setTimeout(() => setLocation(url), 200);
  };

  // Render message text with basic markdown (bold, newlines, bullets)
  const renderText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold: **text**
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      );
      return (
        <span key={i}>
          {rendered}
          {i < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white rounded-full shadow-2xl border border-green-100 pr-4 pl-1 py-1 cursor-pointer group"
            style={{ boxShadow: "0 8px 32px rgba(45,95,63,0.25)" }}
          >
            <div className="relative">
              <BhoomiAvatar size={48} className="rounded-full" />
              {/* Online indicator */}
              <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-gray-500 leading-none">Ask</p>
              <p className="text-sm font-bold text-green-800 leading-tight">Bhoomi AI</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 right-0 z-50 flex flex-col bg-white shadow-2xl"
              style={{
                width: "min(420px, 100vw)",
                height: "min(680px, 100dvh)",
                borderRadius: "20px 0 0 0",
                border: "1px solid #e5e7eb",
                borderRight: "none",
                borderBottom: "none",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-tl-[20px]"
                style={{
                  background: "linear-gradient(135deg, #2d5f3f 0%, #4a8c5f 100%)",
                }}
              >
                <div className="relative flex-shrink-0">
                  <BhoomiAvatar size={44} className="rounded-full ring-2 ring-white/30" />
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base leading-tight">Bhoomi</h3>
                  <p className="text-green-100 text-xs">AI Property Guide · LandNest</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {msg.role === "bhoomi" && (
                      <div className="flex-shrink-0 mt-1">
                        <BhoomiAvatar size={28} className="rounded-full" />
                      </div>
                    )}
                    <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div
                        className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-green-700 text-white rounded-tr-sm"
                            : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                        }`}
                      >
                        {renderText(msg.text)}
                      </div>
                      {/* Navigation CTA */}
                      {msg.navigate && (
                        <button
                          onClick={() => handleNavigate(msg.navigate!.url)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-100 transition-colors mt-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {msg.navigate.label}
                        </button>
                      )}
                      <span className="text-[10px] text-gray-400 px-1">
                        {msg.timestamp.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <div className="flex gap-2 items-end">
                    <BhoomiAvatar size={28} className="rounded-full flex-shrink-0" />
                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1 items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions */}
              {messages.length <= 1 && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 mb-2 font-medium uppercase tracking-wide">Quick questions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Properties under ₹20L",
                      "2BHK for rent",
                      "Farm land available?",
                      "How to list property?",
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => sendText(q)}
                        className="text-xs bg-white border border-green-200 text-green-700 px-2.5 py-1 rounded-full hover:bg-green-50 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="px-4 py-3 bg-white border-t border-gray-100 rounded-bl-none">
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:border-green-400 focus-within:ring-2 focus-within:ring-green-100 transition-all">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Bhoomi anything..."
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-800 transition-colors"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-2">
                  Powered by Gemini AI · LandNest Properties
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
