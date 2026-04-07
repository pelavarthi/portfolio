"use client";

import Script from "next/script";
import { useState, useCallback, useRef, useEffect } from "react";
import { usePyodide } from "../usePyodide";

const CELL = 56;
const PAD = 4;
const BOARD_SIZE = 8;
const CANVAS_SIZE = BOARD_SIZE * (CELL + PAD) + PAD;

// The Python AI code — Pranav's actual alpha-beta implementation
const AI_CODE = `
import random

class Best_AI_bot:
    def __init__(self):
        self.white = "#ffffff"
        self.black = "#000000"
        self.directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
        self.opposite_color = {self.black: self.white, self.white: self.black}
        self.x_max = None
        self.y_max = None
        self.color = None

    def get_search_depth(self, stones):
        if stones > 32: return 4
        elif stones > 10: return 5
        else: return 6

    def get_coords(self, move):
        return (move // self.x_max, move % self.y_max)

    def best_strategy(self, board, color):
        self.x_max = len(board)
        self.y_max = len(board[0])
        self.color = color
        stones_left = self.stones_left(board)
        depth = self.get_search_depth(stones_left)
        move = self.alphabeta(board, color, search_depth=depth, alpha=-9999999999, beta=9999999999)[1]
        return self.get_coords(move), 0

    def terminal(self, board, color, last_move):
        cur_eval = self.evaluate(board, self.color, self.find_moves(board, color))
        if self.stones_left(board)==0 or len(self.find_moves(board,color))==0:
            return cur_eval, last_move
        return cur_eval, 0

    def max_alpha_beta(self, board, color, search_depth, alpha, beta):
        m = -9999999999
        fin = 0
        for move, flipped in self.find_moves(board, color).items():
            cm = self.make_move(board, color, move, flipped)
            cc = self.opposite_color[color]
            cv = self.alphabeta(cm, cc, search_depth-1, alpha, beta, cm)[0]
            if cv > m:
                m = cv
                fin = move
            if m > beta: return m, fin
            alpha = max(alpha, m)
        return m, fin

    def min_alpha_beta(self, board, color, search_depth, alpha, beta):
        m = 9999999999
        fin = 0
        for move, flipped in self.find_moves(board, color).items():
            cm = self.make_move(board, color, move, flipped)
            cc = self.opposite_color[color]
            cv = self.alphabeta(cm, cc, search_depth-1, alpha, beta, cm)[0]
            if cv < m:
                m = cv
                fin = move
            if m < alpha: return m, fin
            beta = min(beta, m)
        return m, fin

    def alphabeta(self, board, color, search_depth, alpha, beta, last_move=-1):
        if search_depth <= 0 or self.stones_left(board)==0 or len(self.find_moves(board,color))==0:
            return self.terminal(board, color, last_move)
        if search_depth % 2 == 1:
            return self.min_alpha_beta(board, color, search_depth, alpha, beta)
        else:
            return self.max_alpha_beta(board, color, search_depth, alpha, beta)

    def stones_left(self, board):
        return sum(row.count('.') for row in board)

    def make_move(self, board, color, move, flipped):
        nb = [row[:] for row in board]
        c = "@" if color == self.black else "O"
        r, col = self.get_coords(move)
        nb[r][col] = c
        for x, y in flipped:
            nb[x][y] = c
        return nb

    def evaluate(self, board, color, possible_moves):
        return len(possible_moves) - 0.5 * len(self.find_moves(board, self.opposite_color[color]))

    def find_moves(self, my_board, my_color):
        moves_found = {}
        for i in range(len(my_board)):
            for j in range(len(my_board[i])):
                flipped = self.find_flipped(my_board, i, j, my_color)
                if len(flipped) > 0:
                    moves_found[i*self.y_max+j] = flipped
        return moves_found

    def find_flipped(self, board, x, y, color):
        if board[x][y] != ".": return []
        my_color = "@" if color == self.black else "O"
        flipped = []
        for incr in self.directions:
            temp = []
            xp, yp = x+incr[0], y+incr[1]
            while 0 <= xp < self.x_max and 0 <= yp < self.y_max:
                if board[xp][yp] == ".": break
                if board[xp][yp] == my_color:
                    flipped += temp
                    break
                temp.append([xp, yp])
                xp += incr[0]
                yp += incr[1]
        return flipped

ai = Best_AI_bot()
`;

type Cell = "." | "@" | "O";
type Board = Cell[][];

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
];

function createBoard(): Board {
  const b: Board = Array.from({ length: 8 }, () => Array(8).fill("."));
  b[3][3] = "O"; b[3][4] = "@";
  b[4][3] = "@"; b[4][4] = "O";
  return b;
}

function findFlipped(board: Board, x: number, y: number, color: Cell): number[][] {
  if (board[x][y] !== ".") return [];
  const flipped: number[][] = [];
  for (const [dx, dy] of DIRECTIONS) {
    const temp: number[][] = [];
    let xp = x + dx, yp = y + dy;
    while (xp >= 0 && xp < 8 && yp >= 0 && yp < 8) {
      if (board[xp][yp] === ".") break;
      if (board[xp][yp] === color) { flipped.push(...temp); break; }
      temp.push([xp, yp]);
      xp += dx; yp += dy;
    }
  }
  return flipped;
}

function findMoves(board: Board, color: Cell): Map<number, number[][]> {
  const moves = new Map<number, number[][]>();
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 8; j++) {
      const f = findFlipped(board, i, j, color);
      if (f.length > 0) moves.set(i * 8 + j, f);
    }
  return moves;
}

function applyMove(board: Board, x: number, y: number, color: Cell, flipped: number[][]): Board {
  const nb = board.map((r) => [...r]) as Board;
  nb[x][y] = color;
  for (const [fx, fy] of flipped) nb[fx][fy] = color;
  return nb;
}

function getScore(board: Board): { black: number; white: number } {
  let black = 0, white = 0;
  for (const row of board) for (const c of row) { if (c === "@") black++; if (c === "O") white++; }
  return { black, white };
}

export default function OthelloDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { runPython, load } = usePyodide();
  const [board, setBoard] = useState<Board>(createBoard);
  const [turn, setTurn] = useState<Cell>("@");
  const [moves, setMoves] = useState<Map<number, number[][]>>(() => findMoves(createBoard(), "@"));
  const [gameOver, setGameOver] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [mode, setMode] = useState<"pvai" | "aivai">("pvai");
  const [aiReady, setAiReady] = useState(false);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);
  const boardRef = useRef(board);
  boardRef.current = board;

  // Initialize AI
  const initAI = useCallback(async () => {
    await load();
    await runPython(AI_CODE, () => {});
    setAiReady(true);
  }, [load, runPython]);

  useEffect(() => {
    if (pyodideLoaded) initAI();
  }, [pyodideLoaded, initAI]);

  // Draw the board
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#654321";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const x = j * (CELL + PAD) + PAD;
        const y = i * (CELL + PAD) + PAD;

        // Cell background
        const moveKey = i * 8 + j;
        const isMove = moves.has(moveKey) && !gameOver && !thinking;
        ctx.fillStyle = isMove ? "#00cccc" : "#00aa00";
        ctx.fillRect(x, y, CELL, CELL);

        // Piece
        if (board[i][j] !== ".") {
          ctx.beginPath();
          ctx.arc(x + CELL / 2, y + CELL / 2, CELL / 2 - 4, 0, Math.PI * 2);
          ctx.fillStyle = board[i][j] === "@" ? "#111" : "#fff";
          ctx.fill();
          ctx.strokeStyle = "#333";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }, [board, moves, gameOver, thinking]);

  const advanceTurn = useCallback(
    (newBoard: Board, lastTurn: Cell) => {
      const next: Cell = lastTurn === "@" ? "O" : "@";
      const nextMoves = findMoves(newBoard, next);
      if (nextMoves.size > 0) {
        setTurn(next);
        setMoves(nextMoves);
        return next;
      }
      const sameMoves = findMoves(newBoard, lastTurn);
      if (sameMoves.size > 0) {
        setMoves(sameMoves);
        return lastTurn;
      }
      setGameOver(true);
      setMoves(new Map());
      return null;
    },
    []
  );

  const getAIMove = useCallback(
    async (currentBoard: Board, color: Cell): Promise<[number, number] | null> => {
      const boardStr = JSON.stringify(currentBoard);
      const colorStr = color === "@" ? "#000000" : "#ffffff";
      let result = "";
      await runPython(
        `
import json
board = json.loads('${boardStr}')
coords, _ = ai.best_strategy(board, "${colorStr}")
print(json.dumps(coords))
`,
        (line) => { result = line; }
      );
      try {
        return JSON.parse(result);
      } catch {
        return null;
      }
    },
    [runPython]
  );

  const doAITurn = useCallback(
    async (currentBoard: Board, color: Cell) => {
      setThinking(true);
      const move = await getAIMove(currentBoard, color);
      setThinking(false);
      if (!move) return;
      const [r, c] = move;
      const currentMoves = findMoves(currentBoard, color);
      const key = r * 8 + c;
      const flipped = currentMoves.get(key);
      if (!flipped) return;
      const newBoard = applyMove(currentBoard, r, c, color, flipped);
      setBoard(newBoard);
      return { newBoard, color };
    },
    [getAIMove]
  );

  // Handle AI turns
  useEffect(() => {
    if (!aiReady || gameOver || thinking) return;
    const isAITurn =
      (mode === "pvai" && turn === "O") ||
      mode === "aivai";
    if (!isAITurn) return;

    const timeout = setTimeout(async () => {
      const result = await doAITurn(boardRef.current, turn);
      if (result) {
        const nextTurn = advanceTurn(result.newBoard, result.color);
        // For AI vs AI, the next useEffect call will handle the next turn
        if (mode === "aivai" && nextTurn) {
          // small delay for visual effect
          await new Promise((r) => setTimeout(r, 300));
        }
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [aiReady, gameOver, thinking, turn, mode, doAITurn, advanceTurn]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (gameOver || thinking || !aiReady) return;
      if (mode === "aivai") return;
      if (mode === "pvai" && turn !== "@") return;

      const rect = canvasRef.current!.getBoundingClientRect();
      const scaleX = CANVAS_SIZE / rect.width;
      const scaleY = CANVAS_SIZE / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;
      const col = Math.floor((mx - PAD) / (CELL + PAD));
      const row = Math.floor((my - PAD) / (CELL + PAD));
      if (row < 0 || row > 7 || col < 0 || col > 7) return;

      const key = row * 8 + col;
      const flipped = moves.get(key);
      if (!flipped) return;

      const newBoard = applyMove(board, row, col, turn, flipped);
      setBoard(newBoard);
      advanceTurn(newBoard, turn);
    },
    [board, turn, moves, gameOver, thinking, aiReady, mode, advanceTurn]
  );

  const reset = useCallback(() => {
    const b = createBoard();
    setBoard(b);
    setTurn("@");
    setMoves(findMoves(b, "@"));
    setGameOver(false);
    setThinking(false);
  }, []);

  const score = getScore(board);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js"
        onLoad={() => setPyodideLoaded(true)}
      />
      <div className="space-y-6">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            The AI opponent uses Pranav&apos;s actual Python alpha-beta pruning
            code, running in your browser via Pyodide. You play as Black
            (first move). The AI thinks several moves ahead using minimax with
            alpha-beta pruning.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Mode</label>
            <select
              value={mode}
              onChange={(e) => {
                setMode(e.target.value as "pvai" | "aivai");
                reset();
              }}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              disabled={thinking}
            >
              <option value="pvai">Player vs AI</option>
              <option value="aivai">AI vs AI</option>
            </select>
          </div>
          <button
            onClick={reset}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            New Game
          </button>
        </div>

        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <div>
            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              onClick={handleClick}
              className="cursor-pointer rounded-lg"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              <span>
                Black: {score.black}
                {turn === "@" && !gameOver && (mode === "pvai" ? " (your turn)" : " (thinking...)")}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full border border-zinc-300 bg-white" />
              <span>
                White: {score.white}
                {turn === "O" && !gameOver && " (AI thinking...)"}
              </span>
            </div>
            {thinking && (
              <p className="text-zinc-500">AI is computing move...</p>
            )}
            {!aiReady && (
              <p className="text-zinc-500">Loading AI engine...</p>
            )}
            {gameOver && (
              <p className="font-semibold">
                Game Over!{" "}
                {score.black > score.white
                  ? "Black wins!"
                  : score.white > score.black
                    ? "White wins!"
                    : "It's a tie!"}
              </p>
            )}
          </div>
        </div>

        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            View Python AI source code
          </summary>
          <div className="mt-2 max-h-96 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed dark:border-zinc-800 dark:bg-zinc-900">
            <a
              href="https://github.com/pelavarthi/Artificial-Intelligence/tree/main/Unit%203"
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
