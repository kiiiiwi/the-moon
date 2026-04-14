import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Project | The Moon",
};

export default function ChangeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
