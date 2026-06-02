"use client";

import {
  FileChartPie,
  FolderKanban,
  LayoutPanelTop,
  ListTodo,
  Menu,
  Trophy,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTotalTodos } from "../api/todolistApi";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavbarProps {
  onProfileToggle?: () => void;
}

export default function Navbar({ onProfileToggle }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [totalTodos, setTotalTodos] = useState<number>(0);

  useEffect(() => {
    const fetchTotalTodos = async () => {
      try {
        const res = await getAllTotalTodos();
        setTotalTodos(res);
      } catch (err) {
        console.error("Failed to fetch total todos:", err);
      }
    };
    fetchTotalTodos();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/", icon: FileChartPie },
    { name: "Todos", path: "/todos", icon: ListTodo, badge: totalTodos },
    { name: "Kanban", path: "/kanban", icon: FolderKanban },
    { name: "Templates", path: "/templates", icon: LayoutPanelTop },
    { name: "Achievements", path: "/achievements", icon: Trophy },
  ];

  return (
    <>
      <nav className="w-full border-b-2 z-40 bg-background-cream sticky top-0 border-black px-4 py-3 lg:py-0 lg:pt-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden rounded-md hover:bg-[#DED7BF] transition-colors duration-150 cursor-pointer pt-0"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-[#332211]" />
            ) : (
              <Menu className="w-6 h-6 text-[#332211]" />
            )}
          </button>

          <div className="hidden lg:flex items-center gap-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#4A3728] text-[#EFEAD8] shadow-sm"
                      : "text-[#332211] hover:bg-[#DED7BF]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>

                  {item.badge !== undefined && (
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full border ${
                        isActive
                          ? "bg-[#FFDFB5] text-[#4A3728] border-black"
                          : "bg-[#FFDFB5] text-[#332211] border-black"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Brand + Profile avatar (mobile) */}
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl md:text-2xl font-semibold">
            <h1>GEULIST</h1>
          </Link>

          <button
            type="button"
            onClick={onProfileToggle}
            className="lg:hidden p-1 rounded-full border border-black bg-[#4A3728] hover:bg-[#5a3f30] transition-colors duration-150 cursor-pointer"
            aria-label="Open profile"
          >
            <User className="w-5 h-5 text-[#EFEAD8]" />
          </button>
        </div>
      </nav>

      {/* ===== MOBILE DROPDOWN MENU ===== */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-35 pt-10">
          <div
            className="fixed inset-0 bg-black/30 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsMobileMenuOpen(false)}
          />

          {/* Dropdown panel */}
          <div className="nav-dropdown-enter relative z-35 bg-background-cream border-b-2 border-black mx-0 shadow-lg">
            <div className="flex flex-col py-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 font-medium text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-[#4A3728] text-[#EFEAD8]"
                        : "text-[#332211] hover:bg-[#DED7BF]"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>

                    {item.badge !== undefined && (
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full border ml-auto ${
                          isActive
                            ? "bg-[#FFDFB5] text-[#4A3728] border-black"
                            : "bg-[#FFDFB5] text-[#332211] border-black"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
