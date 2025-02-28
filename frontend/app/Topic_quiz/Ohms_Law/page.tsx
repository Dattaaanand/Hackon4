"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface QuestionData {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: string;
}

const navItems = [
  { name: "Home", path: "/" },
  { name: "Chatbot", path: "/chatbot" },
  { name: "Quizzes", path: "/Quizzes" },
];

export default function OhmsLawQuiz() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-question");
      const data: QuestionData = await response.json();

      if (data.question) {
        setQuestionData(data);
        setSelectedAnswer("");
        setFeedback("");
        setExplanation("");
      } else {
        setFeedback("Failed to generate a question.");
      }
    } catch (error) {
      setFeedback("Error fetching question.");
    }
  };

  const submitAnswer = async () => {
    if (!selectedAnswer) {
      setFeedback("Please select an answer.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/check-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selected_answer: selectedAnswer }),
      });

      const data = await response.json();
      setFeedback(data.message);
      setExplanation(data.explanation);
    } catch (error) {
      setFeedback("Error submitting answer.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a021f] via-[#1a082d] to-[#0a021f] text-white p-6 pt-24">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black/50 backdrop-blur-md shadow-lg z-50"
      >
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600">
          OLABS
        </h1>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <motion.div
              key={item.path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.path}>
                <div
                  className={`px-4 py-2 text-lg font-semibold text-transparent bg-clip-text 
                            bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600 
                            hover:text-gray-300 transition-all duration-300 cursor-pointer 
                            ${pathname === item.path
                      ? "underline decoration-purple-500 underline-offset-4"
                      : ""
                    }`}
                >
                  {item.name}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#1a082d] bg-opacity-80 shadow-lg rounded-2xl p-8 w-full max-w-2xl text-center border border-[#3b1f5f] backdrop-blur-md"
      >
        <h1 className="relative text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8a5cf6] to-[#a67efb] mb-6 drop-shadow-md">
          Ohm's Law Quiz
        </h1>

        {questionData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <p className="text-gray-300 text-lg mb-6 font-semibold italic">{questionData?.question}</p>

            <div className="grid grid-cols-2 gap-6">
              {(["A", "B", "C", "D"] as const).map((option) => (
                <motion.button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition w-full text-left text-lg font-bold shadow-md transform duration-300 border border-[#5a2d91] ${selectedAnswer === option
                    ? "bg-[#5a2d91] scale-105 shadow-[#8a5cf6]"
                    : "bg-[#3b1f5f] bg-opacity-50 hover:bg-[#4c2975] hover:scale-105"
                    }`}
                >
                  {questionData?.[option]}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={submitAnswer}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#8a5cf6] text-white font-bold rounded-xl shadow-md hover:bg-[#a67efb] transition-all duration-300 transform hover:scale-105 mt-6 border border-[#8a5cf6]"
            >
              ✅ Submit Answer
            </motion.button>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-gray-400 text-lg flex items-center justify-center h-32 font-medium"
          >
            Click the button to generate a question!
          </motion.p>
        )}

        <motion.button
          onClick={fetchQuestion}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-6 py-3 bg-[#5a2d91] text-white font-bold rounded-xl shadow-md hover:bg-[#7c49c8] transition-all duration-300 transform hover:scale-105 mt-8 border border-[#8a5cf6]"
        >
          🎲 Get Question
        </motion.button>

        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-xl font-semibold text-[#8a5cf6] animate-pulse"
          >
            {feedback}
          </motion.p>
        )}

        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-6 p-4 bg-[#3b1f5f] rounded-xl text-gray-300 text-lg shadow-md border border-[#5a2d91]"
          >
            <strong>📝 Explanation:</strong> {explanation}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}