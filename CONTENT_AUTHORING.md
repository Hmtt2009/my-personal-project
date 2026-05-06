# CONTENT_AUTHORING.md

A guide for turning source material into a prepared lesson for the Personal Learning Reader.

This file is written for any AI assistant (Codex, Claude Code, ChatGPT, Gemini, or another tool with access to this repository) and for the human user. The goal is that any assistant following this guide produces lessons in the same style and quality.

Lesson preparation happens **outside** the running app. The app only reads finished Markdown files from `content/lessons/`. There is no runtime AI, no upload flow, no database, and no quiz system in v1. Do not change that while authoring content.

For repo-wide rules see `AGENTS.md`. For the full product intent see `.planning/PROJECT.md` and `.planning/REQUIREMENTS.md`. The frontmatter fields described here are enforced at build time by `src/lib/lessons.ts` — if a required field is missing or has the wrong type, the build will fail.

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
- Generate or embed images.
- Call an AI service from inside the app.

---

## 2. Workflow at a glance

1. Place source material in `content/sources/[lesson-slug]/`.
2. Pick a slug. Use the same slug for the source folder and the lesson file.
3. Read all relevant source files in the source folder before writing.
4. Create the lesson file at `content/lessons/[lesson-slug].md`.
5. Write the YAML frontmatter and the lesson body.
6. Set `status: draft` while you write.
7. Set `status: ready` only when the user explicitly approves the lesson as ready.

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
- `raw.txt` is recommended for the main text source, but it is not mandatory.
- A source folder may contain one file or many files.
- Multiple text or Markdown source files are allowed, such as `raw.txt`, `notes.md`, `part-1.txt`, or `reference.md`.
- Other source formats may be present as reference material, but v1 content preparation should stay manual and assistant-supported.
- The assistant must read all relevant files in the source folder before creating or updating the prepared lesson.
- The assistant should read source files as input but should not edit them unless the user explicitly asks.
- Source files are not shown in the app reading view by default. They are reference only.

---

## 5. Where to create the prepared lesson

- Path: `content/lessons/[lesson-slug].md`
- One Markdown file per lesson.
- Must start with a YAML frontmatter block.
- The body must be plain Markdown that follows the lesson structure in section 8.

---

## 6. Required YAML frontmatter

These fields are validated by `src/lib/lessons.ts`. Do not invent new fields. Do not rename existing fields.

| Field        | Type                       | Required | Notes                                                                 |
| ------------ | -------------------------- | -------- | --------------------------------------------------------------------- |
| `title`      | string                     | Yes      | Clear, simple, describes what the lesson explains.                    |
| `bigIdea`    | string                     | Yes      | One sentence. The single main point of the lesson.                    |
| `description`| string                     | No       | Short library-card description. Optional but useful.                  |
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

---

## 7. `sourceRef` rules

- Must be a YAML array, even when there is only one source.
- Must contain at least one entry.
- Every entry must be a non-empty string.
- An entry must be either:
  - A repo-relative path, such as `content/sources/photosynthesis/chapter-3.pdf`, or
  - A stable external URL, such as `https://example.org/long-form-article`.
- Use repo-relative paths when the source file lives in this repository. Use a URL only when the source is external and stable.
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
8. **Suggested visual** — A plain-text description of a drawing, diagram, table, or chart that would help. Text only. No image files.
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

## 11. Visual specs without generating images

For v1, do not generate images.

Do not assume the app can render advanced diagrams yet.

Visuals are described in Markdown as clear instructions for later rendering or generation. Prefer a `Suggested visual` or `Visual Spec` section written in plain Markdown.

When to add a "Suggested visual" section:

- The lesson has a process, a comparison, a structure, or relationships between parts.
- A reader would understand the idea more easily if they could see it.

How to write the section:

- **Type of visual:** drawing, diagram, table, chart, flowchart, timeline, map, or other simple format.
- **Purpose:** what the visual helps the reader understand.
- **Description:** what the visual shows.
- **Labels:** labels, axes, arrows, rows, columns, or callouts.
- **Layout idea:** how the parts should be arranged.
- **What to notice:** the main idea the reader should see.

What not to do:

- Do not generate, embed, or link to image files.
- Do not link to external image URLs.
- Do not require Mermaid or any other diagram syntax for v1.
- Mention Mermaid only if the user specifically requests Mermaid later.
- Do not add a "Suggested visual" section just to fill the structure. Skip it when no visual would help.

Example:

> ## Suggested visual
>
> **Type of visual:** Simple labeled diagram.
>
> **Purpose:** Show what a leaf takes in and gives out during photosynthesis.
>
> **Description:** Draw a leaf in the middle with arrows going in and out.
>
> **Labels:**
> - Sunlight
> - Water
> - Air (carbon dioxide)
> - Oxygen
>
> **Layout idea:** Put the leaf in the center. Put sunlight above it. Put water below it. Put air on the left. Put oxygen leaving on the right.
>
> **What to notice:** The leaf takes in three things and gives one thing back.

---

## 12. Draft vs ready

`draft`:

- The lesson is in progress.
- It may be incomplete or contain placeholders.
- It still appears in the library (this matches current app behavior).
- Use `draft` while writing or revising.

`ready`:

- The lesson is complete and follows every rule in this guide.
- The user explicitly approved marking it as ready.
- Frontmatter is complete and valid.
- Source references point to real files or real URLs.
- No placeholders, no TODOs, no invented facts.

Promotion checklist (run before flipping `draft` to `ready`, and only after explicit user approval):

- [ ] All required frontmatter fields are present and valid.
- [ ] `sourceRef` lists every source actually used, and every entry resolves.
- [ ] All applicable structure sections are present and in the correct order.
- [ ] The "Simple explanation" section covers every important idea from the source.
- [ ] No section is filled with fake content just to satisfy the structure.
- [ ] No new facts have been invented.
- [ ] Voice and language rules are followed throughout.
- [ ] `updatedAt` reflects the current date.

Ready lesson safety:

- Do not mark a new lesson as `ready` unless the user explicitly approves it.
- Do not overwrite or heavily rewrite an existing `ready` lesson unless the user explicitly asks.
- If the user asks for small edits to a `ready` lesson, keep the change narrow and preserve the approved structure.

---

## 13. What to avoid

- Do not summarize aggressively.
- Do not skip difficult concepts.
- Do not invent facts that are not in the source.
- Do not use academic or dense language.
- Do not write in a childish or silly tone.
- Do not generate, embed, or link to images.
- Do not add quizzes, quiz UI, or quiz data. Quiz scope is deferred.
- Do not modify app code while authoring content.
- Do not add dependencies.
- Do not add or rename frontmatter fields. The build will fail.
- Do not edit the source files in `content/sources/`.
- Do not mark a lesson as `ready` without explicit user approval.
- Do not overwrite or heavily rewrite an existing `ready` lesson without explicit user approval.
- Do not require Mermaid, image generation, or advanced diagram rendering for v1.

---

## 14. Full worked example

The following is a complete, short prepared lesson. It is shown here only as a style and structure template. Do not copy it into `content/lessons/` — it is not a real lesson and should not appear in the app library.

````markdown
---
title: "How Rain Forms"
bigIdea: "Rain happens when tiny water drops in clouds join together and become heavy enough to fall."
description: "A simple explanation of where rain comes from."
sourceType: "article"
status: "draft"
createdAt: "2026-05-05"
updatedAt: "2026-05-05"
sourceRef:
  - "content/sources/how-rain-forms/article.md"
---

# How Rain Forms

## Big idea

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

A simple loop drawing of the water cycle:

- An arrow labeled "Evaporation" goes up from a lake.
- A cloud sits at the top.
- An arrow labeled "Rain" goes down from the cloud back to the lake.

The reader should notice that the water keeps moving in a circle.

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
- [ ] New lessons start as `draft` unless the user explicitly approved `ready`.
- [ ] `sourceRef` is a non-empty array; every entry is a repo-relative path or a stable URL, and every entry resolves.
- [ ] All applicable structure sections are present and in order.
- [ ] The "Simple explanation" section covers every important idea from the source.
- [ ] No facts have been invented.
- [ ] No images have been generated, embedded, or linked.
- [ ] No quiz content has been added.
- [ ] No app code, dependencies, or frontmatter fields have been changed.
- [ ] `npm run build` succeeds. The build will catch frontmatter validation errors.
