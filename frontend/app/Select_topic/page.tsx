"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function SelectClass() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const router = useRouter();

  const physicsQuizzes = [
    "Ohms_Law",
    "Metre_Bridge",
    "Zener_Diode",
    "Potentiometer",
  ];

  const handleQuizClick = (quiz: string) => {
    router.push(`/Topic_quiz/${quiz}`);
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 py-4 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400">Quiz App</h1>
        </div>
      </nav>

      {/* Quiz Selection */}
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">Select a Quiz for {subject}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subject === "Physics" &&
            physicsQuizzes.map((quiz) => (
              <button
                key={quiz}
                onClick={() => handleQuizClick(quiz)}
                className="p-4 bg-gray-700 rounded-lg shadow-lg text-center font-semibold hover:bg-gray-600 transition"
              >
                {quiz.replace(".tsx", "")}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
