import type { Metadata } from "next";
import DemoLayout from "@/components/demos/DemoLayout";
import CrosswordDemo from "@/components/demos/crossword/CrosswordDemo";

export const metadata: Metadata = {
  title: "Crossword Generator — Pranav Elavarthi",
  description:
    "Interactive crossword puzzle generator using backtracking and constraint satisfaction",
};

export default function CrosswordPage() {
  return (
    <DemoLayout
      title="Crossword Generator"
      description="Generates symmetric crossword puzzles using backtracking, constraint satisfaction, regex pattern matching, and flood-fill connectivity validation."
    >
      <CrosswordDemo />
    </DemoLayout>
  );
}
