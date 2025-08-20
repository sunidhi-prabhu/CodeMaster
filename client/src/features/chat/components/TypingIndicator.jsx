import React from "react";
import { motion } from "framer-motion";

const TypingIndicator = () => {
  const dots = [0, 1, 2];

  return (
    <div className="flex items-center space-x-2 p-3">
      {/* Orbiting cosmic loader */}
      <motion.div
        className="w-4 h-4 rounded-full bg-pink-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      {/* Typing dots */}
      <div className="flex space-x-1">
        {dots.map((d) => (
          <motion.span
            key={d}
            className="w-2 h-2 bg-teal-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: d * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;
// This component displays a typing indicator with orbiting cosmic loader and bouncing dots.