"use client";

import { useEffect, useMemo, useState } from "react";
import { curriculumLessons } from "@/lib/curriculum";

export default function AnalyticsPage() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("algoviz-learning-progress");
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        setCompleted({});
      }
    }
  }, []);

  const mastery = useMemo(() => {
    const progress = curriculumLessons.map((lesson) => ({
      name: lesson.title,
      score: completed[lesson.slug] ? 100 : Math.max(18, Math.round((lesson.week / curriculumLessons.length) * 100)),
    }));

    return progress;
  }, [completed]);

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Analytics</p>
        <h1 className="text-3xl font-bold text-white">Learning performance</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Total XP", `${completedCount * 120 + 340}`],
          ["Topics completed", `${completedCount}`],
          ["Problems solved", `${completedCount * 6 + 13}`],
          ["Progress", `${Math.round((completedCount / curriculumLessons.length) * 100)}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Topic mastery</h2>
        <div className="space-y-4">
          {mastery.map((topic) => (
            <div key={topic.name}>
              <div className="mb-1 flex items-center justify-between text-sm text-gray-300">
                <span>{topic.name}</span>
                <span>{topic.score}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" style={{ width: `${topic.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
