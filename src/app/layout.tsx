import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/shared/navbar";
import SideProfile from "@/components/shared/sideprofile";
import Footer from "@/components/shared/footer";

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
        <Navbar />
        <div className="flex flex-1">
          <SideProfile />
          <main className="flex-1 min-w-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
