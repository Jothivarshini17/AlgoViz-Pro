"use client";

import { motion } from "framer-motion";
import { 
  BookOpen, 
  BrainCircuit, 
  Code2, 
  Database,
  LayoutDashboard, 
  LineChart, 
  LogOut, 
  PencilRuler,
  Settings, 
  Trophy, 
  UserCircle 
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "@/lib/auth";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learning Roadmap", href: "/dashboard/curriculum", icon: BookOpen },
  { name: "Sorting Visualizer", href: "/dashboard/playground", icon: BrainCircuit },
  { name: "Practice Problems", href: "/dashboard/practice", icon: PencilRuler },
  { name: "Dataset Lab", href: "/dataset-lab", icon: Database },
  { name: "Python Workspace", href: "/dashboard/python", icon: Code2 },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Trophy },
  { name: "Analytics", href: "/dashboard/analytics", icon: LineChart },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    setUser(currentUser);
  }, [router]);

  function handleLogout() {
    logoutUser();
    router.replace("/login");
  }

  return (
    <div className="flex h-screen bg-black font-inter overflow-hidden">
      <motion.aside initial={{ x: -250 }} animate={{ x: 0 }} className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col hidden md:flex z-50 relative">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-indigo-500" />
            <span className="font-bold text-white tracking-tight">AlgoViz Pro</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-indigo-600/10 text-indigo-400" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
                <item.icon className={`w-5 h-5 ${isActive ? "text-indigo-400" : "text-gray-500"}`} />
                {item.name}
                {isActive && <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-8 bg-indigo-500 rounded-r-full" />}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-white/5">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all">
            <Settings className="w-5 h-5 text-gray-500" />Settings
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all mt-1">
            <LogOut className="w-5 h-5" />Sign Out
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-end px-8 z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <span className="text-yellow-500 font-bold text-sm">⚡ 450 XP</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <UserCircle className="w-7 h-7 text-gray-300" />
              <span>{user?.name ?? "Learner"}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-black p-8 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-6xl mx-auto relative z-10">
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
