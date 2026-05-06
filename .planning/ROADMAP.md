# Roadmap

## Phase 0: Planning Approval

Goal: lock the static/local-first v1 direction before implementation begins.

- Review and approve these updated planning files.
- Record the user's exact explanation-writing rules.
- Record the desired lesson structure.
- Record the desired material presentation rules.
- Record that quiz generation is out of scope for v1 and requires a separate future discussion.
- Choose a tech stack only after the roadmap and content rules are approved.

## Phase 1: Content Model Planning

Goal: define how prepared lessons live in the repository.

- Decide the prepared lesson file format.
- Decide where source materials and simplified lessons live.
- Decide required lesson metadata.
- Decide whether original source material appears in v1.
- Define the manual assistant-supported content preparation workflow.
- Create a content-authoring instruction file that any AI assistant can follow consistently.

Approved defaults:

- Source materials live in `content/sources/[lesson-slug]/`.
- Prepared lessons live in `content/lessons/[lesson-slug].md`.
- Prepared lessons use Markdown with YAML frontmatter.
- `sourceRef` allows one or more source references.
- Lesson status can be `draft` or `ready`.

## Phase 2: Project Foundation

Goal: create the reader foundation without adding runtime services.

- Use the approved Astro static foundation.
- Create the base project structure.
- Add basic development scripts.
- Add simple quality checks.
- Keep the app single-user and repository-content-based for v1.

Approved stack:

- Astro.
- Markdown content files.
- YAML frontmatter.
- Static build output.
- No backend.
- No database.
- No authentication.
- No runtime AI/API calls.
- No upload flow.
- Minimal CSS focused on reading comfort.
- No UI framework unless truly needed later.

## Phase 3: Repository Content Loading

Goal: load prepared lessons from repository files.

- Read prepared content files from the repository.
- Build a lesson list from prepared content and metadata.
- Handle missing or malformed prepared content clearly.
- Avoid runtime upload, runtime AI calls, and runtime file processing.
- Do not transform or summarize lessons inside the running app.

## Phase 4: Library

Goal: let the user browse prepared lessons.

- Show a library of available lessons.
- Display the approved lesson metadata.
- Let the user open a selected lesson.
- Keep the library focused on personal reading, not content management.
- Avoid dashboard and file-manager patterns.

## Phase 5: Reading View

Goal: make simplified lessons pleasant to read.

- Show the simplified lesson as the main content.
- Use the approved lesson structure.
- Keep source material hidden by default and available only as reference.
- Avoid side-by-side long document comparison in v1.
- Keep the layout clean and readable.
- Keep the design ready for later iPhone morning reading mode.
- Show suggested visuals as text sections when present, and support approved static SVG diagrams when they teach a concept.

## Phase 6: MVP QA

Goal: verify the static reader loop.

- Test that prepared repository lessons load correctly.
- Test that the library shows available lessons.
- Test that opening a lesson shows the simplified content.
- Test missing or malformed content states.
- Confirm there are no runtime AI calls, upload APIs, databases, authentication, or multi-user features.
- Confirm lesson preparation instructions preserve full meaning instead of producing short summaries.

## Later Roadmap

- Add iPhone-friendly morning reading mode.
- Add quiz generation only after a separate future discussion defines the quiz philosophy.
- Do not assume quiz style, quiz UI, or quiz data models before that discussion.
- Consider runtime AI generation only if explicitly approved later.
- Consider accounts only if multi-device sync becomes important.
