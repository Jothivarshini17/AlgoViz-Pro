
type StepState = {"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sparkles,
  Shuffle,
} from "lucide-react";
import {
  algorithmCatalog,
  generateDataset,
  generateStepsForAlgorithm,
  parseArrayInput,
} from "@/lib/playground-algorithms";

  array: number[];
  compare: number[];
  target?: number;
  range?: [number, number];
  mid?: number | null;
  sortedIndices?: number[];
  found?: boolean;
  description: string;
};

const defaultArray: number[] = [8, 4, 7, 1, 5, 3];

export default function PlaygroundPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble-sort");
  const [inputText, setInputText] = useState(defaultArray.join(", "));
  const [targetText, setTargetText] = useState("5");
  const [datasetMode, setDatasetMode] = useState("random");
  const [steps, setSteps] = useState<StepState[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState("");

  const selectedAlgorithmMeta = useMemo(
    () => algorithmCatalog.find((item) => item.id === selectedAlgorithm) ?? algorithmCatalog[0],
    [selectedAlgorithm],
  );

  const currentStep: StepState | null = steps[currentStepIndex] ?? null;

  useEffect(() => {
    if (!isRunning || steps.length === 0) {
      return undefined;
    }

    if (currentStepIndex >= steps.length - 1) {
      setIsRunning(false);
      return undefined;
    }

    const delay = Math.max(180, 1100 / speed);
    const timer = setTimeout(() => {
      setCurrentStepIndex((value) => Math.min(value + 1, steps.length - 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [currentStepIndex, isRunning, speed, steps]);

  const runVisualization = (values: number[], targetValue = "") => {
    const normalizedTarget = Number(targetValue);
    const algorithmNeedsTarget = selectedAlgorithm === "binary-search" || selectedAlgorithm === "linear-search";

    if (algorithmNeedsTarget && (!targetValue.trim() || Number.isNaN(normalizedTarget))) {
      setError("Enter a valid target value for this search algorithm.");
      return;
    }

    const generatedSteps = generateStepsForAlgorithm(selectedAlgorithm, values, normalizedTarget) as StepState[];
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsRunning(true);
    setError("");
  };

  const handleRun = () => {
    const values = parseArrayInput(inputText);

    if (!values || values.length === 0) {
      setError("Please enter a valid comma-separated list of numbers.");
      return;
    }

    runVisualization(values, targetText);
  };

  const handleRandomize = () => {
    const dataset = generateDataset(datasetMode, 12);
    setInputText(dataset.join(", "));
    setError("");
  };

  const handleReset = () => {
    setSteps([]);
    setCurrentStepIndex(0);
    setIsRunning(false);
    setInputText(defaultArray.join(", "));
    setTargetText("5");
    setError("");
  };

  const handlePrevious = () => {
    setIsRunning(false);
    setCurrentStepIndex((index) => Math.max(0, index - 1));
  };

  const handleNext = () => {
    setIsRunning(false);
    setCurrentStepIndex((index) => Math.min(index + 1, Math.max(steps.length - 1, 0)));
  };

  const activeValues: number[] = currentStep?.array ?? parseArrayInput(inputText) ?? defaultArray;

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-white/10">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
          </div>
          <div className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Visualization Lab
          </div>
        </div>

        <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_30px_rgba(34,211,238,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Algorithm Playground</p>
                <h1 className="mt-2 text-3xl font-bold text-white">Sorting & Search Visualizer</h1>
              </div>
              <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-3 text-indigo-200">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm text-gray-300">
              Test different algorithms, generate datasets, and watch each comparison, swap, and search decision animate in real time.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-200">
              <Gauge className="h-4 w-4" /> Execution Speed
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.5"
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
                className="w-full accent-cyan-400"
              />
              <span className="min-w-10 text-right text-sm font-medium text-white">{speed}x</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold text-white">Algorithm</h2>
              <div className="mt-4 grid gap-3">
                {algorithmCatalog.map((algorithm) => (
                  <button
                    key={algorithm.id}
                    type="button"
                    onClick={() => setSelectedAlgorithm(algorithm.id)}
                    className={`rounded-2xl border p-3 text-left transition ${
                      selectedAlgorithm === algorithm.id
                        ? "border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_24px_rgba(34,211,238,0.15)]"
                        : "border-white/10 bg-black/20 hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white">{algorithm.name}</span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gray-300">
                        {algorithm.category}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">{algorithm.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-lg font-semibold text-white">Input</h2>
              <label className="mt-4 block text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Values</label>
              <textarea
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1220] p-3 text-sm text-gray-100 outline-none ring-0 placeholder:text-gray-500 focus:border-cyan-400/50"
                placeholder="5, 2, 8, 1, 3"
              />

              {(selectedAlgorithm === "binary-search" || selectedAlgorithm === "linear-search") && (
                <>
                  <label className="mt-4 block text-xs font-medium uppercase tracking-[0.18em] text-gray-400">Target</label>
                  <input
                    value={targetText}
                    onChange={(event) => setTargetText(event.target.value)}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-[#0b1220] p-3 text-sm text-gray-100 outline-none focus:border-cyan-400/50"
                    placeholder="Enter target"
                  />
                </>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleRun}
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {isRunning ? "Running" : "Run"}
                </button>
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <Shuffle className="h-4 w-4" /> Randomize
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>

              {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
            </div>
          </aside>

          <main className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#090d18] p-5">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedAlgorithmMeta.name}</h2>
                  <p className="text-sm text-gray-400">{selectedAlgorithmMeta.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handlePrevious} className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:bg-white/10" aria-label="Previous step">
                    <SkipBack className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={handleNext} className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-200 transition hover:bg-white/10" aria-label="Next step">
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid min-h-[260px] items-end gap-3 rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_rgba(15,23,42,0.2)_50%,_rgba(2,6,23,0.8))] p-5">
                {activeValues.map((value: number, index: number) => {
                  const compareValues = currentStep?.compare ?? [];
                  const sortedValues = currentStep?.sortedIndices ?? [];
                  const rangeValues = currentStep?.range ?? [0, 0];
                  const isComparing = compareValues.includes(index);
                  const isSorted = sortedValues.includes(index);
                  const isRange = index >= rangeValues[0] && index <= rangeValues[1];
                  const isMid = currentStep?.mid === index;

                  const barHeight = 36 + (value / Math.max(1, Math.max(...activeValues))) * 180;
                  const className = [
                    "relative flex flex-1 items-end justify-center overflow-hidden rounded-t-xl border border-white/10 bg-gradient-to-t from-cyan-700/80 to-indigo-500/80 transition-all duration-200",
                    isComparing ? "from-amber-400 to-orange-500 ring-2 ring-amber-300/70" : "",
                    isMid ? "from-emerald-400 to-emerald-600 ring-2 ring-emerald-300/70" : "",
                    isRange ? "from-violet-500 to-fuchsia-500" : "",
                    isSorted ? "from-emerald-600 to-cyan-500" : "",
                  ].join(" ");

                  return (
                    <div key={`${value}-${index}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div className={className} style={{ height: `${barHeight}px`, width: "100%" }}>
                        <span className="mb-2 text-xs font-semibold text-white/90">{value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Current step</p>
                    <p className="mt-2 text-base font-medium text-white">{currentStep?.description ?? "Ready to begin"}</p>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-cyan-200">
                    {steps.length ? `${currentStepIndex + 1}/${steps.length}` : "0/0"}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Complexity</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {Object.entries(selectedAlgorithmMeta.complexity).map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-gray-400">{label}</p>
                      <p className="mt-2 text-base font-semibold text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">Pseudocode</h3>
                <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b1220] p-4 text-sm leading-6 text-cyan-100">
                  {selectedAlgorithmMeta.pseudocode}
                </pre>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
