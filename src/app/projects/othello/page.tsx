import type { Metadata } from "next";
import OthelloPageContent from "./OthelloPageContent";

export const metadata: Metadata = {
  title: "Othello AI — Pranav Elavarthi",
  description:
    "Play Othello against an AI using minimax and alpha-beta pruning",
};

export default function OthelloPage() {
  return <OthelloPageContent />;
}
