"use client";

import { useMemo, useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "normal" | "glow" | "gold";
}

export function StarField() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  const stars = useMemo<Star[]>(() => {
    const rand = (index: number, salt: number) => {
      const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453123;
      return value - Math.floor(value);
    };

    const generatedStars: Star[] = [];
    const starCount = 80;

    for (let i = 0; i < starCount; i++) {
      const r1 = rand(i, 1);
      const r2 = rand(i, 2);
      const r3 = rand(i, 3);
      const r4 = rand(i, 4);
      const r5 = rand(i, 5);
      const r6 = rand(i, 6);
      const r7 = rand(i, 7);
      const type =
        r1 > 0.85
          ? r2 > 0.5
            ? "gold"
            : "glow"
          : "normal";
      generatedStars.push({
        id: i,
        x: r3 * 100,
        y: r4 * 100,
        size: r5 * 2 + 1,
        delay: r6 * 5,
        duration: r7 * 3 + 2,
        type,
      });
    }

    return generatedStars;
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {mounted &&
        stars.map((star) => (
        <div
          key={star.id}
          className={`star ${star.type === "glow" ? "star-glow" : ""} ${star.type === "gold" ? "star-gold" : ""
            }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
