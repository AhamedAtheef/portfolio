import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [cooldown, setCooldown] = useState(false);

  const location = useLocation();
  const isHome =
    location.pathname === "/" || location.pathname === "/home";

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages([
      {
        role: "ai",
        text: "Hi 👋 I'm Atheef's AI assistant. Ask me about his projects, skills, or experience.",
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading || cooldown) return;

    setLoading(true);
    setCooldown(true);

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await axios.post(
        "/api/ai/chat",
        {
          message: userMessage.text,
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: res.data.reply },
      ]);
    } catch (error: any) {
      let errorText = "AI response failed.";

      if (error?.response?.status === 429) {
        errorText = "⚠️ Please wait a few seconds before asking again.";
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", text: errorText },
      ]);
    }

    setLoading(false);

    setTimeout(() => setCooldown(false), 5000);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className={`group z-50 fixed right-4 sm:right-6 cursor-pointer bg-[#f5f3f3] text-black w-[3.5rem] h-[3.5rem] flex items-center justify-center rounded-full shadow-lg text-xl hover:scale-105 transition 
          ${isHome ? "bottom-[8rem]" : "bottom-4 sm:bottom-6"}`}
        >
          🤖
        </div>
      )}

      {isOpen && (
        <div className="z-50 fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[92vw] sm:w-[340px] max-w-[340px] bg-black shadow-xl rounded-xl flex flex-col border">

          {/* Close button */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 cursor-pointer bg-[#ffcc00] text-black w-6 h-6 flex items-center justify-center rounded-full"
          >
            X
          </div>

          {/* Header */}
          <div className="bg-black text-[#ffcc00] p-3 rounded-t-xl font-semibold border-b text-sm sm:text-base">
            AI Assistant
          </div>

          {/* Messages */}
          <div className="h-56 sm:h-64 overflow-y-auto p-3 space-y-3 text-xs sm:text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[85%] sm:max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-gray-300 text-[#111110] ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-gray-400 text-xs">
                AI is typing...
              </div>
            )}

            <div ref={bottomRef}></div>
          </div>

          {/* Input */}
          <div className="flex border-t">
            <input
              type="text"
              placeholder="Ask about my projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 p-2 text-xs sm:text-sm outline-none text-black"
            />

            <button
              onClick={sendMessage}
              disabled={loading || cooldown || !input.trim()}
              className="bg-black text-[#ffcc00] px-3 sm:px-4 text-xs sm:text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}