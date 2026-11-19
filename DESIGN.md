# Josiah Koplick: design system

**Iron, parchment and gold: a forge at night.**

This is the source of truth for anything made in the josiahkoplick.com style: web pages, social posts,
stories, slides, thumbnails, covers. Every value here is taken from the live site's code
(`css/style.css`, `js/forge.js`). If this file and the site disagree, the site wins; update this file.

To brief another AI, paste **§1 Brief** first, then attach the sections the job needs.

---

## 1. Brief (paste this into any AI)

> Design in the "Forge at Night" style of josiahkoplick.com. Mood: a blacksmith's forge after dark.
> Warm near-black backgrounds (#100e0b), parchment text (#ece2c6), gold accents (#d9a45c, #b8894a),
> with ember orange (#e0662f) and dried-blood red (#7a2420) used only as glow and gradient, never as
> flat fills. No pure black, no pure white, no blue, green or purple, ever.
> Type: Fraunces (high-contrast serif) for names and headings, often with a second line in light italic;
> Source Serif 4 for body and italic taglines; JetBrains Mono, UPPERCASE and widely letter-spaced, for small
> labels. No sans-serif except that mono.
> Signature details: a thin hairline frame inset from the edges with gold corner brackets and tiny gold
> diamonds; soft glowing embers drifting upward; faint film grain; one "molten" gold gradient word
> per composition (bronze → gold → pale gold → ember → blood); a circular seal with "JK" in gold italic
> and the ring text "ESSAYS · VIRTUE · POLITICS · SOFTWARE ·"; Roman numerals (I, II, III) in gold italic
> for lists. Square corners, 1px lines, generous dark space, slow and calm motion. Plain, declarative
> English; no emoji.

---

## 2. Color

### Core palette

| Token | Hex | Role | Contrast on Ink |
|---|---|---|---|
| `ink-deep` | `#0a0907` | Page edge, outermost background | n/a |
| `ink` | `#100e0b` | Main background | n/a |
| `ink-card` | `#17130e` | Raised surface (cards, panels) | n/a |
| `ink-card-hot` | `#221a11` | Hovered or active surface | n/a |
| `iron` | `#3a352a` | Hairlines, borders, dividers | 1.6 (lines only) |
| `parchment` | `#ece2c6` | Primary text, the name | 14.9 ✔ |
| `parchment-soft` | `#c3b596` | Secondary text, taglines, notes | 9.5 ✔ |
| `gold-white` | `#fff1cf` | Highlights, hovered titles, hottest point of a gradient | 17.2 ✔ |
| `gold-bright` | `#d9a45c` | Labels, active accents, the clock, focus rings | 8.6 ✔ |
| `gold` | `#b8894a` | Resting accents, numerals, corner brackets, seal lines | 6.2 ✔ |
| `ember` | `#e0662f` | Glow, live dot, heat. Text only at large sizes | 5.6 (large text only) |
| `bronze` | `#7a4a1e` | Dark start of the gold gradients. Never text | 2.6 ✘ |
| `blood` | `#7a2420` | Warm shadow at the bottom of compositions, gradient end. Never text | 1.9 ✘ |

Contrast is WCAG ratio against `ink`. ✔ means safe for body text (≥ 4.5).

### Proportions (approximate area in any composition)

- 80–85% ink family (`ink-deep` / `ink` / `ink-card`)
- 10–12% parchment family (text)
- 3–5% gold family (labels, lines, one hero word)
- ≤ 2% ember / blood, as glow only

Gold is never a large flat background. If something needs to be filled, fill it with `ink-card-hot` and outline it in gold.

### Transparent variants in use

| Use | Value |
|---|---|
| Frame outer line | `rgba(58, 53, 42, 0.55)` (iron) |
| Frame inner line | `rgba(58, 53, 42, 0.3)` |
| Pointer glow | `rgba(217, 164, 92, 0.09)` (gold-bright) |
| Door heat on hover | `rgba(224, 102, 47, 0.2)` (ember) |
| Card base | `rgba(23, 19, 14, 0.7)` |
| Hovered border | `rgba(184, 137, 74, 0.6)` (gold) |
| Footer text | `rgba(195, 181, 150, 0.55)` (parchment-soft) |
| Molten text glow | `drop-shadow(0 0 28px rgba(224, 102, 47, 0.28))` |

---

## 3. Gradients

**Molten gold** (the signature; one word or line per composition, usually the second line of a name):
```css
linear-gradient(100deg,
  #7a4a1e 0%,   /* bronze */
  #b8894a 18%,  /* gold */
  #d9a45c 32%,  /* gold-bright */
  #fff1cf 42%,  /* gold-white */
  #d9a45c 50%,  /* gold-bright */
  #e0662f 64%,  /* ember */
  #7a2420 78%,  /* blood */
  #b8894a 100%  /* gold */
);
background-size: 260% 100%;   /* on screen it slowly pours: background-position 0% → 100%, 11s, alternate */
```
For a still image, freeze it where the pale-gold highlight sits in the middle of the word.

**Gilt** (seal monogram, small metal objects), diagonal top-left to bottom-right:
`#fff1cf 0%` → `#d9a45c 45%` → `#7a4a1e 100%`

**Page atmosphere** (always behind everything):
```css
radial-gradient(120% 80% at 50% 120%, rgba(122, 36, 32, 0.38), transparent 60%),  /* blood heat rising from below */
radial-gradient(80% 60% at 10% -10%, rgba(217, 164, 92, 0.12), transparent 60%),  /* faint gold light, top left */
#100e0b
```
Rule: warmth comes from the **bottom** (the fire) and a little gold light from the **top left**. Never the reverse.

**Gold seam** (hairline drawn across on hover, or as a divider):
`linear-gradient(90deg, transparent, #d9a45c 30%, #fff1cf 50%, #d9a45c 70%, transparent)`, 1px tall.

**Tagline rule** (vertical 1px line left of italic taglines): `linear-gradient(#d9a45c, #7a2420)`.

---

## 4. Typography

### Families
| Role | Font | Fallback | Notes |
|---|---|---|---|
| Display | **Fraunces** (variable: `opsz` 9–144, `wght` 300–700, italic) | Georgia, serif | Set `opsz` 144 for big sizes, 72 for titles |
| Body | **Source Serif 4** (400, 400 italic) | Georgia, serif | Taglines always italic |
| Label | **JetBrains Mono** (400) | ui-monospace, monospace | Always UPPERCASE, wide letter-spacing |

Font files (self-hosted):
Self-hosted from `/fonts/` (latin subset woff2, declared in `css/style.css`).

### Scale (web; base 16px)
| Style | Font | Size | Weight | Line height | Letter-spacing | Color |
|---|---|---|---|---|---|---|
| Hero name, line 1 | Fraunces, opsz 144 | `clamp(3.8rem, 8.6vw, 7.6rem)` | 400 | 0.9 | −0.045em | parchment |
| Hero name, line 2 | Fraunces **italic**, opsz 144 | same | **300** | 0.9 | −0.045em | molten gradient, indented 0.9em |
| Outline numeral (e.g. 404) | Fraunces italic, opsz 144 | `clamp(5rem, 11vw, 9rem)` | 300 | 0.85 | −0.05em | transparent, 1px stroke gold @ 55% |
| Item title | Fraunces, opsz 72 | 1.75rem (1.5 mobile) | 400 | 1.1 | −0.02em | parchment → gold-white italic on hover |
| Card title | Fraunces, opsz 72 | 1.3rem | 400 | 1.2 | −0.015em | parchment |
| Tagline / lede | Source Serif 4 *italic* | 1.24rem | 400 | 1.5 | 0 | parchment-soft |
| Body | Source Serif 4 | 1.0625rem | 400 | 1.5 | 0 | parchment |
| Note / subtitle | Source Serif 4 | 0.96rem | 400 | 1.45 | 0 | parchment-soft @ 85% |
| Roman numeral | Fraunces *italic* | 1.05rem | 400 | n/a | 0 | gold |
| Kicker label | JetBrains Mono UPPERCASE | 0.74rem | 400 | n/a | 0.24em | gold, followed by a 3rem gold hairline |
| Section label | JetBrains Mono UPPERCASE | 0.7rem | 400 | n/a | 0.24em | gold-bright, followed by a full-width fading rule |
| Small meta (dates, status) | JetBrains Mono UPPERCASE | 0.7rem | 400 | n/a | 0.12–0.2em | gold / gold-bright |
| Button / link label | JetBrains Mono | 0.72rem | 400 | n/a | 0.06–0.08em | gold → gold-bright, with "→" |
| Footer | JetBrains Mono UPPERCASE | 0.66rem | 400 | n/a | 0.18em | parchment-soft @ 55% |

### Type rules
- Big headings: tight (negative tracking, line height ≈ 0.9). Labels: loose (0.12–0.24em). Never the reverse.
- The name pattern is **"Josiah" upright, then "Koplick" in light italic, indented and molten.** Reuse it for any
  two-line headline: plain statement on line 1, the turn on line 2 (e.g. "Nothing forged / *here yet.*").
- Italic means voice: taglines, subtitles, hovered titles. Not used for emphasis inside body copy.
- Separators: a middle dot with spaces (` · `). Accent mark: `✦`. Arrows: `→` (forward) and `←` (back).
- Lists are numbered with Roman numerals (I, II, III, IV, V), not 01/02 or bullets.

### For fixed-size canvases (stories, cards, slides)
| Canvas | Hero name | Headline | Body / tagline | Labels |
|---|---|---|---|---|
| Instagram story 1080×1920 | 130–150px | 110–120px | 44–46px italic | 28–32px mono, 0.3em |
| Share card 1200×630 | 132px | n/a | 27px italic | 17–19px mono, 0.2–0.28em |
| Slide 1920×1080 | 160–190px | 96–120px | 36–40px | 22–24px mono |

---

## 5. Layout and spacing

- **Frame:** every composition sits inside a 1px `iron @ 55%` border inset from the edge (web: `clamp(0.6rem, 1.6vw, 1.25rem)`;
  story: 36px; share card: 22px), plus a second 1px `iron @ 30%` line 5px further inside. Each corner gets a gold
  L-bracket (web 1.4rem / story 44px arms, 1px) with a 5px gold-bright diamond (a square rotated 45°) at the very corner.
- **Grid (web):** max width 70rem; two columns 1.1fr / 0.9fr, name on the left, list on the right; gap `clamp(2.5rem, 6vw, 5.5rem)`.
  Single column under 52rem (832px).
- **Top bar:** status label left (with live ember dot), hairline rule filling the middle, clock right.
- **Space:** dark space is part of the design. Leave at least ~30% of any canvas empty.
- **Corners:** square. Exceptions: a device/phone mock-up frame (6px radius) and the round seal.
- **Lines:** 1px only. No thick borders, no boxes around headings.
- **Safe zones:** Instagram stories keep text between y = 250 and y = 1670.

---

## 6. Components

**Seal.** Two concentric circles (radius 97 and 64 in a 200-unit box), 1px gold @ 60%. Ring text along a radius-80 circle:
`ESSAYS · VIRTUE · POLITICS · SOFTWARE ·` in JetBrains Mono, 13 units, letter-spacing 0.1em, gold-bright. Center: **JK** in
Fraunces italic 500, opsz 144, 58 units, letter-spacing −0.04em, filled with the Gilt gradient. On screen the ring rotates once every 48s.

**Door (list row).** Full-width row: Roman numeral (gold italic) | title + note | mono destination label + `→`.
Separated by 1px iron lines above and below. Hover: background warms (ember radial glow following the pointer over an
`ink-card-hot` wash), title turns italic gold-white and slides 6px right, a gold seam draws across the bottom, the arrow nudges 5px.

**Card.** `ink-card` @ 70% fill, 1px iron border, square. Contents: mono date (gold, uppercase) → Fraunces title →
italic subtitle. Hover: border gold @ 60%, fill `ink-card-hot`, gold seam draws across the top, title turns italic gold-white.

**Button / call to action.** Mono uppercase label, letter-spacing 0.2em, gold-white text, 2px gold-bright border, `rgba(36, 28, 18, 0.8)`
fill, square. May pulse a soft ember glow (`0 0 50px 4px rgba(224, 102, 47, 0.45)`, 1.8s).

**Kicker.** Mono uppercase gold label followed by a short gold hairline: `JOSIAH NOEL KOPLICK ———`.

**Live dot.** 7px ember circle with an ember glow, pulsing outward every 2.6s. Means "this is current".

**Icon / favicon.** A square in ink, a 1px iron inner border, and a single horizontal gold-bright bar (the glowing billet).

---

## 7. Texture and atmosphere

- **Embers:** small glowing particles drifting upward with a gentle side-to-side sway, denser near the bottom.
  Color: hue 18–46°, saturation 90–100%, lightness 55–80%. Core radius 0.5–2.7px with a soft halo 4× that size, blended
  additively ("lighter" / screen). Count ≈ one per 9,000 px² of screen (40–150). They fade in, flicker, and fade out; they move
  away from the cursor. In stills: 60–130 embers, most in the lower third, a few large and blurred near the camera.
- **Grain:** fractal noise (base frequency 0.85, 3 octaves) tinted parchment, 9% opacity, over everything. It shifts slightly six times a second.
- **Glow:** light is warm and comes from below. Glows are soft ember or gold, never hard drop shadows.
- **Imagery** (if photos or illustrations are ever used): low-key, warm, lit by fire or a single lamp; iron, stone, paper, leather,
  old books, forge work. Grade toward the palette: crushed warm blacks, gold highlights. No cool tones, no bright daylight, no stock-photo smiles.

---

## 8. Motion

| Token | Value |
|---|---|
| Ease | `cubic-bezier(0.2, 0.7, 0.2, 1)` (fast out, long settle) |
| Hero entrance | fade + rise 10px, 0.7s, stagger 0.06s, starts immediately |
| List entrance | fade + rise 18px, 0.9s, stagger 0.1s |
| Scene transitions (video) | fade + rise 40px + blur 10px → 0, ~1s |
| Hover color | 300ms |
| Hover movement | 400ms |
| Seam draw | 520ms |
| Live dot pulse | 2.6s loop |
| Molten pour | 11s, alternate, forever |
| Seal rotation | 48s per turn, linear |

Motion is slow and calm: things settle, they don't bounce. No springs, no spin-ins, no shake. Respect
reduced-motion: switch off embers and loops, keep everything readable.

---

## 9. Voice and copy

- Plain, declarative English. Short sentences. No hype words, no exclamation marks, no emoji.
- Tagline: **"Essays on virtue and politics, and the software built beside them."**
- Recurring metaphors: the forge (heat, iron, gold, things being forged), doors (ways in), the desk (where writing happens).
- Labels are nouns: Writing, The Forge, Code, Quotes, X. Notes are short plain phrases: "Read the essays".
- Headline pattern: statement, then the turn in italic. "A new home / *on the web.*" "Nothing forged / *here yet.*"
- Name forms: "Josiah Koplick" (display), "JOSIAH NOEL KOPLICK" (kicker label), "JK" (monogram).

---

## 10. Do and don't

| Do | Don't |
|---|---|
| Warm near-blacks (`#100e0b`) | Pure black `#000` or pure white `#fff` |
| Gold as line, label, one hero word | Gold as a large flat fill |
| Ember and blood as glow and gradient | Ember or blood as text or flat blocks |
| Fraunces + Source Serif 4 + JetBrains Mono | Any sans-serif (Inter, Helvetica, etc.) or script fonts |
| One molten element per view | Several gradient words competing |
| 1px lines, square corners | Thick borders, rounded "app" cards, pill buttons |
| Light from below (fire) | Cool light, blue/green/purple accents, neon |
| Roman numerals for lists | Emoji, bullets, icon sets with filled colors |
| Lots of dark space | Crowded layouts, filling every corner |

---

## 11. Tokens (machine-readable)

```json
{
  "color": {
    "ink-deep": "#0a0907", "ink": "#100e0b", "ink-card": "#17130e", "ink-card-hot": "#221a11",
    "iron": "#3a352a", "parchment": "#ece2c6", "parchment-soft": "#c3b596",
    "gold-white": "#fff1cf", "gold-bright": "#d9a45c", "gold": "#b8894a",
    "ember": "#e0662f", "bronze": "#7a4a1e", "blood": "#7a2420"
  },
  "gradient": {
    "molten": "linear-gradient(100deg, #7a4a1e 0%, #b8894a 18%, #d9a45c 32%, #fff1cf 42%, #d9a45c 50%, #e0662f 64%, #7a2420 78%, #b8894a 100%)",
    "gilt": "linear-gradient(135deg, #fff1cf 0%, #d9a45c 45%, #7a4a1e 100%)",
    "seam": "linear-gradient(90deg, transparent, #d9a45c 30%, #fff1cf 50%, #d9a45c 70%, transparent)",
    "atmosphere": "radial-gradient(120% 80% at 50% 120%, rgba(122,36,32,0.38), transparent 60%), radial-gradient(80% 60% at 10% -10%, rgba(217,164,92,0.12), transparent 60%), #100e0b"
  },
  "font": {
    "display": "Fraunces, Georgia, 'Times New Roman', serif",
    "body": "'Source Serif 4', Georgia, 'Times New Roman', serif",
    "label": "'JetBrains Mono', ui-monospace, 'Courier New', monospace"
  },
  "motion": { "ease": "cubic-bezier(0.2, 0.7, 0.2, 1)", "hover": "300ms", "move": "400ms", "seam": "520ms" },
  "line": "1px",
  "radius": "0"
}
```

## 12. CSS variables (drop-in)

```css
:root {
  --ink-deep: #0a0907;
  --ink: #100e0b;
  --ink-card: #17130e;
  --ink-card-hot: #221a11;
  --iron: #3a352a;
  --parchment: #ece2c6;
  --parchment-soft: #c3b596;
  --gold-white: #fff1cf;
  --gold-bright: #d9a45c;
  --gold: #b8894a;
  --ember: #e0662f;
  --bronze: #7a4a1e;
  --blood: #7a2420;
  --display: "Fraunces", Georgia, "Times New Roman", serif;
  --body: "Source Serif 4", Georgia, "Times New Roman", serif;
  --mono: "JetBrains Mono", ui-monospace, "Courier New", monospace;
  --ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}
```

## 13. Reference files

- Live site: https://josiahkoplick.com (index and any missing page for the 404)
- Share card: `og.png` (1200×630), a complete still composition in the style
- Code: `css/style.css` (all tokens), `js/forge.js` (embers)
