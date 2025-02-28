"use client";
import { useState } from "react";

interface QuestionData {
  question: string;
  A: string;
  B: string;
  C: string;
  D: string;
  answer: string;
}

export default function OhmsLawQuiz() {
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-2xl text-center border border-gray-700 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-6 drop-shadow-lg animate-pulse">Ohm's Law Quiz</h1>

        {questionData ? (
          <div>
            <p className="text-gray-300 text-lg mb-6 font-semibold italic">{questionData?.question}</p>
            <div className="grid grid-cols-2 gap-6">
              {(["A", "B", "C", "D"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`p-3 rounded-xl transition w-full text-left text-lg font-bold shadow-md transform duration-300 ${selectedAnswer === option ? "bg-blue-600 scale-105 shadow-lg" : "bg-gray-700 hover:bg-gray-600 hover:scale-105"
                    }`}
                >
                  {questionData?.[option]}
                </button>
              ))}
            </div>
            <button
              onClick={submitAnswer}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 mt-6"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-lg flex items-center justify-center h-32 font-medium">Click the button to generate a question!</p>
        )}

        <button
          onClick={fetchQuestion}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 mt-8"
        >
          Get Question
        </button>

        {feedback && <p className="mt-6 text-xl font-semibold text-blue-400 animate-bounce">{feedback}</p>}

        {explanation && (
          <div className="mt-6 p-4 bg-gray-700 rounded-xl text-gray-200 text-lg shadow-md border border-gray-600">
            <strong>Explanation:</strong> {explanation}
          </div>
        )}
      </div>
    </div>
  );
}
