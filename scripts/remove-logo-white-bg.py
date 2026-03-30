"""Make logo PNGs web-ready: transparent outer padding + near-white interior."""
from __future__ import annotations

import shutil
import sys
from collections import deque
from pathlib import Path

from PIL import Image


def flood_clear_from_edges(im: Image.Image, tol: int = 42) -> None:
    """Remove background connected to image edges (same color family as corners)."""
    px = im.load()
    w, h = im.size
    samples = [px[x, y][:3] for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
    mr = sum(s[0] for s in samples) // len(samples)
    mg = sum(s[1] for s in samples) // len(samples)
    mb = sum(s[2] for s in samples) // len(samples)

    def matches(r: int, g: int, b: int) -> bool:
        return abs(r - mr) <= tol and abs(g - mg) <= tol and abs(b - mb) <= tol

    visited = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            q.append((x, y))

    while q:
        x, y = q.popleft()
        if visited[y][x]:
            continue
        r, g, b, a = px[x, y]
        if not matches(r, g, b):
            visited[y][x] = True
            continue
        visited[y][x] = True
        px[x, y] = (r, g, b, 0)
        for dx, dy in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                q.append((nx, ny))


def clear_near_white(im: Image.Image, thresh: int = 248) -> None:
    """Remove opaque pixels that are still essentially white (inner card fill)."""
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a and r >= thresh and g >= thresh and b >= thresh:
                px[x, y] = (r, g, b, 0)


def process_image(path: Path, *, edge_tol: int, white_thresh: int) -> None:
    im = Image.open(path).convert("RGBA")
    flood_clear_from_edges(im, tol=edge_tol)
    clear_near_white(im, thresh=white_thresh)
    im.save(path, "PNG", optimize=True)


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    targets = [
        root / "public" / "images" / "logo.png",
        root / "app" / "icon.png",
        root / "app" / "apple-icon.png",
    ]
    edge_tol = int(sys.argv[1]) if len(sys.argv) > 1 else 42
    white_thresh = int(sys.argv[2]) if len(sys.argv) > 2 else 248

    for path in targets:
        if not path.is_file():
            print(f"skip missing: {path}")
            continue
        process_image(path, edge_tol=edge_tol, white_thresh=white_thresh)
        print(f"ok {path.relative_to(root)}")


if __name__ == "__main__":
    main()
