# Typst Resume — Setup Guide

This is an ATS-friendly PDF resume template that reads from your single-source
`resume.json`. Every time you update the JSON, re-compile to regenerate the PDF.

## Why Typst?

Unlike PDFs exported from Figma, Typst-generated PDFs have **clean text
extraction** — every word comes out intact when an ATS system parses them. No
broken words, no ligature artifacts, no letter-spacing pollution. This version
was tested and confirmed to extract:

- ✓ `React`, `TypeScript`, `Next.js`, `PostgreSQL` — all keywords intact
- ✓ Section headings as `SUMMARY`, `SKILLS`, `EXPERIENCE`, `EDUCATION`
- ✓ Mixed-language text `Relianz 友信創新` preserved
- ✓ No `wit h`, `ser ving`, `G it` style word breaks

## Project Structure

```
portfolio/
├── data/
│   └── resume.json       ← single source of truth (shared with website)
├── resume/
│   ├── resume.typ        ← the template
│   ├── resume.pdf        ← generated output (commit this too)
│   └── README.md         ← this file
└── public/
    └── resume.pdf        ← copy from resume/resume.pdf for the website
```

## Install Typst

**macOS**
```bash
brew install typst
```

**via Cargo (any OS)**
```bash
cargo install typst-cli --locked
```

**via pip (any OS)** — installs as Python package, use via `python -c`
```bash
pip install typst
```

Verify install:
```bash
typst --version   # should print "typst 0.13.x" or later
```

## Install Fonts

The template uses two fonts. Both are free.

### IBM Plex Sans (primary, for Latin text)

**macOS**
```bash
brew install --cask font-ibm-plex-sans
```

**Manual**: Download from https://www.ibm.com/plex/ → install all .otf files.

### Noto Sans TC (for Traditional Chinese fallback)

**macOS**
```bash
brew install --cask font-noto-sans-tc
```

**Manual**: Download from https://fonts.google.com/noto/specimen/Noto+Sans+TC

Verify fonts are detected:
```bash
typst fonts | grep -iE "plex|noto"
```

You should see `IBM Plex Sans` and `Noto Sans TC` in the output.

## Compile the Resume

From the project root:
```bash
typst compile resume/resume.typ resume/resume.pdf
```

Or watch for changes (auto-recompile on save):
```bash
typst watch resume/resume.typ resume/resume.pdf
```

## Copy to Public Folder

The Next.js site serves the PDF from `public/resume.pdf`. After compiling:
```bash
cp resume/resume.pdf public/resume.pdf
```

Or add a package.json script:
```json
{
  "scripts": {
    "resume": "typst compile resume/resume.typ resume/resume.pdf && cp resume/resume.pdf public/resume.pdf"
  }
}
```

Then run:
```bash
npm run resume:build   # 編譯 + 複製到 public
npm run resume:watch   # 開發時自動重編譯
```

## Editing Content

**Never edit `resume.typ` to change content.** Edit `data/resume.json` instead:

- Update Summary → `resume.json` → `summary` field
- Add a new job → `resume.json` → `experience` array
- Update skills → `resume.json` → `skills` array
- Update education → `resume.json` → `education` array

The website reads the same JSON, so changes appear everywhere after one edit.

## Editing Visuals

If you DO want to change the look (colors, spacing, fonts), edit `resume.typ`:

- **Accent color**: change `#let accent = rgb("#10b981")` at the top
- **Font**: change `font: ("IBM Plex Sans", "Noto Sans TC")` in `#set text(...)`
- **Margins**: change the `margin:` block in `#set page(...)`
- **Section heading style**: modify the `#let section(title) = {...}` function

## Common Issues

### "failed to load file (access denied)"

Typst sandboxes file access. Make sure you run the compile command from the
project root (where `data/` and `resume/` sit as sibling folders), or pass
`--root`:
```bash
typst compile --root . resume/resume.typ resume/resume.pdf
```

### Font not found

Run `typst fonts | grep -i plex` — if empty, the font isn't installed or isn't
in a system location Typst scans. On macOS, install via `brew install --cask`
or drop `.otf` files into `~/Library/Fonts/`.

### Content overflows to page 2

This template is designed for single-page A4. If your content grows, options:
1. Trim a bullet or two from the older experience
2. Reduce `font-size: 10pt` in `#set text(...)` to `9.5pt`
3. Reduce `column-gutter` or `row-gutter` values in the Skills grid

### Chinese characters display as boxes

Noto Sans TC isn't installed. See "Install Fonts" above.

## Verifying ATS-Friendliness

After compiling, verify the PDF text extracts cleanly:
```bash
pdftotext resume/resume.pdf -
```

Inspect the output — every word should be complete. Watch for red flags:
- `wit h`, `ser ving`, `G it` — word breaking (fix: check letter-spacing)
- `S U M M A R Y` — tracking on headings (this template avoids this)
- `ﬁrst`, `oﬃce` — ligature characters (ATS may not parse these)

## Deployment Workflow

1. Edit `data/resume.json`
2. Run `npm run resume` (compiles PDF + copies to public/)
3. Run `git add data/resume.json resume/resume.pdf public/resume.pdf`
4. Commit and push
5. Website auto-deploys with new data AND new PDF

Single source, fully synced, ATS-clean. Done.
