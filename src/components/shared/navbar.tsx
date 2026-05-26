"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileChartPie, ListTodo, FolderKanban, LayoutPanelTop, Trophy } from "lucide-react"

interface MenuItem {
  name: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

export default function Navbar() {
    const pathname = usePathname();

    const menuItems: MenuItem[] = [
        { name: "Dashboard", path: "/", icon: FileChartPie },
        { name: "Todos", path: "/todos", icon: ListTodo, badge: 20 },
        { name: "Kanban", path: "/kanban", icon: FolderKanban },
        { name: "Templates", path: "/templates", icon: LayoutPanelTop },
        { name: "Achievements", path: "/achievements", icon: Trophy },
    ];

    return (
        <nav className="w-full border-b-2 border-black px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 pt-4">
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
                        <span className={`inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full border ${
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

            <Link href="/" className="text-2xl font-semibold">
                GEULIST
            </Link>
    </nav>
    )
}