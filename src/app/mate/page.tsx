"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import FloatingHearts from "@/components/FloatingHearts";
import LoveEnvelope from "@/components/LoveEnvelope";
import ValentineButton from "@/components/ValentineButton";
import ScrollQuotes from "@/components/ScrollQuotes";
import LetterEnvelope from "@/components/LetterEnvelope";
import ScrollModal from "@/components/ScrollModal";

const quotes = [
  "A real friend walks in when the rest of the world walks out.",
  "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'",
  "There is nothing I would not do for those who are really my friends. I have no notion of loving people by halves; it is not my nature.",
  "In the end, we will remember not the words of our enemies, but the silence of our friends.",
];

function MateContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [letterOpened, setLetterOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const letterRef = useRef<HTMLElement>(null);
  const questionRef = useRef<HTMLElement>(null);

  const displayName = name || "Brother";

  useEffect(() => {
    if (!envelopeOpened || letterOpened) return;

    const handleScroll = () => {
      if (!letterRef.current || !questionRef.current) return;

      const letterRect = letterRef.current.getBoundingClientRect();
      const questionRect = questionRef.current.getBoundingClientRect();
      
      // Check if user is scrolling past the letter section (question section is visible)
      if (questionRect.top < window.innerHeight && !letterOpened) {
        setShowModal(true);
        // Scroll back to letter section
        letterRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [envelopeOpened, letterOpened]);

  return (
    <main className="relative min-h-screen bg-amber-50">
      <FloatingHearts variant="friend" />
      <ScrollModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        variant="friend"
      />

      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          <LoveEnvelope
            key="envelope"
            name={name || undefined}
            variant="friend"
            onOpen={() => setEnvelopeOpened(true)}
          />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative z-10"
          >
            {/* ─── Hero ─── */}
            <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1.5 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Heart icon */}
                <motion.svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#92400e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 }}
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </motion.svg>

                <motion.div
                  className="w-12 h-px bg-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.8, duration: 1 }}
                />

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-5xl md:text-8xl font-serif text-amber-900 leading-tight"
                >
                  Happy<br />Broentine&apos;s Day
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="text-xl md:text-2xl font-script text-amber-600 mt-2"
                >
                  — {displayName} —
                </motion.p>

                <motion.div
                  className="w-12 h-px bg-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 1.5, duration: 1 }}
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="mt-12"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" as const }}
                    className="text-amber-400 text-sm tracking-[0.3em] uppercase"
                  >
                    scroll down
                  </motion.div>
                </motion.div>
              </motion.div>
            </section>

            {/* ─── Scroll Quotes ─── */}
            <ScrollQuotes quotes={quotes} variant="friend" />

            {/* ─── Letter Envelope ─── */}
            <LetterEnvelope 
              ref={letterRef}
              name={name || undefined} 
              variant="friend"
              isOpen={letterOpened}
              onOpen={() => setLetterOpened(true)}
            />

            {/* ─── The Question ─── */}
            <section ref={questionRef} className="min-h-screen flex items-center justify-center px-8 bg-amber-50">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" as const }}
                className="max-w-2xl mx-auto w-full"
              >
                <ValentineButton variant="friend" />
              </motion.div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function MatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-amber-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-amber-400"
          />
        </div>
      }
    >
      <MateContent />
    </Suspense>
  );
}
