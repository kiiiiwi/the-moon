import type { Metadata } from "next";
import { Noto_Sans_SC } from "next/font/google";
import type { ReactNode } from "react";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sc-phases",
});

export const metadata: Metadata = {
  title: "月相探索 | Moon Phase Explorer",
  description: "通过透视光线投射理解月相变化的交互式可视化",
};

export default function PhasesLayout({ children }: { children: ReactNode }) {
  return <div className={notoSansSC.variable}>{children}</div>;
}
