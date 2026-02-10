"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import HeartSVG from "./HeartSVG";

interface ValentineButtonProps {
  variant?: "love" | "friend";
}

export default function ValentineButton({
  variant = "love",
}: ValentineButtonProps) {
  const [answered, setAnswered] = useState<"yes" | null>(null);
  const [noCount, setNoCount] = useState(0);
  const isLove = variant === "love";

  const question = isLove
    ? "Would you be my Valentine?"
    : "Would you be my Broentine?";

  const yesResponse = isLove
    ? "You just made my heart complete."
    : "Best duo. No debate.";

  const noTexts = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again...",
    "Last chance!",
    "You can't say no",
    "I won't give up",
    "...",
  ];

  const handleNo = () => {
    setNoCount((prev) => Math.min(prev + 1, noTexts.length - 1));
  };

  // Yes button grows, No button shrinks
  const yesScale = 1 + noCount * 0.12;
  const noScale = Math.max(0.6, 1 - noCount * 0.08);
  const noOpacity = Math.max(0.25, 1 - noCount * 0.12);

  const textPrimary = isLove ? "text-rose-800" : "text-amber-800";
  const textMuted = isLove ? "text-rose-400" : "text-amber-500";

  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {answered === null ? (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-10"
          >
            {/* Question */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`text-4xl md:text-6xl lg:text-7xl font-serif text-center leading-tight ${textPrimary}`}
            >
              {question}
            </motion.h2>

            {/* Buttons row */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex gap-6 items-center mt-4"
            >
              {/* YES button */}
              <motion.button
                style={{ padding: "10px 25px" }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: yesScale }}
                transition={{ type: "spring", stiffness: 180, damping: 14 }}
                onClick={() => setAnswered("yes")}
                className={`relative px-10 py-4 md:px-14 md:py-5 rounded-full text-white font-serif text-lg md:text-xl tracking-wide cursor-pointer ${
                  isLove ? "bg-rose-600 hover:bg-rose-700" : "bg-amber-600 hover:bg-amber-700"
                } shadow-xl ${isLove ? "shadow-rose-300/50" : "shadow-amber-300/50"}`}
              >
                Yes, I do
              </motion.button>

              {/* NO button */}
              {noTexts[noCount] !== "..." && (
                <motion.button
                  style={{ padding: "10px 25px" }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: noScale,
                    opacity: noOpacity,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 16 }}
                  onClick={handleNo}
                  className={`px-8 py-4 md:px-10 md:py-5 rounded-full font-serif text-base md:text-lg cursor-pointer border-2 ${
                    isLove
                      ? "border-rose-300 text-rose-500 hover:border-rose-400"
                      : "border-amber-300 text-amber-600 hover:border-amber-400"
                  } bg-transparent`}
                >
                  {noTexts[noCount]}
                </motion.button>
              )}
            </motion.div>

            {/* Hint after pressing No */}
            <AnimatePresence>
              {noCount >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm italic font-serif ${textMuted}`}
                >
                  {noCount >= 5
                    ? "There's no escaping this one..."
                    : isLove
                      ? "Your heart already knows the answer..."
                      : "Come on, you know we're unbeatable..."}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center flex flex-col items-center gap-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 10,
                delay: 0.2,
              }}
            >
              <HeartSVG
                color={isLove ? "#e11d48" : "#d97706"}
                size={80}
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`text-3xl md:text-5xl font-serif leading-snug ${textPrimary}`}
            >
              {yesResponse}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className={`text-base font-serif italic max-w-md leading-relaxed ${textMuted}`}
            >
              {isLove
                ? "Every moment with you is a gift I'll forever cherish."
                : "Through everything — you and me, always."}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
