"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const apiWebServer = process.env.NEXT_PUBLIC_API_WEB_SERVER;
  const router = useRouter();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");

  // Redirect if token exists
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      router.push("/learninghub");
    }
  }, [router]);

  // Custom alert
  const customAlert = (message: string) => {
    setAlertMessage(message);
  };
  const closeAlert = () => setAlertMessage(null);

  // Toggle chat
  const toggleChat = () => setChatOpen((prev) => !prev);

  // Send message to AI
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const userMessage = input;
    setInput("");

    try {
      const res = await fetch(`${apiWebServer}/api/bot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage }),
      });
      const data = await res.json();
      typeWriterEffect(data.msg);
    } catch (err) {
      typeWriterEffect("Error: Unable to get response from AI");
    }
  };

  // A reference to the chat container element (you need to get this from your JSX)
const chatContainerRef = useRef<HTMLDivElement>(null);

const typeWriterEffect = (message: string) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < message.length) {
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        
        // This is the key fix for the first letter issue
        if (last && last.sender === "bot" && last.text !== "") {
          return [...prev.slice(0, -1), { sender: "bot", text: last.text + message[i] }];
        } else {
          // This handles the first character correctly or if the last message isn't from the bot
          return [...prev, { sender: "bot", text: message[i] }];
        }
      });
      i++;
      // The ref is now explicitly typed as an HTMLDivElement or null


// You must also check that the ref exists before using it
if (chatContainerRef.current) {
  chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
}

      
    } else {
      clearInterval(interval);
    }
  }, 37);
};

  return (
    <div id="ratio16_9"
    style={{
      background: 'white',
    }}>
      {/* Custom Alert */}
      {alertMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white rounded-lg shadow-lg z-50">
          <div className="border-l-8 border-green-600 p-4">
            <div className="text-green-700 font-semibold text-lg">Message</div>
            <div className="text-gray-800 text-sm mt-2">{alertMessage}</div>
            <div className="mt-4 text-right">
              <button
                onClick={closeAlert}
                className="px-4 py-2 bg-green-600 text-white rounded-md"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="fixed z-2 flex h-[12vw] top-[-1.2vw] left-[5vw]">
        <div className="w-[7vw] mt-[2vw] ">
          <img
            className="rounded-full"
            style={{ background: "white", border: "0.3vw solid white" }}
            src="/logo.png"
            alt="logo"
          />
        </div>
        <div className="flex flex-col justify-start items-start">
          <img className="h-[8vw] w-[17vw]" src="/lettering.png" alt="lettering" />
        </div>
      </div>

      <div id="header" className="top-0 fixed bg-green-700 w-full flex justify-end p-4">
        <button
          className="bg-white px-4 py-2 rounded-md text-green-700 font-semibold"
          onClick={() => router.push("/signup")}
        >
          Sign-up
        </button>
      </div>

      {/* Hero */}
      <div className="mt-[3%] w-full h-[51vw] bg-white">
        <img className="h-[99%] w-full m-0" src="/homepage.png" alt="homepage" />
      </div>

      {/* Features */}
      <div className="flex flex-row w-full h-[40vw] px-[5vw]">
        {/* Left box */}
        <div className="flex flex-1">
          <div className="flex flex-col items-start justify-start border-4 border-green-800 rounded-[5vw] w-[97%] h-[90%] p-4">
            <div className="text-green-700 font-bold text-[2vw] my-4">EXPLORE OUR FEATURES</div>
            <ul className="list-disc text-green-700 space-y-2">
              <li>
                <b>Interactive Study Tools:</b> Engage with flashcards, quizzes, and simulations.
              </li>
              <li>
                <b>Progress Tracking:</b> Monitor your journey with dashboards and analytics.
              </li>
              <li>
                <b>Curriculum-Aligned Content:</b> Materials tailored to your nursing program.
              </li>
              <li>
                <b>Resource Library:</b> Access notes, reviewers, and case studies.
              </li>
            </ul>
          </div>
        </div>

        {/* Right box */}
        <div className="flex flex-[0.8]">
          <div className="flex flex-col items-start justify-start border-4 border-green-800 rounded-[5vw] w-[97%] h-[90%] p-4">
            <div className="text-green-700 font-bold text-[2vw] my-4">WHY CHOOSE NURSYNC</div>
            <ul className="list-disc text-green-700 space-y-2">
              <li>
                <b>Empowerment:</b> Develop self-efficacy and decision-making skills.
              </li>
              <li>
                <b>Flexibility:</b> Learn at your own pace with 24/7 access.
              </li>
              <li>
                <b>Community Support:</b> Join a network of nursing peers and professionals.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-start w-full bg-green-700 text-white p-[5vw]">
        <div className="text-[4.5vw] font-bold">NurSYNC</div>
        <div className="flex space-x-8 mt-4 underline">
          <a href="/signup">Signup</a>
          <a href="/login">Login</a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=your-email@gmail.com&su=Subject&body=Message"
            target="_blank"
          >
            Send me a message
          </a>
        </div>
        <hr className="border-gray-300 w-[90%] mt-6" />
        <div className="text-gray-300 mt-2 text-[2.6vw]">Philippines</div>
        <div className="text-gray-300 mt-2 text-[2.6vw]">© 2025 NurSYNC</div>
      </div>

      {/* Chat Button */}
      <div
        onClick={toggleChat}
        className="fixed text-black bottom-[3vw] right-[3vw] px-4 py-2 bg-white rounded-[3vw] flex items-center cursor-pointer shadow-md"
      >
        Chat NurSYNC AI
        <img
          className="w-[2vw] h-[2vw] ml-2 rounded-full"
          src="/bot.png"
          alt="bot"
        />
      </div>

      {/* Chat Box */}
      {chatOpen && (
        <div className="fixed text-black bottom-[7vw] right-[2vw] w-[33vw] h-[40vw] bg-white border-4 border-gray-300 rounded-[2vw] flex flex-col z-50">
          <div className="bg-green-700 text-white p-2 rounded-t-3xl">NurSYNC AI</div>
          <div className="flex-grow p-2 overflow-y-auto border-b-4 border-gray-300">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`my-1 p-2 rounded-lg ${
                  m.sender === "user" ? "text-right" : "bg-gray-200 text-left"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="text-[1vw] w-full p-2 border-none rounded-b-lg"
          />
        </div>
      )}
    </div>
  );
}
