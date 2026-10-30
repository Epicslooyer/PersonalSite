"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import weights from "@/data/tiny-cnn-weights.json";
import {
  classify,
  conv2d,
  maxPool2,
  paintTensor,
  relu,
  tensorFromCanvas,
  type Tensor2,
} from "@/lib/cnn";
import type { CnnWeights } from "@/lib/cnn";

const DRAW = 28;
const SCALE = 10;
const PRESETS: { name: string; kernel: number[][] }[] = [
  { name: "identity", kernel: [[0, 0, 0], [0, 1, 0], [0, 0, 0]] },
  { name: "edge-x", kernel: [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] },
  { name: "edge-y", kernel: [[-1, -2, -1], [0, 0, 0], [1, 2, 1]] },
  { name: "sharpen", kernel: [[0, -1, 0], [-1, 5, -1], [0, -1, 0]] },
  { name: "blur", kernel: [[1, 1, 1], [1, 1, 1], [1, 1, 1]].map((r) => r.map((v) => v / 9)) },
];

const cnnWeights = weights as CnnWeights;

function DrawPad({
  onTensor,
}: {
  onTensor: (t: Tensor2, ctx: CanvasRenderingContext2D) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const emit = useCallback(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    onTensor(tensorFromCanvas(ctx, DRAW), ctx);
  }, [onTensor]);

  const paint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * DRAW;
    const y = ((e.clientY - rect.top) / rect.height) * DRAW;
    ctx.fillStyle = "#e5e7eb";
    ctx.beginPath();
    ctx.arc(x, y, 1.35, 0, Math.PI * 2);
    ctx.fill();
  };

  const clear = () => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, DRAW, DRAW);
    emit();
  };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#030712";
    ctx.fillRect(0, 0, DRAW, DRAW);
    emit();
  }, [emit]);

  return (
    <div className="flex flex-col gap-2">
      <canvas
        ref={ref}
        width={DRAW}
        height={DRAW}
        className="border border-gray-700 rounded bg-gray-950 cursor-crosshair touch-none"
        style={{ width: DRAW * SCALE, height: DRAW * SCALE, imageRendering: "pixelated" }}
        onPointerDown={(e) => {
          drawing.current = true;
          (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
          paint(e);
        }}
        onPointerMove={(e) => {
          if (!drawing.current) return;
          paint(e);
        }}
        onPointerUp={() => {
          drawing.current = false;
          emit();
        }}
      />
      <button
        onClick={clear}
        className="text-xs font-mono px-2 py-1 rounded border border-gray-700 hover:border-blue-400 w-fit"
      >
        clear pad
      </button>
    </div>
  );
}

function MapStrip({ maps, label }: { maps: Tensor2[]; label: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-1">{label}</div>
      <div className="flex flex-wrap gap-1">
        {maps.map((m, i) => (
          <canvas
            key={label + i}
            width={m.width}
            height={m.height}
            className="border border-gray-800 rounded"
            style={{ width: 52, height: 52, imageRendering: "pixelated" }}
            ref={(node) => {
              if (node) paintTensor(node, m);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Lab() {
  const [kernel, setKernel] = useState<number[][]>(PRESETS[1].kernel.map((r) => [...r]));
  const [preset, setPreset] = useState("edge-x");
  const [scan, setScan] = useState<{ x: number; y: number } | null>(null);
  const [tensor, setTensor] = useState<Tensor2 | null>(null);
  const convCanvas = useRef<HTMLCanvasElement>(null);
  const reluCanvas = useRef<HTMLCanvasElement>(null);
  const poolCanvas = useRef<HTMLCanvasElement>(null);

  const explorer = useMemo(() => {
    if (!tensor) return null;
    const conv = conv2d(tensor, kernel);
    const activated = relu(conv);
    const pooled = maxPool2(activated);
    return { conv, activated, pooled };
  }, [tensor, kernel]);

  const prediction = useMemo(() => {
    if (!tensor) return null;
    return classify(tensor, cnnWeights);
  }, [tensor]);

  useEffect(() => {
    if (!explorer) return;
    if (convCanvas.current) paintTensor(convCanvas.current, explorer.conv, [125, 211, 252]);
    if (reluCanvas.current) paintTensor(reluCanvas.current, explorer.activated, [52, 211, 153]);
    if (poolCanvas.current) paintTensor(poolCanvas.current, explorer.pooled, [251, 191, 36]);
  }, [explorer]);

  const runScan = () => {
    if (!tensor) return;
    let x = 0;
    let y = 0;
    const w = tensor.width - 2;
    const h = tensor.height - 2;
    const tick = () => {
      setScan({ x, y });
      x += 1;
      if (x >= w) {
        x = 0;
        y += 1;
      }
      if (y < h) requestAnimationFrame(tick);
      else setTimeout(() => setScan(null), 200);
    };
    tick();
  };

  const setKernelCell = (y: number, x: number, value: string) => {
    const next = kernel.map((row) => [...row]);
    next[y][x] = Number(value);
    setKernel(next);
    setPreset("custom");
  };

  const top = prediction
    ? prediction.probs
        .map((p, i) => ({ i, p }))
        .sort((a, b) => b.p - a.p)[0]
    : null;

  return (
    <div className="w-full max-w-4xl py-2 flex flex-col gap-6">
      <header>
        <h2 className="font-mono text-xl text-blue-400">CNN lab</h2>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          A browser-sized convolutional net: a 3×3 kernel slides over your drawing, ReLU zeros the
          negatives, max-pool downsamples, then a linear readout votes for a digit. Same family of
          pipeline I used for gesture recognition on the Z1 arm — shrunk so it runs in this tab.
        </p>
      </header>

      <div className="grid md:grid-cols-[auto_1fr] gap-6">
        <DrawPad onTensor={(t) => setTensor(t)} />

        <div className="flex flex-col gap-4 min-w-0">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-gray-500 mb-2">3×3 kernel</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setPreset(p.name);
                    setKernel(p.kernel.map((r) => [...r]));
                  }}
                  className={`text-[10px] font-mono px-2 py-1 rounded border ${
                    preset === p.name ? "border-blue-400 text-blue-300" : "border-gray-700 text-gray-400"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1 w-40">
              {kernel.map((row, y) =>
                row.map((v, x) => (
                  <input
                    key={`${y}-${x}`}
                    type="number"
                    step="0.1"
                    value={Number.isFinite(v) ? v : 0}
                    onChange={(e) => setKernelCell(y, x, e.target.value)}
                    className="bg-gray-900 border border-gray-700 rounded text-center text-xs py-1"
                  />
                ))
              )}
            </div>
            <button
              onClick={runScan}
              className="mt-2 text-xs font-mono px-2 py-1 rounded border border-gray-700 hover:border-blue-400"
            >
              watch kernel slide
            </button>
            {scan && (
              <span className="ml-2 text-[10px] font-mono text-gray-500">
                ({scan.x}, {scan.y})
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { ref: convCanvas, label: "conv" },
              { ref: reluCanvas, label: "relu" },
              { ref: poolCanvas, label: "max-pool" },
            ].map((slot) => (
              <div key={slot.label} className="flex flex-col items-center gap-1">
                <canvas
                  ref={slot.ref}
                  className="border border-gray-800 rounded"
                  style={{ width: 78, height: 78, imageRendering: "pixelated" }}
                />
                <span className="text-[10px] uppercase text-gray-500">{slot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {prediction && (
        <section className="flex flex-col gap-3">
          <h3 className="font-mono text-sm text-blue-300">
            Tiny CNN readout {top ? `→ ${top.i} (${(top.p * 100).toFixed(0)}%)` : ""}
          </h3>
          <div className="flex flex-col gap-1">
            {prediction.probs.map((p, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-4 text-gray-400">{i}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${p * 100}%` }} />
                </div>
                <span className="w-10 text-right text-gray-500">{(p * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
          <MapStrip maps={prediction.maps} label="learned-bank conv maps" />
          <MapStrip maps={prediction.pooled} label="pooled" />
        </section>
      )}
    </div>
  );
}
