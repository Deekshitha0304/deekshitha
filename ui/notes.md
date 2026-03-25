# UI Drills Notes - Icons, Images, and Hero

## Drill 1 - Icon Implementation Options

Implemented:
- 3 Material Symbols in navigation (`home`, `search`, `settings`) with CSS size and color through `.icon`, `.icon--nav`.
- One icon replaced with inline Heroicons SVG in the 6-icon grid (`.icon-hero` inside `#icon-gallery`).
- 6-icon grid with consistent sizing (`.icon-swatch`) and hover behavior (`.icon-tile:hover` uses color change + slight scale).

Observed pros and cons:
- **Icon webfont (Material Symbols)**
  - Pros: quick to use, easy icon swaps via text names, lightweight markup.
  - Cons: less per-icon shape control than inline SVG; relies on font loading.
- **Inline SVG (Heroicons)**
  - Pros: best control over stroke/fill, easier fine-grained styling and animation.
  - Cons: more verbose HTML, repeated SVG markup can increase document size.
- **Accessibility**
  - Decorative icons use `aria-hidden="true"`.
  - Interactive controls keep visible text labels (not icon-only).

## Drill 2 - Image Formats and Optimization

Formats used:
- JPG photo source: `https://picsum.photos/1200/800` saved as `images/photo-original.jpg`.
- Transparent PNG graphic: local transparent icon (`images/tick-transparent.png`) used in image-type card and palette section.
- SVG vector: inline `vector-logo` in image format section.

Compression log:

| File | Bytes |
| --- | ---: |
| `images/photo-original.jpg` | 78,838 |
| `images/photo-1200.jpg` (optimized) | 77,509 |

All displayed images use responsive-safe styling:
- `max-width: 100%`
- `height: auto`
- border radius in relevant components (for example `.article-media img`, `.media-format-grid img`, `.image-container`).

## Drill 3 - Responsive Images and `picture`

Implementation:
- `<picture>` added in article media.
- WebP source set with JPG fallback.
- `srcset` and `sizes` configured for 480w, 800w, 1200w.
- Image uses `loading="lazy"` and `decoding="async"`.

Runtime verification of selected source at breakpoints:
- 375px viewport: `images/photo-480.webp`
- 768px viewport: `images/photo-800.webp`
- 1440px viewport: `images/photo-1200.webp`

## Drill 4 - Accessible Icons and Navigation

Implemented:
- Top navbar includes Home, Search, Settings with icon + visible text labels.
- Download and Upload controls include embedded inline SVG icons plus visible text.
- Decorative icons marked `aria-hidden="true"`.
- Keyboard focus visibility via `:focus-visible` outline styling.

## Drill 5 - Hero Section with Overlay

Implemented:
- Full-bleed hero treatment (`width: 100vw` + edge-to-edge positioning).
- Gradient overlay on hero background image (`.hero::before`).
- Readable overlay text using hero text tokens and translucent panel (`.hero__inner`).
- Light/dark theme readability supported through theme token overrides.
- Mobile and desktop readability supported with responsive typography (`clamp`) and mobile spacing adjustments.
