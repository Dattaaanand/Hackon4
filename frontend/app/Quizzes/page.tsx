"use client";

import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();

  const subjects = ["Mathematics", "Physics", "History", "Geography", "English"];

  const handleSubjectClick = (subject: string) => {
    router.push(`/Select_topic?subject=${encodeURIComponent(subject)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-800 py-4 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400">Quiz App</h1>
          <ul className="flex gap-6 text-gray-300 text-sm">
            <li className="hover:text-white transition"><a href="#">Home</a></li>
            <li className="hover:text-white transition"><a href="#">Quizzes</a></li>
            <li className="hover:text-white transition"><a href="#">Leaderboard</a></li>
            <li className="hover:text-white transition"><a href="#">Profile</a></li>
          </ul>
        </div>
      </nav>

      {/* Select Subject Section */}
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold mb-4">Select a Subject</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => handleSubjectClick(subject)}
              className="p-6 bg-gray-700 rounded-lg shadow-lg text-center font-semibold hover:bg-gray-600 transition"
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
