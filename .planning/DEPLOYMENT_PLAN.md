# GitHub Pages Deployment Plan

Plan-only document. No deployment work has been implemented. This file captures the agreed approach so it can be reviewed before any code or workflow files are added.

## Goal

Serve the existing Astro static app on GitHub Pages so it can be viewed from an iPhone browser. No new app features.

## Repository facts that drive the plan

- Repo: `Hmtt2009/my-personal-project` (a project repo, not a user/org root repo).
- Astro static app, `output: "static"`.
- `package-lock.json` is committed; `astro` is the only dependency.
- Two pages: `src/pages/index.astro`, `src/pages/lessons/[slug].astro`.
- Existing absolute-path links: `src/pages/index.astro:62` (`/lessons/${slug}/`) and `src/pages/lessons/[slug].astro:60` (`/`). These will break once a non-empty `base` is set unless updated. Flagged below as a required deployment-correctness fix.

---

## 1. Required changes to `astro.config.mjs`

Currently:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static"
});
```

Planned:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://hmtt2009.github.io",
  base: "/my-personal-project",
  output: "static",
  trailingSlash: "always"
});
```

Why each line:

- `site` — absolute origin GitHub Pages will serve from. Used for canonical URLs and any future sitemap/RSS.
- `base` — required because the site is served from a sub-path on a project repo. Without it, internal asset URLs resolve to `/` and 404 on Pages.
- `output: "static"` — unchanged.
- `trailingSlash: "always"` — matches the existing `/lessons/${slug}/` link style and avoids a redirect/404 mismatch on Pages, which serves directories via `index.html`.

## 2. Correct `site` value

`https://hmtt2009.github.io`

GitHub Pages canonicalizes username casing in URLs to lowercase. Use lowercase to be safe.

## 3. Correct `base` value

`/my-personal-project`

- Leading slash, no trailing slash. Astro handles trailing slash internally.
- Must exactly match the repo name as published.

## 4. Required GitHub Actions workflow

Add one new file: `.github/workflows/deploy.yml`. No other workflow files needed.

Shape:

- Trigger: `push` to `main`, plus `workflow_dispatch` for manual re-runs from the Actions tab.
- Permissions (job level): `contents: read`, `pages: write`, `id-token: write`.
- Concurrency: group `pages`, `cancel-in-progress: false`.
- Two jobs:
  1. `build`
     - `actions/checkout@v4`
     - `actions/setup-node@v4` with `node-version: 20` and `cache: "npm"`
     - `npm ci`
     - `npx astro build` (outputs to `./dist`)
     - `actions/upload-pages-artifact@v3` with `path: ./dist`
  2. `deploy` (needs: build, environment: `github-pages`)
     - `actions/deploy-pages@v4`

Notes:

- Use the official GitHub Pages actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`) rather than third-party Astro deploy actions.
- Pin major versions (`@v4`, `@v3`).
- Single-platform static build, no matrix needed.

## 5. Should `package-lock.json` be used with `npm ci`?

Yes. `npm ci`:

- Requires `package-lock.json` (already committed at root).
- Produces deterministic installs.
- Is faster than `npm install` in CI and fails loudly if the lock and `package.json` disagree.

Combined with `cache: "npm"` in `setup-node`, this gives fast, reproducible builds.

## 6. GitHub repository settings to enable manually

Required in the GitHub UI before the first deploy will work. The workflow alone is not enough.

1. Settings → Pages → Build and deployment → Source: set to **GitHub Actions** (not "Deploy from a branch"). This switches the repo into Actions-based deploy mode and enables the `github-pages` environment.
2. Settings → Actions → General → Workflow permissions: confirm "Read and write permissions" is allowed, OR rely on the per-job `permissions:` block in the workflow (preferred — already in the plan above).
3. Settings → Environments: confirm a `github-pages` environment exists after the first deploy is attempted. GitHub creates it automatically when `actions/deploy-pages` runs the first time. No protection rules required for a personal site, but optionally restrict deploys to the `main` branch.

No DNS, no custom domain, no secrets needed for the iPhone-viewing goal.

## 7. Expected final public URL

`https://hmtt2009.github.io/my-personal-project/`

Sub-paths after deploy:

- Library: `https://hmtt2009.github.io/my-personal-project/`
- Sample lesson: `https://hmtt2009.github.io/my-personal-project/lessons/sample/`

## 8. Verification steps after deployment

In order:

1. Workflow ran cleanly — Actions tab shows the latest run on `main` green for both `build` and `deploy` jobs.
2. Pages environment shows the URL — Settings → Pages displays `Your site is live at https://hmtt2009.github.io/my-personal-project/`.
3. Open the library URL on desktop — page loads, CSS applied (no unstyled fallback), library count and sample lesson card visible.
4. Click into the sample lesson — `/lessons/sample/` loads the lesson body, "Source reference" section renders.
5. Click "Back to library" — returns to the library, not a 404.
6. DevTools → Network — confirm CSS/JS asset requests all 200 under `/my-personal-project/...`, none requesting from `/` (root).
7. iPhone test (the actual goal):
   - Open the URL in Safari on iPhone.
   - Confirm typography is comfortable (16px base, no horizontal scroll).
   - Confirm the mobile breakpoint at `max-width: 40rem` in `src/styles/global.css:236` kicks in (compact spacing, header stack).
   - Tap the lesson card, scroll the lesson body, tap "Back to library" — full loop works.
8. Hard reload with cache disabled to make sure no `localhost` or `/`-rooted URLs are hiding in the build.

---

## One required app-side change (must ship in the same implementation PR)

The plan above will not work without this. Flagged explicitly because of the "do not change app features" rule. These two lines will produce 404s on Pages once `base: "/my-personal-project"` is set, because the absolute paths bypass the base:

- `src/pages/index.astro:62` — `href={\`/lessons/${lesson.slug}/\`}`
- `src/pages/lessons/[slug].astro:60` — `<a class="back-link" href="/">`

This is a deployment-correctness fix, not a feature change. Two options:

- Option A (recommended): use `import.meta.env.BASE_URL`. Astro injects the configured `base`. Concatenate it into both hrefs. Survives any future `base` change automatically. Most idiomatic.
- Option B: hardcode `/my-personal-project/` into both hrefs. Simpler diff, but couples source code to deploy path. If the repo is renamed or moved to a custom domain, source must be edited.

Decision required from user before implementation.

## Out of scope (not in this plan)

- No backend, DB, auth, runtime API, upload, quiz, or content-model changes.
- No `CONTENT_AUTHORING.md` edits.
- No custom domain, no DNS, no analytics, no sitemap/RSS plugins.
- No PR-preview deploys.
- No 404 page (current behavior preserved — Pages will fall back to its default 404).

## Files this plan would create or change at implementation time

- New: `.github/workflows/deploy.yml`
- Modified: `astro.config.mjs` (add `site`, `base`, `trailingSlash`)
- Modified: `src/pages/index.astro` (one href)
- Modified: `src/pages/lessons/[slug].astro` (one href)

Total: 1 new file, 3 modified files.

---

## Open questions to resolve before implementing

1. Option A vs Option B for the two hrefs (above)?
2. Confirm Node 20 is acceptable for the workflow. Astro 5 supports Node 18.17.1+, 20+, 22+; Node 20 LTS is the safest pick.
3. After the first successful deploy, should `.planning/STATE.md` be updated with the live URL?
