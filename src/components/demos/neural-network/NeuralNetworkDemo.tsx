"use client";

import Script from "next/script";
import { useState, useCallback } from "react";
import { usePyodide } from "../usePyodide";
import TerminalOutput from "../TerminalOutput";

const CONDITIONS = [
  { label: "x\u00B2 + y\u00B2 >= 1.5", value: ">=1.5" },
  { label: "x\u00B2 + y\u00B2 < 1.0", value: "<1.0" },
  { label: "x\u00B2 + y\u00B2 >= 0.5", value: ">=0.5" },
  { label: "x\u00B2 + y\u00B2 < 2.0", value: "<2.0" },
];

const SAMPLE_COUNTS = [
  { label: "1,000 samples (fast)", value: 1000 },
  { label: "5,000 samples", value: 5000 },
  { label: "10,000 samples", value: 10000 },
];

const buildCode = (condition: string, samples: number) => `
import random

inp = "${condition}"

def transfer(t_funct, input):
    e = 2.718281828459
    input = float(input)
    if t_funct == "T1": return input
    if t_funct == "T2": return input if input > 0 else 0
    if t_funct == "T3": return 1/(1+(e**(-input)))
    if t_funct == "T4": return (2/(1+(e**(-input))))-1
    return 0

def dot_product(l1, l2):
    return sum(a * b for a, b in zip(l1, l2))

def forwardFeed(inputs, t, weights, layerCounts):
    xVals = []
    xVals.append(inputs)
    while len(weights) > 1:
        temp = []
        for i in range(len(weights[0])//len(inputs)):
            temp.append(dot_product(inputs, weights[0][i*len(inputs):(i+1)*len(inputs)]))
        inputs = []
        for thing in temp:
            inputs.append(transfer('T3', thing))
        xVals.append(inputs)
        weights.pop(0)
    final = []
    for i in range(len(weights[0])):
        final.append(weights[0][i]*inputs[i])
    xVals.append(final)
    return xVals

def backProp(xv, weights, t):
    Evals = xv[:]
    Evals[-1][0] = (t-xv[-1][0])
    for i in range(len(Evals)-2, -1, -1):
        for j in range(len(Evals[i])):
            if i == 0:
                Evals[i][j] = Evals[i][j]
            else:
                Evals[i][j] = Evals[i+1][j//(len(xv[i]))] * xv[i][j%(len(xv[i]))] * (1-xv[i][j%len(xv[i])]) * weights[i][j]
    negative_grad = []
    for i in range(1, len(Evals)):
        li = list()
        for j in range(len(Evals[i])):
            for thing in xv[i-1]:
                li.append(thing * Evals[i][j])
        negative_grad.append(li)
    alpha = 0.3
    return updateWeights(weights, alpha, negative_grad)

def updateWeights(weights, alpha, negative_grad):
    return [[weights[i][j] + alpha * negative_grad[i][j] for j in range(len(weights[i]))] for i in range(len(weights))]

NUM_SAMPLES = ${samples}
asdf = [3, 12, 6, 4, 1, 1]
print("Layer Counts:", asdf)
print("Condition:", inp)
print(f"Training on {NUM_SAMPLES} samples...")
print()

temp = []
if ">=" in inp: temp = inp.split("=")
elif "<=" in inp: temp = inp.split("=")
elif ">" in inp: temp = inp.split(">")
else: temp = inp.split("<")
rSquared = float(temp[1])

training = []
for num in range(NUM_SAMPLES):
    tempTup = [round(random.uniform(-1.5, 1.5), 2), round(random.uniform(-1.5, 1.5), 2)]
    x, y = tempTup[0], tempTup[1]
    val = (x*x) + (y*y)
    if ">=" in inp: label = 1.0 if val >= rSquared else 0.0
    elif "<=" in inp: label = 1.0 if val <= rSquared else 0.0
    elif ">" in inp: label = 1.0 if val > rSquared else 0.0
    else: label = 1.0 if val < rSquared else 0.0
    tempTup.append(label)
    training.append(tempTup)

weights = []
for line in training:
    inputs = [float(x) for x in line[:2]]
    t = float(line[-1])
    inputs.append(1.0)
    layerCounts = [len(inputs), 12, 6, 4, 1, 1]
    for i in range(len(layerCounts)-1):
        weights.append([0]*(layerCounts[i]*layerCounts[i+1]))
    for thing in weights:
        for i in range(len(thing)):
            thing[i] = round(random.uniform(-0.5, 0.5), 3)
    break

errors = []
count = 0
report_interval = max(1, NUM_SAMPLES // 10)

for thing in training:
    inputs = [float(x) for x in thing[:2]]
    t = float(thing[-1])
    inputs.append(1.0)
    layerCounts = [len(inputs), 12, 6, 4, 1, 1]
    weightsCopy = [li[:] for li in weights]
    inputsCopy = inputs[:]
    output = forwardFeed(inputsCopy, t, weightsCopy, layerCounts)
    weights = backProp(output, weights, t)
    weightsCopy = [list(sublist) for sublist in weights]
    newOutput = forwardFeed(inputs, t, weightsCopy, layerCounts)
    error = 0.5 * ((t - newOutput[-1][0]) ** 2)
    errors.append(error)
    count += 1
    if count % report_interval == 0:
        recent = errors[-report_interval:]
        avg_err = sum(recent) / len(recent)
        acc = sum(1 for e in recent if e < 0.01) / len(recent) * 100
        print(f"Sample {count}/{NUM_SAMPLES} | Avg Error: {avg_err:.6f} | Accuracy: {acc:.1f}%")

correct = sum(1 for e in errors if e < 0.01)
print()
print(f"=== Training Complete ===")
print(f"Correct predictions (error < 0.01): {correct}/{len(errors)} ({correct/len(errors)*100:.1f}%)")
print(f"Total squared error: {sum(errors):.4f}")
`;

export default function NeuralNetworkDemo() {
  const { loading, runPython } = usePyodide();
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [condition, setCondition] = useState(0);
  const [sampleCount, setSampleCount] = useState(0);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setLines(["Loading Python runtime..."]);
    const code = buildCode(
      CONDITIONS[condition].value,
      SAMPLE_COUNTS[sampleCount].value
    );
    await runPython(code, (line) => {
      setLines((prev) => [...prev, line]);
    });
    setRunning(false);
  }, [runPython, condition, sampleCount]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js"
        onLoad={() => setPyodideLoaded(true)}
      />
      <div className="space-y-6">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This runs the actual Python neural network in your browser. The
            network has 6 layers [3, 12, 6, 4, 1, 1] and learns to classify 2D
            points based on their distance from the origin using forward
            propagation and backpropagation with gradient descent.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(Number(e.target.value))}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              disabled={running}
            >
              {CONDITIONS.map((c, i) => (
                <option key={i} value={i}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Training size
            </label>
            <select
              value={sampleCount}
              onChange={(e) => setSampleCount(Number(e.target.value))}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              disabled={running}
            >
              {SAMPLE_COUNTS.map((s, i) => (
                <option key={i} value={i}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleRun}
            disabled={running || !pyodideLoaded}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {running
              ? "Training..."
              : loading
                ? "Loading Python..."
                : !pyodideLoaded
                  ? "Loading..."
                  : "Train Network"}
          </button>
        </div>

        <TerminalOutput lines={lines} />

        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            View Python source code
          </summary>
          <div className="mt-2 max-h-96 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed dark:border-zinc-800 dark:bg-zinc-900">
            <a
              href="https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%206/Unit6Lab3.py"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 inline-block text-blue-600 underline hover:text-blue-500 dark:text-blue-400"
            >
              View on GitHub
            </a>
          </div>
        </details>
      </div>
    </>
  );
}
