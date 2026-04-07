import type { Metadata } from "next";
import DemoLayout from "@/components/demos/DemoLayout";
import NeuralNetworkDemo from "@/components/demos/neural-network/NeuralNetworkDemo";

export const metadata: Metadata = {
  title: "Neural Network from Scratch — Pranav Elavarthi",
  description:
    "Multi-layer neural network with forward propagation and backpropagation",
};

export default function NeuralNetworkPage() {
  return (
    <DemoLayout
      title="Neural Network from Scratch"
      description="Multi-layer neural network built without libraries, implementing forward propagation, backpropagation, and gradient descent to classify 2D points."
    >
      <NeuralNetworkDemo />
    </DemoLayout>
  );
}
