"use client";

import { MODEL_CATALOG } from "@/lib/modelCatalog";
import { useEvaluationStore } from "@/store/useEvaluationStore";
import { useMemo } from "react";
import clsx from "clsx";

const capabilityLabel = {
  text: "Text",
  vision: "Vision",
  audio: "Audio"
};

export const ModelSelector = () => {
  const selectedModelIds = useEvaluationStore((state) => state.selectedModelIds);
  const toggleModel = useEvaluationStore((state) => state.toggleModel);

  const summary = useMemo(() => {
    const selected = MODEL_CATALOG.filter((model) =>
      selectedModelIds.includes(model.id)
    );
    return {
      count: selected.length,
      providers: Array.from(new Set(selected.map((model) => model.provider)))
    };
  }, [selectedModelIds]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-50">Model Lineup</h2>
        <span className="text-sm text-slate-400">
          {summary.count} selected • {summary.providers.join(", ")}
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {MODEL_CATALOG.map((model) => {
          const isSelected = selectedModelIds.includes(model.id);
          return (
            <button
              key={model.id}
              type="button"
              onClick={() => toggleModel(model.id)}
              className={clsx(
                "rounded-xl border px-4 py-3 text-left transition-all",
                "border-slate-700 bg-slate-900/60 hover:border-midnight-500/70 hover:bg-slate-900",
                isSelected && "border-midnight-400 bg-slate-900 shadow-lg shadow-midnight-900/40"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-slate-50">{model.name}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {model.provider}
                  </p>
                </div>
                <div
                  className={clsx(
                    "h-3 w-3 rounded-full border border-slate-600",
                    isSelected ? "bg-midnight-400 border-midnight-300" : "bg-transparent"
                  )}
                />
              </div>
              <p className="mt-2 text-sm text-slate-300">{model.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {model.capabilities.map((capability) => (
                  <span
                    key={capability}
                    className={clsx(
                      "rounded-full border px-2.5 py-1 text-xs font-medium",
                      "border-slate-700 text-slate-300",
                      isSelected && "border-midnight-400 text-midnight-100"
                    )}
                  >
                    {capabilityLabel[capability]}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
