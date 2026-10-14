"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getProblemById } from "@/lib/problems";

export default function PracticeProblemPage() {
  const params = useParams<{ id: string }>();
  const problem = useMemo(() => getProblemById(params.id), [params.id]);
  const [submitted, setSubmitted] = useState(false);

  if (!problem) {
    notFound();
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Problem</p>
          <h1 className="text-3xl font-bold text-white">{problem.title}</h1>
        </div>
        <Link href="/dashboard/practice" className="rounded-full border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5">Back to practice</Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Problem statement</h2>
            <p className="text-gray-300 leading-7">{problem.statement}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Examples</h2>
            <div className="space-y-3">
              {problem.examples.map((example, index) => (
                <div key={`${problem.id}-example-${index}`} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-gray-400">Example {index + 1}</p>
                  <p className="mt-2 font-mono text-sm text-cyan-200">Input: {example.input}</p>
                  <p className="mt-1 font-mono text-sm text-emerald-200">Output: {example.output}</p>
                  {example.explanation ? <p className="mt-2 text-sm text-gray-400">{example.explanation}</p> : null}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Approach</h2>
            <p className="text-gray-300 leading-7">{problem.solution}</p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">Complexity</h2>
            <p className="text-gray-300">{problem.complexity}</p>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Details</h3>
            <dl className="mt-4 space-y-3 text-sm text-gray-300">
              <div className="flex justify-between"><dt>Difficulty</dt><dd>{problem.difficulty}</dd></div>
              <div className="flex justify-between"><dt>Category</dt><dd>{problem.category}</dd></div>
              <div className="flex justify-between"><dt>Tags</dt><dd>{problem.tags.join(", ")}</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Constraints</h3>
            <p className="mt-3 text-sm text-gray-300">{problem.constraints}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Hint</h3>
            <p className="mt-3 text-sm text-gray-300">{problem.hint}</p>
          </div>

          <button onClick={() => setSubmitted(true)} className="w-full rounded-xl bg-cyan-300 px-4 py-3 font-semibold text-gray-950 hover:bg-cyan-200">
            Submit solution
          </button>
          {submitted && <p className="text-sm text-emerald-300">✅ Solution submitted. This is a demo practice flow.</p>}
        </aside>
      </div>
    </div>
  );
}
