"use client";

import { motion } from "framer-motion";
import { BookOpen, BrainCircuit, Play, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Good morning, Learner 👋</h1>
        <p className="text-gray-400">Ready to strengthen your DSA foundations and keep your streak alive?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Overall progress" value="68%" subtitle="12 of 18 topics" icon={BookOpen} color="text-indigo-400" bg="bg-indigo-400/10" />
        <StatCard title="XP earned" value="1,260" subtitle="DSA Explorer" icon={TrendingUp} color="text-emerald-400" bg="bg-emerald-400/10" />
        <StatCard title="Current streak" value="7 days" subtitle="Keep it going" icon={BrainCircuit} color="text-cyan-400" bg="bg-cyan-400/10" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4">Continue learning</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 group hover:bg-white/10 transition-colors cursor-pointer">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-indigo-400 text-sm font-medium mb-1">Topic • Binary Search</div>
            <h3 className="text-2xl font-bold text-white mb-2">Master divide-and-conquer search</h3>
            <div className="w-full bg-black/50 rounded-full h-2 mb-2">
              <div className="bg-indigo-500 h-2 rounded-full w-[70%]" />
            </div>
            <p className="text-sm text-gray-400">70% complete • 12 mins remaining</p>
          </div>
          <button className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium group-hover:scale-105 transition-transform">
            Continue <Play className="w-4 h-4 fill-black" />
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Recommended next steps</h2>
          <Link href="/dashboard/playground" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Open visualizer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LabCard title="Sorting Visualizer" desc="Watch Bubble Sort, Selection Sort, and Insertion Sort evolve in real time." type="Visualizer" href="/dashboard/playground" />
          <LabCard title="Interview Prep" desc="Review common array, tree, and graph patterns before your next mock round." type="Practice" href="/dashboard/curriculum" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${bg}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  );
}

function LabCard({ title, desc, type, href }: any) {
  return (
    <Link href={href} className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
      <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">{type}</div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </Link>
  );
}
