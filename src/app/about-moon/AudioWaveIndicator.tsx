"use client";

import { useMemo } from "react";

const BAR_COUNT = 28;
const GOLD = "#F1D088";
const GRAY = "rgba(255,255,255,0.18)";

interface Props {
  active: boolean;
  showPlayBtn?: boolean;
  onPlay?: () => void;
}

export function AudioWaveIndicator({ active, showPlayBtn, onPlay }: Props) {
  const bars = useMemo(() => {
    const rand = (i: number, salt: number) => {
      const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
      return v - Math.floor(v);
    };
    return Array.from({ length: BAR_COUNT }, (_, i) => ({
      delay: +(rand(i, 1) * 1.2).toFixed(2),
      maxH: 10 + rand(i, 2) * 18,
    }));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        gap: 0,
        height: 32,
      }}
    >
      {/* 播放按钮 — 位于波纹左侧 */}
      {showPlayBtn && (
        <button
          onClick={onPlay}
          aria-label="播放背景音乐"
          style={{
            marginRight: 10,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: `1px solid ${GOLD}66`,
            background: `${GOLD}12`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
            boxShadow: `0 0 10px ${GOLD}33`,
            pointerEvents: "auto",
          }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M1.5 1L11 7L1.5 13V1Z" fill={GOLD} fillOpacity={0.85} />
          </svg>
        </button>
      )}

      {/* 波纹条 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          height: 32,
          pointerEvents: "none",
        }}
      >
        {bars.map((b, i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 2,
              borderRadius: 1,
              background: active ? GOLD : GRAY,
              boxShadow: active ? `0 0 6px ${GOLD}66` : "none",
              height: active ? b.maxH : 4,
              animation: active
                ? `am-wave-bounce ${0.6 + b.delay * 0.4}s ease-in-out ${b.delay}s infinite alternate`
                : "none",
              transition: "background 0.4s, box-shadow 0.4s, height 0.4s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
