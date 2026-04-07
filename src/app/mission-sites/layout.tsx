import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "探月着陆区 | Lunar Landing Sites",
  description: "Interactive 3D moon globe with lunar landing sites and mission Sankey diagram",
};

export default function MissionSitesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
