"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, ChevronLeft, Clock3, Target } from "lucide-react";
import { getCurriculumLessonBySlug } from "@/lib/curriculum";

const storageKey = "algoviz-learning-progress";

export default function CurriculumLessonPage() {
  const params = useParams<{ slug: string }>();
  const lesson = getCurriculumLessonBySlug(params.slug);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!lesson) return;

    const saved = localStorage.getItem(storageKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Record<string, boolean>;
      setIsCompleted(Boolean(parsed[lesson.slug]));
    } catch {
      setIsCompleted(false);
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
        This lesson is not available yet.
      </div>
    );
  }

  const toggleCompletion = () => {
    const nextValue = !isCompleted;
    setIsCompleted(nextValue);

    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
    const updated = { ...parsed, [lesson.slug]: nextValue };
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between gap-3">
        <Link href="/dashboard/curriculum" className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200">
          <ChevronLeft className="h-4 w-4" /> Back to roadmap
        </Link>

        <button
          onClick={toggleCompletion}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            isCompleted ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-white"
          }`}
        >
          {isCompleted ? "Completed" : "Mark complete"}
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cyan-300">
          <span>{lesson.category}</span>
          <span className="text-gray-500">•</span>
          <span>Week {lesson.week}</span>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{lesson.title}</h1>
            <p className="mt-3 max-w-2xl text-gray-300">{lesson.summary}</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-gray-300">
            <Clock3 className="h-4 w-4 text-cyan-300" /> {lesson.duration}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-cyan-300" />
              <h2 className="text-xl font-semibold">Objectives</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              {lesson.objectives.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Core concepts</h2>
            <div className="flex flex-wrap gap-2">
              {lesson.concepts.map((item) => (
                <span key={item} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-100">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">Recommended practice</h2>
            <div className="space-y-3">
              {lesson.practice.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-300">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Visualization</h3>
            <p className="mt-3 text-sm leading-6 text-gray-300">{lesson.visualization}</p>
            <Link href="/dashboard/playground" className="mt-4 inline-flex rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-cyan-200">
              Open visualizer
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Checkpoint</h3>
            <p className="mt-3 text-sm leading-6 text-gray-300">{lesson.checkpoint}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
