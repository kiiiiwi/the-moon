"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { withBasePath } from "@/lib/base-path";

type TabKey = "data" | "earth" | "satellites";

const TAB_AUDIO: Record<TabKey, string> = {
  data: "/about-moon/月球数据.mp3",
  earth: "/about-moon/月地对比.mp3",
  satellites: "/about-moon/卫星对比.mp3",
};

const BGM_SRC = "/about-moon/外观总起.mp3";

export function useAboutMoonAudio() {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const tabAudioRef = useRef<HTMLAudioElement | null>(null);
  /** 开场语音是否完整播放过一遍（完成前禁止播放选项卡语音） */
  const bgmIntroDoneRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  /** BGM 因 autoplay 被阻止，等待用户手动触发 */
  const [bgmBlocked, setBgmBlocked] = useState(false);
  const activeCount = useRef(0);

  const inc = useCallback(() => {
    activeCount.current += 1;
    setIsPlaying(true);
  }, []);

  const dec = useCallback(() => {
    activeCount.current = Math.max(0, activeCount.current - 1);
    if (activeCount.current === 0) setIsPlaying(false);
  }, []);

  const ensureBgmAudio = useCallback(() => {
    if (bgmRef.current) return bgmRef.current;
    const audio = new Audio(withBasePath(BGM_SRC));
    audio.volume = 0.35;
    bgmRef.current = audio;
    audio.addEventListener("play", () => {
      inc();
      setBgmBlocked(false);
    });
    audio.addEventListener("ended", () => {
      bgmIntroDoneRef.current = true;
      dec();
      bgmRef.current = null;
    });
    audio.addEventListener("pause", dec);
    return audio;
  }, [inc, dec]);

  const playBgm = useCallback(() => {
    const audio = ensureBgmAudio();
    bgmIntroDoneRef.current = false;
    audio.play().catch(() => {
      setBgmBlocked(true);
    });
  }, [ensureBgmAudio]);

  /** 用户点击按钮手动触发 BGM（绕过 autoplay 限制） */
  const resumeBgm = useCallback(() => {
    const audio = ensureBgmAudio();
    bgmIntroDoneRef.current = false;
    audio.play().catch(() => {});
  }, [ensureBgmAudio]);

  const playTab = useCallback(
    (tab: TabKey) => {
      // 开场语音未播完一遍前，忽略选项卡语音请求，避免音轨重叠
      if (!bgmIntroDoneRef.current) return;

      if (tabAudioRef.current) {
        tabAudioRef.current.pause();
        tabAudioRef.current.currentTime = 0;
        tabAudioRef.current = null;
      }
      const audio = new Audio(withBasePath(TAB_AUDIO[tab]));
      audio.volume = 0.5;
      tabAudioRef.current = audio;
      audio.addEventListener("play", inc);
      audio.addEventListener("ended", () => {
        dec();
        if (tabAudioRef.current === audio) tabAudioRef.current = null;
      });
      audio.addEventListener("pause", () => {
        dec();
      });
      audio.play().catch(() => {});
    },
    [inc, dec],
  );

  useEffect(() => {
    return () => {
      bgmRef.current?.pause();
      tabAudioRef.current?.pause();
    };
  }, []);

  return { isPlaying, bgmBlocked, playBgm, resumeBgm, playTab } as const;
}
