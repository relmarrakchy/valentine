"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface Quote {
  text: string;
  author: string;
}

interface QuoteCarouselProps {
  quotes: Quote[];
  variant?: "love" | "friend";
}

export default function QuoteCarousel({ quotes, variant = "love" }: QuoteCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isLove = variant === "love";

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % quotes.length);
  }, [quotes.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, [quotes.length]);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current, next]);

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 60 : -60,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -60 : 60,
      transition: { duration: 0.5, ease: "easeIn" as const },
    }),
  };

  const accentColor = isLove ? "bg-rose-300" : "bg-amber-400";
  const textColor = isLove ? "text-rose-800" : "text-amber-900";
  const authorColor = isLove ? "text-rose-400" : "text-amber-500";
  const dotActive = isLove ? "bg-rose-400" : "bg-amber-500";
  const dotInactive = isLove ? "bg-rose-200" : "bg-amber-200";
  const arrowColor = isLove ? "text-rose-300 hover:text-rose-500" : "text-amber-300 hover:text-amber-500";

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Top decorative line */}
      <motion.div
        className={`w-8 h-px ${accentColor} absolute top-16`}
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
      />

      <p className={`text-xs tracking-[0.4em] uppercase ${authorColor} absolute top-20`}>
        Words that move
      </p>

      {/* Quote area */}
      <div className="relative w-full max-w-2xl min-h-[280px] flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            <blockquote className="text-center px-4">
              <p className={`text-2xl md:text-4xl font-serif ${textColor}/80 italic leading-relaxed`}>
                &ldquo;{quotes[current].text}&rdquo;
              </p>
              <motion.div
                className={`mx-auto mt-6 h-px ${accentColor}`}
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />
              <footer className={`mt-4 text-sm tracking-widest uppercase ${authorColor}`}>
                — {quotes[current].author}
              </footer>
            </blockquote>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8 mt-12">
        <button
          onClick={prev}
          className={`${arrowColor} transition-colors cursor-pointer text-lg font-serif`}
          aria-label="Previous quote"
        >
          &larr;
        </button>

        <div className="flex gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                i === current ? `${dotActive} w-6` : dotInactive
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className={`${arrowColor} transition-colors cursor-pointer text-lg font-serif`}
          aria-label="Next quote"
        >
          &rarr;
        </button>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className={`w-8 h-px ${accentColor} absolute bottom-16`}
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
      />
    </section>
  );
}
