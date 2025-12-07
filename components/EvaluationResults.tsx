"use client";

import { useMemo } from "react";
import clsx from "clsx";
import { useEvaluationStore } from "@/store/useEvaluationStore";
import { MODEL_CATALOG } from "@/lib/modelCatalog";

const getModelName = (modelId: string) =>
  MODEL_CATALOG.find((model) => model.id === modelId)?.name ?? modelId;

export const EvaluationResults = () => {
  const result = useEvaluationStore((state) => state.result);
  const isRunning = useEvaluationStore((state) => state.isRunning);
  const setUserChoice = useEvaluationStore((state) => state.setUserChoice);
  const userChoice = useEvaluationStore((state) => state.userChoiceModelId);

  const aggregator = useMemo(() => {
    if (!result) {
      return undefined;
    }
    const scoreMap = new Map(
      result.aggregatedScores.map((entry) => [entry.modelId, entry])
    );
    const peerSummary = result.peerAssessments.reduce<Record<string, number>>(
      (acc, assessment) => {
        acc[assessment.targetId] = (acc[assessment.targetId] ?? 0) + 1;
        return acc;
      },
      {}
    );

    return { scoreMap, peerSummary };
  }, [result]);

  if (!result && !isRunning) {
    return (
      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center text-sm text-slate-400">
        Configure your prompt and model lineup, then launch the evaluation to see
        cross-model responses, peer scoring, and Gemini adjudication.
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {result && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-midnight-400/60 bg-midnight-950/80 p-5 shadow-lg shadow-midnight-900/20">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-midnight-200">
              Gemini-3-Pro Final Ranking
            </h3>
            <p className="mt-2 text-base text-slate-100">
              {result.geminiRanking.commentary}
            </p>
            <ol className="mt-4 space-y-2 text-sm text-slate-200">
              {result.geminiRanking.orderedModelIds.map((modelId, index) => (
                <li key={modelId} className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-midnight-500 text-xs font-semibold text-slate-50">
                    {index + 1}
                  </span>
                  <span>{getModelName(modelId)}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span>
              Cross-evaluations recorded: {result.peerAssessments.length} scores
            </span>
            <span>Top three finalists: {result.topThreeIds.map(getModelName).join(", ")}</span>
            {userChoice && (
              <span
                className={clsx(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  result.geminiRanking.orderedModelIds[0] === userChoice
                    ? "border-emerald-500/60 text-emerald-300"
                    : "border-amber-500/60 text-amber-300"
                )}
              >
                User vs Gemini alignment:{" "}
                {result.geminiRanking.orderedModelIds[0] === userChoice ? "match" : "divergent"}
              </span>
            )}
          </div>
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-2">
        {isRunning && (
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
            <div className="h-2 w-32 animate-pulse rounded-full bg-midnight-500/60" />
            <p className="mt-4 text-sm text-slate-400">
              Synthesizing model outputs and peer review cycles...
            </p>
          </div>
        )}
        {result &&
          result.responses.map((response) => {
            const score = aggregator?.scoreMap.get(response.modelId);
            const peerReviews = aggregator?.peerSummary[response.modelId] ?? 0;
            const isTopThree = result.topThreeIds.includes(response.modelId);
            const isGeminiWinner =
              result.geminiRanking.orderedModelIds[0] === response.modelId;
            const isUserChoice = userChoice === response.modelId;

            return (
              <article
                key={response.modelId}
                className={clsx(
                  "flex h-full flex-col rounded-2xl border bg-slate-950/70 p-5 transition",
                  isTopThree
                    ? "border-midnight-400/70 shadow-lg shadow-midnight-900/30"
                    : "border-slate-800"
                )}
              >
                <header className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-50">
                      {getModelName(response.modelId)}
                    </h3>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {isGeminiWinner
                        ? "Gemini-3-Pro Winner"
                        : isTopThree
                          ? "Gemini Finalist"
                          : "Participant"}
                    </p>
                  </div>
                  {score && (
                    <div className="flex flex-col items-end text-xs text-slate-300">
                      <span className="font-semibold text-midnight-200">
                        Overall {score.overall}
                      </span>
                      <span>{peerReviews} peer reviews</span>
                    </div>
                  )}
                </header>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <p className="whitespace-pre-wrap leading-relaxed">{response.content}</p>
                  <p className="text-xs text-slate-400">{response.rationale}</p>
                </div>
                {score && (
                  <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                      <dt className="text-slate-400">Clarity</dt>
                      <dd className="text-slate-100">{score.clarity}</dd>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                      <dt className="text-slate-400">Relevance</dt>
                      <dd className="text-slate-100">{score.relevance}</dd>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                      <dt className="text-slate-400">Accuracy</dt>
                      <dd className="text-slate-100">{score.accuracy}</dd>
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                      <dt className="text-slate-400">Creativity</dt>
                      <dd className="text-slate-100">{score.creativity}</dd>
                    </div>
                  </dl>
                )}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setUserChoice(response.modelId)}
                    className={clsx(
                      "rounded-full border px-4 py-1.5 text-xs font-semibold transition",
                      isUserChoice
                        ? "border-emerald-400 text-emerald-200"
                        : "border-slate-700 text-slate-300 hover:border-midnight-400 hover:text-midnight-100"
                    )}
                  >
                    {isUserChoice ? "Your Selection" : "Mark as My Top Pick"}
                  </button>
                  {isUserChoice && !isGeminiWinner && (
                    <span className="text-xs text-amber-300">
                      Diverges from Gemini&apos;s preferred response
                    </span>
                  )}
                  {isUserChoice && isGeminiWinner && (
                    <span className="text-xs text-emerald-300">Aligned with Gemini</span>
                  )}
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
};
