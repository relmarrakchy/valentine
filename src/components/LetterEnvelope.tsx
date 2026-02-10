"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, forwardRef } from "react";

interface LetterEnvelopeProps {
  name?: string;
  variant?: "love" | "friend";
  isOpen?: boolean;
  onOpen?: () => void;
}

const LetterEnvelope = forwardRef<HTMLElement, LetterEnvelopeProps>(function LetterEnvelope(
  {
    name,
    variant = "love",
    isOpen = false,
    onOpen,
  },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLove = variant === "love";

  const handleOpen = () => {
    if (!isOpen && onOpen) onOpen();
  };

  const accentText = isLove ? "text-rose-500" : "text-amber-600";
  const bodyText = isLove ? "text-rose-900/70" : "text-amber-900/70";
  const closingText = isLove ? "text-rose-700" : "text-amber-700";
  const sealBg = isLove ? "bg-rose-500" : "bg-amber-500";
  const sealBorder = isLove ? "border-rose-400" : "border-amber-400";
  const envBody = isLove ? "bg-rose-100" : "bg-amber-100";
  const envFlap = isLove
    ? "from-rose-200 to-rose-100"
    : "from-amber-200 to-amber-100";
  const envShadow = isLove
    ? "shadow-rose-200/40"
    : "shadow-amber-200/40";
  const lineColor = isLove ? "bg-rose-200" : "bg-amber-200";

  const greeting = isLove
    ? name
      ? `Dearest ${name},`
      : "To you,"
    : name
      ? `Dear ${name},`
      : "To my brother,";

  const letterBody = isLove
    ? name
      ? "There are not enough words in any language to tell you how much you mean to me. You are the quiet in my chaos, the warmth in my winters, the reason my heart feels full. Every day with you is a love letter written by the universe itself."
      : "Some people search their whole lives for what I've found in you. You are the poem I could never write, the song I could never sing, the sunrise I never want to miss. You make the ordinary feel sacred."
    : name
      ? "You're not just a friend — you're family I chose. Through every challenge, every late-night conversation, every moment of doubt, you've been the constant I could always count on. Some bonds don't need explaining. Ours is one of them."
      : "Some friendships are forged in fire and tempered by time. You are the kind of person who makes everyone around you better — stronger, braver, more honest. The world is a better place because you're in it, and my life is richer because you're in mine.";

  const closing = isLove ? "You are my always." : "Brothers for life.";

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-4 py-12 md:py-24">
      <div
        ref={containerRef}
        className="relative w-full max-w-lg mx-auto cursor-pointer"
        onClick={handleOpen}
        style={{ perspective: "1200px" }}
      >
        {/* ─── Envelope body ─── */}
        <motion.div
          className={`relative ${envBody} rounded-lg shadow-xl ${envShadow} overflow-visible`}
          animate={{
            height: isOpen ? "auto" : "auto",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ minHeight: isOpen ? "auto" : "300px" }}
        >
          {/* ─── Envelope flap (triangle) ─── */}
          <motion.div
            className={`absolute top-0 left-0 right-0 h-[150px] md:h-[210px] bg-gradient-to-b ${envFlap} origin-top z-20 rounded-t-lg`}
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: isOpen ? 180 : 0,
              opacity: isOpen ? 0 : 1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* ─── Wax seal ─── */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="absolute z-30 left-1/2 -translate-x-1/2 top-[120px] md:top-[168px]"
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${sealBg} border-2 md:border-4 ${sealBorder} flex items-center justify-center shadow-lg`}
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── "Tap to open" text ─── */}
          <AnimatePresence>
            {!isOpen && (
              <motion.p
                className={`absolute bottom-4 md:bottom-8 left-0 right-0 text-center text-xs tracking-[0.3em] uppercase ${accentText}/60`}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                exit={{ opacity: 0 }}
              >
                tap to open
              </motion.p>
            )}
          </AnimatePresence>

          {/* ─── Letter paper (slides up from envelope) ─── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="relative z-10"
              >
                <div className="relative rounded-lg overflow-hidden flex min-h-[300px] md:min-h-[420px]">
                  {/* Tinted left margin strip */}
                  <div
                    className="shrink-0 relative w-6 md:w-10"
                    style={{
                      backgroundColor: isLove ? "rgba(251, 207, 232, 0.35)" : "rgba(254, 243, 199, 0.4)",
                    }}
                  >
                    {/* Horizontal lines on the margin too */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          transparent,
                          transparent 27px,
                          ${isLove ? "rgba(219, 39, 119, 0.08)" : "rgba(217, 119, 6, 0.08)"} 27px,
                          ${isLove ? "rgba(219, 39, 119, 0.08)" : "rgba(217, 119, 6, 0.08)"} 28px
                        )`,
                        backgroundPosition: "0 34px",
                      }}
                    />
                  </div>

                  {/* Margin line */}
                  <div
                    className="shrink-0 w-[2px]"
                    style={{
                      backgroundColor: isLove ? "#fb7185" : "#fbbf24",
                      opacity: 0.3,
                    }}
                  />

                  {/* White writing area */}
                  <div
                    className="flex-1 relative"
                    style={{
                      backgroundColor: isLove ? "#fffcfa" : "#fffdf5",
                      backgroundImage: `repeating-linear-gradient(
                        transparent,
                        transparent 27px,
                        ${isLove ? "rgba(219, 39, 119, 0.06)" : "rgba(217, 119, 6, 0.06)"} 27px,
                        ${isLove ? "rgba(219, 39, 119, 0.06)" : "rgba(217, 119, 6, 0.06)"} 28px
                      )`,
                      backgroundPosition: "0 34px",
                      border: `1px solid ${isLove ? "rgba(244, 63, 94, 0.08)" : "rgba(217, 119, 6, 0.08)"}`,
                      borderLeft: "none",
                    }}
                  >
                    {/* Content */}
                    <div className="relative px-4 py-8 md:px-10 md:py-16 lg:px-14 lg:py-20">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-xl md:text-2xl lg:text-3xl font-script text-black mb-6 md:mb-8 leading-relaxed"
                      >
                        {greeting}
                      </motion.p>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                        className="text-base md:text-lg lg:text-xl leading-relaxed md:leading-[2.2] text-black font-script"
                      >
                        {letterBody}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.6, duration: 0.6 }}
                        className="mt-8 md:mt-14 flex flex-col items-end"
                      >
                        <p className="text-lg md:text-xl lg:text-2xl font-script text-black leading-relaxed">
                          {closing}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
});

export default LetterEnvelope;
