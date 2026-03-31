#!/usr/bin/env python3
"""
Generate an Open Graph image (1200x630) for maselectiondiables26.com
Outputs to assets/og-image.png

Design: dark editorial aesthetic with Belgian flag accents.
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont

# --- Configuration ---
WIDTH, HEIGHT = 1200, 630
BG_COLOR = (10, 10, 10)       # #0A0A0A
RED = (227, 6, 19)            # #E30613
YELLOW = (253, 218, 36)       # #FDDA24
WHITE = (255, 255, 255)
GREY = (102, 102, 102)
BLACK = (10, 10, 10)


def load_font(size, bold=True):
    """Try to load a font, falling back through several options."""
    font_paths_bold = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/Library/Fonts/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Verdana Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNS.ttf",
    ]
    font_paths_regular = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Verdana.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    paths = font_paths_bold if bold else font_paths_regular
    for path in paths:
        if os.path.exists(path):
            try:
                if path.endswith(".ttc") and bold:
                    try:
                        return ImageFont.truetype(path, size, index=1)
                    except Exception:
                        return ImageFont.truetype(path, size, index=0)
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def draw_football(draw, cx, cy, radius, color, line_width=2):
    """Draw a simple football/soccer ball icon."""
    # Outer circle
    draw.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        outline=color, width=line_width
    )
    # Pentagon spokes
    for i in range(5):
        angle = math.radians(i * 72 - 90)
        inner_x = cx + int(radius * 0.5 * math.cos(angle))
        inner_y = cy + int(radius * 0.5 * math.sin(angle))
        outer_x = cx + int(radius * 0.88 * math.cos(angle))
        outer_y = cy + int(radius * 0.88 * math.sin(angle))
        draw.line([(inner_x, inner_y), (outer_x, outer_y)], fill=color, width=line_width)
    # Inner pentagon
    pts = []
    for i in range(5):
        angle = math.radians(i * 72 - 90)
        x = cx + int(radius * 0.5 * math.cos(angle))
        y = cy + int(radius * 0.5 * math.sin(angle))
        pts.append((x, y))
    draw.polygon(pts, outline=color)


def main():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img, "RGBA")

    # =========================================================
    # BACKGROUND TEXTURE: subtle grid for editorial feel
    # =========================================================
    grid_color = (18, 18, 18)
    for x in range(0, WIDTH, 100):
        draw.line([(x, 0), (x, HEIGHT)], fill=grid_color, width=1)
    for y in range(0, HEIGHT, 100):
        draw.line([(0, y), (WIDTH, y)], fill=grid_color, width=1)

    # =========================================================
    # RADIAL GLOW: subtle red glow at top-center (stadium light)
    # =========================================================
    cx_glow, cy_glow = WIDTH // 2, -50
    max_r = 450
    for r in range(max_r, 0, -3):
        alpha = int(30 * (1 - (r / max_r) ** 1.5))
        if alpha < 1:
            continue
        draw.ellipse(
            [cx_glow - r, cy_glow - r, cx_glow + r, cy_glow + r],
            fill=(227, 6, 19, alpha)
        )

    # =========================================================
    # BELGIAN FLAG: three vertical stripes on the left edge
    # =========================================================
    stripe_w = 6
    gap = 3
    bx = 0
    # Black stripe (slightly lighter to be visible)
    draw.rectangle([bx, 0, bx + stripe_w, HEIGHT], fill=(30, 30, 30))
    bx += stripe_w + gap
    # Yellow stripe
    draw.rectangle([bx, 0, bx + stripe_w, HEIGHT], fill=YELLOW)
    bx += stripe_w + gap
    # Red stripe
    draw.rectangle([bx, 0, bx + stripe_w, HEIGHT], fill=RED)

    # =========================================================
    # HORIZONTAL GRADIENT LINE (red -> yellow) as separator
    # =========================================================
    line_y = 195
    margin = 80
    line_len = WIDTH - 2 * margin
    for x in range(line_len):
        t = x / line_len
        r = int(RED[0] + (YELLOW[0] - RED[0]) * t)
        g = int(RED[1] + (YELLOW[1] - RED[1]) * t)
        b = int(RED[2] + (YELLOW[2] - RED[2]) * t)
        draw.line([(margin + x, line_y), (margin + x, line_y + 1)], fill=(r, g, b))

    # =========================================================
    # FOOTBALL ICON (left of main text)
    # =========================================================
    draw_football(draw, cx=115, cy=340, radius=38, color=YELLOW, line_width=2)

    # =========================================================
    # FONTS
    # =========================================================
    font_title = load_font(64, bold=True)
    font_subtitle = load_font(38, bold=True)
    font_site = load_font(16, bold=False)

    # =========================================================
    # MAIN TEXT: "Compose ta" + "sélection belge"
    # =========================================================
    text_x = 185
    text_y = 240

    draw.text((text_x, text_y), "Compose ta", fill=WHITE, font=font_title)

    # Second line
    line2_y = text_y + 80
    draw.text((text_x, line2_y), "sélection belge", fill=WHITE, font=font_title)

    # =========================================================
    # SUBTITLE: "Coupe du Monde 2026" in yellow
    # =========================================================
    sub_y = line2_y + 95
    draw.text((text_x, sub_y), "Coupe du Monde 2026", fill=YELLOW, font=font_subtitle)

    # Red accent bar below subtitle
    try:
        bbox = draw.textbbox((text_x, sub_y), "Coupe du Monde 2026", font=font_subtitle)
        bar_y = bbox[3] + 12
    except Exception:
        bar_y = sub_y + 50
    draw.rectangle([text_x, bar_y, text_x + 90, bar_y + 4], fill=RED)

    # =========================================================
    # SITE NAME: bottom-right, small, yellow
    # =========================================================
    site = "maselectiondiables26.com"
    try:
        sb = draw.textbbox((0, 0), site, font=font_site)
        sw = sb[2] - sb[0]
    except Exception:
        sw = len(site) * 9
    draw.text((WIDTH - sw - 35, HEIGHT - 40), site, fill=YELLOW, font=font_site)

    # =========================================================
    # DECORATIVE RED DOTS (bottom-right, above site name)
    # =========================================================
    for i in range(5):
        dx = WIDTH - 35 - i * 16
        dy = HEIGHT - 58
        draw.ellipse([dx - 2, dy - 2, dx + 2, dy + 2], fill=RED)

    # =========================================================
    # DIAGONAL ACCENT LINES (top-right corner, subtle)
    # =========================================================
    for i in range(40):
        frac = 1.0 - (i / 40.0)
        c = int(20 * frac)
        x_start = WIDTH - 200 + i * 5
        draw.line(
            [(x_start, 0), (x_start - 150, HEIGHT)],
            fill=(10 + c, 10, 10),
            width=1
        )

    # =========================================================
    # SAVE
    # =========================================================
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "og-image.png")
    img.save(out_path, "PNG")
    print(f"OG image saved to {out_path} ({WIDTH}x{HEIGHT})")


if __name__ == "__main__":
    main()
