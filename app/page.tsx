"use client";

import { ModelSelector } from "@/components/ModelSelector";
import { PromptComposer } from "@/components/PromptComposer";
import { EvaluationActions } from "@/components/EvaluationActions";
import { EvaluationResults } from "@/components/EvaluationResults";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-midnight-300">
          Agentic Multimodal Prompt Arena
        </p>
        <h1 className="text-3xl font-bold text-slate-50 sm:text-4xl">
          Benchmark, Cross-Evaluate, and Align Multimodal Model Intelligence
        </h1>
        <p className="max-w-3xl text-sm text-slate-300 sm:text-base">
          Configure 4–5 frontier models, submit a text or multimodal prompt payload, and
          watch them critique one another before Gemini-3-Pro delivers the decisive
          ranking. Compare against your own pick to measure alignment.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <ModelSelector />
          <PromptComposer />
          <EvaluationActions />
        </div>
        <EvaluationResults />
      </div>
    </main>
  );
}
