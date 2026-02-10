"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollQuotesProps {
  quotes: string[];
  variant?: "love" | "friend";
}

function QuoteBlock({
  text,
  index,
  totalQuotes,
}: {
  text: string;
  index: number;
  totalQuotes: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Fade in at beginning, stay visible, then fade out at end
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.95]);

  return (
    <div ref={ref} className="h-screen relative">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-12">
        <motion.blockquote
          style={{ opacity, scale }}
          className="max-w-3xl text-center"
        >
          <p className="text-3xl md:text-5xl lg:text-6xl font-serif text-black italic leading-tight md:leading-tight">
            &ldquo;{text}&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </div>
  );
}

export default function ScrollQuotes({ quotes, variant = "love" }: ScrollQuotesProps) {
  return (
    <section>
      {quotes.map((quote, i) => (
        <QuoteBlock 
          key={i} 
          text={quote} 
          index={i}
          totalQuotes={quotes.length}
        />
      ))}
    </section>
  );
}
