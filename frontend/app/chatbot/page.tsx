"use client";

import { useState } from "react";

interface Message {
    text: string;
    sender: "user" | "bot";
}

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
            console.log("Flask API Response in Next.js:", responseData); // Debugging

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
        <div className="flex flex-col w-full max-w-md mx-auto border border-gray-300 rounded-lg shadow-lg p-4 bg-gray-900 text-white">
            {/* Chat Messages */}
            <div className="h-80 overflow-y-auto space-y-2 p-2">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg max-w-[75%] ${msg.sender === "user" ? "bg-blue-500 self-end text-white" : "bg-gray-700 text-white"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input and Send Button */}
            <div className="flex mt-2">
                <input
                    type="text"
                    className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={handleSend} className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
