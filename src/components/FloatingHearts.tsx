"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  color: string;
}

export default function FloatingHearts({ variant = "love" }: { variant?: "love" | "friend" }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const loveColors = [
    "rgba(244, 63, 94, 0.15)",
    "rgba(251, 113, 133, 0.12)",
    "rgba(253, 164, 175, 0.18)",
    "rgba(225, 29, 72, 0.08)",
    "rgba(190, 18, 60, 0.06)",
  ];

  const friendColors = [
    "rgba(251, 191, 36, 0.12)",
    "rgba(245, 158, 11, 0.10)",
    "rgba(217, 119, 6, 0.08)",
    "rgba(252, 211, 77, 0.15)",
    "rgba(180, 83, 9, 0.06)",
  ];

  const colors = variant === "love" ? loveColors : friendColors;

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 3}px`,
      duration: `${Math.random() * 12 + 8}s`,
      delay: `${Math.random() * 15}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generated);
  }, [variant]);

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </>
  );
}
