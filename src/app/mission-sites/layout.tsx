import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Sites | The Moon",
  description: "Interactive 3D moon globe with lunar landing sites and mission Sankey diagram",
};

export default function MissionSitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
