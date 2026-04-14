import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbit | The Moon",
  description: "Moon orbit visualization page",
};

export default function OrbitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
