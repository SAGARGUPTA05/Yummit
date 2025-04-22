import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([
    { sender: "bot", text: "Hi! What food are you in the mood for?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    setChat((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/chatbot/recommend",
        { message: input }
      );
      setChat((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch {
      setChat((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end z-[9999] ">
      {/* Chat Bubble */}
      <button
        className="p-3 bg-blue-500 text-white btn-orange rounded-full shadow-lg hover:bg-blue-600 transition"
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="mt-3 w-80 bg-white dark:bg-[#121212] shadow-lg rounded-xl overflow-hidden border border-gray-300 dark:border-[#444]">
          {/* Header */}
          <div className=" text-black p-3 flex justify-between items-center">
            <span className="font-sans text-2xl text-orange-600 animate-pulse ">Yummit</span>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-64 overflow-y-auto space-y-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`text-${
                  msg.sender === "bot" ? "left" : "right"
                } text-sm`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded ${
                    msg.sender === "bot"
                      ? "bg-gray-200 dark:bg-[#444]"
                      : "btn-orange text-white"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left text-sm text-gray-500">Thinking...</div>
            )}
          </div>

          {/* Input Field */}
          <div className="p-3 border-t flex gap-2 bg-gray-100 dark:bg-[#222]">
            <input
              className="flex-1 border px-3 py-2 rounded dark:bg-[#121212] dark:border-[#444] dark:text-[#E0E0E0]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="What are you craving?"
            />
            <button
              onClick={handleSend}
              className=" btn-orange  px-4 py-2 rounded"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
