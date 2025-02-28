"use client";

import { useState } from "react";

export default function OhmsLawQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: string }>({});

  const questions = [
    {
      id: 1,
      question: "Which Law explains the following? At constant temperature the current flowing through a conductor is directly proportional to the potential difference between its ends.",
      options: ["Ohm's Law", "Boyle's Law", "Charle's Law", "Joule's Law"],
    },
    {
      id: 2,
      question: "What does the current through a wire depend on?",
      options: ["The potential difference applied.", "The resistance of the wire.", "Both resistance and potential difference.", "The thickness of the wire."],
    },
    {
      id: 3,
      question: "You are measuring the current in a circuit that is operated on an 18 V battery. The ammeter reads 40 mA. Later you notice the current has dropped to 20 mA. How much has the voltage changed?",
      options: ["18 v", "0 v", "36 v", "9 v"],
    },
    {
      id: 4,
      question: "What is the shape of V v/s I graph for a linear resistor?",
      options: ["None of these", "Hyperbola", "Straight line", "Parabola"],
    },
    {
      id: 5,
      question: "Which of the following represent ohm's law?",
      options: ["Current = Resistance / Potential difference", "Potential difference / current = Resistance", "None of these", "Current = Resistance x potential difference."],
    },
    {
      id: 6,
      question: "What is the potential difference required to pass a current of 5A through a metallic rod of resistance 10Ω?",
      options: ["0.05V", "50V", "0.5V", "5V"],
    },
    {
      id: 7,
      question: "Choose the correct statement from the alternatives?",
      options: ["Resistance of a material is the measure of how much it opposes the passage of free electrons.", "Every material has resistance.", "All of them are true", "The resistance of a material is independent of the current passing through it."],
    },
    {
      id: 8,
      question: "What is the resistor value in the given circuit?",
      options: ["4 k Ω", "200 Ω", "2 k Ω", "1 k Ω"],
    },
    {
      id: 9,
      question: "Which one of the following is the resistivity of gold wire?",
      options: ["2.82 x 10^-8 Ωm", "1.59 x 10^-8 Ωm", "2.44 x 10^-8 Ωm", "100 x 10^-8 Ωm"],
    },
    {
      id: 10,
      question: "If the voltage across a fixed value of resistance is increased five times, what will be the variation in current?",
      options: ["Decreases to a factor of five", "Remains fixed", "Increases to a factor of five", "Become doubled"],
    }
  ];

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswer((prev) => ({ ...prev, [questionId]: answer }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <nav className="w-full bg-gray-800 py-4 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400">Ohm's Law Quiz</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">Ohm's Law and Resistance Quiz</h2>
        <p className="text-gray-300 mb-6">Welcome to the Ohm's Law Quiz.</p>
        
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="p-4 bg-gray-700 rounded-lg shadow-lg">
              <p className="font-semibold mb-2">{q.question}</p>
              <div className="grid grid-cols-2 gap-4">
                {q.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswerSelect(q.id, option)}
                    className={`p-2 rounded-lg transition ${
                      selectedAnswer[q.id] === option ? "bg-blue-500" : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
  