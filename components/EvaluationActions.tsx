"use client";

import { useEvaluationStore } from "@/store/useEvaluationStore";
import clsx from "clsx";

export const EvaluationActions = () => {
  const runPipeline = useEvaluationStore((state) => state.runPipeline);
  const reset = useEvaluationStore((state) => state.reset);
  const isRunning = useEvaluationStore((state) => state.isRunning);
  const error = useEvaluationStore((state) => state.error);
  const selectedCount = useEvaluationStore((state) => state.selectedModelIds.length);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={runPipeline}
          disabled={isRunning}
          className={clsx(
            "inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold transition-all",
            "bg-midnight-500 hover:bg-midnight-400 disabled:bg-slate-700 disabled:text-slate-400"
          )}
        >
          {isRunning ? "Orchestrating evaluation..." : "Run Multimodal Evaluation"}
        </button>
        <button
          type="button"
          onClick={reset}
          disabled={isRunning}
          className="inline-flex items-center justify-center rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-slate-100 disabled:opacity-60"
        >
          Reset Scenario
        </button>
        <span className="text-xs text-slate-400">
          {selectedCount} models active • target 4-5 for rich comparisons
        </span>
      </div>
      {error && (
        <div className="rounded-xl border border-red-500/60 bg-red-500/5 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}
    </section>
  );
};
