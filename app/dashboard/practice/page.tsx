"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { problems, type Difficulty } from "@/lib/problems";

const filters = ["All", "Arrays", "Strings", "Stack", "Trees", "Graphs", "Hash Tables", "Dynamic Programming", "Backtracking"] as const;

export default function PracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState<(typeof filters)[number]>("All");

  const visibleProblems = useMemo(() => {
    return problems.filter((problem) => {
      const matchesDifficulty = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;
      return matchesDifficulty && matchesCategory;
    });
  }, [selectedCategory, selectedDifficulty]);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Practice</p>
        <h1 className="text-3xl font-bold text-white">Coding challenges</h1>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", "Easy", "Medium", "Hard"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`rounded-full px-3 py-1.5 text-sm ${selectedDifficulty === level ? "bg-cyan-300 text-gray-950" : "border border-white/10 bg-black/20 text-gray-300"}`}
              >
                {level}
              </button>
            ))}
          </div>

          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value as (typeof filters)[number])}
            className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>{filter}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {visibleProblems.map((problem) => (
          <Link
            key={problem.id}
            href={`/dashboard/practice/${problem.id}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-indigo-500/50 hover:bg-white/10"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-300">{problem.category}</span>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300">{problem.difficulty}</span>
                </div>
                <h2 className="text-xl font-semibold text-white">{problem.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{problem.description}</p>
              </div>
              <div className="text-sm text-cyan-300">Solve →</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
