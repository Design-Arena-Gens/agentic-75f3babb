# Agentic Multimodal Prompt Arena

AI-powered platform for testing, comparing, and ranking responses from multiple multimodal foundation models using a shared prompt payload. Models critique one another, top responses advance to a Gemini-3-Pro adjudication stage, and users can compare their preferred outcome against Gemini's verdict.

## ✨ Core Workflow

- Select 4–5 candidate models across vendors (OpenAI, Anthropic, Google, Meta, Mistral)
- Craft a prompt payload with text plus optional reference image URL
- Launch the arena to synthesize responses and generate cross-model peer assessments
- Inspect aggregated clarity, relevance, accuracy, and creativity scores
- Review Gemini-3-Pro's final ranking of the top three responses
- Mark your personal favorite to measure alignment with Gemini

## 🚀 Tech Stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) for design system primitives
- [Zustand](https://github.com/pmndrs/zustand) for lightweight client state management

## 🧑‍💻 Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 to access the arena UI.

## 🧱 Project Structure

```
├── app/                 # Next.js app router pages & layout
├── components/          # UI components for selection, prompts, results
├── lib/                 # Model catalog & evaluation pipeline
├── store/               # Zustand store and orchestration helpers
├── public/              # Static assets (if needed)
├── package.json
└── tailwind.config.ts
```

## 🧪 Scripts

- `npm run dev` – start local dev server
- `npm run build` – production build
- `npm run start` – serve production build
- `npm run lint` – lint with ESLint

## 📄 License

MIT — feel free to adapt and extend the platform.
