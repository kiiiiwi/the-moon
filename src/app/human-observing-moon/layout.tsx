import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Human Observation | The Moon",
};

export default function HumanObservingMoonLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
