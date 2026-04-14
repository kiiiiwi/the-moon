import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import type { ReactNode } from "react";

const kanit = Kanit({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-kanit-about",
});

export const metadata: Metadata = {
  title: "About the moon | The Moon",
  description:
    "Explore lunar statistics, Earth comparison, and satellite size context with an interactive 3D Moon.",
};

export default function AboutMoonLayout({ children }: { children: ReactNode }) {
  return <div className={kanit.variable}>{children}</div>;
}
