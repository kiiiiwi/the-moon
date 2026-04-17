"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { withBasePath } from "@/lib/base-path";

const GOLD = "#F1D088";
const GRAY = "rgba(255,255,255,0.25)";

interface BgmPlayerProps {
  src: string;
  volume?: number;
}

export function BgmPlayer({ src, volume = 0.3 }: BgmPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const audio = new Audio(withBasePath(src));
    audio.loop = true;
    audio.volume = volume;
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => { if (!cancelled) setPlaying(true); };
    const onPause = () => { if (!cancelled) setPlaying(false); };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const retryEvents: Array<keyof WindowEventMap> = [
      "pointerdown",
      "touchstart",
      "keydown",
      "wheel",
    ];

    const removeRetryListeners = () => {
      for (const eventName of retryEvents) {
        window.removeEventListener(eventName, resumePlayback);
      }
    };

    const resumePlayback = () => {
      if (cancelled) return;
      removeRetryListeners();
      audio.play().then(() => {
        if (cancelled) audio.pause();
      }).catch(() => {});
    };

    audio
      .play()
      .then(() => {
        if (cancelled) audio.pause();
        else removeRetryListeners();
      })
      .catch(() => {
        if (cancelled) return;
        setPlaying(false);
        for (const eventName of retryEvents) {
          window.addEventListener(eventName, resumePlayback);
        }
      });

    return () => {
      cancelled = true;
      removeRetryListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audioRef.current = null;
    };
  }, [src, volume]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const color = playing ? GOLD : GRAY;
  const shadow = playing ? `0 0 10px ${GOLD}55` : "none";

  return (
    <button
      type="button"
      aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
      onClick={toggle}
      style={{
        position: "fixed",
        top: 52,
        left: 52,
        zIndex: 60,
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: `1.5px solid ${color}`,
        background: "rgba(21,24,41,0.45)",
        backdropFilter: "blur(6px)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: shadow,
        transition: "border-color 0.35s, box-shadow 0.35s",
        animation: playing ? "bgm-spin 4s linear infinite" : "none",
        padding: 0,
      }}
    >
      {/* 音符 SVG */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18V6l12-3v12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 0.35s" }}
        />
        <circle
          cx="6"
          cy="18"
          r="3"
          fill={color}
          style={{ transition: "fill 0.35s" }}
        />
        <circle
          cx="18"
          cy="15"
          r="3"
          fill={color}
          style={{ transition: "fill 0.35s" }}
        />
      </svg>
    </button>
  );
}
