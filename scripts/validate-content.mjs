import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const lessonsDir = path.join(rootDir, "content", "lessons");
const sourcesDir = path.join(rootDir, "content", "sources");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const requiredFrontmatter = [
  "title",
  "bigIdea",
  "description",
  "status",
  "sourceRef"
];
const requiredSections = [
  "Why this matters",
  "Simple explanation",
  "What you should remember"
];
const recommendedSections = [
  "Key terms",
  "Tiny examples",
  "Suggested visual",
  "Common confusion"
];
const visualSpecFields = [
  "Type",
  "Purpose",
  "Description",
  "Labels",
  "Layout idea",
  "What to notice"
];

const findings = [];

async function main() {
  runPathSafetySelfCheck();

  const lessonFiles = await getLessonFiles();

  if (lessonFiles.length === 0) {
    addFinding("error", "content/lessons", "No prepared lesson files found.");
  }

  for (const file of lessonFiles) {
    await validateLesson(file);
  }

  reportFindings();
}

async function getLessonFiles() {
  const entries = await readdir(lessonsDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(lessonsDir, entry.name))
    .sort();
}

async function validateLesson(file) {
  const relativeFile = toRepoPath(file);
  const filename = path.basename(file);
  const slug = filename.slice(0, -".md".length);
  const text = await readFile(file, "utf8");
  const isSampleFixture = slug === "sample";

  if (!slugPattern.test(slug)) {
    addFinding(
      "error",
      relativeFile,
      "Filename slug must be lowercase kebab-case using letters, numbers, and hyphens."
    );
  }

  const parsed = parseMarkdownLesson(text);

  if (!parsed) {
    addFinding("error", relativeFile, "Lesson is missing YAML frontmatter.");
    return;
  }

  const { frontmatter, body } = parsed;

  validateFrontmatter(frontmatter, relativeFile);
  await validateSourceRefs(frontmatter.sourceRef, relativeFile, slug);
  validateBody(body, relativeFile, isSampleFixture);
}

function validateFrontmatter(frontmatter, relativeFile) {
  for (const field of requiredFrontmatter) {
    if (frontmatter[field] === undefined) {
      addFinding("error", relativeFile, `Missing required frontmatter field "${field}".`);
    }
  }

  for (const field of ["title", "bigIdea", "description"]) {
    const value = frontmatter[field];

    if (value !== undefined && !isNonEmptyString(value)) {
      addFinding("error", relativeFile, `"${field}" must be a non-empty string.`);
    }
  }

  if (frontmatter.status !== undefined && !["draft", "ready"].includes(frontmatter.status)) {
    addFinding("error", relativeFile, `"status" must be either "draft" or "ready".`);
  }

  if (
    frontmatter.sourceRef !== undefined &&
    (!Array.isArray(frontmatter.sourceRef) ||
      frontmatter.sourceRef.length === 0 ||
      frontmatter.sourceRef.some((item) => !isNonEmptyString(item)))
  ) {
    addFinding("error", relativeFile, `"sourceRef" must be a non-empty array of strings.`);
  }

  for (const field of ["createdAt", "updatedAt"]) {
    const value = frontmatter[field];

    if (value !== undefined && (!isNonEmptyString(value) || !looksLikeIsoDate(value))) {
      addFinding("error", relativeFile, `"${field}" must look like an ISO date: YYYY-MM-DD.`);
    }
  }
}

async function validateSourceRefs(sourceRef, relativeFile, slug) {
  if (!Array.isArray(sourceRef)) {
    return;
  }

  for (const ref of sourceRef) {
    if (!isNonEmptyString(ref)) {
      continue;
    }

    if (isExternalUrl(ref)) {
      continue;
    }

    const resolvedRef = resolveLocalSourceRef(ref, slug);

    if (!resolvedRef.ok) {
      addFinding("error", relativeFile, `"sourceRef" entry "${ref}" ${resolvedRef.reason}`);
      continue;
    }

    try {
      const sourceStat = await stat(resolvedRef.path);

      if (sourceStat.isDirectory() && slug !== "sample") {
        addFinding(
          "warning",
          relativeFile,
          `"sourceRef" entry "${ref}" is a folder. Real lessons should prefer concrete source files.`
        );
      }
    } catch {
      addFinding("error", relativeFile, `"sourceRef" entry "${ref}" does not exist.`);
    }
  }
}

function resolveLocalSourceRef(ref, slug) {
  const resolvedPath = path.resolve(rootDir, ref);
  const lessonSourcesDir = path.join(sourcesDir, slug);

  if (!isInsideOrSame(resolvedPath, sourcesDir)) {
    return {
      ok: false,
      reason: `must resolve under content/sources/${slug}/ or be a stable URL.`
    };
  }

  if (!isInsideOrSame(resolvedPath, lessonSourcesDir)) {
    return {
      ok: false,
      reason: `must resolve under content/sources/${slug}/ for this lesson.`
    };
  }

  return { ok: true, path: resolvedPath };
}

function isInsideOrSame(childPath, parentPath) {
  const relativePath = path.relative(parentPath, childPath);

  return (
    relativePath === "" ||
    (!relativePath.startsWith("..") && !path.isAbsolute(relativePath))
  );
}

function runPathSafetySelfCheck() {
  const checks = [
    {
      ref: "content/sources/example/source.md",
      slug: "example",
      ok: true
    },
    {
      ref: "content/sources/other/source.md",
      slug: "example",
      ok: false
    },
    {
      ref: "content/sources/example/../../README.md",
      slug: "example",
      ok: false
    }
  ];

  for (const check of checks) {
    const result = resolveLocalSourceRef(check.ref, check.slug);

    if (result.ok !== check.ok) {
      throw new Error(
        `Validator path-safety self-check failed for "${check.ref}" and slug "${check.slug}".`
      );
    }
  }
}

function validateBody(body, relativeFile, isSampleFixture) {
  if (!body.trim()) {
    addFinding("error", relativeFile, "Lesson body is empty.");
    return;
  }

  const sections = getH2Sections(body);

  for (const section of requiredSections) {
    if (!hasSection(sections, section)) {
      addFinding("error", relativeFile, `Missing required lesson section "${section}".`);
    }
  }

  if (isSampleFixture) {
    addFinding(
      "warning",
      relativeFile,
      "Sample fixture skips full lesson completeness checks and is not a quality example."
    );
  } else {
    for (const section of recommendedSections) {
      if (!hasSection(sections, section)) {
        addFinding(
          "warning",
          relativeFile,
          `Missing recommended section "${section}". Omit only when it truly does not apply.`
        );
      }
    }
  }

  const visualSection = getSectionContent(body, "Suggested visual");

  if (visualSection !== undefined) {
    for (const field of visualSpecFields) {
      if (!hasVisualSpecField(visualSection, field)) {
        addFinding(
          "error",
          relativeFile,
          `"Suggested visual" is missing Visual Spec field "${field}".`
        );
      }
    }
  }
}

function parseMarkdownLesson(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    return undefined;
  }

  return {
    frontmatter: parseFrontmatter(match[1]),
    body: text.slice(match[0].length)
  };
}

function parseFrontmatter(source) {
  const result = {};
  let currentArrayKey;

  for (const line of source.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) {
      continue;
    }

    const arrayItem = line.match(/^\s*-\s+(.*)$/);

    if (arrayItem && currentArrayKey) {
      result[currentArrayKey].push(parseScalar(arrayItem[1]));
      continue;
    }

    currentArrayKey = undefined;

    const field = line.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/);

    if (!field) {
      continue;
    }

    const [, key, rawValue = ""] = field;

    if (rawValue === "") {
      result[key] = [];
      currentArrayKey = key;
    } else {
      result[key] = parseScalar(rawValue);
    }
  }

  return result;
}

function parseScalar(value) {
  const trimmed = value.trim();
  const quoted = trimmed.match(/^(['"])([\s\S]*)\1$/);

  return quoted ? quoted[2] : trimmed;
}

function getH2Sections(body) {
  const sections = [];
  const headingPattern = /^##\s+(.+?)\s*#*\s*$/gm;
  let match;

  while ((match = headingPattern.exec(body)) !== null) {
    sections.push(normalizeHeading(match[1]));
  }

  return sections;
}

function getSectionContent(body, sectionName) {
  const headingPattern = /^##\s+(.+?)\s*#*\s*$/gm;
  const matches = [...body.matchAll(headingPattern)];

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index];

    if (normalizeHeading(match[1]) !== normalizeHeading(sectionName)) {
      continue;
    }

    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? body.length;

    return body.slice(start, end);
  }

  return undefined;
}

function hasSection(sections, sectionName) {
  return sections.includes(normalizeHeading(sectionName));
}

function hasVisualSpecField(section, field) {
  const escaped = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const fieldPattern = new RegExp(
    `(^|\\n)\\s*(?:[-*]\\s*)?(?:\\*\\*)?${escaped}(?:\\*\\*)?\\s*:`,
    "i"
  );

  return fieldPattern.test(section);
}

function normalizeHeading(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, " ");
}

function looksLikeIsoDate(value) {
  if (!isoDatePattern.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

function isExternalUrl(value) {
  return value.startsWith("http://") || value.startsWith("https://");
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function addFinding(level, file, message) {
  findings.push({ level, file, message });
}

function reportFindings() {
  const errors = findings.filter((finding) => finding.level === "error");
  const warnings = findings.filter((finding) => finding.level === "warning");

  if (findings.length === 0) {
    console.log("Content validation passed with no warnings.");
    return;
  }

  for (const finding of findings) {
    const label = finding.level === "error" ? "ERROR" : "WARN";
    console.log(`${label} ${finding.file}: ${finding.message}`);
  }

  console.log("");
  console.log(
    `Content validation finished with ${errors.length} error(s) and ${warnings.length} warning(s).`
  );

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

function toRepoPath(file) {
  return path.relative(rootDir, file).split(path.sep).join("/");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
