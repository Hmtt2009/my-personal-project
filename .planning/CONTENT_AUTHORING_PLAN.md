# Plan: `CONTENT_AUTHORING.md`

## Location
Repo root: `/CONTENT_AUTHORING.md` — siblings with `README.md` and `AGENTS.md` so any AI assistant lands on it immediately when scanning the project.

## Audience & framing
- One short paragraph stating: written for any AI assistant (Codex, Claude Code, ChatGPT, Gemini, etc.) plus the human user.
- One short paragraph stating: lesson preparation happens **outside** the running app; the app only reads finished files. No runtime AI, no uploads, no DB.

## Proposed section outline

1. **Purpose** — what this guide is, when to use it.
2. **Workflow at a glance** — 5-step list:
   1. Drop source material into `content/sources/[lesson-slug]/`
   2. Pick a slug
   3. Create `content/lessons/[lesson-slug].md`
   4. Write frontmatter + lesson body
   5. Set status to `draft` while writing, `ready` when done
3. **Slug rules** — lowercase, kebab-case, ASCII, must match the source folder name and the lesson filename exactly.
4. **Where to place source material** — `content/sources/[lesson-slug]/`; one folder per lesson; multiple files allowed (PDFs, transcripts, notes); never edited by the assistant.
5. **Where to create the prepared lesson** — `content/lessons/[lesson-slug].md`; one Markdown file per lesson; must use YAML frontmatter.
6. **Required YAML frontmatter** — table listing every field, type, required/optional, example. Mirror exactly what `src/lib/lessons.ts` validates so writers don't trigger build errors:
   - `title` (string, required)
   - `bigIdea` (string, required)
   - `description` (string, optional)
   - `sourceType` (string, optional — e.g. "article", "book chapter", "video transcript")
   - `status` (`draft` | `ready`, required)
   - `createdAt` (ISO date string, optional)
   - `updatedAt` (ISO date string, optional)
   - `sourceRef` (non-empty array of strings, required)
   - Include a copy-pasteable frontmatter block.
7. **`sourceRef` rules** — must be an array even with one item; entries are repo-relative paths (e.g. `content/sources/photosynthesis/chapter-3.pdf`) or stable URLs; one lesson may cite multiple sources; never empty; never invented.
8. **Lesson structure (body)** — the 11-section order from `REQUIREMENTS.md`:
   1. Title (H1)
   2. One-sentence big idea
   3. Why this matters
   4. Simple explanation (the main content)
   5. Step-by-step breakdown
   6. Key terms
   7. Tiny examples
   8. Suggested visual
   9. Common confusion
   10. What you should remember
   11. Optional next questions
   - Note: sections may be omitted **only** when they don't apply; don't fabricate to fill them.
9. **Explanation-writing rules** — bulleted, copied faithfully from `PROJECT.md`:
   - Voice: kind teacher; reader is a smart 7-year-old; not childish/silly.
   - Language: English only, simple words, short sentences, small paragraphs, one idea at a time.
   - Depth: comprehensive, cover all important ideas, keep original depth.
   - Jargon: avoid; if needed, define inline as `Term: simple meaning.`
   - Examples: simple, everyday, easy to imagine; analogies only when they clarify.
10. **Preserving full meaning (not summarizing)** — explicit "do this / don't do this" pair:
    - DO: re-explain every important idea in simpler language.
    - DON'T: shorten, compress, skip hard parts, or produce a TL;DR.
    - Include a worked micro-example: a 3-sentence dense paragraph and the same idea re-explained simply across a few short sentences — to show "transformed, not shrunk."
11. **Suggesting visuals without generating images** — rules:
    - Add a "Suggested visual" section when a drawing/diagram/table/flowchart would help.
    - Describe the visual in plain text: what it shows, what the axes/labels/arrows mean.
    - Never generate, embed, or link to an image file in v1.
    - Skip the section when no visual would actually help — don't force it.
12. **Draft vs ready** — clear contract:
    - `draft`: in progress, may have placeholders, may be incomplete; still appears in the library (current behavior).
    - `ready`: full structure present, all rules followed, frontmatter complete, no placeholders, source references verified.
    - Promotion checklist (5–8 items) the assistant runs through before flipping `draft` → `ready`.
13. **What to avoid** — consolidated negative list:
    - Don't summarize aggressively.
    - Don't skip difficult concepts.
    - Don't invent facts not in the source.
    - Don't use academic or dense language.
    - Don't write childish/silly prose.
    - Don't generate images.
    - Don't add quizzes, quiz UI, or quiz data — quiz scope is deferred.
    - Don't modify app code while authoring content.
    - Don't add dependencies.
    - Don't change frontmatter field names (the build will fail).
14. **Full worked example** — one complete, short prepared lesson (frontmatter + all 11 sections, kept brief) the assistant can pattern-match on. Use a non-technical topic (e.g. "How rain forms") so it reads as a style template, not a domain template.
15. **Validation checklist** — a final "before you commit" checklist:
    - [ ] Slug matches folder + filename
    - [ ] Frontmatter fields present and correctly typed
    - [ ] `sourceRef` non-empty and points to real files/URLs
    - [ ] Status is `draft` or `ready`
    - [ ] All applicable structure sections present, in order
    - [ ] No invented facts, no summarization, no images
    - [ ] `npm run build` succeeds (catches frontmatter validation errors)

## Tone & length
- Plain English, short sentences (consistent with the lesson voice itself).
- Target ~250–400 lines total.
- Heavy use of bullets, short examples, and one full worked lesson at the end.

## Cross-references (no app changes)
- Link to `AGENTS.md` for repo-wide rules.
- Link to `.planning/PROJECT.md` and `.planning/REQUIREMENTS.md` as the source of truth (this file is the operational distillation).
- Mention `src/lib/lessons.ts` as the file that enforces frontmatter — useful so assistants understand *why* a field is required.

## Out of scope for this file
- App architecture, build instructions, deployment, dev scripts (belong in README).
- Quiz philosophy or quiz format (deferred per planning).
- Image generation pipelines.
- Any new frontmatter fields beyond what `lessons.ts` already validates.

---

**Risks / open questions before I write it:**
1. Should the worked example go in `CONTENT_AUTHORING.md` itself, or as a real lesson file at `content/lessons/example-how-rain-forms.md` that the guide references? (Real-file approach is more useful but adds a `ready` lesson to the library.)
2. Confirm: keep `createdAt` / `updatedAt` as **optional** in the guide (matching `lessons.ts`), or recommend them as required-by-convention?
3. Confirm: `sourceRef` entries — repo-relative paths only, or also allow external URLs?

Stopping here for your approval before drafting the file.
