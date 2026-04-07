"use client";

import Script from "next/script";
import { useState, useCallback, useRef, useEffect } from "react";
import { usePyodide } from "../usePyodide";
import TerminalOutput from "../TerminalOutput";

const CANVAS_W = 1200;
const CANVAS_H = 800;

const ALGORITHMS = [
  { label: "A* Search", value: "astar", color: "blue" },
  { label: "BFS", value: "bfs", color: "yellow" },
  { label: "Bidirectional BFS", value: "bi_bfs", color: "green" },
  { label: "Bidirectional A*", value: "bi_astar", color: "orange" },
];

// Python code that loads data, builds graph, and runs algorithms
// with canvas bridge calls via js.drawLine
const buildRunCode = (
  algo: string,
  startCity: string,
  goalCity: string,
  color: string
) => `
import js
import json
from math import pi, acos, sin, cos
import time

def calc_edge_cost(y1, x1, y2, x2):
    y1, x1, y2, x2 = float(y1), float(x1), float(y2), float(x2)
    R = 3958.76
    y1 *= pi/180.0; x1 *= pi/180.0; y2 *= pi/180.0; x2 *= pi/180.0
    return acos(sin(y1)*sin(y2) + cos(y1)*cos(y2)*cos(x2-x1)) * R

# Load data from globals (already parsed in setup)
nodeLoc = graph_data['nodeLoc']
nodeToCity = graph_data['nodeToCity']
cityToNode = graph_data['cityToNode']
neighbors = graph_data['neighbors']
edgeCost = graph_data['edgeCost']
screenMap = graph_data['screenMap']
graph = [nodeLoc, nodeToCity, cityToNode, neighbors, edgeCost, screenMap]

def dist_heuristic(n1, n2, graph):
    return calc_edge_cost(graph[0][n1][0], graph[0][n1][1], graph[0][n2][0], graph[0][n2][1])

def drawLine(y1, x1, y2, x2, col):
    js.canvasDrawLine(float(x1), 800-float(y1), float(x2), 800-float(y2), col)

def draw_final_path(path, graph, col='red'):
    for i in range(len(path)-1):
        drawLine(*graph[5][path[i]], *graph[5][path[i+1]], col)

def generate_path(state, explored, graph):
    path = [state]
    cost = 0
    while explored[state] != 's' and explored[state] != 'g':
        cost += graph[4][(state, explored[state])]
        state = explored[state]
        path.append(state)
    return (path[::-1], cost)

class HeapPQ:
    def __init__(self):
        self.queue = ["dummy"]
    def isEmpty(self):
        return len(self.queue) == 1
    def push(self, value):
        self.queue.append(value)
        self._up(len(self.queue)-1)
    def pop(self):
        self._swap(1, len(self.queue)-1)
        val = self.queue.pop()
        if len(self.queue) > 1: self._down(1, len(self.queue)-1)
        return val
    def _swap(self, a, b):
        self.queue[a], self.queue[b] = self.queue[b], self.queue[a]
    def _up(self, k):
        p = k // 2
        if p != 0 and self.queue[p] > self.queue[k]:
            self._swap(k, p); self._up(p)
    def _down(self, k, size):
        l, r = k*2, k*2+1
        if l > size: return
        if l == size:
            if self.queue[k] > self.queue[l]: self._swap(k, l)
        else:
            m = l if self.queue[l] <= self.queue[r] else r
            if self.queue[k] > self.queue[m]:
                self._swap(k, m); self._down(m, size)

start_city = "${startCity}"
goal_city = "${goalCity}"
start = graph[2][start_city]
goal = graph[2][goal_city]
algo = "${algo}"
col = "${color}"

print(f"Running {algo.upper()} from {start_city} to {goal_city}...")
t0 = time.time()

if algo == "bfs":
    counter = 0
    frontier, explored = [], {start: "s"}
    frontier.append(start)
    path, cost = None, 0
    while frontier:
        s = frontier.pop(0)
        if s == goal:
            path, cost = generate_path(s, explored, graph)
            break
        for a in graph[3][s]:
            if a not in explored:
                explored[a] = s
                frontier.append(a)
                drawLine(*graph[5][s], *graph[5][a], col)
        counter += 1
        if counter % 2000 == 0:
            js.canvasFlush()
    if path:
        draw_final_path(path, graph)
        js.canvasFlush()
        print(f"Path found! Cost: {cost:.2f} miles, Nodes explored: {counter}")
    else:
        print("No path found.")

elif algo == "astar":
    frontier = HeapPQ()
    explored = {start: 0}
    frontier.push((dist_heuristic(start, goal, graph), start, []))
    counter = 0
    path, cost = None, 0
    while not frontier.isEmpty():
        state = frontier.pop()
        if state[1] not in state[2]:
            p = state[2] + [state[1]]
            if state[1] == goal:
                path = p
                cost = explored[state[1]]
                break
            for a in graph[3][state[1]]:
                drawLine(*graph[5][state[1]], *graph[5][a], col)
                if a not in explored or explored[state[1]] + graph[4][(state[1],a)] < explored[a]:
                    explored[a] = explored[state[1]] + graph[4][(state[1],a)]
                    frontier.push((explored[a] + dist_heuristic(a, goal, graph), a, p))
        counter += 1
        if counter % 2000 == 0:
            js.canvasFlush()
    if path:
        draw_final_path(path, graph)
        js.canvasFlush()
        print(f"Path found! Cost: {cost:.2f} miles, Nodes explored: {counter}")
    else:
        print("No path found.")

elif algo == "bi_bfs":
    counter = 0
    explored = {start: "s"}
    q = [start]
    explored2 = {goal: "g"}
    q2 = [goal]
    path, cost = None, 0
    while q and q2:
        a = q.pop(0)
        b = q2.pop(0)
        for c in graph[3][a]:
            if c not in explored:
                q.append(c)
                explored[c] = a
            drawLine(*graph[5][a], *graph[5][c], col)
        for d in graph[3][b]:
            if d not in explored2:
                q2.append(d)
                explored2[d] = b
            drawLine(*graph[5][b], *graph[5][d], col)
        counter += 1
        if counter % 2000 == 0:
            js.canvasFlush()
        for thing in explored:
            if thing in explored2:
                p1, c1 = generate_path(thing, explored, graph)
                p2, c2 = generate_path(thing, explored2, graph)
                path = p1[:-1] + p2[::-1]
                cost = c1 + c2
                break
        if path: break
    if path:
        draw_final_path(path, graph)
        js.canvasFlush()
        print(f"Path found! Cost: {cost:.2f} miles, Nodes explored: {counter}")
    else:
        print("No path found.")

elif algo == "bi_astar":
    frontier = HeapPQ()
    frontier2 = HeapPQ()
    explored = {start: 0}
    explored2 = {goal: 0}
    frontier.push((dist_heuristic(start, goal, graph), start, []))
    frontier2.push((dist_heuristic(goal, start, graph), goal, []))
    counter = 0
    path, cost = None, 0
    while not frontier.isEmpty() and not frontier2.isEmpty():
        state = frontier.pop()
        state2 = frontier2.pop()
        p1 = state[2] + [state[1]] if state[1] not in state[2] else []
        p2 = state2[2] + [state2[1]] if state2[1] not in state2[2] else []
        if state[1] in explored2 and state2[1] in explored:
            path = p1 + p2[::-1]
            cost = explored[state[1]] + explored2[state2[1]]
            break
        for a in graph[3][state[1]]:
            drawLine(*graph[5][state[1]], *graph[5][a], col)
            if a not in explored or explored[state[1]] + graph[4][(state[1],a)] < explored[a]:
                explored[a] = explored[state[1]] + graph[4][(state[1],a)]
                frontier.push((explored[a] + dist_heuristic(a, goal, graph), a, p1))
        for a in graph[3][state2[1]]:
            drawLine(*graph[5][state2[1]], *graph[5][a], col)
            if a not in explored2 or explored2[state2[1]] + graph[4][(state2[1],a)] < explored2[a]:
                explored2[a] = explored2[state2[1]] + graph[4][(state2[1],a)]
                frontier2.push((explored2[a] + dist_heuristic(a, start, graph), a, p2))
        counter += 1
        if counter % 2000 == 0:
            js.canvasFlush()
    if path:
        draw_final_path(path, graph)
        js.canvasFlush()
        print(f"Path found! Cost: {cost:.2f} miles, Nodes explored: {counter}")
    else:
        print("No path found.")

elapsed = time.time() - t0
print(f"Duration: {elapsed:.2f}s")
`;

// Python code to parse the data files
const SETUP_CODE = `
from math import pi, acos, sin, cos

def calc_edge_cost(y1, x1, y2, x2):
    y1, x1, y2, x2 = float(y1), float(x1), float(y2), float(x2)
    R = 3958.76
    y1 *= pi/180.0; x1 *= pi/180.0; y2 *= pi/180.0; x2 *= pi/180.0
    return acos(sin(y1)*sin(y2) + cos(y1)*cos(y2)*cos(x2-x1)) * R

nodeLoc, nodeToCity, cityToNode, neighbors, edgeCost, screenMap = {}, {}, {}, {}, {}, {}

with open('/data/rrNodes.txt') as f:
    for line in f:
        parts = line.strip().split(' ')
        nodeLoc[parts[0]] = (parts[1], parts[2])

with open('/data/rrNodeCity.txt') as f:
    for line in f:
        parts = line.strip().split(' ')
        nodeToCity[parts[0]] = ' '.join(parts[1:])
        cityToNode[' '.join(parts[1:])] = parts[0]

with open('/data/rrEdges.txt') as f:
    for line in f:
        nd1, nd2 = line.strip().split(' ')
        neighbors.setdefault(nd1, set()).add(nd2)
        neighbors.setdefault(nd2, set()).add(nd1)
        cost = calc_edge_cost(*nodeLoc[nd1], *nodeLoc[nd2])
        edgeCost[(nd1, nd2)] = cost
        edgeCost[(nd2, nd1)] = cost

for node in nodeLoc:
    lat = float(nodeLoc[node][0])
    lng = float(nodeLoc[node][1])
    modlat = (lat - 10) / 60
    modlng = (lng + 130) / 70
    screenMap[node] = [modlat * 800, modlng * 1200]

graph_data = {
    'nodeLoc': nodeLoc,
    'nodeToCity': nodeToCity,
    'cityToNode': cityToNode,
    'neighbors': neighbors,
    'edgeCost': edgeCost,
    'screenMap': screenMap,
}

cities = sorted(cityToNode.keys())
print('CITIES:' + ','.join(cities))
print(f"Loaded {len(nodeLoc)} nodes, {len(edgeCost)//2} edges, {len(cities)} cities")
`;

export default function RailroadDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const drawBufferRef = useRef<Array<[number, number, number, number, string]>>([]);
  const { runPython, load } = usePyodide();
  const [lines, setLines] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [startCity, setStartCity] = useState("Charlotte");
  const [goalCity, setGoalCity] = useState("Los Angeles");
  const [algo, setAlgo] = useState(0);
  const [running, setRunning] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);

  // Draw all edges as the base layer
  const drawBaseNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Draw from offscreen if available
    if (offscreenRef.current) {
      ctx.drawImage(offscreenRef.current, 0, 0);
    }
  }, []);

  // Setup canvas bridge functions on globalThis
  useEffect(() => {
    // Buffer draw calls and flush periodically
    (globalThis as Record<string, unknown>).canvasDrawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      col: string
    ) => {
      drawBufferRef.current.push([x1, y1, x2, y2, col]);
    };

    (globalThis as Record<string, unknown>).canvasFlush = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      for (const [x1, y1, x2, y2, col] of drawBufferRef.current) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = col;
        ctx.lineWidth = col === "red" ? 3 : 1;
        ctx.stroke();
      }
      drawBufferRef.current = [];
    };
  }, []);

  // Load data files into Pyodide virtual FS and parse
  const loadData = useCallback(async () => {
    setLines(["Loading Python runtime..."]);
    const pyodide = await load();
    if (!pyodide) return;

    setLines((p) => [...p, "Downloading railroad data files..."]);

    // Fetch data files and write to Pyodide FS
    const files = ["rrNodes.txt", "rrEdges.txt", "rrNodeCity.txt"];
    pyodide.FS.mkdir("/data");
    for (const file of files) {
      const resp = await fetch(`/data/railroad/${file}`);
      const text = await resp.text();
      pyodide.FS.writeFile(`/data/${file}`, text);
    }

    setLines((p) => [...p, "Parsing graph data..."]);

    // Run setup code
    let cityList: string[] = [];
    await runPython(SETUP_CODE, (line) => {
      if (line.startsWith("CITIES:")) {
        cityList = line.slice(7).split(",");
      } else {
        setLines((p) => [...p, line]);
      }
    });

    setCities(cityList);
    if (cityList.includes("Charlotte")) setStartCity("Charlotte");
    else if (cityList.length > 0) setStartCity(cityList[0]);
    if (cityList.includes("Los Angeles")) setGoalCity("Los Angeles");
    else if (cityList.length > 1) setGoalCity(cityList[1]);

    // Draw base network using Python screen map data
    setLines((p) => [...p, "Drawing network..."]);
    await runPython(
      `
import js
for (n1, n2) in edgeCost:
    if n1 < n2:
        x1, y1 = screenMap[n1]
        x2, y2 = screenMap[n2]
        js.canvasDrawLine(float(y1), 800-float(x1), float(y2), 800-float(x2), 'rgba(255,255,255,0.15)')
js.canvasFlush()
`,
      () => {}
    );

    // Save the base network to offscreen canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const offscreen = document.createElement("canvas");
      offscreen.width = CANVAS_W;
      offscreen.height = CANVAS_H;
      offscreen.getContext("2d")!.drawImage(canvas, 0, 0);
      offscreenRef.current = offscreen;
    }

    setDataLoaded(true);
    setLines((p) => [...p, "Ready! Select cities and an algorithm."]);
  }, [load, runPython]);

  useEffect(() => {
    if (pyodideLoaded) {
      drawBaseNetwork();
      loadData();
    }
  }, [pyodideLoaded, drawBaseNetwork, loadData]);

  const handleRun = useCallback(async () => {
    if (!dataLoaded) return;
    setRunning(true);
    drawBaseNetwork();
    drawBufferRef.current = [];
    setLines(["Running algorithm..."]);

    const { value, color } = ALGORITHMS[algo];
    const code = buildRunCode(value, startCity, goalCity, color);
    await runPython(code, (line) => {
      setLines((p) => [...p, line]);
    });

    // Final flush
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        for (const [x1, y1, x2, y2, col] of drawBufferRef.current) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = col;
          ctx.lineWidth = col === "red" ? 3 : 1;
          ctx.stroke();
        }
        drawBufferRef.current = [];
      }
    }

    setRunning(false);
  }, [dataLoaded, algo, startCity, goalCity, runPython, drawBaseNetwork]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js"
        onLoad={() => setPyodideLoaded(true)}
      />
      <div className="space-y-6">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This visualizes pathfinding on a real US railroad network with{" "}
            {cities.length || "..."} cities. The Python search algorithms
            (BFS, A*, bidirectional variants) run in your browser via Pyodide,
            drawing explored edges in real-time. The final shortest path is
            drawn in red.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Start</label>
            <select
              value={startCity}
              onChange={(e) => setStartCity(e.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              disabled={running || !dataLoaded}
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Goal</label>
            <select
              value={goalCity}
              onChange={(e) => setGoalCity(e.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              disabled={running || !dataLoaded}
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Algorithm</label>
            <select
              value={algo}
              onChange={(e) => setAlgo(Number(e.target.value))}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              disabled={running}
            >
              {ALGORITHMS.map((a, i) => (
                <option key={i} value={i}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleRun}
            disabled={running || !dataLoaded}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {running ? "Running..." : !dataLoaded ? "Loading data..." : "Run"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="rounded-lg"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>

        <TerminalOutput lines={lines} />

        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            View Python source code
          </summary>
          <div className="mt-2 max-h-96 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed dark:border-zinc-800 dark:bg-zinc-900">
            <a
              href="https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%201/Elavarthi_Pranav_U1_Lab7_Railroad_shell.py"
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
