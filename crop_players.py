"""
Recadre les photos joueurs en carré 400x400 centré sur le tiers supérieur.
Usage: python crop_players.py
"""

from pathlib import Path
from PIL import Image

SRC = Path("assets/players")
DST = Path("assets/players-cropped")
SIZE = 400

DST.mkdir(parents=True, exist_ok=True)

for f in SRC.iterdir():
    if f.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
        continue

    img = Image.open(f)
    w, h = img.size

    if h <= w:
        # Already wider than tall or square — center crop
        top = 0
    else:
        # Portrait: center the crop on the upper third
        center_y = h // 3
        top = max(0, center_y - w // 2)
        top = min(top, h - w)

    box = (0, top, w, top + w)
    cropped = img.crop(box).resize((SIZE, SIZE), Image.LANCZOS)

    out = DST / f"{f.stem}.jpg"
    cropped.convert("RGB").save(out, "JPEG", quality=90)
    print(f"  {f.name} -> {out.name}")

print(f"\nTerminé — {len(list(DST.glob('*.jpg')))} images dans {DST}")
