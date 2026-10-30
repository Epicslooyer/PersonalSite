export type Tensor2 = { data: Float64Array; width: number; height: number };

export function zeros(width: number, height: number): Tensor2 {
  return { data: new Float64Array(width * height), width, height };
}

export function get(t: Tensor2, x: number, y: number): number {
  return t.data[y * t.width + x];
}

export function set(t: Tensor2, x: number, y: number, v: number): void {
  t.data[y * t.width + x] = v;
}

export function conv2d(input: Tensor2, kernel: number[][]): Tensor2 {
  const k = kernel.length;
  const out = zeros(input.width - k + 1, input.height - k + 1);
  for (let y = 0; y < out.height; y++) {
    for (let x = 0; x < out.width; x++) {
      let sum = 0;
      for (let ky = 0; ky < k; ky++) {
        for (let kx = 0; kx < k; kx++) {
          sum += get(input, x + kx, y + ky) * kernel[ky][kx];
        }
      }
      set(out, x, y, sum);
    }
  }
  return out;
}

export function relu(input: Tensor2): Tensor2 {
  const out = zeros(input.width, input.height);
  for (let i = 0; i < input.data.length; i++) {
    out.data[i] = Math.max(0, input.data[i]);
  }
  return out;
}

export function maxPool2(input: Tensor2): Tensor2 {
  const out = zeros(Math.floor(input.width / 2), Math.floor(input.height / 2));
  for (let y = 0; y < out.height; y++) {
    for (let x = 0; x < out.width; x++) {
      const a = get(input, x * 2, y * 2);
      const b = get(input, x * 2 + 1, y * 2);
      const c = get(input, x * 2, y * 2 + 1);
      const d = get(input, x * 2 + 1, y * 2 + 1);
      set(out, x, y, Math.max(a, b, c, d));
    }
  }
  return out;
}

export function softmax(logits: number[]): number[] {
  const max = Math.max(...logits);
  const exps = logits.map((z) => Math.exp(z - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map((e) => e / sum);
}

export function resizeBilinear(src: Tensor2, width: number, height: number): Tensor2 {
  const out = zeros(width, height);
  for (let y = 0; y < height; y++) {
    const gy = ((y + 0.5) * src.height) / height - 0.5;
    const y0 = Math.max(0, Math.floor(gy));
    const y1 = Math.min(src.height - 1, y0 + 1);
    const fy = gy - y0;
    for (let x = 0; x < width; x++) {
      const gx = ((x + 0.5) * src.width) / width - 0.5;
      const x0 = Math.max(0, Math.floor(gx));
      const x1 = Math.min(src.width - 1, x0 + 1);
      const fx = gx - x0;
      const v00 = get(src, x0, y0);
      const v10 = get(src, x1, y0);
      const v01 = get(src, x0, y1);
      const v11 = get(src, x1, y1);
      set(out, x, y, v00 * (1 - fx) * (1 - fy) + v10 * fx * (1 - fy) + v01 * (1 - fx) * fy + v11 * fx * fy);
    }
  }
  return out;
}

export function tensorFromCanvas(
  ctx: CanvasRenderingContext2D,
  size: number,
  invert = true
): Tensor2 {
  const raw = ctx.getImageData(0, 0, size, size).data;
  const t = zeros(size, size);
  for (let i = 0; i < size * size; i++) {
    const r = raw[i * 4];
    const g = raw[i * 4 + 1];
    const b = raw[i * 4 + 2];
    const a = raw[i * 4 + 3] / 255;
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const v = invert ? (1 - lum) * a : lum * a;
    t.data[i] = v;
  }
  return t;
}

export function paintTensor(canvas: HTMLCanvasElement, t: Tensor2, color = [96, 165, 250]): void {
  canvas.width = t.width;
  canvas.height = t.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const img = ctx.createImageData(t.width, t.height);
  let min = Infinity;
  let max = -Infinity;
  for (const v of t.data) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const span = max - min || 1;
  for (let i = 0; i < t.data.length; i++) {
    const n = (t.data[i] - min) / span;
    img.data[i * 4] = color[0] * n;
    img.data[i * 4 + 1] = color[1] * n;
    img.data[i * 4 + 2] = color[2] * n;
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}

export type CnnWeights = {
  size: number;
  kernels: number[][][];
  mean: number[];
  std: number[];
  W: number[][];
  b: number[];
};

export function classify(input: Tensor2, weights: CnnWeights): { probs: number[]; maps: Tensor2[]; pooled: Tensor2[] } {
  const sized = input.width === weights.size ? input : resizeBilinear(input, weights.size, weights.size);
  const maps: Tensor2[] = [];
  const pooled: Tensor2[] = [];
  const feat: number[] = [];
  for (const kernel of weights.kernels) {
    const fmap = relu(conv2d(sized, kernel));
    const pool = maxPool2(fmap);
    maps.push(fmap);
    pooled.push(pool);
    for (const v of pool.data) feat.push(v);
  }
  const logits = weights.b.map((bias, j) => {
    let s = bias;
    for (let i = 0; i < feat.length; i++) {
      s += ((feat[i] - weights.mean[i]) / weights.std[i]) * weights.W[i][j];
    }
    return s;
  });
  return { probs: softmax(logits), maps, pooled };
}
