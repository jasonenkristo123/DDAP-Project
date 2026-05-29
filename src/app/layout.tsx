import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/shared/layout-shell";

export const metadata: Metadata = {
  title: "GEULIST - Minimal Retro Todo & Kanban Board",
  description: "A beautiful retro cozy productivity workspace.",
};

const manrope = Manrope({
  variable: "--font-manrope",
  subsets:["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

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
