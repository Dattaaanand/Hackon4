
import Image from "next/image";
import AttendTest from "../app/AttendTest/page"
import Chatbot from "../app/chatbot/page"

export default function Home() {
  return (
    <>
      {/* redirect("/Quizes"); */}
      {/* <AttendTest/> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-950">
        <Chatbot />
      </div>
    </>
  );
}
