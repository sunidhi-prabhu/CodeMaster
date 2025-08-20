// import React, { useEffect, useRef } from "react";
// import MessageBubble from "./MessageBubble";
// import TypingIndicator from "./TypingIndicator";

// const ChatWindow = ({ chatHistory, loading }) => {
//   const chatRef = useRef(null);

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [chatHistory, loading]);

//   return (
//     <div
//       ref={chatRef}
//       className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 text-white rounded-2xl shadow-inner"
//     >
//       {chatHistory.map((msg, idx) => (
//         <div
//           key={idx}
//           className={`flex ${
//             msg.sender === "user" ? "justify-end" : "justify-start"
//           }`}
//         >
//           <MessageBubble
//             sender={msg.sender}
//             text={msg.text}
//             isError={msg.isError}
//           />
//         </div>
//       ))}
//       {loading && (
//         <div className="flex justify-start">
//           <TypingIndicator />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const ChatWindow = ({ chatHistory, loading }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6">
      <div
        ref={chatRef}
        className="w-full max-w-3xl h-[70vh] overflow-y-auto p-4 space-y-4 
                   bg-gray-900/90 text-white rounded-2xl shadow-2xl border border-purple-700/30
                   backdrop-blur-md"
      >
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <MessageBubble
              sender={msg.sender}
              text={msg.text}
              isError={msg.isError}
            />
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;

