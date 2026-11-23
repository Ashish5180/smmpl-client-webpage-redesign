# AGENTS.md: SMMIPL website (frontend)

Read this fully before every task. If a rule here conflicts with the user's current instruction, follow the user and mention the conflict in one line.

## 1. Project snapshot

- Company website for **SMMIPL** (tagline: "Molding Excellence, Shaping Futures"). Products: plastic moulds, casting dies, casting spares, sheet metal tool, chrome plating. Replacing an old WordPress site. About 30 pages and hundreds of images. **SEO, speed and legibility matter more than flashiness.**
- Stack: Next.js App Router (check `package.json` for the exact version), React, TypeScript (strict), Tailwind CSS v4, Sanity CMS (Studio embedded at `/studio`), `motion` (import from `"motion/react"`), `lucide-react`, deployed on Vercel.
- Run every command from the `frontend/` folder (where `package.json` lives). Package manager: **npm**.
- There is **no `src/` folder**. The alias `@/*` points to the project root.
- Tailwind v4: design tokens live in `app/globals.css` under `@theme`. There is no `tailwind.config.js`. Do not create one.

```
app/
  layout.tsx              # html, body, fonts, base metadata ONLY
  globals.css             # tokens + base styles
  studio/[[...tool]]/     # Sanity Studio (DO NOT TOUCH)
  (site)/                 # public website
    layout.tsx            # Header + <main> + Footer
    page.tsx
    about/ products/ infrastructure/ clients/ blog/ careers/ contact/
    sitemap.ts robots.ts (at app root if required by Next)
components/
  ui/                     # Button, Container, Section, Reveal, SpecTable, PartNumber
  layout/                 # Header, Footer, nav parts
  sections/               # page sections (Hero, ProductGrid, ...)
  seo/                    # JsonLd
lib/                      # site.ts (single source of truth), utils.ts
sanity/                   # schemas, client, image helper
public/logo/              # smmipl.svg, smmipl-white.svg
```

## 2. Hard rules (never break)

1. **Never modify `app/studio/**`** or Sanity Studio config unless the task explicitly says so.
2. **Never add a dependency** without asking first. State the package, why, and its size.
3. **Never commit or print secrets.** `.env*` stays git-ignored. Never put a token in a `NEXT_PUBLIC_` variable.
4. **Never invent company facts.** No made-up certifications, tolerances, capacities, client names, years, statistics, addresses, phone numbers or industries. If content is missing, write placeholder copy and mark it `TODO(client): <what is needed>`. Contact details come only from `lib/site.ts`.
5. **Never put Header or Footer in the root layout.** They belong to `app/(site)/layout.tsx` so `/studio` stays clean.
6. **Never use `localStorage`/`window`/`document` during render.** Only inside effects or event handlers.
7. **Never rewrite or refactor code unrelated to the task.** Keep diffs small and focused.
8. **Never silence errors** with `any`, `@ts-ignore`, `eslint-disable` or `// @ts-expect-error` to make a build pass. Fix the cause.

## 3. Workflow

1. Read the files you will change, and the components you could reuse, before writing code. **Reuse existing components and tokens before creating new ones.**
2. If a task touches more than 3 files, list the files you will change before editing.
3. If requirements are ambiguous, ask one short question instead of guessing.
4. Make the change in small steps. No unrelated cleanup, renames or formatting sweeps.
5. After changes run, in order: `npm run lint`, `npx tsc --noEmit`, `npm run build`. Fix every error you caused.
6. End with a short summary: files changed, assumptions made, and anything that needs a human decision. No long essays.

## 4. Next.js rules

- **Server Components by default.** Add `'use client'` only to the smallest leaf that needs state, effects, refs or browser APIs. Never mark a layout or a whole page as client.
- Fetch data in Server Components, never with `useEffect`.
- Dynamic APIs are async in current Next.js: `const { slug } = await params;` (same for `searchParams`, `cookies()`, `headers()`).
- Every page exports `metadata` or `generateMetadata` (see SEO). Use the Metadata API, never `next/head`.
- Use `next/link` for internal links, never a plain `<a href="/...">`. External links: `target="_blank" rel="noopener noreferrer"`.
- Use `next/font` for fonts and `next/image` (or the Sanity loader) for images. Never use `<img>` for content images.
- Use App Router only. Never create a `pages/` directory.
- Provide `loading.tsx`, `error.tsx` and `not-found.tsx` where routes fetch data. Call `notFound()` for unknown slugs.
- Avoid hydration mismatches: no `Date.now()`, `Math.random()` or `window` checks in render output.
- Tailwind classes must be **complete static strings**. Never build them dynamically (`bg-${color}` breaks). Use lookup objects.

## 5. TypeScript

- Strict mode. No `any`. Type component props explicitly. Prefer `type` for props, `interface` only when extending.
- Type Sanity query results with explicit types. Do not leave them as `unknown` or `any`.
- No non-null assertions (`!`) except for required env vars, validated once in one file.
- Named exports for components, except `page.tsx`, `layout.tsx` and route files, which use default exports.

## 6. Design system

**Palette is red, black and white only.** Use tokens from `app/globals.css`: `ink`, `paper`, `brand`, `brand-action`, `brand-dark`, `muted`, `line`.

- No hard-coded hex values, no arbitrary colors (`bg-[#123456]`), and no other hues, in components.
- **Red is scarce.** Only for primary buttons, hover/active states, small accents (underline, bullet, one stat number) and focus rings. Never for large backgrounds or paragraph text.
- Light sections use `paper`, dark sections use `ink`. Alternate them for rhythm.
- Button fills use `brand-action`. On dark backgrounds, small red text uses `brand` (lighter) to keep AA contrast.
- Shape language: rounded-lg buttons and cards, pill shapes only for the navbar and chips. Square red bullets.
- Skeuomorphic effects (navbar, buttons) use shared CSS variables such as `--shadow-raised` and `--shadow-pressed` from `globals.css`. Do not repeat long shadow strings inline.
- Spacing: use the Tailwind scale. Section padding `py-16 md:py-24`. Content width via `Container` (`max-w-7xl`). Do not invent one-off widths.

### Typography (exactly three families)

| Role | Font | Weights loaded | Use |
|---|---|---|---|
| Body/UI | Inter (`font-body`) | variable | paragraphs, nav, buttons, forms |
| Headings | Barlow (`font-heading`) | 600, 700 | h1-h3, hero, big stats |
| Technical | IBM Plex Mono (`font-mono`) | 400, 500 | part numbers, SKUs, tolerances, spec values only |

- Never use a weight that is not loaded. Never add a fourth family.
- Body 16px/1.6. No informational text below 14px (12px only for legal text and captions).
- Use `tabular-nums` for numbers in tables. Paragraph measure max `65ch`. Use `text-balance` on headings.
- Exactly **one `<h1>` per page**, then a logical h2/h3 order. Never skip levels for styling. Style with classes instead.

## 7. Components

- One component per file, PascalCase file names, under about 200 lines. Split when larger.
- `components/ui` = generic primitives, `components/layout` = shell, `components/sections` = page-level blocks.
- Variants via lookup objects and the `cn()` helper from `lib/utils.ts`. No inline `style` unless the value is dynamic.
- Navigation items, company name, tagline, phone, email and address live in `lib/site.ts` only. Never hard-code them in components.
- Spec data renders through `SpecTable` (semantic `<table>`, `<th scope="row">`, scrollable region on small screens). Part numbers use `PartNumber`.
- Every interactive element must be a real `<button>` or `<a>`/`Link`. Never a clickable `<div>`.

## 8. Animation

- Animate **only `opacity` and `transform`** (and `width`/`height` via motion's layout system where needed). Never `top`, `left`, `margin` or `box-shadow` keyframes on large areas.
- Durations 150-600ms. Easing `ease-out` for entrances. Springs for sliding indicators.
- Scroll reveals use the shared `Reveal` component (once only). Do not copy motion code into pages.
- **Respect reduced motion** (`useReducedMotion` and the CSS media query). With reduced motion, remove movement and keep fades short.
- Never animate the LCP element (hero image/heading) in a way that delays its first paint.
- Never cause layout shift. Reserve space for anything that animates in.
- Import from `"motion/react"`, never from `framer-motion`.

## 9. Accessibility (WCAG AA)

- Semantic landmarks: `header`, `nav` (with `aria-label`), `main`, `footer`. Provide a "Skip to content" link.
- Visible `:focus-visible` ring on every interactive element. Never `outline: none` without a replacement.
- Contrast: text 4.5:1 minimum (3:1 for text 24px+). Check red on white and red on black.
- Touch targets at least 44x44px on mobile.
- Dropdowns, menus and dialogs: correct `aria-expanded`/`aria-controls`, Escape closes, focus returns to the trigger, full keyboard support.
- Every informative image has descriptive `alt`. Decorative images use `alt=""`.
- Forms: visible `<label>` for each input, clear error messages, `autocomplete` attributes, spam protection.
- Icon-only buttons need `aria-label`.

## 10. SEO (critical for this project)

- Every page has a unique `title` (under 60 chars, keyword first) and `description` (under 160 chars), a `canonical`, and Open Graph tags. Dynamic pages use `generateMetadata`.
- Product pages: JSON-LD `Product`; all pages: `BreadcrumbList`; home: `Organization` (and `LocalBusiness` once the address is confirmed). Use the shared `JsonLd` component.
- `app/sitemap.ts` lists every public URL, including Sanity-driven ones. `app/robots.ts` disallows `/studio` and non-production indexing.
- Non-production deployments must be `noindex` (check `process.env.VERCEL_ENV !== 'production'`).
- URLs are lowercase, hyphenated and descriptive. When changing a URL, add a **301 redirect** in `next.config.ts` from the old WordPress URL.
- Internal linking: related products, breadcrumbs, and links from the home page to every product category.
- The H1 contains the page's main keyword in natural language. The brand tagline is never the H1.
- Navigation and dropdown links must exist in the rendered DOM (hide with `visibility`/`inert`, never unmount them) so crawlers can follow them.
- Never block rendering of main content behind client-only JavaScript.

## 11. Images and Sanity

- All content images come from Sanity. Build URLs with `urlFor(image).auto('format')` and explicit width. Originals are never altered.
- Always provide `width`/`height` (or `fill` with a sized parent) and a correct `sizes` attribute. Use `priority` only for the single above-the-fold hero image. Everything else lazy-loads.
- Use Sanity's `lqip` for blur placeholders where available.
- Do not double-optimize: use the Sanity image CDN through a custom loader (or `unoptimized`) instead of also routing through Vercel image optimization.
- `alt` text is a required Sanity field. Never render an image without it.
- GROQ queries project only the fields used. Never `*[_type=="product"]` with no projection.
- Fetch through the shared `sanityFetch` helper with cache tags. Content updates reach the site through the revalidation webhook, not by rebuilding.
- Never use a Sanity write token on the client. Reads of public content need no token.

## 12. Performance budgets

- Targets: LCP under 2.5s, CLS under 0.1, INP under 200ms on mobile.
- Keep client JavaScript small. Lazy-load heavy client components with `next/dynamic`. No heavy libraries (charts, carousels, date libs) without asking.
- Use at most the three font families above, with `display: "swap"`.
- No auto-playing video or large background videos. No third-party scripts without approval.

## 13. Content and copy

- Language: English (India), plain, specific, no buzzwords. No unverifiable superlatives ("world-class", "zero defect", "best in class").
- Copy mentioning precision, certifications, industries or capacity needs client confirmation. Use `TODO(client)`.
- The product categories are exactly: Plastic Moulds, Casting Dies, Casting Spares, Sheet Metal Tool, Chrome Plating. Do not add others.
- Navigation is defined in `lib/site.ts`: Home, About Us (Our Story, Our Mission & Vision), Products (5 categories), Infrastructure, Our Clients, Blog, Careers, Contact Us.
- Any temporary test content carries a `TEMP: remove before launch` comment.

## 14. Git

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`. One logical change per commit.
- Never force-push. Never commit `node_modules`, `.next` or `.env*`.
- Do not commit or push unless the user asks.

## 15. Common mistakes to avoid

- Header/Footer rendered on `/studio` (see rule 5).
- `'use client'` at the top of a layout or page, which turns the subtree into client JS.
- Awaiting nothing: forgetting `await params` in dynamic routes and `generateMetadata`.
- Dynamic Tailwind class names (they get purged).
- Using `<img>`, `<a>` for internal links, or `next/head`.
- Animating width/height/top instead of transform.
- Opening dropdowns on hover only with no keyboard or touch support.
- Setting `priority` on every image.
- Hard-coding phone/email/nav in components.
- Leaving `console.log`, unused imports, commented-out code, or `TEMP` blocks behind.
- Adding libraries for something Tailwind, CSS or a few lines of code can do.

## 16. Definition of done

A task is done only when all of these are true:

- [ ] `npm run lint`, `npx tsc --noEmit` and `npm run build` pass with no new warnings.
- [ ] Checked at 360px, 768px, 1024px and 1440px widths. No horizontal scroll, no overlap.
- [ ] Keyboard-only walkthrough works, focus is visible, and reduced motion is respected.
- [ ] One `h1`, correct heading order, all images have alt, contrast passes.
- [ ] Metadata and structured data present for any new page.
- [ ] No hard-coded colors, no new dependencies, no secrets, no console errors.
- [ ] `/studio` still loads without Header or Footer.
- [ ] Summary delivered: files changed, assumptions, open questions.