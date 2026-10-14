import Link from "next/link";
import { curriculumLessons } from "@/lib/curriculum";

export default function CurriculumPage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Learning path</p>
        <h1 className="text-3xl font-bold text-white">30-day DSA roadmap</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {curriculumLessons.map((lesson, index) => (
          <Link
            key={lesson.slug}
            href={`/dashboard/curriculum/${lesson.slug}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-500/40 hover:bg-white/10"
          >
            <div className="mb-4 flex items-center justify-between text-sm text-gray-300">
              <span>Week {lesson.week}</span>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">
                {index < 3 ? "In progress" : "Upcoming"}
              </span>
            </div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">{lesson.title}</h2>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{lesson.category}</p>
            <p className="mt-3 text-sm text-gray-400">{lesson.summary}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
              <span>{lesson.difficulty}</span>
              <span>{lesson.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
