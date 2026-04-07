"use client";

import { useState, useRef, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PyodideInstance = any;

export function usePyodide() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pyodideRef = useRef<PyodideInstance | null>(null);

  const load = useCallback(async () => {
    if (pyodideRef.current) {
      setReady(true);
      return pyodideRef.current;
    }
    setLoading(true);
    setError(null);
    try {
      // @ts-expect-error - loadPyodide is loaded from CDN
      const pyodide = await globalThis.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/",
      });
      pyodideRef.current = pyodide;
      setReady(true);
      return pyodide;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load Pyodide");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const runPython = useCallback(
    async (
      code: string,
      onOutput: (line: string) => void
    ) => {
      const pyodide = pyodideRef.current || (await load());
      if (!pyodide) return;

      pyodide.setStdout({ batched: (line: string) => onOutput(line) });
      pyodide.setStderr({ batched: (line: string) => onOutput(`[stderr] ${line}`) });

      try {
        await pyodide.runPythonAsync(code);
      } catch (e) {
        onOutput(`[Error] ${e instanceof Error ? e.message : String(e)}`);
      }
    },
    [load]
  );

  return { loading, ready, error, load, runPython };
}
