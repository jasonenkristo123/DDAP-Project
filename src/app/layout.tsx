import type { Metadata } from "next";

import "./globals.css";
import LayoutShell from "@/components/shared/layout-shell";

export const metadata: Metadata = {
  title: "GEULIST - Minimal Retro Todo & Kanban Board",
  description: "A beautiful retro cozy productivity workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
