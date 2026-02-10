"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import HeartSVG from "./HeartSVG";

interface LoveEnvelopeProps {
  name?: string;
  variant?: "love" | "friend";
  onOpen: () => void;
}

export default function LoveEnvelope({ name, variant = "love", onOpen }: LoveEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(true);
    setTimeout(onOpen, 1500);
  };

  const displayName = name || (variant === "love" ? "Someone Special" : "My Dear Friend");
  const isLove = variant === "love";

  return (
    <motion.div
      className={`flex flex-col items-center justify-center min-h-screen gap-10 cursor-pointer select-none ${
        isLove ? "bg-rose-50/80" : "bg-amber-50/80"
      }`}
      onClick={!isOpened ? handleClick : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Decorative line */}
      <motion.div
        className={`w-16 h-px ${isLove ? "bg-rose-300" : "bg-amber-400"}`}
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 0.3, duration: 1 }}
      />

      <motion.p
        className={`text-lg md:text-xl tracking-widest uppercase font-serif ${
          isLove ? "text-rose-400" : "text-amber-600"
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {isLove ? "For You" : "To a great one"}
      </motion.p>

      <motion.h1
        className={`text-4xl md:text-6xl font-script ${
          isLove ? "text-rose-600" : "text-amber-700"
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        {displayName}
      </motion.h1>

      {/* Heart icon instead of emoji */}
      <motion.div
        animate={
          isOpened
            ? { scale: 1.3, y: -40, opacity: 0 }
            : {}
        }
        transition={
          isOpened
            ? { duration: 1.2, ease: "easeInOut" as const }
            : {}
        }
        className="soft-pulse"
      >
        <HeartSVG
          color={isLove ? "#e11d48" : "#d97706"}
          size={isLove ? 70 : 60}
        />
      </motion.div>

      {!isOpened && (
        <motion.p
          className={`text-xs tracking-[0.3em] uppercase ${
            isLove ? "text-rose-300" : "text-amber-400"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          tap anywhere to open
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        className={`w-16 h-px ${isLove ? "bg-rose-300" : "bg-amber-400"}`}
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
    </motion.div>
  );
}
