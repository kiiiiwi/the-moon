"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { withBasePath } from "@/lib/base-path";

export interface SectionNavItem {
  label: string;
  href?: string;
}

export function SectionNavButton({
  direction,
  section,
  onClick,
}: {
  direction: "prev" | "next";
  section: SectionNavItem;
  onClick?: () => void;
}) {
  const isPrev = direction === "prev";
  const normalizedHref = (() => {
    const raw = section.href || "#";
    if (raw === "#" || raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("//")) {
      return raw;
    }
    if (raw.startsWith("/") && !raw.endsWith("/")) {
      return withBasePath(`${raw}/`);
    }
    return raw.startsWith("/") ? withBasePath(raw) : raw;
  })();

  return (
    <motion.a
      href={normalizedHref}
      onClick={(e) => {
        if (!section.href || section.href === "#") e.preventDefault();
        onClick?.();
      }}
      className="group flex cursor-pointer flex-col gap-[6px] no-underline"
      style={{ alignItems: isPrev ? "flex-start" : "flex-end" }}
      initial={{ opacity: 0, x: isPrev ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isPrev ? -16 : 16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover="hovered"
    >
      <motion.div
        style={{
          width: 48,
          height: 1,
          background: isPrev
            ? "linear-gradient(90deg, rgba(193,250,248,0.7), transparent)"
            : "linear-gradient(90deg, transparent, rgba(193,250,248,0.7))",
        }}
        variants={{
          hovered: {
            width: 72,
            background: isPrev
              ? "linear-gradient(90deg, #C1FAF8, transparent)"
              : "linear-gradient(90deg, transparent, #C1FAF8)",
          },
        }}
        transition={{ duration: 0.25 }}
      />

      <div className="flex items-center gap-[5px]">
        {isPrev && (
          <ChevronLeft
            style={{
              width: 12,
              height: 12,
              color: "rgba(193,250,248,0.55)",
            }}
          />
        )}
        <span
          className="font-chinese"
          style={{
            color: "rgba(193,250,248,0.55)",
            fontSize: 10,
            letterSpacing: "0.18em",
          }}
        >
          {isPrev ? "上一节" : "下一节"}
        </span>
        {!isPrev && (
          <ChevronRight
            style={{
              width: 12,
              height: 12,
              color: "rgba(193,250,248,0.55)",
            }}
          />
        )}
      </div>

      <motion.span
        className="font-chinese"
        style={{
          color: "rgba(241,208,136,0.75)",
          fontSize: 13,
          letterSpacing: "0.04em",
        }}
        variants={{ hovered: { color: "#F1D088" } }}
        transition={{ duration: 0.2 }}
      >
        {section.label}
      </motion.span>

      <motion.div
        style={{
          width: 1,
          height: 20,
          background: isPrev
            ? "linear-gradient(180deg, rgba(193,250,248,0.5), transparent)"
            : "linear-gradient(180deg, rgba(241,208,136,0.5), transparent)",
          alignSelf: isPrev ? "flex-start" : "flex-end",
        }}
        variants={{ hovered: { height: 28, opacity: 1 } }}
        initial={{ opacity: 0.6 }}
        transition={{ duration: 0.25 }}
      />
    </motion.a>
  );
}
