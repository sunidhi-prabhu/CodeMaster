// import React, { useState } from "react";
// import ChatWindow from "../components/ChatWindow";
// import StarBackground from "../components/StarBackground";
// import { useChatApi } from "../hooks/useChatApi";

// const ChatPage = () => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const { sendMessage, loading } = useChatApi();

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     // Add user message
//     setChatHistory((prev) => [...prev, { sender: "user", text: message }]);

//     const res = await sendMessage(message);

//     if (res.success) {
//       setChatHistory((prev) => [
//         ...prev,
//         { sender: "assistant", text: res.response },
//       ]);
//     } else {
//       setChatHistory((prev) => [
//         ...prev,
//         { sender: "assistant", text: res.response, isError: true },
//       ]);
//     }
//     setMessage("");
//   };

//   return (
//     <div className="relative h-screen w-screen flex flex-col text-white">
//       <StarBackground />
//       <div className="relative flex flex-col flex-1 z-10">
//         {/* Header */}
//         <div className="p-4 text-center bg-black/30 backdrop-blur-md border-b border-white/10">
//           <h1 className="text-xl font-bold tracking-wide text-purple-300">
//             🌌 Cosmic Chatbot
//           </h1>
//         </div>

//         {/* Chat window */}
//         <ChatWindow chatHistory={chatHistory} loading={loading} />

//         {/* Input */}
//         <form
//           onSubmit={handleSend}
//           className="p-4 flex space-x-2 bg-black/30 backdrop-blur-md"
//         >
//           <input
//             className="flex-1 p-2 rounded-xl bg-zinc-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import StarBackground from "../components/StarBackground";
import { useChatApi } from "../hooks/useChatApi";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { sendMessage, loading } = useChatApi();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "user", text: message }]);

    const res = await sendMessage(message);

    if (res.success) {
      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: res.response },
      ]);
    } else {
      setChatHistory((prev) => [
        ...prev,
        { sender: "assistant", text: res.response, isError: true },
      ]);
    }
    setMessage("");
  };

  return (
    <div className="relative h-screen w-screen flex flex-col text-white">
      <StarBackground />

      <div className="relative flex flex-col items-center justify-center flex-1 z-10">
        {/* Chat box with header + window + input */}
        <div className="w-full max-w-3xl h-[80vh] bg-black/50 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-md flex flex-col">
          {/* Header */}
          <div className="p-4 text-center border-b border-white/10">
            <h1 className="text-xl font-bold tracking-wide text-purple-300">
              🌌 Cosmic Chatbot
            </h1>
          </div>

          {/* Chat window */}
          <div className="flex-1 overflow-hidden">
            <ChatWindow chatHistory={chatHistory} loading={loading} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-4 flex space-x-2 border-t border-white/10"
          >
            <input
              className="flex-1 p-2 rounded-xl bg-zinc-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold hover:scale-105 transition disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
