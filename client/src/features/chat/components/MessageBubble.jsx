import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const MessageBubble = ({ sender, text, isError }) => {
  let styles =
    sender === "user"
      ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white self-end"
      : "bg-purple-700/40 text-white self-start";

  if (isError) {
    styles = "bg-red-200 text-black self-start";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-xs p-3 rounded-2xl shadow-md ${styles}`}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </motion.div>
  );
};

export default MessageBubble;
