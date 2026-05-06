# CONTENT_AUTHORING.md

A guide for turning source material into a prepared lesson for the Personal Learning Reader.

This file is the canonical content-authoring guide for any AI assistant (Codex, Claude Code, ChatGPT, Gemini, or another tool with access to this repository) and for the human user. The goal is that any assistant following this guide produces lessons in the same style and quality.

Lesson preparation happens **outside** the running app. The app only reads finished Markdown files from `content/lessons/`. There is no runtime AI, no upload flow, no database, and no quiz system in v1. Do not change that while authoring content.

For repo-wide rules see `AGENTS.md`. For the full product intent see `.planning/PROJECT.md` and `.planning/REQUIREMENTS.md`.

Build validation is useful, but limited. The build checks basic metadata, type errors, content loading, and static route generation. It does **not** prove lesson quality, full source coverage, factual faithfulness, or compliance with the writing philosophy. Assistants must still perform the source inventory, source coverage pass, and writing-quality checks in this guide.

Content validation is available with `npm run validate:content`. It checks lesson filenames, frontmatter, source references, core sections, and the "Suggested visual" structure. It may print warnings for practical quality guardrails. Warnings mean "review this carefully." Errors mean the content breaks required structure or repository references and should be fixed before merging.

Content validation and build validation do not replace human lesson review. A lesson still needs source coverage review, writing-quality review, and explicit user approval before `status` can become `ready`.

`content/lessons/sample.md` is only a smoke test fixture for the content model and build. It is not a quality example and should not be copied as a lesson-writing pattern.

---

## 1. Purpose

Use this guide whenever you are asked to:

- Create a new prepared lesson from one or more source files.
- Update an existing prepared lesson.
- Promote a lesson from `draft` to `ready`.

Do not use this guide to:

- Add app features.
- Add or change frontmatter fields.
- Build quizzes or quiz UI.
- Generate images.
- Call an AI service from inside the app.

---

## 2. Workflow at a glance

1. Place source material in `content/sources/[lesson-slug]/`.
2. Pick a slug. Use the same slug for the source folder and the lesson file.
3. Inventory all relevant source files in that folder before writing.
4. Create the lesson file at `content/lessons/[lesson-slug].md`.
5. Write the YAML frontmatter and the lesson body.
6. Set `status: draft` while you write.
7. Run a source coverage pass before considering the lesson ready.
8. Set `status: ready` only when the user explicitly approves that promotion.

---

## 3. Slug rules

- Lowercase only.
- Kebab-case (use `-` between words, never spaces or underscores).
- ASCII letters, digits, and `-` only.
- Short, descriptive, and stable. The slug is part of the URL.
- The source folder name, the lesson filename, and the URL slug must all match exactly.

Examples:

- Good: `how-rain-forms`, `photosynthesis-basics`, `intro-to-fractions`
- Bad: `How Rain Forms`, `how_rain_forms`, `rain!`, `lesson1`

---

## 4. Where to place source material

- Path: `content/sources/[lesson-slug]/`
- One folder per lesson.
- Multiple files allowed: PDFs, transcripts, plain text notes, screenshots, exported web pages, etc.
- The assistant should read source files as input but should not edit them.
- Source files are not shown in the app reading view by default. They are reference only.

Source inventory step:

- List the files in the source folder before writing.
- Read all relevant text or Markdown files in the source folder.
- Identify which files were used.
- If a file is skipped, note why.
- Do not create the prepared lesson until the relevant source material has been reviewed.

---

## 5. Where to create the prepared lesson

- Path: `content/lessons/[lesson-slug].md`
- One Markdown file per lesson.
- Must start with a YAML frontmatter block.
- The body must be plain Markdown that follows the lesson structure in section 8.

---

## 6. Required YAML frontmatter

These fields are used by the app and checked by `npm run validate:content`. The core app loader in `src/lib/lessons.ts` also validates the fields it needs to build pages. Do not invent new fields. Do not rename existing fields. Renaming or removing required fields will fail the build or content validation; extra fields are not part of the approved v1 content model.

| Field        | Type                       | Required | Notes                                                                 |
| ------------ | -------------------------- | -------- | --------------------------------------------------------------------- |
| `title`      | string                     | Yes      | Clear, simple, describes what the lesson explains.                    |
| `bigIdea`    | string                     | Yes      | One sentence. The single main point of the lesson.                    |
| `description`| string                     | Yes      | Short library-card description. Required by content validation.       |
| `sourceType` | string                     | No       | Free text. Examples: `article`, `book chapter`, `video transcript`.   |
| `status`     | `"draft"` or `"ready"`     | Yes      | Only these two values are accepted.                                   |
| `createdAt`  | string (ISO date)          | No       | Optional, but recommended by convention. Example: `2026-05-05`.       |
| `updatedAt`  | string (ISO date)          | No       | Optional, but recommended by convention. Update when you edit.        |
| `sourceRef`  | array of strings           | Yes      | Non-empty. Each entry is a repo-relative path or a stable URL.        |

Copy-paste template:

```yaml
---
title: "Lesson title in plain English"
bigIdea: "One simple sentence that captures the whole lesson."
description: "Short library-card description."
sourceType: "article"
status: "draft"
createdAt: "2026-05-05"
updatedAt: "2026-05-05"
sourceRef:
  - "content/sources/lesson-slug/source-file.pdf"
---
```

Convention notes:

- `createdAt` and `updatedAt` are optional in the schema, but you should include them for real lessons.
- Update `updatedAt` whenever the lesson body or frontmatter changes meaningfully.
- Use ISO date format (`YYYY-MM-DD`).
- The app build can load lessons without `description`, but `npm run validate:content` requires it so library cards stay useful and consistent.

---

## 7. `sourceRef` rules

- Must be a YAML array, even when there is only one source.
- Must contain at least one entry.
- Every entry must be a non-empty string.
- An entry must be either:
  - A repo-relative path, such as `content/sources/photosynthesis/chapter-3.pdf`, or
  - A stable external URL, such as `https://example.org/long-form-article`.
- Use repo-relative paths when the source file lives in this repository. Use a URL only when the source is external and stable.
- For real lessons, prefer concrete source files or stable URLs. Avoid folder-only references unless the source is intentionally treated as one documented bundle.
- One lesson may cite multiple sources. List every source you actually used.
- Never invent a source. Never list a file that does not exist.

Examples:

```yaml
sourceRef:
  - "content/sources/how-rain-forms/textbook-chapter.pdf"
  - "content/sources/how-rain-forms/lecture-notes.md"
```

```yaml
sourceRef:
  - "https://example.org/articles/how-rain-forms"
```

```yaml
sourceRef:
  - "content/sources/how-rain-forms/textbook-chapter.pdf"
  - "https://example.org/articles/how-rain-forms"
```

---

## 8. Lesson structure (body)

Each prepared lesson follows this order from top to bottom. Use Markdown headings for the section titles.

1. **Title** — `# Title`. Same wording as the `title` frontmatter field.
2. **One-sentence big idea** — A single short sentence. Same idea as `bigIdea`.
3. **Why this matters** — Why the reader should care. Short and concrete.
4. **Simple explanation** — The main content. Re-explain the source material in simple English. Use small subheadings if needed. This section is the heart of the lesson.
5. **Step-by-step breakdown** — When the topic has a process, sequence, or workflow, walk through it in numbered steps.
6. **Key terms** — Important terms from the source. Use the format `Term: simple meaning.` Only include terms that are actually useful.
7. **Tiny examples** — Small, everyday examples that make the idea easier to picture.
8. **Suggested visual** — A plain-text Visual Spec for a drawing, diagram, table, or chart that would help. A lesson may also include approved static SVG diagrams near the related explanation, using the rules in section 11.
9. **Common confusion** — What people often misunderstand, and the correct way to think about it.
10. **What you should remember** — A short recap of the most important points. Not a replacement for the full lesson.
11. **Optional next questions** — A few follow-up questions the reader could explore later. Plain questions only. Not quiz items.

Section rules:

- Keep the order consistent across lessons.
- Sections may be omitted **only** when they genuinely do not apply.
- Do not invent fake steps, fake examples, fake terms, or fake visuals just to fill a section.
- The "Simple explanation" section should always be present and should always be the largest part of the lesson.

---

## 9. Explanation-writing rules

Voice:

- Write like a kind teacher explaining a hard idea simply.
- Imagine the reader is a smart 7-year-old child.
- Do not be childish or silly.

Language:

- English only.
- Use simple words.
- Use short sentences.
- Use small paragraphs.
- Explain one idea at a time.

Depth:

- Be comprehensive. Cover all important ideas from the source.
- Keep the original depth as much as possible while using simpler language.
- If the source has multiple sections, explain each section.

Jargon:

- Avoid jargon when possible.
- If a technical term is necessary, define it inline using the format `Term: simple meaning.`

Examples:

- Use examples when they help understanding.
- Prefer simple, everyday examples.
- Use analogies only when they make the idea clearer.

---

## 10. Preserving full meaning (not summarizing)

The prepared lesson is **not** a summary. It is a full re-explanation in simpler language.

DO:

- Re-explain every important idea from the source.
- Cover difficult parts using simpler words and shorter sentences.
- Break long arguments into a sequence of small, clear steps.
- Keep the same conclusions as the source.

DON'T:

- Compress the material into a short summary.
- Skip a concept because it is hard.
- Drop sections of the source because they are long.
- Add new facts or claims that are not in the source.

Worked micro-example:

Original (dense):

> Photosynthesis is the biochemical process whereby chlorophyll-bearing organisms convert solar radiation into chemical energy stored in glucose, releasing oxygen as a byproduct of the light-dependent reactions.

Bad rewrite (a summary, too short):

> Plants turn sunlight into food.

Good rewrite (transformed, not shrunk):

> Plants need food to grow, just like you do.
>
> They make their own food using sunlight.
>
> Inside their leaves, plants have a green color called chlorophyll. Chlorophyll catches sunlight, like a tiny solar panel.
>
> The plant uses the light to turn water and air into a kind of sugar called glucose. The plant uses that sugar as food.
>
> While the plant is doing this, it also lets out oxygen into the air. Oxygen is the gas we breathe.

The good rewrite keeps every idea: chlorophyll, sunlight, glucose, water and air as inputs, oxygen as output. It only changes the language.

---

## 11. Static visuals and suggested visuals

The app does not generate images in v1. When a visual would clearly help understanding, use static, hand-authored SVG files stored in the repository.

Static visual asset path:

```text
public/visuals/[lesson-slug]/[visual-name].svg
```

Naming rules:

- Use the same lesson slug as the source folder and lesson file.
- Use lowercase kebab-case filenames.
- Use clear names, such as `rag-pipeline.svg`, `vector-search-map.svg`, or `agent-workflow.svg`.
- Do not use external image URLs.
- Do not use generated image APIs.
- Do not require Mermaid, MDX, canvas, or a diagram rendering system in v1.

How to reference a static visual in lesson Markdown:

```markdown
![Short alt text that explains the diagram](/my-personal-project/visuals/[lesson-slug]/[visual-name].svg)

*Diagram: One short sentence explaining what the reader should notice.*
```

Use the `/my-personal-project/visuals/...` path because this repository is built for GitHub Pages with that Astro base path.

Place diagrams near the explanation they support. Do not place every diagram at the end of the lesson. The reader should see the visual while reading the related idea.

Visual quality rules:

- A visual must teach, not decorate.
- Use simple boxes, arrows, labels, comparisons, timelines, or flows.
- Keep labels short and readable.
- Match the app style: warm neutral background, charcoal text, pale borders, and deep sage or ink accents.
- Keep visuals calm and adult. Do not make them childish or playful.
- Make visuals useful on iPhone. Avoid tiny labels and crowded layouts.
- Add a short caption under every static visual.

Skip a static visual when:

- The idea is already easy to understand without it.
- The visual would repeat the text without adding clarity.
- You would need to invent details that are not grounded in the source.
- The visual would become too dense to read comfortably.

Use one heading for the plain-text Visual Spec:

```markdown
## Suggested visual
```

When to add a "Suggested visual" section:

- The lesson has a process, a comparison, a structure, or relationships between parts.
- A reader would understand the idea more easily if they could see it.
- The visual teaches the idea instead of decorating the page.
- The lesson needs a future visual idea, or you want to document the intent behind the static visuals.

Skip the section when:

- The idea is already easy to understand without a visual.
- The visual would repeat the text without adding clarity.
- You would need to invent visual details not grounded in the source.

How to write the section:

- `Type`: The kind of visual, such as drawing, diagram, table, chart, timeline, or flowchart.
- `Purpose`: What the visual helps the reader understand.
- `Description`: What the visual shows.
- `Labels`: The labels, axes, arrows, boxes, or rows and columns.
- `Layout idea`: How the parts should be arranged.
- `What to notice`: The main thing the reader should learn from looking at it.

What not to do:

- Do not generate images.
- Do not link to external image URLs.
- Do not require Mermaid, canvas, or another diagram system in v1.
- Do not add a "Suggested visual" section just to fill the structure. Skip it when no visual would help.

Example:

> **Suggested visual**
>
> Type: Simple process diagram.
>
> Purpose: Show what a leaf takes in and what it gives out.
>
> Description: A simple diagram of a leaf with arrows moving in and out.
>
> Labels:
>
> - "Sunlight" points down onto the leaf.
> - "Water" points up from the roots into the leaf.
> - "Air (carbon dioxide)" points into the leaf from the side.
> - "Oxygen" points out of the leaf back into the air.
>
> Layout idea: Put the leaf in the center. Put the incoming arrows on the left and top. Put the outgoing oxygen arrow on the right.
>
> What to notice: The leaf takes in three things and gives one thing back.

---

## 12. Draft vs ready

`draft`:

- The lesson is in progress.
- It may be incomplete or contain placeholders.
- It still appears in the library (this matches current app behavior).
- Use `draft` while writing or revising.

`ready`:

- The lesson is complete and follows every rule in this guide.
- Frontmatter is complete and valid.
- Source references point to real files or real URLs.
- No placeholders, no TODOs, no invented facts.
- The user has explicitly approved marking the lesson as ready.

An assistant may prepare a ready candidate, but it must keep `status: draft` until the user explicitly says to mark that lesson `ready`.

Promotion checklist (run before flipping `draft` to `ready`):

- [ ] All required frontmatter fields are present and valid.
- [ ] `sourceRef` lists every source actually used, and every entry resolves.
- [ ] A source inventory was completed.
- [ ] A source coverage pass was completed.
- [ ] All applicable structure sections are present and in the correct order.
- [ ] The "Simple explanation" section covers every important idea from the source.
- [ ] No section is filled with fake content just to satisfy the structure.
- [ ] No new facts have been invented.
- [ ] Voice and language rules are followed throughout.
- [ ] `updatedAt` reflects the current date.
- [ ] The user explicitly approved the `ready` status.

Source coverage pass:

- Compare the source headings and major claims against the prepared lesson.
- Confirm that every important idea is represented in simple language.
- Confirm that difficult ideas were explained, not skipped.
- Confirm that examples and analogies support the source meaning.
- Remove unsupported claims or clearly flag uncertainty.
- Do not mark the lesson ready if important source ideas are missing.

---

## 13. What to avoid

- Do not summarize aggressively.
- Do not skip difficult concepts.
- Do not invent facts that are not in the source.
- Do not use academic or dense language.
- Do not write in a childish or silly tone.
- Do not generate images.
- Do not link to external images.
- Do not add decorative images that do not teach.
- Do not add quizzes, quiz UI, or quiz data. Quiz scope is deferred.
- Do not modify app code while authoring content.
- Do not add dependencies.
- Do not add or rename frontmatter fields. Renaming required fields will fail the build; extra fields are not approved for v1.
- Do not edit the source files in `content/sources/`.

---

## 14. Full worked example

The following is a complete, short prepared lesson. It is shown here only as a style and structure template. Do not copy it into `content/lessons/` — it is not a real lesson and should not appear in the app library.

The real `content/lessons/sample.md` file is different. It exists only as a smoke test fixture for the app and build, not as a quality example.

````markdown
---
title: "How Rain Forms"
bigIdea: "Rain happens when tiny water drops in clouds join together and become heavy enough to fall."
description: "A simple explanation of where rain comes from."
sourceType: "article"
status: "ready"
createdAt: "2026-05-05"
updatedAt: "2026-05-05"
sourceRef:
  - "content/sources/how-rain-forms/article.md"
---

# How Rain Forms

## One-sentence big idea

Rain happens when tiny water drops in clouds join together and become heavy enough to fall.

## Why this matters

Rain gives plants water to grow. It fills rivers and lakes. It is one of the main ways water moves around the Earth.

## Simple explanation

Water is always moving. It moves between the ground, the air, and the clouds. This movement is called the water cycle.

The Sun warms water in oceans, lakes, and rivers. Some of that water turns into a gas called water vapor. Water vapor floats up into the sky. We cannot see it.

High in the sky the air is colder. The cold air turns the water vapor back into tiny water drops. Many tiny drops together look like a cloud.

Inside a cloud, the tiny drops bump into each other. When they bump, they stick together. They make bigger drops.

When a drop becomes too heavy for the air to hold, it falls. We call the falling drops rain.

## Step-by-step breakdown

1. The Sun warms water on Earth.
2. Some water turns into water vapor and rises into the sky.
3. The cold air high up turns the vapor back into tiny drops.
4. Many tiny drops together form a cloud.
5. Drops bump and join into bigger drops.
6. When a drop is too heavy, it falls as rain.

## Key terms

- Water vapor: water in the form of a gas.
- Cloud: a group of many tiny water drops floating in the sky.
- Water cycle: the way water moves between the ground, the sky, and back again.

## Tiny examples

- A glass of cold water on a hot day gets wet on the outside. The water vapor in the warm air touches the cold glass and turns back into drops.
- After a hot shower, you can see fog on the bathroom mirror. That is water vapor turning back into tiny drops on the cold glass.

## Suggested visual

Type: Loop diagram.

Purpose: Show that rain is part of a repeating cycle.

Description: A simple loop drawing of the water cycle.

Labels:

- "Evaporation" on an arrow going up from a lake.
- "Cloud" at the top of the loop.
- "Rain" on an arrow going down from the cloud back to the lake.

Layout idea: Put the lake at the bottom, the cloud at the top, and two curved arrows connecting them.

What to notice: The water keeps moving in a circle.

## Common confusion

Some people think clouds are made of water vapor. They are not. Water vapor is invisible. A cloud is made of many tiny liquid water drops that we can see.

## What you should remember

- Rain comes from clouds.
- Clouds are made of many tiny water drops.
- When the drops join and become too heavy, they fall as rain.
- Water keeps moving between the ground and the sky.

## Optional next questions

- Why does it sometimes snow instead of rain?
- Why are some clouds dark and some clouds white?
- Where does the water go after the rain falls?
````

---

## 15. Validation checklist

Before you finish, confirm each item:

- [ ] Slug matches the source folder name and the lesson filename.
- [ ] Every required frontmatter field is present and the type is correct.
- [ ] `status` is exactly `draft` or `ready`.
- [ ] `sourceRef` is a non-empty array; every entry is a repo-relative path or a stable URL, and every entry resolves.
- [ ] All applicable structure sections are present and in order.
- [ ] The "Simple explanation" section covers every important idea from the source.
- [ ] No facts have been invented.
- [ ] No images have been generated or linked from external sources.
- [ ] Any static SVG visuals live in `public/visuals/[lesson-slug]/` and are referenced from the lesson Markdown.
- [ ] Any "Suggested visual" section uses Type, Purpose, Description, Labels, Layout idea, and What to notice.
- [ ] No quiz content has been added.
- [ ] No app code, dependencies, or frontmatter fields have been changed.
- [ ] `npm run validate:content` succeeds. Fix errors before merging. Review warnings carefully.
- [ ] `npm run build` succeeds.

Remember: the build only catches basic metadata, type, content loading, and static build errors. It does not prove source coverage or lesson quality.
