import type { MarkdownHeading, MarkdownInstance } from "astro";

type LessonStatus = "draft" | "ready";

type LessonFrontmatter = {
  title?: unknown;
  bigIdea?: unknown;
  description?: unknown;
  sourceType?: unknown;
  status?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
  sourceRef?: unknown;
};

type MarkdownLessonModule = MarkdownInstance<LessonFrontmatter>;

export type LessonMetadata = {
  title: string;
  bigIdea: string;
  description?: string;
  sourceType?: string;
  status: LessonStatus;
  createdAt?: string;
  updatedAt?: string;
  sourceRef: string[];
};

export type LessonListItem = LessonMetadata & {
  slug: string;
};

export type LessonDetail = LessonListItem & {
  Content: MarkdownLessonModule["Content"];
  headings: MarkdownHeading[];
};

const lessonModules = import.meta.glob<MarkdownLessonModule>(
  "/content/lessons/*.md",
  { eager: true }
);

export function getAllLessons(): LessonListItem[] {
  return Object.entries(lessonModules)
    .map(([path, module]) => buildLessonListItem(path, module.frontmatter))
    .sort(sortLessonsNewestFirst);
}

export function getReadyLessons(): LessonListItem[] {
  return getAllLessons().filter((lesson) => lesson.status === "ready");
}

export function getAllLessonDetails(): LessonDetail[] {
  return Object.entries(lessonModules)
    .map(([path, module]) => ({
      ...buildLessonListItem(path, module.frontmatter),
      Content: module.Content,
      headings: module.getHeadings()
    }))
    .sort(sortLessonsNewestFirst);
}

export function getLessonBySlug(slug: string): LessonDetail | undefined {
  return getAllLessonDetails().find((lesson) => lesson.slug === slug);
}

function buildLessonListItem(
  path: string,
  frontmatter: LessonFrontmatter
): LessonListItem {
  const slug = getSlugFromPath(path);

  return {
    slug,
    title: requireString(frontmatter.title, "title", slug),
    bigIdea: requireString(frontmatter.bigIdea, "bigIdea", slug),
    description: optionalString(frontmatter.description, "description", slug),
    sourceType: optionalString(frontmatter.sourceType, "sourceType", slug),
    status: requireStatus(frontmatter.status, slug),
    createdAt: optionalString(frontmatter.createdAt, "createdAt", slug),
    updatedAt: optionalString(frontmatter.updatedAt, "updatedAt", slug),
    sourceRef: requireStringArray(frontmatter.sourceRef, "sourceRef", slug)
  };
}

function getSlugFromPath(path: string): string {
  const filename = path.split("/").at(-1);

  if (!filename?.endsWith(".md")) {
    throw new Error(`Unable to derive lesson slug from path: ${path}`);
  }

  return filename.slice(0, -".md".length);
}

function requireString(value: unknown, field: string, slug: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Lesson "${slug}" is missing required "${field}" metadata.`);
  }

  return value;
}

function optionalString(
  value: unknown,
  field: string,
  slug: string
): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new Error(`Lesson "${slug}" has invalid "${field}" metadata.`);
  }

  return value;
}

function requireStatus(value: unknown, slug: string): LessonStatus {
  if (value === "draft" || value === "ready") {
    return value;
  }

  throw new Error(
    `Lesson "${slug}" must have status metadata set to "draft" or "ready".`
  );
}

function requireStringArray(
  value: unknown,
  field: string,
  slug: string
): string[] {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || item.trim() === "")
  ) {
    throw new Error(
      `Lesson "${slug}" must have "${field}" metadata as a non-empty string array.`
    );
  }

  return value;
}

function sortLessonsNewestFirst(a: LessonListItem, b: LessonListItem): number {
  const aTime = getSortTime(a.updatedAt) || getSortTime(a.createdAt);
  const bTime = getSortTime(b.updatedAt) || getSortTime(b.createdAt);

  return bTime - aTime || a.title.localeCompare(b.title);
}

function getSortTime(value: string | undefined): number {
  if (!value) {
    return 0;
  }

  const time = Date.parse(value);

  return Number.isNaN(time) ? 0 : time;
}
