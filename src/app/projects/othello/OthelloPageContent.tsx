"use client";

import DemoLayout from "@/components/demos/DemoLayout";
import OthelloDemo from "@/components/demos/othello/OthelloDemo";

export default function OthelloPageContent() {
  return (
    <DemoLayout
      title="Othello AI"
      description="Play against an AI that uses alpha-beta pruning to search the game tree. The AI logic is the actual Python code running directly in your browser."
      backHref="/#projects"
      onBack={() => sessionStorage.setItem("disable-animation", "true")}
    >
      <OthelloDemo />
    </DemoLayout>
  );
}
