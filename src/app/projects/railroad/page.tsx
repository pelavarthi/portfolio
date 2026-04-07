import type { Metadata } from "next";
import DemoLayout from "@/components/demos/DemoLayout";
import RailroadDemo from "@/components/demos/railroad/RailroadDemo";

export const metadata: Metadata = {
  title: "Railroad Pathfinding — Pranav Elavarthi",
  description:
    "Visualize BFS, A*, and bidirectional search on a real US railroad network",
};

export default function RailroadPage() {
  return (
    <DemoLayout
      title="Railroad Pathfinding"
      description="Visualize pathfinding algorithms on a real US railroad network. The Python algorithms run directly in your browser, drawing exploration and final paths on the canvas."
    >
      <RailroadDemo />
    </DemoLayout>
  );
}
