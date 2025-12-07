"use client";

import { ChangeEvent } from "react";
import { useEvaluationStore } from "@/store/useEvaluationStore";

export const PromptComposer = () => {
  const prompt = useEvaluationStore((state) => state.prompt);
  const setPromptText = useEvaluationStore((state) => state.setPromptText);
  const setPromptImageUrl = useEvaluationStore((state) => state.setPromptImageUrl);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPromptText(event.target.value);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromptImageUrl(event.target.value);
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-50">Prompt Payload</h2>
        <span className="text-xs uppercase tracking-wide text-slate-400">
          Text · Image URL
        </span>
      </div>
      <textarea
        value={prompt.text}
        onChange={handleTextChange}
        className="h-40 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 shadow-inner focus:border-midnight-400 focus:outline-none focus:ring-2 focus:ring-midnight-500/70"
        placeholder="Describe the scenario, instructions, or analysis request you want every model to solve..."
      />
      <input
        value={prompt.imageUrl ?? ""}
        onChange={handleImageChange}
        type="url"
        placeholder="Optional: Paste a reference image URL for multimodal evaluation."
        className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-2 text-sm text-slate-100 focus:border-midnight-400 focus:outline-none focus:ring-2 focus:ring-midnight-500/70"
      />
    </section>
  );
};
