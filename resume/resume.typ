// =============================================================================
// resume.typ — Single-page A4 resume (black & white) compiled from resume.json
//
// Usage (from project root):
//   typst compile --root . resume/resume.typ resume/resume.pdf
//
// Data source: ../data/resume.json (single source of truth)
// Font dependency: IBM Plex Sans (Latin), Noto Sans CJK TC (Chinese)
// =============================================================================

#let resume = json("../data/resume.json")

// -------- Design tokens (monochrome) --------
#let color-primary = rgb("#000000")
#let color-secondary = rgb("#1a1a1a")
#let color-muted = rgb("#555555")
#let color-subtle = rgb("#888888")
#let color-rule = rgb("#000000")

// -------- Date helpers --------
#let month-names = (
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
  "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
)

#let format-date(iso) = {
  if iso == none { return "Present" }
  let parts = iso.split("-")
  if parts.len() < 2 { return iso }
  let month = month-names.at(parts.at(1), default: parts.at(1))
  [#month #parts.at(0)]
}

#let format-date-range(start, end) = [
  #format-date(start) #sym.dash.en #format-date(end)
]

// -------- Section heading --------
// Classic resume style: uppercase bold label with a full-width underline
#let section(title) = {
  v(10pt)
  text(
    size: 10pt,
    weight: "bold",
    fill: color-primary,
    upper(title),
  )
  v(2pt)
  line(length: 100%, stroke: 0.5pt + color-rule)
  v(5pt)
}

// -------- Bullet point --------
// Traditional bullet character (•) — extracts cleanly in ATS
#let bullet(content) = {
  block(above: 4pt, below: 0pt)[
    #grid(
      columns: (10pt, 1fr),
      column-gutter: 6pt,
      text(size: 9.5pt, fill: color-muted)[•],
      text(size: 9.5pt, fill: color-secondary, content),
    )
  ]
}

// -------- Entry header (title left, date right) --------
#let entry-header(title, date) = {
  grid(
    columns: (1fr, auto),
    column-gutter: 12pt,
    align: (left, right),
    text(size: 11pt, weight: "medium", fill: color-primary, title),
    text(size: 9pt, fill: color-muted, date),
  )
}

// =============================================================================
// PAGE SETUP
// =============================================================================

#set page(
  paper: "a4",
  margin: (
    top: 24pt,
    bottom: 26pt,
    left: 48pt,
    right: 48pt,
  ),
)

#set text(
  font: ("IBM Plex Sans", "Noto Sans CJK TC", "Noto Sans TC"),
  size: 10pt,
  fill: color-secondary,
)

#set par(
  leading: 0.65em,
  justify: false,
)

#show heading: set block(above: 0pt, below: 0pt)

// =============================================================================
// HEADER — name/title left, contact right
// =============================================================================

#grid(
  columns: (1fr, auto),
  column-gutter: 20pt,
  align: (left + bottom, right + bottom),

  // Left column: name + title
  [
    #text(
      size: 22pt,
      weight: "bold",
      fill: color-primary,
      resume.basics.name,
    )
    #v(1pt)
    #text(
      size: 11pt,
      weight: "medium",
      fill: color-secondary,
      resume.basics.title,
    )
  ],

  // Right column: contact info
  align(right)[
    #set text(size: 9pt)
    #text(fill: color-muted, resume.basics.location) \
    #text(fill: color-secondary, link("mailto:" + resume.basics.email, resume.basics.email)) \
    #text(fill: color-muted)[
      #link(resume.basics.portfolio, resume.basics.portfolio.replace("https://", ""))
      #h(4pt) #sym.dot.c #h(4pt)
      #{
        let gh = resume.basics.profiles.find(p => p.network == "GitHub")
        if gh != none {
          link(gh.url, "github.com/" + gh.username)
        }
      }
    ]
  ],
)

// Divider rule below header
#v(8pt)
#line(length: 100%, stroke: 1pt + color-rule)

// =============================================================================
// SUMMARY
// =============================================================================

#section("Summary")

#text(size: 10pt, fill: color-secondary, resume.summary)

// =============================================================================
// SKILLS
// =============================================================================

#section("Skills")

#{
  let rows = ()
  for group in resume.skills {
    rows.push((
      text(size: 9.5pt, weight: "medium", fill: color-primary, group.category),
      text(size: 9.5pt, fill: color-secondary, group.items.join(", ")),
    ))
  }
  grid(
    columns: (90pt, 1fr),
    row-gutter: 4pt,
    column-gutter: 0pt,
    ..rows.flatten(),
  )
}

// =============================================================================
// EXPERIENCE
// =============================================================================

#section("Experience")

#for (i, job) in resume.experience.enumerate() {
  if i > 0 { v(10pt) }

  // Company name: English only for PDF (companyZh kept in JSON for web use)
  let company-display = job.company

  entry-header(
    [#company-display #sym.dash.em #text(weight: "regular", job.role)],
    format-date-range(job.startDate, job.endDate),
  )

  if "subtitle" in job and job.subtitle != none {
    v(2pt)
    text(size: 9pt, fill: color-muted, style: "italic", job.subtitle)
  }

  v(5pt)

  for highlight in job.highlights {
    bullet(highlight)
  }
}

// =============================================================================
// EDUCATION
// =============================================================================

#section("Education")

#for edu in resume.education {
  entry-header(
    [#edu.institution #sym.dash.em #text(weight: "regular", edu.degree)],
    format-date-range(edu.startDate, edu.endDate),
  )

  v(5pt)

  for highlight in edu.highlights {
    bullet(highlight)
  }
}
