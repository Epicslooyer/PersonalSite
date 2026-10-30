"""Train a tiny conv + linear head on synthetic 16x16 digits. Writes src/data/tiny-cnn-weights.json."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

SIZE = 16
N_FILTERS = 8
RNG = np.random.default_rng(7)

KERNELS = np.array(
    [
        [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]],
        [[-1, -2, -1], [0, 0, 0], [1, 2, 1]],
        [[0, -1, 0], [-1, 4, -1], [0, -1, 0]],
        [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
        [[1, 0, -1], [0, 0, 0], [-1, 0, 1]],
        [[0, 0, 0], [1, 1, 1], [0, 0, 0]],
        [[0, 1, 0], [0, 1, 0], [0, 1, 0]],
        [[1, 1, 0], [1, 0, 0], [0, 0, 0]],
    ],
    dtype=np.float64,
)
KERNELS[3] /= 9.0


def stamp(img: np.ndarray, x: float, y: float, radius: float = 0.85) -> None:
    h, w = img.shape
    x0 = max(int(x - 2), 0)
    x1 = min(int(x + 3), w)
    y0 = max(int(y - 2), 0)
    y1 = min(int(y + 3), h)
    for yy in range(y0, y1):
        for xx in range(x0, x1):
            d = (xx - x) ** 2 + (yy - y) ** 2
            img[yy, xx] = max(img[yy, xx], np.exp(-d / (2 * radius * radius)))


def stroke(img: np.ndarray, points: list[tuple[float, float]], radius: float = 0.85) -> None:
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        n = int(max(abs(x1 - x0), abs(y1 - y0)) * 6) + 2
        for i in range(n):
            t = i / (n - 1)
            stamp(img, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, radius)


def digit_strokes(d: int) -> list[list[tuple[float, float]]]:
    s = SIZE - 1
    m = s / 2
    if d == 0:
        return [[(4, 3), (s - 4, 3), (s - 4, s - 3), (4, s - 3), (4, 3)]]
    if d == 1:
        return [[(m - 2, 4), (m, 2), (m, s - 2)], [(m - 3, s - 2), (m + 3, s - 2)]]
    if d == 2:
        return [[(4, 4), (s - 4, 4), (s - 4, m), (4, m), (4, s - 3), (s - 3, s - 3)]]
    if d == 3:
        return [[(4, 3), (s - 4, 3), (s - 4, m), (5, m), (s - 4, m), (s - 4, s - 3), (4, s - 3)]]
    if d == 4:
        return [[(5, 3), (5, m + 1), (s - 4, m + 1)], [(s - 5, 3), (s - 5, s - 3)]]
    if d == 5:
        return [[(s - 3, 3), (4, 3), (4, m), (s - 4, m), (s - 4, s - 3), (4, s - 3)]]
    if d == 6:
        return [[(s - 4, 3), (4, 3), (4, s - 3), (s - 4, s - 3), (s - 4, m), (4, m)]]
    if d == 7:
        return [[(3, 3), (s - 3, 3), (m, s - 2)]]
    if d == 8:
        return [
            [(4, 3), (s - 4, 3), (s - 4, m), (4, m), (4, 3)],
            [(4, m), (s - 4, m), (s - 4, s - 3), (4, s - 3), (4, m)],
        ]
    return [[(4, s - 3), (s - 4, s - 3), (s - 4, 3), (4, 3), (4, m), (s - 4, m)]]


def make_digit(d: int) -> np.ndarray:
    img = np.zeros((SIZE, SIZE), dtype=np.float64)
    jitter = RNG.normal(0, 0.35, size=2)
    scale = RNG.uniform(0.85, 1.12)
    origin = SIZE / 2
    for line in digit_strokes(d):
        pts = []
        for x, y in line:
            cx, cy = (x - origin) * scale + origin + jitter[0], (y - origin) * scale + origin + jitter[1]
            pts.append((cx, cy))
        stroke(img, pts, radius=RNG.uniform(0.7, 1.05))
    img = np.clip(img + RNG.normal(0, 0.04, img.shape), 0, 1)
    shift_y, shift_x = RNG.integers(-1, 2, size=2)
    img = np.roll(np.roll(img, int(shift_y), 0), int(shift_x), 1)
    return img


def conv(img: np.ndarray, kernel: np.ndarray) -> np.ndarray:
    kh, kw = kernel.shape
    h, w = img.shape
    out = np.zeros((h - kh + 1, w - kw + 1))
    for y in range(out.shape[0]):
        for x in range(out.shape[1]):
            out[y, x] = np.sum(img[y : y + kh, x : x + kw] * kernel)
    return out


def maxpool2(img: np.ndarray) -> np.ndarray:
    h, w = img.shape
    hh, ww = h // 2, w // 2
    out = np.zeros((hh, ww))
    for y in range(hh):
        for x in range(ww):
            out[y, x] = np.max(img[y * 2 : y * 2 + 2, x * 2 : x * 2 + 2])
    return out


def features(img: np.ndarray) -> np.ndarray:
    parts = []
    for k in KERNELS:
        fmap = np.maximum(conv(img, k), 0)
        parts.append(maxpool2(fmap).ravel())
    return np.concatenate(parts)


def softmax(z: np.ndarray) -> np.ndarray:
    z = z - z.max(axis=1, keepdims=True)
    e = np.exp(z)
    return e / e.sum(axis=1, keepdims=True)


def main() -> None:
    n_per = 80
    xs, ys = [], []
    for d in range(10):
        for _ in range(n_per):
            xs.append(features(make_digit(d)))
            ys.append(d)
    raw = np.stack(xs)
    y = np.array(ys)
    mean = raw.mean(0)
    std = raw.std(0) + 1e-6
    X = (raw - mean) / std

    dim = X.shape[1]
    W = RNG.normal(0, 0.05, (dim, 10))
    b = np.zeros(10)
    lr = 0.4
    for epoch in range(40):
        logits = X @ W + b
        p = softmax(logits)
        acc = (p.argmax(1) == y).mean()
        oh = np.eye(10)[y]
        grad = (p - oh) / len(X)
        W -= lr * (X.T @ grad)
        b -= lr * grad.sum(0)
        if epoch % 10 == 0 or epoch == 39:
            print(f"epoch {epoch:02d} acc {acc:.3f}")

    payload = {
        "size": SIZE,
        "kernels": KERNELS.tolist(),
        "mean": mean.tolist(),
        "std": std.tolist(),
        "W": W.tolist(),
        "b": b.tolist(),
        "trainAcc": float((softmax(X @ W + b).argmax(1) == y).mean()),
    }
    out = Path(__file__).resolve().parents[1] / "src" / "data" / "tiny-cnn-weights.json"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(payload))
    print("wrote", out, "dim", dim, "acc", payload["trainAcc"])


if __name__ == "__main__":
    main()
