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

  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-question");
      const data: QuestionData = await response.json();

      if (data.question) {
        setQuestionData(data);
        setSelectedAnswer("");
        setFeedback("");
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
    } catch (error) {
      setFeedback("Error submitting answer.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ohm's Law Quiz</h1>

        {questionData ? (
          <div>
            <p className="text-gray-700 text-lg mb-4">{questionData?.question}</p>
            <div className="flex flex-col items-start">
              {(["A", "B", "C", "D"] as const).map((option) => (
                <label
                  key={option}
                  className="w-full p-2 bg-gray-800 text-white rounded-lg my-2 cursor-pointer hover:bg-gray-900"
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswer === option}
                    className="mr-2"
                    onChange={() => setSelectedAnswer(option)}
                  />
                  {questionData?.[option]}
                </label>
              ))}
            </div>
            <button
              onClick={submitAnswer}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition mt-4"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <p className="text-gray-600 mb-4">Click the button to generate a question!</p>
        )}

        <button
          onClick={fetchQuestion}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition mt-6"
        >
          Get Question
        </button>

        {feedback && <p className="mt-4 text-lg font-medium">{feedback}</p>}
      </div>
    </div>
  );
}
