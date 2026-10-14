"use client";

import { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, Save, Share2, Terminal } from "lucide-react";

const defaultCode = `def two_sum(nums, target):
    seen = {}
    for index, value in enumerate(nums):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]
        seen[value] = index
    return []

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
`;

const snippets = {
  "Two Sum": defaultCode,
  "Parentheses Check": `def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack.pop() != pairs[char]:
                return False
    return not stack

print(is_valid("([{}])"))
print(is_valid("([)]"))
`,
  "Binary Search": `def binary_search(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        middle = (left + right) // 2
        if nums[middle] == target:
            return middle
        if nums[middle] < target:
            left = middle + 1
        else:
            right = middle - 1
    return -1

print(binary_search([1, 3, 5, 7, 9], 7))
print(binary_search([1, 3, 5, 7, 9], 8))
`,
};

export default function PythonPlayground() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState("Ready");

  const snippetOptions = useMemo(() => Object.keys(snippets), []);

  const handleRun = async () => {
    setIsRunning(true);
    setStatus("Executing...");
    setOutput("");

    try {
      const response = await fetch("http://localhost:8000/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Execution failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        setOutput(data.error || "Execution error");
        setStatus("Error");
      } else {
        setOutput(data.output || "Program finished without output.");
        setStatus("Completed");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setOutput(
        `Local Python executor is not running.\nStart the service in python-service with:\nuvicorn main:app --reload --port 8000\n\nDebug info: ${message}`
      );
      setStatus("Offline");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Python Lab</h1>
          <p className="text-sm text-gray-400">Practice algorithmic Python in a real execution environment.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            onChange={(event) => {
              const nextValue = event.target.value;
              if (nextValue && snippets[nextValue as keyof typeof snippets]) {
                setCode(snippets[nextValue as keyof typeof snippets]);
              }
            }}
            className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none"
            defaultValue=""
          >
            <option value="" disabled>Select a starter challenge</option>
            {snippetOptions.map((label) => (
              <option key={label} value={label}>{label}</option>
            ))}
          </select>

          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
            <Save className="h-4 w-4" /> Save
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 disabled:bg-indigo-600/50"
          >
            <Play className={`h-4 w-4 ${isRunning ? "animate-pulse" : "fill-white"}`} />
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
        <span className="font-medium">Status: {status}</span>
        <span className="text-cyan-300">Engine: http://localhost:8000</span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
          <div className="flex h-10 items-center border-b border-white/5 bg-black/50 px-4">
            <span className="font-mono text-xs text-gray-400">main.py</span>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                padding: { top: 16 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>

        <div className="flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-white/10 bg-black">
          <div className="flex h-10 items-center gap-2 border-b border-white/5 bg-black/50 px-4">
            <Terminal className="h-4 w-4 text-gray-400" />
            <span className="font-mono text-xs text-gray-400">Terminal Output</span>
          </div>
          <div className="flex-1 overflow-y-auto whitespace-pre-wrap p-4 font-mono text-sm text-gray-300">
            {output || <span className="italic text-gray-600">No output yet. Run your code to see results.</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
