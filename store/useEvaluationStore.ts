import { create } from "zustand";
import { MODEL_CATALOG } from "@/lib/modelCatalog";
import { EvaluationResult, PromptPayload } from "@/lib/types";
import { runEvaluation } from "@/lib/pipeline";

interface EvaluationState {
  selectedModelIds: string[];
  prompt: PromptPayload;
  userChoiceModelId?: string;
  result?: EvaluationResult;
  isRunning: boolean;
  error?: string;
  toggleModel: (modelId: string) => void;
  setPromptText: (text: string) => void;
  setPromptImageUrl: (url?: string) => void;
  runPipeline: () => Promise<void>;
  setUserChoice: (modelId: string) => void;
  reset: () => void;
}

const MAX_MODELS = 5;
const MIN_MODELS = 4;

export const useEvaluationStore = create<EvaluationState>((set, get) => ({
  selectedModelIds: MODEL_CATALOG.slice(0, MIN_MODELS).map((model) => model.id),
  prompt: {
    text: "",
    imageUrl: ""
  },
  isRunning: false,
  toggleModel: (modelId: string) => {
    const { selectedModelIds } = get();
    const exists = selectedModelIds.includes(modelId);
    let next = exists
      ? selectedModelIds.filter((id) => id !== modelId)
      : [...selectedModelIds, modelId];

    if (!exists && next.length > MAX_MODELS) {
      next = next.slice(1);
    }

    set({ selectedModelIds: next });
  },
  setPromptText: (text: string) => set((state) => ({ prompt: { ...state.prompt, text } })),
  setPromptImageUrl: (imageUrl?: string) =>
    set((state) => ({ prompt: { ...state.prompt, imageUrl } })),
  runPipeline: async () => {
    const { selectedModelIds, prompt } = get();
    if (selectedModelIds.length < MIN_MODELS) {
      set({
        error: `Select at least ${MIN_MODELS} models for a valid evaluation.`
      });
      return;
    }
    if (!prompt.text?.trim() && !prompt.imageUrl?.trim()) {
      set({
        error: "Provide text or image context before running an evaluation."
      });
      return;
    }

    set({ isRunning: true, error: undefined });
    try {
      const result = await new Promise<EvaluationResult>((resolve) => {
        setTimeout(() => resolve(runEvaluation(selectedModelIds, prompt)), 650);
      });
      set({ result, isRunning: false, userChoiceModelId: undefined });
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Unexpected error while executing evaluation.",
        isRunning: false
      });
    }
  },
  setUserChoice: (modelId: string) => set({ userChoiceModelId: modelId }),
  reset: () =>
    set({
      selectedModelIds: MODEL_CATALOG.slice(0, MIN_MODELS).map((model) => model.id),
      prompt: { text: "", imageUrl: "" },
      result: undefined,
      userChoiceModelId: undefined,
      error: undefined
    })
}));
