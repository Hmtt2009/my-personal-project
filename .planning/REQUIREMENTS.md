# Requirements

## Product Requirements

### Repository-Based Materials

The user must add learning materials manually as files inside the repository.

Source materials must live in `content/sources/[lesson-slug]/`.

The app must not include a runtime upload flow in v1.

The app must not include a runtime paste-to-generate flow in v1.

### Assistant-Prepared Lessons

Codex, Claude Code, or another coding assistant may help transform source materials into simplified learning content files.

This transformation happens outside the running app.

The app must only read prepared content files from the repository.

Prepared lessons must live in `content/lessons/[lesson-slug].md`.

Prepared lessons must use Markdown with YAML frontmatter.

The `sourceRef` metadata field must allow one or more source references.

### Static Or Local-First Reader

The app must behave as a static or local-first personal reader.

The app must load prepared content files that already exist in the repository.

The app must not call an AI service at runtime.

The app must not process uploaded files at runtime.

The app must not require a database for v1.

### Library

The app must show a library of prepared learning materials.

The library should let the user identify saved lessons and open one lesson.

The library must be a clean list of prepared lessons.

Each lesson card should show:

- Title.
- Short description or big idea.
- Source type if available.
- Created or updated date if available.
- Status if needed, such as draft or ready.

The library must stay simple and focused on reading.

The library must not feel like a complex dashboard or file manager.

### Lesson Reading View

The app must show a clean reading interface for a selected prepared lesson.

The simplified content should be the main reading experience.

The simplified lesson must appear first and be the main content.

The reading view should feel clean, calm, and easy to read.

The reading view should use clear headings and comfortable spacing.

The reading view must avoid clutter and dashboard-like design.

The page should start with:

- Title.
- One-sentence big idea.
- Why this matters.

Then it should show the full simplified lesson structure.

The user should be able to scroll naturally from top to bottom.

### Source Material Reference

The app must not show the full source material by default.

The source material should be available only as a reference.

Source material may appear in a collapsed section or separate reference tab.

The simplified lesson must always be the primary view.

The app must not make the user compare two long documents side by side in v1.

### Mobile And iPhone Readiness

The design should work well on an iPhone browser later.

Text should be easy to read on a small screen.

Buttons and sections should not feel cramped.

This supports future morning reading mode.

The app must not build a special morning reading mode in v1.

### Visual Suggestions In The App

If a lesson has a suggested visual, show it as a simple section in the lesson.

The suggested visual can be text-only in v1.

The app must not generate images in v1.

The app must not require Mermaid, SVG, canvas, or generated-image rendering in v1.

### Prepared Lesson Structure

Each prepared lesson should follow this structure from top to bottom:

1. Title

The title must be clear and simple.

The title should describe what the lesson explains.

2. One-sentence big idea

Start with one very simple sentence that explains the main idea of the lesson.

This should answer: "What is this lesson really about?"

3. Why this matters

Explain why the topic matters in real life.

Keep it short and simple.

Help the reader understand why they should care.

4. Simple explanation

This is the main part of the lesson.

Re-explain the full source material in simple English.

Do not summarize too aggressively.

Cover the important ideas from the original material.

Break the explanation into small sections with clear headings.

Each section should explain one idea at a time.

Use short sentences and small paragraphs.

5. Step-by-step breakdown

When the topic has a process, sequence, logic, or workflow, explain it step by step.

Use numbered steps when helpful.

Make the order easy to follow.

6. Key terms

Include important terms from the source material.

Explain each term in very simple words.

Use the format "Term: simple meaning."

Only include terms that are truly useful.

7. Tiny examples

Add simple examples to make ideas easier to understand.

Use everyday examples when possible.

Examples should be easy to imagine.

Avoid complex or abstract examples unless necessary.

8. Suggested visual

If the lesson would benefit from a visual, add a "Suggested visual" section.

Describe what kind of drawing, diagram, chart, table, or flowchart would help.

The app does not need to generate the visual in v1.

This section is only a clear instruction for a future visual.

Use the standard fields Type, Purpose, Description, Labels, Layout idea, and What to notice when a visual is useful.

Skip this section when a visual would not improve understanding.

9. Common confusion

Add a short section explaining what people may misunderstand.

Keep it simple.

This should prevent wrong understanding.

10. What you should remember

End with a short recap.

This is not a replacement for the full lesson.

It should only remind the reader of the most important ideas.

11. Optional next questions

Add a few simple questions the reader can ask next to go deeper.

Do not build quizzes yet.

Do not design quiz UI.

Do not design quiz data models.

Do not assume the future quiz style.

These are only learning follow-up questions.

Structure rules:

- The simplified explanation should be the main content.
- The source material should not be the main reading experience.
- The structure should be consistent across all lessons.
- If a section does not apply to a lesson, it can be omitted.
- Do not force fake examples or fake visuals.
- Do not add facts that are not in the source material.
- Do not turn the lesson into a short summary.

### Learning Content Rules

The prepared lesson must not be a short summary.

The goal is to re-explain the full source material in simpler language while preserving the full meaning.

Core rules:

- Preserve the full meaning of the original material.
- Cover all important ideas from the source.
- Do not skip important concepts because they are difficult.
- Do not compress the material into a short summary.
- Transform the language and presentation so the material becomes easy to understand.

Target reader:

- Explain as if the reader is a smart 7-year-old child.
- Keep the writing simple, clear, and easy to follow.
- Do not make the writing childish or silly.
- Use the tone of a kind teacher explaining a hard idea simply.

Language rules:

- English only.
- Use simple words.
- Use short sentences.
- Use small paragraphs.
- Explain one idea at a time.

Depth rules:

- Make the explanation comprehensive.
- Include the full lesson, not just key points.
- Keep the original depth as much as possible while using simpler language.
- If the source has multiple sections, explain each section.

Jargon rules:

- Avoid jargon when possible.
- If a technical term is necessary, explain it immediately in very simple words.
- Use the format "Technical term: simple meaning." when helpful.

Example rules:

- Use examples when they help understanding.
- Keep examples simple, practical, and easy to imagine.
- Prefer everyday examples.
- Use analogies only when they make the idea clearer.

Visual aid rules:

- If a drawing, diagram, table, flowchart, or visual explanation would help, the prepared lesson should include a suggested visual.
- The app may not generate the visual in v1.
- The lesson content should still describe what visual should be created.
- Use a "Suggested visual" section when helpful.

The prepared lesson must avoid:

- Short summaries only.
- Skipping important parts of the source.
- Academic language.
- Dense paragraphs.
- Unrelated ideas.
- Invented facts not present in the source.
- Silly or childish wording.

### Cross-Tool Content Authoring

The project must include a clear content-authoring instruction file.

`CONTENT_AUTHORING.md` is the canonical guide for Codex, Claude Code, ChatGPT, Gemini, or another AI assistant to produce simplified lessons in the same style and quality.

The instruction file must explain that content preparation happens outside the running app.

The app must read and display prepared lesson files only.

The instruction file must require:

- Source inventory before writing.
- Source coverage pass before a lesson can be considered ready.
- New lessons to start as `draft`.
- User approval before marking a lesson `ready`.
- Real lessons to preferably reference concrete source files or stable URLs in `sourceRef`.

Build validation only verifies basic metadata, type, content loading, and static build errors. It does not guarantee full source coverage, lesson quality, or compliance with the writing philosophy.

## Non-Goals For V1

The first version must not include:

- OpenAI API integration.
- Runtime LLM API calls.
- Upload API.
- Runtime file processing.
- Database.
- Authentication.
- Multi-user accounts.
- Native iPhone app development.
- Advanced quiz flows.
- Quiz generation.
- Quiz UI.
- Quiz data models.
- Payment features.
- Voice or audio.
- Complex spaced repetition.
- External integrations.
- Editing tools unless absolutely necessary.
- Upload UI.
- AI generation UI.
- API controls.

## Resolved Product Decisions

- Prepared lessons use Markdown with YAML frontmatter.
- Prepared lessons live in `content/lessons/[lesson-slug].md`.
- Source materials live in `content/sources/[lesson-slug]/`.
- `sourceRef` is a non-empty array of one or more source references.
- Lesson status is `draft` or `ready`.
- The simplified lesson is the main reading experience.
- Source material is reference-only in v1.

## Future Quiz Direction

Quiz generation is out of scope for v1.

The future quiz philosophy will be defined later by the user.

Do not assume the quiz style.

Do not design quiz UI.

Do not design quiz data models.

Do not lock the roadmap into a specific quiz approach yet.

Quizzes should remain a future phase that requires a separate discussion before implementation.

## Technical Decisions Deferred

The following decisions are intentionally not made yet:

- Quiz philosophy.
- Quiz UI.
- Quiz data models.
- Runtime AI generation.
- Upload workflows.
- Any future backend or database needs.
