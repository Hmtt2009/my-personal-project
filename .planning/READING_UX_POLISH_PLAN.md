# Reading UX Polish v1 — Plan

Plan-only document. No UI changes have been implemented. This file captures the agreed approach so it can be reviewed before any code changes ship.

## Goal

Make the static learning reader feel like a calm personal learning surface, not a generic Markdown page. No architecture, content-model, or feature changes. Mostly CSS, copy, and small structural moves inside the existing `.astro` files.

## Guiding principles

- Reading is the product. Status, metadata, and references recede.
- Hierarchy by silence, not by chrome. Less competing weight, more whitespace.
- Mobile is first — iPhone reading is the stated goal.
- No new abstractions. Keep changes inside the three existing files unless something genuinely warrants a tiny partial.

## Critical files this plan would touch at implementation time

- `src/pages/index.astro` — homepage copy and card markup.
- `src/pages/lessons/[slug].astro` — lesson header, optional TOC slot, source-reference rewording.
- `src/styles/global.css` — most of the work: hierarchy, mobile spacing, focus styles, optional TOC styles, source-reference styles.
- `src/lib/lessons.ts` — only if the in-lesson TOC is approved: forward `module.getHeadings()` results into `LessonDetail`. Additive only.

No new files unless the TOC implementation grows to warrant a tiny `LessonToc.astro` partial — judgment at implementation time, defaulting to inline.

## 1. Homepage copy and visual hierarchy

Current state in `src/pages/index.astro:43-49`:

- Eyebrow "Static reader foundation" (engineering tone).
- H1 "Personal Learning Reader".
- Subtitle "Choose a prepared lesson and read it in simple English."
- Library count "{N} prepared lessons".
- Then `<h2>Library</h2>`.

Changes:

- Drop the "Static reader foundation" eyebrow.
- Keep H1 "Personal Learning Reader" but lighten its visual weight; add a one-line tagline below: *"A small library of lessons to read slowly."*
- Move library count under the H1 as a small caption: *"{N} lessons"*.
- Drop the redundant `<h2>Library</h2>`. Replace with a visually-hidden heading for screen readers (`<h2 class="sr-only">`).
- Soften empty state: "Nothing to read yet." + "Add a Markdown lesson to `content/lessons/` and it will show up here."

## 2. Lesson card readability

Current card markup `src/pages/index.astro:60-91`, styles `src/styles/global.css:88-163`:

- Title + status pill on a flex row.
- bigIdea, then description.
- Meta `<dl>` row with Source, Date.

Changes:

- Hide the status pill when `status === "ready"`. Show it only for `draft`.
- Make `bigIdea` the dominant secondary line (slightly larger / darker). `description` becomes a quieter caption underneath.
- Replace the `<dl>` with a single quiet bottom line: `Article · May 5, 2026` as a small `<p class="lesson-card-footnote">`.
- Increase card vertical padding on mobile so tap targets feel ≥ 44px.
- Replace the existing hover-only background with a subtle left-border accent on hover/focus, plus a real `:focus-visible` outline (currently `outline: none`, an a11y miss).

## 3. Lesson reading page for long lessons

Current state in `src/pages/lessons/[slug].astro:60-99`:

- Back link, eyebrow "Prepared lesson", H1, big idea, description, then a 4-field `<dl>` (Source, Status, Created, Updated), then body, then source reference.

Changes:

- Drop the "Prepared lesson" eyebrow.
- Replace the 4-field `<dl>` with a single quiet line under the title: *"Article · Updated May 5, 2026"*. Drop `Status` from this surface entirely (covered by point 4). Show one date max — prefer `Updated`, fall back to `Created`.
- Increase reading measure: `.lesson-page` shell to ~46–48rem; body paragraphs capped at ~36rem measure.
- Bump `.lesson-body` font to 17px (`1.0625rem`) and line-height 1.7. UI chrome stays at 16px.
- Tighten heading hierarchy inside `.lesson-body`:
  - body H1 → ~1.5rem with extra top-margin.
  - body H2 → ~1.2rem with `margin-top: 2.25rem` for clear section breaks.
  - body H3 → ~1.05rem, slightly bolder than body text.
- Add `scroll-behavior: smooth` to `html` (CSS-only; pairs with the TOC if approved).

## 4. Make metadata less distracting

Single rule across the app: at most one quiet metadata line per surface.

- Library card → one bottom-line `Source · Date`. Status pill hidden when `ready`.
- Lesson page → one quiet line under the title. Status, Created, sourceRef removed from the prominent header.
- Remove `<dl>/<dt>/<dd>` metadata blocks entirely in v1. They read like a database record.

## 5. Mobile reading comfort

Current mobile rules at `src/styles/global.css:236-249`:

- `width: min(100% - 1.25rem, 42rem)` (only 0.625rem gutter).
- `padding: 3rem 0`.
- H1 → 1.8rem.

Changes:

- Wider gutters: `width: min(100% - 2rem, 42rem)` → 1rem horizontal gutter.
- Larger body type at ≤ 40rem viewport: `.lesson-body` to ~17–18px. UI chrome stays at 16px.
- Card vertical padding ≈ 1.5rem on mobile.
- Reduce top page padding to `2.25rem` on mobile.
- Status pill scales down on mobile (only relevant for `draft`).
- `hyphens: auto` and `text-wrap: pretty` on body paragraphs (well-supported on iOS Safari).

## 6. Optional small in-lesson Table of Contents

Feasibility: Astro Markdown modules expose `getHeadings()`. Can be surfaced via the existing `import.meta.glob` in `src/lib/lessons.ts` without changing the content model.

If approved:

- TOC of H2 headings only. Skip H1 (duplicates page title) and H3 (too noisy for v1).
- Desktop (≥ 64rem viewport): a quiet right-side sticky column. Low contrast, no border or background.
- Mobile: inline at the top of the lesson body inside a native `<details>` element labeled "Sections". No JS.
- If a lesson has 0 or 1 H2, don't render the TOC at all.
- Implementation note: add `headings` to the `LessonDetail` type in `src/lib/lessons.ts`, sourced from `module.getHeadings()`. Anchor IDs are auto-generated by Astro by default.

Recommendation: include the TOC. It's exactly the kind of "calm reading" affordance that fits this app, and the sample lesson already has multiple H2 sections.

## 7. Better source reference wording

Current at `src/pages/lessons/[slug].astro:89-98`:

- Heading "Source reference".
- Body "Source material is kept as reference only. The simplified lesson is the main reading content."
- A `<ul>` of raw `sourceRef` strings.

Changes:

- Heading → "Where this came from".
- Body → one sentence: *"This lesson was simplified from the material below."*
- Per-entry rendering rules:
  - Starts with `http://` or `https://` → clickable link, hostname-shortened display when long.
  - Repo-relative path → small muted `<code>` (no link — paths aren't useful in a browser).
- If `sourceType` is set, prefix the section text: *"Simplified from a book chapter."*
- Visual treatment: smaller text, generous top margin so it doesn't compete with "What you should remember". No separator rule.

## 8. Subtle reading-focused style

System-stack only. No web fonts.

- Optional: switch `.lesson-body` to a system serif (`ui-serif, Georgia, "Times New Roman", serif`) while keeping UI chrome and headings sans. Strongest "this is for reading" signal. Decision needed.
- Unify text colors to ~4 grays + one accent (`#445244`). Current `#42433d` / `#5f625a` / `#5d6b5d` are inconsistent. Move to a single set: ink `#1d1d1b`, secondary `#4a4a45`, meta `#6e6e66`, border `#e5e0d6`.
- Keep `max-width: 36rem` on lesson-body paragraphs even when the shell is wider for the TOC.

## 9. What this plan will NOT do

- No backend, DB, auth, runtime API, upload, quiz.
- No UI framework. No CSS framework. No web fonts.
- No content-model changes. No frontmatter additions. No lesson file edits.
- No dark mode (deferred).
- No animations beyond CSS `scroll-behavior: smooth` and the existing card hover background.
- No drop caps, decorative dividers, or magazine flourishes.
- No new dependencies.

## Open questions to resolve before implementing

1. Hero H1 wording: keep "Personal Learning Reader" with a softer tagline, or change to something quieter like "Read"? Recommended: keep current H1, add tagline.
2. Switch `.lesson-body` to a system serif font? Recommended: yes — biggest single "feels like reading" win.
3. Include the TOC? Recommended: yes.
4. Hide `Status` from the lesson page entirely on `ready`, with a small "Draft" badge only when `draft`? Recommended: yes.
5. Apply `text-wrap: pretty` and `hyphens: auto` on body paragraphs? Recommended: yes.

## Risks / things to watch at implementation time

- Larger body font + line-height changes pagination. Verify the existing sample lesson still reads cleanly at desktop and iPhone widths.
- TOC depends on Astro 5's Markdown module exposing `getHeadings()` from `import.meta.glob` results. Confirm at implementation; if not directly available, a tiny adapter in `lessons.ts` solves it.
- Anchor links assume Astro's default heading-id auto-generation (it is on by default).
- `text-wrap: pretty` is well-supported but verify on iOS Safari at the polish PR's preview build.

## Verification at implementation time

- `npm run build` succeeds.
- Local preview (`npm run preview`) on desktop:
  - Homepage: hero copy reads correctly, lesson card has new layout, no `<dl>` row, `Library` heading is screen-reader-only.
  - Lesson page: no eyebrow, single metadata line, body type larger and more comfortable, headings have clear rhythm, TOC visible if approved.
  - Source-reference section uses new wording; URLs render as links, repo paths render as code.
- Mobile (iPhone Safari, post-deploy or DevTools device emulation):
  - Comfortable gutters and tap targets.
  - Body text larger than UI chrome.
  - TOC collapsed inside `<details>` if approved.
- DevTools focus traversal: every interactive element has a visible `:focus-visible` outline.
- Build output (`dist/`) inspected: links still base-prefixed correctly under `/my-personal-project/`.

## Files this plan would change at implementation time

- Modified: `src/pages/index.astro`
- Modified: `src/pages/lessons/[slug].astro`
- Modified: `src/styles/global.css`
- Modified (only if TOC is approved): `src/lib/lessons.ts`

Total: 3–4 modified files, 0 new files.
