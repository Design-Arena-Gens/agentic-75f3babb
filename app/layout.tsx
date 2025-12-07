import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Agentic Multimodal Arena",
  description:
    "Test, cross-evaluate, and rank multimodal AI models with Gemini-3-Pro adjudication."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
