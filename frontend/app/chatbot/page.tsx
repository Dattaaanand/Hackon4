"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";

interface Message {
    text: string;
    sender: "user" | "bot";
}

const formatText = (text: string) => {
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
        .replace(/_(.*?)_/g, "<em>$1</em>") // Italic
        .replace(/__(.*?)__/g, "<u>$1</u>") // Underline
        .replace(/`(.*?)`/g, "<code>$1</code>"); // Inline code
    return DOMPurify.sanitize(formatted);
};

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch("http://127.0.0.1:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const responseData = await response.json();
            console.log("Flask API Response in Next.js:", responseData);

            const botMessage: Message = {
                text: responseData.response || responseData.error || "Sorry, I didn't understand that.",
                sender: "bot",
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching from Flask:", error);
            setMessages((prev) => [...prev, { text: "Error fetching response. Try again.", sender: "bot" }]);
        }

        setInput("");
    };

    return (
        <div className="relative min-h-screen bg-black text-white bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-screen p-6">
                <motion.h2
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400"
                >
                    AI Chatbot
                </motion.h2>
                <div className="w-full max-w-md border border-purple-500 rounded-xl shadow-lg backdrop-blur-lg p-4 bg-black/40 relative">
                    <div className="h-80 overflow-y-auto space-y-2 p-2 flex flex-col">
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className={`p-2 pl-3 pr-4 rounded-3xl max-w-[75%] text-white ${msg.sender === "user"
                                    ? "bg-gradient-to-r from-blue-500 to-purple-400 self-end text-right"
                                    : "bg-gray-700 self-start text-left"}`}
                            >
                                <span dangerouslySetInnerHTML={{ __html: formatText(msg.text) }} />
                            </motion.div>
                        ))}
                    </div>
                    <div className="flex mt-2">
                        <input
                            type="text"
                            className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button onClick={handleSend} className="px-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-r-lg hover:opacity-80 transition-all">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
