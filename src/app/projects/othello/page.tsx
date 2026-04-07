import type { Metadata } from "next";
import DemoLayout from "@/components/demos/DemoLayout";
import OthelloDemo from "@/components/demos/othello/OthelloDemo";

export const metadata: Metadata = {
  title: "Othello AI — Pranav Elavarthi",
  description:
    "Play Othello against an AI using minimax and alpha-beta pruning",
};

export default function OthelloPage() {
  return (
    <DemoLayout
      title="Othello AI"
      description="Play against an AI that uses alpha-beta pruning to search the game tree. The AI logic is the actual Python code running in your browser via Pyodide."
    >
      <OthelloDemo />
    </DemoLayout>
  );
}
