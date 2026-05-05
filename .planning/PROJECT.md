# Personal Learning Reader

## Vision

Build a personal learning web app that helps one person read prepared learning content in very simple English.

For v1, the app is a static or local-first personal learning reader. It does not call an AI API at runtime. It does not upload files. It does not process files inside the app.

The user adds learning materials manually as files inside the repository. Codex, Claude Code, or another coding assistant helps transform those materials into simplified learning content before the app reads them.

The app reads prepared content files from the repository and displays the simplified content in a clean reading interface.

## V1 Workflow

1. The user manually adds source learning materials to the repository.
2. A coding assistant helps create simplified learning content files from those materials.
3. The prepared content files are committed or kept in the repository.
4. The app reads the prepared content files.
5. The app shows a library of available materials.
6. The user opens one material and reads the simplified lesson.

## Content Model

Source materials live in `content/sources/[lesson-slug]/`.

Prepared lessons live in `content/lessons/[lesson-slug].md`.

Prepared lessons use Markdown with YAML frontmatter.

The `sourceRef` metadata field should allow one or more source references because one lesson may come from multiple source files.

Lesson status can be `draft` or `ready`.

A future content-authoring guide should explain how any AI assistant can transform source material into a prepared lesson.

## Learning Style

The explanation is not a summary tool.

The goal is not to shorten the source material aggressively. The goal is to re-explain the full source material in a much simpler way.

Core explanation rule:

- Preserve the full meaning of the original material.
- Cover all important ideas from the source.
- Do not skip important concepts just because they are difficult.
- Do not compress the material into a short summary.
- Transform the language and presentation so the material becomes easy to understand.

Target reader:

- Explain as if the reader is a smart 7-year-old child.
- Keep the writing simple, clear, and easy to follow.
- Do not make the writing childish or silly.
- Use the tone of a kind teacher explaining a hard idea simply.

Language:

- English only.
- Use simple words.
- Use short sentences.
- Use small paragraphs.
- Explain one idea at a time.

Depth:

- Make the explanation comprehensive.
- Include the full lesson, not just key points.
- Keep the original depth as much as possible while using simpler language.
- If the source has multiple sections, explain each section.

Jargon:

- Avoid jargon when possible.
- If a technical term is necessary, explain it immediately in very simple words.
- Use the format "Technical term: simple meaning." when helpful.

Examples:

- Use examples when they help understanding.
- Keep examples simple, practical, and easy to imagine.
- Prefer everyday examples.
- Use analogies only when they make the idea clearer.

Visual and creative learning aids:

- If the material would benefit from a drawing, diagram, table, flowchart, or visual explanation, the prepared lesson should include a suggested visual.
- The app may not generate visuals in v1.
- Prepared lesson content should still be able to describe a helpful visual.
- Add a "Suggested visual" section when useful, with a short description of the drawing, diagram, or chart.

Must avoid:

- Do not create short summaries only.
- Do not skip important parts of the source.
- Do not use academic language.
- Do not use dense paragraphs.
- Do not add unrelated ideas.
- Do not invent facts not present in the source.
- Do not make the explanation childish in a silly way.

Quiz philosophy is intentionally deferred.

Quiz generation is out of scope for v1. The future quiz philosophy will be defined later by the user in a separate discussion.

Do not assume the quiz style. Do not design quiz UI. Do not design quiz data models. Do not lock the roadmap into a specific quiz approach yet.

## Lesson Structure

Each prepared lesson should follow this structure from top to bottom:

1. Title
2. One-sentence big idea
3. Why this matters
4. Simple explanation
5. Step-by-step breakdown
6. Key terms
7. Tiny examples
8. Suggested visual
9. Common confusion
10. What you should remember
11. Optional next questions

The simplified explanation should be the main content.

The structure should feel complete, simple, and easy to read.

The structure should stay consistent across lessons.

If a section does not apply to a lesson, it can be omitted.

Do not force fake examples or fake visuals.

Do not add facts that are not in the source material.

Do not turn the lesson into a short summary.

## Material Presentation

The simplified lesson is the product and must be the main reading experience.

Library view:

- Show a clean list of prepared lessons.
- Each lesson card should show title, short description or big idea, source type if available, created or updated date if available, and status if needed.
- Keep the library simple and focused on reading.

Lesson reading view:

- Show the simplified lesson first.
- Make the reading view clean, calm, and easy to read.
- Use clear headings and comfortable spacing.
- Avoid clutter.
- Avoid dashboard-like design.
- Make the page feel like a reading app, not an admin panel.

Source material:

- Do not show the full source material by default.
- Keep source material available only as supporting reference.
- Show source material in a collapsed section or separate reference tab.
- Do not make the user compare two long documents side by side in v1.

Reading flow:

- Start with title, one-sentence big idea, and why this matters.
- Then show the full simplified lesson structure.
- Let the user scroll naturally from top to bottom.

Mobile readiness:

- Design for later iPhone browser use.
- Make text easy to read on a small screen.
- Keep buttons and sections from feeling cramped.
- Do not build a special morning reading mode yet.

Visual suggestions:

- If a lesson has a suggested visual, show it as a simple section in the lesson.
- The suggested visual can be text-only in v1.
- Do not generate images in v1.

Must avoid:

- Do not create a complex dashboard.
- Do not make the app feel like a file manager.
- Do not make source material dominate the page.
- Do not add editing tools in v1 unless absolutely necessary.
- Do not add upload UI, AI generation UI, or API controls in v1.

## Cross-Tool Content Authoring

A major goal is to create clear instructions that any AI coding or writing assistant can follow.

The same content preparation rules should work with Codex, Claude Code, ChatGPT, Gemini, or any AI tool that has access to the project folder.

The project should include a clear content-authoring instruction file so different AI tools can produce lessons in the same style and quality.

## MVP Goal

The first version should prove the reader loop:

1. Store prepared learning content in the repository.
2. Load prepared content into the app.
3. Show a library of available lessons.
4. Open a lesson.
5. Read the simplified explanation in a clean interface.

## Later Ideas

- Mobile-friendly morning reading mode for iPhone.
- Quiz generation only after the user defines the future quiz philosophy in a separate discussion.
- Runtime AI generation only if explicitly approved in a later version.

## Out Of Scope For V1

- OpenAI API integration.
- LLM API calls inside the app.
- Upload API.
- Runtime file processing.
- Database.
- Authentication.
- Multi-user features.
- Native iPhone app.
- Advanced quizzes.
- Payments.
- Voice or audio features.
- Complex spaced repetition.
- External integrations.

## Current Decision State

The product direction is updated: v1 is a static or local-first personal learning reader.

The Phase 2 foundation stack is approved.

The approved foundation stack is Astro with Markdown content files, YAML frontmatter, static build output, no backend, no database, no authentication, no runtime AI/API calls, no upload flow, and minimal CSS focused on reading comfort.

No Phase 3 repository content loading, Phase 4 library, or reading view work should be written until approved.

Quiz planning must remain deferred until the user starts a separate quiz discussion.
