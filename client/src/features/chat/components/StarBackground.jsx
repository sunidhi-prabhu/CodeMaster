import React from "react";
import { motion } from "framer-motion";

const StarBackground = () => {
  const stars = Array.from({ length: 50 });

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#0a0a1a] via-[#1a1033] to-black z-0">
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random(),
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
// This component creates a starry background using Framer Motion for animations.