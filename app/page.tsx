"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, Code2, Database, Layers3, Search, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: <BrainCircuit className="w-6 h-6 text-indigo-400" />, title: "Interactive Learning", description: "See each data structure and algorithm unfold step by step with active explanations." },
  { icon: <Code2 className="w-6 h-6 text-cyan-400" />, title: "Coding Practice", description: "Solve curated problems with difficulty filters, hints, and real coding feedback." },
  { icon: <Database className="w-6 h-6 text-emerald-400" />, title: "Progress Tracking", description: "Monitor streaks, XP, achievements, and topic mastery from one dashboard." },
  { icon: <Trophy className="w-6 h-6 text-amber-400" />, title: "Interview Prep", description: "Prepare for interviews with roadmaps, quizzes, and challenge-driven practice." },
];

const dataStructures = ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Graphs", "Hash Tables", "Heaps"];
const algorithms = ["Searching", "Sorting", "Graph Algorithms", "Greedy", "Dynamic Programming", "Backtracking", "Recursion", "Trees"];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative font-outfit">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/30 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />

      <nav className="fixed top-0 w-full border-b border-white/5 bg-black/50 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="text-indigo-500 w-6 h-6" />
            <span className="font-bold text-xl tracking-tight text-white">AlgoViz Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#topics" className="hover:text-white transition-colors">Topics</Link>
            <Link href="#roadmap" className="hover:text-white transition-colors">Roadmap</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-gray-100 transition-colors">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 mb-8">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Learn. Visualize. Code. Practice.</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }} className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-6">
              Master DSA Through <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Visualization</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12 }} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-inter leading-relaxed">
              Build intuition for arrays, trees, graphs, sorting, and recursion with interactive step-by-step animation, coding labs, and guided practice.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup" className="group flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-[0_0_40px_8px_rgba(79,70,229,0.3)]">
                Start Learning
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/dashboard/playground" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
                Explore Visualizer
              </Link>
              <Link href="/dataset-lab" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
                Dataset Lab
              </Link>
              <Link href="/dashboard/practice" className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors">
                Solve Problems
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18 }} className="mt-20 max-w-5xl mx-auto relative z-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="h-12 border-b border-white/10 bg-black/50 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-8 aspect-video bg-gradient-to-br from-[#0f172a] to-black flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#60a5fa 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                <div className="relative z-10 flex items-end gap-3 justify-center w-full max-w-xl h-56">
                  {[42, 18, 64, 31, 78, 26, 58, 46].map((height, index) => (
                    <div key={index} className="w-10 rounded-t-xl bg-gradient-to-t from-indigo-500 to-cyan-300" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <div id="features" className="max-w-7xl mx-auto mt-24 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why students pick AlgoViz Pro</h2>
              <p className="text-gray-400">Everything needed to turn confusion into confidence.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {features.map((feature) => (
                <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} />
              ))}
            </div>
          </div>

          <div id="topics" className="max-w-7xl mx-auto mt-24 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core DSA topics</h2>
              <p className="text-gray-400">From arrays to graphs, every concept is built for clarity and action.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <TopicSection title="Data structures" items={dataStructures} />
              <TopicSection title="Algorithms" items={algorithms} />
              <TopicSection title="Practice" items={["Arrays", "Strings", "Trees", "Graphs", "DP", "Greedy", "Backtracking", "Recursion"]} />
              <TopicSection title="Learning flow" items={["Roadmap", "Quizzes", "Notes", "Bookmarks", "Challenges", "Analytics", "Achievements", "Streaks"]} />
            </div>
          </div>

          <div id="roadmap" className="max-w-5xl mx-auto mt-24 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your path from beginner to confident coder</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {['Programming Basics', 'Arrays', 'Strings', 'Linked Lists', 'Stack & Queue', 'Recursion', 'Trees', 'Graphs', 'Greedy', 'Dynamic Programming'].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200">
                  <span>{item}</span>
                  {index < 9 && <ArrowRight className="w-4 h-4 text-gray-500" />}
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-24 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start your DSA journey today</h2>
            <p className="text-gray-300 mb-6">Build intuition, solve tough problems, and track your real progress.</p>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-700 transition-colors">
              Create free account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group cursor-default">
      <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 font-inter text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function TopicSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300"><Layers3 className="w-5 h-5" /></div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-3 text-sm text-gray-300">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2"><Search className="w-3.5 h-3.5 text-cyan-300" /> {item}</li>
        ))}
      </ul>
    </div>
  );
}
