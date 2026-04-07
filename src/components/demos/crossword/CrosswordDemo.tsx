"use client";

import Script from "next/script";
import { useState, useCallback } from "react";
import { usePyodide } from "../usePyodide";
import TerminalOutput from "../TerminalOutput";

const PRESETS = [
  { label: "9x9, 20 blocks", args: '["9x9", "20"]' },
  { label: '9x9, 15 blocks, word "HELLO"', args: '["9x9", "15", "H0x0HELLO"]' },
  { label: "11x11, 30 blocks", args: '["11x11", "30"]' },
  { label: "13x13, 36 blocks", args: '["13x13", "36"]' },
];

// The original Python uses sys.argv. We wrap it to inject args directly.
const WRAPPER = (args: string) => `
import re
import random

BLOCKCHAR = "#"
OPENCHAR = "-"
PROTECTEDCHAR = "~"
ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

class Crossword:
    def __init__(self, hxw, file, numBlocks, words):
        self.height = int(hxw.split("x")[0])
        self.width = int(hxw.split("x")[1])
        self.numBlocks = int(numBlocks)
        self.board = ["-"*self.width]*self.height
        for num in range(len(words)):
            words[num] = words[num].upper()
        for thing in words:
            match = re.search(r"^(h|v)(\\d+)x(\\d+)(.+)$", thing, re.I)
            direction = match.group(1)
            rowNum = int(match.group(2))
            colNum = int(match.group(3))
            letters = match.group(4)
            if direction == "H":
                row = list(self.board[rowNum])
                row[colNum:colNum+len(letters)] = letters
                self.board[rowNum] = "".join(row)
            else:
                col = ""
                for t in self.board:
                    col = col + t[colNum]
                col = list(col)
                col[rowNum:rowNum+len(letters)] = letters
                for i in range(len(self.board)):
                    li = list(self.board[i])
                    li[colNum] = col.pop(0)
                    self.board[i] = "".join(li)

    def transpose(self, xw, newWidth):
        return [''.join(row) for row in zip(*self.board)]

    def transpose2(self, xw, newWidth):
        return [''.join(row) for row in zip(*xw)]

    def addBorder(self):
        xword = "".join(self.board)
        xw = BLOCKCHAR * (self.width + 3)
        xw += (BLOCKCHAR * 2).join([xword[p: p + self.width] for p in range(0, len(xword), self.width)])
        xw += BLOCKCHAR * (self.width + 3)
        self.board = self.convertStringToList(xw, self.width+2)

    def removeBorder(self):
        sBoard = ["-"*self.width]*self.height
        for i in range(self.height):
            sBoard[i] = self.board[i+1][1: self.width + 1]
        self.board = sBoard

    def cleanBoard(self):
        boardCopy = [i for i in self.copyboard]
        for i in range(len(boardCopy)):
            s = boardCopy[i]
            s = s.replace("~", "-")
            boardCopy[i] = s
        return boardCopy

    def displayBoard(self):
        self.copyboard = self.board[1:len(self.board)-1]
        tempBoard = self.cleanBoard()
        for i in range(self.height):
            s = tempBoard[i]
            s = s[1 : len(s)-1]
            print(s)

    def convertStringToList(self, s, n):
        if s is None: return []
        substrings = []
        for i in range(0, len(s), n):
            substrings.append(s[i:i+n])
        return substrings

    def makePalindrome(self):
        s = "".join(self.board)
        l = len(s)
        for i in range(len(s)):
            char = s[i]
            if char == BLOCKCHAR:
                s = list(s)
                if (s[l-i-1]) == OPENCHAR:
                    s[(l-i)-1] = BLOCKCHAR
                s = "".join(s)
            elif char != OPENCHAR:
                s = list(s)
                if (s[l-i-1]) == OPENCHAR:
                    s[(l-i)-1] = PROTECTEDCHAR
                s = "".join(s)
        self.board = self.convertStringToList(s, self.width+2)

    def checkProtected(self, char):
        return char != OPENCHAR and char != BLOCKCHAR

    def getBoard(self):
        return self.board

    def addProtected(self):
        for i in range(len(self.board)):
            self.board[i] = re.sub(r'(?<=(#(\\w|~)))--', r"~~", self.board[i])
            self.board[i] = re.sub(r'(?<=(#(\\w|~)(\\w|~)))-', r"~", self.board[i])
            self.board[i] = re.sub(r'-(?<=((\\w|~)(\\w|~)#))', r"~", self.board[i])
            self.board[i] = re.sub(r'--(?<=((\\w|~)#))', r"~~", self.board[i])
        self.board = self.transpose("".join(self.board), len(self.board))
        for i in range(len(self.board)):
            self.board[i] = re.sub(r'(?<=(#(\\w|~)))--', r"~~", self.board[i])
            self.board[i] = re.sub(r'(?<=(#(\\w|~)(\\w|~)))-', r"~", self.board[i])
            self.board[i] = re.sub(r'-(?<=((\\w|~)(\\w|~)#))', r"~", self.board[i])
            self.board[i] = re.sub(r'--(?<=((\\w|~)#))', r"~~", self.board[i])
        self.board = self.transpose("".join(self.board), len(self.board))

    def addObviousBlocks(self):
        for y in range(len(self.board)):
            self.board[y] = re.sub(r"(?<=#)(--)(?=#)", r"##", self.board[y])
            self.board[y] = re.sub(r"(?<=#)(-)(?=#)", r"#", self.board[y])
        self.board = self.transpose("".join(self.board), len(self.board))
        for x in range(len(self.board)):
            self.board[x] = re.sub(r"(?<=#)(--)(?=#)", r"##", self.board[x])
            self.board[x] = re.sub(r"(?<=#)(-)(?=#)", r"#", self.board[x])
        self.board = self.transpose("".join(self.board), len(self.board))

    def addObviousBlocks2(self, board):
        for y in range(len(board)):
            board[y] = re.sub(r"(?<=#)(--)(?=#)", r"##", board[y])
            board[y] = re.sub(r"(?<=#)(-)(?=#)", r"#", board[y])
        board = self.transpose2("".join(board), len(board))
        for x in range(len(board)):
            board[x] = re.sub(r"(?<=#)(--)(?=#)", r"##", board[x])
            board[x] = re.sub(r"(?<=#)(-)(?=#)", r"#", board[x])
        board = self.transpose2("".join(board), len(board))
        return board

    def addAllBlocks(self):
        blocks = self.numBlocks
        posList = []
        boardCopy = [i for i in self.board]
        bc = "".join(boardCopy)
        board = "".join(self.board)
        for i in range(len(board)):
            if board[i] == OPENCHAR:
                posList.append(i)
        board = self.addHelper(board, blocks, posList)
        self.board = self.convertStringToList(board, self.width+2)
        attempts = 0
        while (self.countBlocksPlaced() != blocks or self.finalCheck() == False or self.checkConnected(board) == False) and attempts < 500:
            board = bc
            self.board = [i for i in boardCopy]
            board = self.addHelper(board, blocks, posList)
            self.board = self.convertStringToList(board, self.width+2)
            attempts += 1
        if attempts >= 500:
            print("Could not generate valid puzzle after 500 attempts. Try different parameters.")

    def finalCheck(self):
        board = self.board
        regex = r'#(\\w|~|-)#'
        regex2 = r'#(\\w|~|-)(\\w|~|-)#'
        for line in board:
            if re.search(regex, line) is not None or re.search(regex2, line) is not None:
                return False
        b = self.transpose("mumbo", "jumbo")
        for line in b:
            if re.search(regex, line) is not None or re.search(regex2, line) is not None:
                return False
        return True

    def area_fill(self, board, r, c):
        if r<0 or r>=len(board) or c<0 or c>=len(board[0]) or board[r][c] == "#" or board[r][c] == "?":
            return board
        if board[r][c] != "#":
            board[r][c] = "?"
            self.area_fill(board, r+1, c)
            self.area_fill(board, r-1, c)
            self.area_fill(board, r, c+1)
            self.area_fill(board, r, c-1)
        return board

    def checkConnected(self, board):
        sp = -1
        for i in range(len(board)):
            if board[i] != BLOCKCHAR:
                sp = i
                break
        if sp == -1: return True
        board = list(board)
        for i in range(len(board)):
            if board[i] != PROTECTEDCHAR and board[i] != BLOCKCHAR and board[i] != OPENCHAR:
                board[i] = PROTECTEDCHAR
        board = "".join(board)
        board = self.convertStringToList(board, self.width+2)
        board = board[1:len(board)-1]
        for i in range(len(board)):
            board[i] = board[i][1:len(board[i])-1]
        x = self.area_fill(board, sp // self.width, sp % self.width)
        if x is None: return False
        x = "".join(x)
        x = self.convertStringToList(x, self.width)
        x = "".join(x)
        for char in x:
            if char == PROTECTEDCHAR or char == OPENCHAR:
                return False
        return True

    def addHelper(self, board, numBlocks, posList):
        currNumBlocks = self.countBlocksPlaced()
        if currNumBlocks >= numBlocks:
            return "".join(self.board)
        if len(posList) == 0:
            return "".join(self.board)
        board = "".join(self.board)
        for option in posList:
            randPos = random.choice(posList)
            if self.isValid(board, randPos):
                board = board[0:randPos] + BLOCKCHAR + board[randPos+1:]
                self.board = self.convertStringToList(board, self.width+2)
                self.addObviousBlocks()
                self.makePalindrome()
                result = self.addHelper(board, numBlocks, posList)
                if result is not None:
                    return result
        return None

    def countBlocksPlaced(self):
        s = "".join(self.board)
        count = s.count(BLOCKCHAR)
        count = count - (2*self.height)
        count = count - (2*(self.width+2))
        return count

    def isValid(self, board, option):
        boardCopy = board[:option] + BLOCKCHAR + board[option+1:]
        b = self.convertStringToList(boardCopy, self.width+2)
        regex = r'#(\\w|~)#'
        regex2 = r'#(\\w|~)(\\w|~)#'
        for line in b:
            if re.search(regex, line) is not None or re.search(regex2, line) is not None:
                return False
        b = self.transpose("mumbo", "jumbo")
        for line in b:
            if re.search(regex, line) is not None or re.search(regex2, line) is not None:
                return False
        return True

args = ${args}
hxw = "0x0"
blocks = "0"
words = []
for thing in args:
    thing = thing.lower()
    if re.search(r"^(\\d+)x(\\d+)$", thing):
        hxw = thing
    if re.search(r"^\\d+$", thing):
        blocks = thing
    if re.search(r"^(h|v)(\\d+)x(\\d+)(.+)$", thing):
        words.append(thing)

print(f"Generating {hxw} crossword with {blocks} blocks...")
crossword = Crossword(hxw, "", blocks, words)
crossword.addBorder()
crossword.addObviousBlocks()
crossword.addProtected()
crossword.makePalindrome()
crossword.addAllBlocks()
print()
crossword.displayBoard()
print()
print("Done!")
`;

export default function CrosswordDemo() {
  const { loading, runPython } = usePyodide();
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [pyodideLoaded, setPyodideLoaded] = useState(false);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setLines(["Loading Python runtime..."]);
    const code = WRAPPER(PRESETS[selectedPreset].args);
    await runPython(code, (line) => {
      setLines((prev) => [...prev, line]);
    });
    setRunning(false);
  }, [runPython, selectedPreset]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js"
        onLoad={() => setPyodideLoaded(true)}
      />
      <div className="space-y-6">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This runs the actual Python crossword generator in your browser via
            The algorithm uses backtracking with constraint satisfaction,
            regex pattern matching, and flood-fill to generate valid symmetric
            crossword grids.
          </p>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Preset</label>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(Number(e.target.value))}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              disabled={running}
            >
              {PRESETS.map((p, i) => (
                <option key={i} value={i}>
                  {p.label}
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
              ? "Running..."
              : loading
                ? "Loading Python..."
                : !pyodideLoaded
                  ? "Loading..."
                  : "Generate Crossword"}
          </button>
        </div>

        <TerminalOutput lines={lines} />

        <details className="group">
          <summary className="cursor-pointer text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
            View Python source code
          </summary>
          <div className="mt-2 max-h-96 overflow-auto rounded-lg border border-zinc-200 bg-zinc-50 p-4 font-mono text-xs leading-relaxed dark:border-zinc-800 dark:bg-zinc-900">
            <a
              href="https://github.com/pelavarthi/Artificial-Intelligence/blob/main/Unit%205/crossword.py"
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
