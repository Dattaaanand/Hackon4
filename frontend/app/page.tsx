import Link from "next/link";

export default function Home() {
  const categories = [
    { name: "PHYSICS", gradient: "from-orange-400 to-yellow-500" },
    { name: "CHEMISTRY", gradient: "from-blue-400 to-cyan-500" },
    { name: "BIOLOGY", gradient: "from-green-400 to-teal-500" },
    { name: "MATHS", gradient: "from-red-400 to-pink-500" },
    { name: "LANGUAGE", gradient: "from-purple-400 to-indigo-500" },
    { name: "SCIENCE", gradient: "from-yellow-400 to-orange-500" },
    { name: "SOCIAL SCIENCE", gradient: "from-blue-400 to-purple-500" },
    { name: "COMPUTER", gradient: "from-green-400 to-blue-500" },
    { name: "3D/AR/VR", gradient: "from-pink-400 to-red-500" },
    { name: "EDP", gradient: "from-cyan-400 to-blue-500" },
    { name: "ISL", gradient: "from-teal-400 to-green-500" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-black shadow-lg">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text 
                       bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600">
          OLABS
        </h1>
        
        <div className="flex space-x-6">
          {[
            { name: "Attend Test", path: "/AttendTest" },
            { name: "Chatbot", path: "/chatbot" },
            { name: "Quizzes", path: "/quizes" },
            { name: "Select Topic", path: "/Select_topic" },
            { name: "Topic Quiz", path: "/Topic_quiz" },
          ].map((item) => (
            <Link key={item.path} href={item.path}>
              <div className="px-4 py-2 text-lg font-semibold text-transparent bg-clip-text 
                              bg-gradient-to-r from-blue-400 via-purple-500 to-violet-600 
                              hover:text-gray-300 transition-all duration-300 cursor-pointer">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6">
        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text 
                       bg-gradient-to-r from-blue-300 to-purple-400">
          Reimagining Education Through Innovation
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl">
          Shape the future of learning by developing engaging virtual labs.
        </p>
      </div>

      {/* Card Grid */}
      <div className="px-6 py-10">
        <h2 className="text-center text-3xl font-bold mb-6 text-transparent bg-clip-text 
                       bg-gradient-to-r from-blue-400 to-purple-500">
          Explore Subjects
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="border border-gray-700 bg-gray-900 rounded-lg shadow-lg overflow-hidden 
                         transition-transform transform hover:scale-105 hover:shadow-2xl p-6"
            >
              <div className="flex items-center justify-center h-24">
                <h3 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                  {category.name}
                </h3>
              </div>
              <div className="mt-4 text-center">
                <button className={`px-4 py-2 text-sm font-semibold rounded-lg 
                                  bg-gradient-to-r ${category.gradient} text-black 
                                  hover:opacity-80 transition-all`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
