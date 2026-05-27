"use client";

import { useState } from "react";
import Navbar from "@/components/shared/navbar";
import SideProfile from "@/components/shared/sideprofile";
import Footer from "@/components/shared/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <Navbar onProfileToggle={() => setIsProfileOpen(true)} />
      <div className="flex flex-1">
        <SideProfile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
    </>
  );
}
