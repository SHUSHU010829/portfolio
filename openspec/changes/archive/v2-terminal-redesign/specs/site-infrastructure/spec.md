# Delta for Site Infrastructure

## ADDED Requirements

### Requirement: Root Metadata
The system SHALL configure comprehensive metadata in `app/layout.tsx` using Next.js's `metadata` export API. The root metadata MUST include: `title` with a template (e.g., `{ default: 'shu/dev', template: '%s | shu/dev' }`), a `description`, canonical URL, Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`), and Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).

#### Scenario: Title template applies to sub-pages
- GIVEN `app/layout.tsx` exports `metadata.title = { template: '%s | shu/dev', default: 'shu/dev' }`
- WHEN the user visits `/work/relianz` which exports `title: 'Relianz Design System'`
- THEN the browser tab shows "Relianz Design System | shu/dev"

#### Scenario: OG tags present on home page
- GIVEN the user copies the home page URL and pastes it into a chat application that previews links
- WHEN the link preview is generated
- THEN the preview shows a title, description, and an OG image from `og:image`
- AND no `<meta>` tag is missing from the preview scrape

#### Scenario: Canonical URL prevents duplicate indexing
- GIVEN the home page is accessible at both `http://shuyuan.tw` and `https://shuyuan.tw`
- WHEN a search engine crawler reads the page
- THEN the `<link rel="canonical">` points to `https://shuyuan.tw`

### Requirement: Per-Page Dynamic Metadata
The system SHALL implement `generateMetadata` in `app/work/[slug]/page.tsx` to produce dynamic metadata for each case study. The generated metadata MUST include the case study title, a description derived from the frontmatter `subtitle`, and an OG image URL.

#### Scenario: Case study metadata is unique
- GIVEN the Relianz case study has frontmatter `title: "Relianz Design System"` and `subtitle: "為雙品牌打造統一的設計語言"`
- WHEN the page is rendered
- THEN `<title>` contains "Relianz Design System"
- AND `<meta name="description">` contains the subtitle text

#### Scenario: OG image references correct path
- GIVEN the Relianz case study has frontmatter `cover: "/images/relianz/cover.png"`
- WHEN `generateMetadata` runs
- THEN `og:image` is set to an absolute URL pointing to the cover image
- AND the URL includes the full domain (e.g., `https://shuyuan.tw/images/relianz/cover.png`)

### Requirement: Sitemap and Robots
The system SHALL generate a sitemap at `/sitemap.xml` and a robots file at `/robots.txt` via Next.js's App Router file conventions (`app/sitemap.ts`, `app/robots.ts`).

The sitemap MUST include: `/` (home), `/work` (list), and each published case study slug (e.g., `/work/relianz`, `/work/dailyval`, `/work/softmobile`). The robots file MUST allow all crawlers for all paths except any `/api/*` routes.

#### Scenario: Sitemap includes all published routes
- GIVEN three published case studies (relianz, dailyval, softmobile)
- WHEN a crawler fetches `/sitemap.xml`
- THEN the sitemap contains entries for `/`, `/work`, `/work/relianz`, `/work/dailyval`, `/work/softmobile`
- AND each entry has a `<loc>` with the full absolute URL

#### Scenario: Draft case study absent from sitemap
- GIVEN a case study with `status: "draft"`
- WHEN a crawler fetches `/sitemap.xml`
- THEN that case study's URL is NOT present in the sitemap

#### Scenario: Robots allows main content
- GIVEN a search engine fetches `/robots.txt`
- WHEN parsing the file
- THEN `User-agent: *` is followed by `Allow: /`
- AND `Disallow: /api/` prevents indexing of API routes

### Requirement: OG Image
The system SHALL provide at least one static OG image available at `/public/og-image.png`. The image MUST be at minimum 1200×630px. It MUST visually represent the site brand (terminal aesthetic). Dynamic per-page OG image generation is deferred to a future change.

#### Scenario: OG image exists and is reachable
- GIVEN the site is deployed
- WHEN an HTTP GET request is made to `https://shuyuan.tw/og-image.png`
- THEN the response is HTTP 200 with `Content-Type: image/png`
- AND the image dimensions are at least 1200×630px

#### Scenario: Root metadata references OG image
- GIVEN the root `metadata` in `app/layout.tsx`
- WHEN a link scraper reads the home page
- THEN `og:image` resolves to the absolute URL of the OG image
- AND the image loads successfully

### Requirement: Analytics Integration
The system SHALL integrate Vercel Analytics and Vercel Speed Insights into `app/layout.tsx`. Both packages MUST be loaded without blocking the main thread. Analytics MUST track page views across all routes including `/work/*`.

#### Scenario: Analytics script loaded
- GIVEN the site is deployed on Vercel
- WHEN a user visits the home page
- THEN the Vercel Analytics beacon fires a page view event
- AND no JavaScript error is thrown in the browser console related to analytics

#### Scenario: Page view tracked on navigation
- GIVEN the user is on `/` and navigates to `/work/relianz`
- WHEN the navigation completes
- THEN Vercel Analytics records a separate page view for `/work/relianz`

#### Scenario: Speed Insights reports
- GIVEN the site is deployed
- WHEN the page loads and real user metrics are collected
- THEN Vercel Speed Insights receives LCP, CLS, and INP values
- AND these appear in the Vercel dashboard

### Requirement: Performance Budget
The system SHALL meet the following performance targets as measured by Lighthouse on the production deployment:
- Performance score ≥ 90
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- First-load JS (gzipped) < 150KB

Any components using React Three Fiber, Three.js, or other large 3D libraries MUST be loaded via `next/dynamic` with `ssr: false` to prevent them from inflating the initial bundle. (Note: no 3D components are included in Week 1-4 scope, but this constraint is established for future changes.)

#### Scenario: Lighthouse performance passes
- GIVEN the production site is deployed
- WHEN Lighthouse performance audit runs on the home page
- THEN the Performance score is ≥ 90
- AND LCP is reported as < 2.5s

#### Scenario: No CLS from images
- GIVEN the home page contains images (e.g., company logos in Experience)
- WHEN the page loads
- THEN all images use `next/image` with explicit `width` and `height` props
- AND CLS is measured as < 0.1

#### Scenario: 3D libraries are dynamically imported
- GIVEN a future component imports React Three Fiber
- WHEN reviewing the import statement
- THEN it uses `dynamic(() => import('@/components/...'), { ssr: false })`
- AND the R3F bundle is absent from the initial JS payload

### Requirement: Resume PDF Availability
The system SHALL ensure `public/resume.pdf` exists so that `/resume.pdf` is accessible. The `[$ cat resume.pdf_]` CTA in the Hero and the `cat resume.pdf` Command Palette action both depend on this file being present.

#### Scenario: Resume PDF is downloadable
- GIVEN the site is deployed
- WHEN the user clicks the `[$ cat resume.pdf_]` button
- THEN the browser opens or downloads the file from `/resume.pdf`
- AND the HTTP response is 200 with `Content-Type: application/pdf`

#### Scenario: Command Palette resume action works
- GIVEN the user opens the Command Palette and selects "cat resume.pdf"
- WHEN the action executes
- THEN a new tab opens to `/resume.pdf`
- AND the file loads without a 404 error
