"use client";

import { useEffect, useRef } from "react";

interface ScrollQuotesProps {
  quotes: string[];
  variant?: "love" | "friend";
}

function QuoteBlock({
  text,
  index,
}: {
  text: string;
  index: number;
}) {
  return (
    <div 
      className="h-screen relative"
      data-scroll
      data-scroll-speed="1"
    >
      <div 
        className="sticky top-0 h-screen flex items-center justify-center px-6 md:px-12"
        data-scroll
        data-scroll-sticky
        data-scroll-target={`#quote-${index}`}
      >
        <blockquote
          className="max-w-3xl text-center"
          data-scroll
          data-scroll-speed="0.5"
        >
          <p
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-black italic leading-tight md:leading-tight"
          >
            &ldquo;{text}&rdquo;
          </p>
        </blockquote>
      </div>
    </div>
  );
}

export default function ScrollQuotes({ quotes, variant = "love" }: ScrollQuotesProps) {
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let locomotiveScroll: any;

    const initScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      
      if (scrollRef.current) {
        locomotiveScroll = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          smoothMobile: false,
          resetNativeScroll: true,
        });
      }
    };

    initScroll();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <section ref={scrollRef} data-scroll-container>
      {quotes.map((quote, i) => (
        <div key={i} id={`quote-${i}`}>
          <QuoteBlock text={quote} index={i} />
        </div>
      ))}
    </section>
  );
}
