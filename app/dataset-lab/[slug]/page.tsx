"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, BarChart3, Database, Play, Search, SlidersHorizontal } from "lucide-react";
import { getDatasetBySlug } from "@/lib/datasets";

function getNumericValues(data: Array<Record<string, string | number>>, column: string): number[] {
  return data
    .map((row) => Number(row[column]))
    .filter((value) => Number.isFinite(value));
}

function mergeSort(values: number[]): number[] {
  if (values.length <= 1) return values;
  const middle = Math.floor(values.length / 2);
  const left: number[] = mergeSort(values.slice(0, middle));
  const right: number[] = mergeSort(values.slice(middle));
  const merged: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      merged.push(left[leftIndex]);
      leftIndex += 1;
    } else {
      merged.push(right[rightIndex]);
      rightIndex += 1;
    }
  }

  return merged.concat(left.slice(leftIndex), right.slice(rightIndex));
}

export default function DatasetDetailPage() {
  const params = useParams<{ slug: string }>();
  const dataset = getDatasetBySlug(params.slug ?? "");
  const [selectedColumn, setSelectedColumn] = useState<string>("Math_Score");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Merge Sort");
  const [searchValue, setSearchValue] = useState("80");

  const numericValues = useMemo(() => {
    if (!dataset) return [];
    const candidate = dataset.columnDefinitions.find((column) => column.type === "numeric")?.name ?? dataset.columnDefinitions[0]?.name ?? "";
    const fallbackColumn = candidate || "";
    if (!fallbackColumn) return [];
    const currentColumn = dataset.previewData.some((row) => row[selectedColumn] !== undefined)
      ? selectedColumn
      : fallbackColumn;
    return getNumericValues(dataset.previewData, currentColumn);
  }, [dataset, selectedColumn]);

  const visualizedResult = useMemo(() => {
    if (!dataset) return [];
    const values = numericValues.slice(0, 8);
    if (selectedAlgorithm === "Merge Sort") {
      return mergeSort(values);
    }
    if (selectedAlgorithm === "Linear Search") {
      const target = Number(searchValue || values[0] || 0);
      const index = values.findIndex((value) => value === target);
      return index >= 0 ? [target] : values;
    }
    return values;
  }, [dataset, numericValues, searchValue, selectedAlgorithm]);

  if (!dataset) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-300">
        Dataset not found.
      </div>
    );
  }

  const columnOptions = dataset.columnDefinitions.map((column) => column.name);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between gap-3">
        <Link href="/dataset-lab" className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200">
          <ArrowLeft className="h-4 w-4" /> Back to dataset library
        </Link>
        <button className="rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-cyan-200">
          Start Visualization
        </button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Dataset Overview</p>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{dataset.name}</h1>
            <p className="mt-2 text-sm text-gray-400">Source: {dataset.source}</p>
            <p className="mt-1 text-sm text-gray-400">Rows: {dataset.rows.toLocaleString()} • Columns: {dataset.columns} • File Type: {dataset.fileFormat}</p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl border border-white/10 bg-black/30 px-4 py-2 text-sm text-white">View Dataset</button>
            <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">Start Visualization</button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Database className="h-5 w-5 text-cyan-300" />
              <h2 className="text-xl font-semibold">Dataset statistics</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Rows", dataset.rows.toLocaleString()],
                ["Columns", String(dataset.columns)],
                ["Numeric columns", String(dataset.columns)],
                ["Categorical columns", "3"],
                ["Missing values", "0"],
                ["Duplicate rows", "0"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <SlidersHorizontal className="h-5 w-5 text-cyan-300" />
              <h2 className="text-xl font-semibold">Column selector</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {columnOptions.map((column) => (
                <button
                  key={column}
                  onClick={() => setSelectedColumn(column)}
                  className={`rounded-full px-3 py-1.5 text-sm ${selectedColumn === column ? "bg-cyan-300 text-gray-950" : "border border-white/10 bg-black/20 text-gray-300"}`}
                >
                  {column}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Selected column</p>
              <p className="mt-2 text-lg font-semibold text-white">{selectedColumn}</p>
              <p className="mt-2 font-mono text-sm text-cyan-200">{JSON.stringify(numericValues.slice(0, 8))}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Search className="h-5 w-5 text-cyan-300" />
              <h2 className="text-xl font-semibold">Dataset preview</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-300">
                <thead>
                  <tr className="border-b border-white/10 text-gray-500">
                    {Object.keys(dataset.previewData[0]).map((header) => (
                      <th key={header} className="px-3 py-2 font-medium">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataset.previewData.slice(0, 6).map((row, index) => (
                    <tr key={`${dataset.slug}-${index}`} className="border-b border-white/5">
                      {Object.values(row).map((value, valueIndex) => (
                        <td key={`${index}-${valueIndex}`} className="px-3 py-2">{String(value)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Play className="h-5 w-5 text-cyan-300" />
              <h2 className="text-xl font-semibold">Dataset algorithm pipeline</h2>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              {[
                "Choose Dataset",
                "Choose Column",
                "Clean Data",
                "Choose Algorithm",
                "Run Visualization",
                "Analyze Performance",
              ].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-300 text-xs font-bold text-gray-950">{index + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center gap-2 text-white">
              <BarChart3 className="h-5 w-5 text-cyan-300" />
              <h2 className="text-xl font-semibold">Algorithm runner</h2>
            </div>

            <div className="space-y-4">
              <label className="block text-sm text-gray-300">
                Algorithm
                <select value={selectedAlgorithm} onChange={(event) => setSelectedAlgorithm(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none">
                  {dataset.supportedAlgorithms.map((algorithm) => (
                    <option key={algorithm} value={algorithm}>{algorithm}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-gray-300">
                Search value
                <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none" />
              </label>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Result preview</p>
                <p className="mt-2 font-mono text-sm text-emerald-200">{JSON.stringify(visualizedResult)}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Dataset attribution</h3>
            <dl className="mt-3 space-y-3 text-sm text-gray-300">
              <div className="flex justify-between gap-4"><dt className="text-gray-500">Author</dt><dd>{dataset.author}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-500">License</dt><dd>{dataset.license}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-gray-500">Source</dt><dd>{dataset.source}</dd></div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
