import Link from "next/link";
import { datasetCatalog } from "@/lib/datasets";

export default function DatasetLabPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-transparent p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Dataset Lab</p>
        <h1 className="text-4xl font-bold text-white">Explore real-world data through algorithms</h1>
        <p className="mt-3 max-w-2xl text-gray-300">
          Convert practical datasets into arrays, graphs, stacks, queues, and search structures. Every experiment is built around data values rather than synthetic placeholders.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Total datasets", String(datasetCatalog.length)],
          ["Categories", "6"],
          ["Supported algorithms", "18+"],
          ["Learning mode", "Interactive"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="mt-2 text-2xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {datasetCatalog.map((dataset) => (
          <div key={dataset.slug} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="rounded-full bg-cyan-500/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                {dataset.category}
              </span>
              <span className="text-xs text-gray-400">{dataset.difficulty}</span>
            </div>

            <h2 className="text-2xl font-semibold text-white">{dataset.name}</h2>
            <p className="mt-3 text-sm text-gray-400">{dataset.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-300">
              <div>
                <p className="text-gray-500">Rows</p>
                <p>{dataset.rows.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Columns</p>
                <p>{dataset.columns}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {dataset.supportedAlgorithms.slice(0, 4).map((algorithm) => (
                <span key={algorithm} className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-xs text-gray-300">
                  {algorithm}
                </span>
              ))}
            </div>

            <Link href={`/dataset-lab/${dataset.slug}`} className="mt-5 inline-flex rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-cyan-200">
              Explore Dataset →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
