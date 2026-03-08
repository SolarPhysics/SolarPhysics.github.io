# Repository Guidelines

## Project Structure & Module Organization
This repository is a static GitHub Pages site with all source files in the root directory. Use `index.html` for the landing page, `participants.html` for the member directory, `style.css` for shared styling, `meetings.js` for meeting data and client-side behavior, and `service-worker.js` plus `manifest.json` for PWA support. Image assets such as `SP_image.png`, `KHAO.jpeg`, and logos also live at the root, so keep filenames stable when updating references.

## Build, Test, and Development Commands
There is no build step or package-based toolchain.

- `python -m http.server 8000`
  Serves the site locally at `http://localhost:8000` and is the preferred way to test service worker and asset loading.
- `open index.html`
  Quick visual check for simple HTML or CSS edits when a local server is unnecessary.
- `node --check meetings.js`
  Optional syntax check for JavaScript changes if Node.js is available.

## Coding Style & Naming Conventions
Match the existing style in each file: HTML, CSS, and JavaScript currently use 4-space indentation. Preserve the plain-vanilla stack; do not introduce frameworks or build tooling unless explicitly requested. Keep CSS class names descriptive and lowercase with hyphens, for example `upcoming-meeting-container`. Use clear JavaScript identifiers in `camelCase` and keep meeting records in the existing object format with ISO dates like `2025-11-28`.

## Testing Guidelines
Automated tests are not configured in this repository. Validate changes manually in a browser on both `index.html` and `participants.html`, and confirm that navigation links, lazy-loaded images, and meeting rendering still work. For data updates in `meetings.js`, verify dates, presenter names, article URLs, and optional `video` or `ppt` fields before merging.

## Commit & Pull Request Guidelines
Recent history mostly uses descriptive, imperative commit messages focused on the changed file, for example `Update meetings.js to finalize entries for November 14, 21, and 28, 2025`. Follow that pattern and avoid vague messages. Pull requests should include a short summary, note any content or asset changes, link the related issue if one exists, and attach screenshots for visible UI updates.

## Deployment & Content Tips
The site deploys from the default branch through GitHub Pages. Keep `.nojekyll` intact, and compress large media before committing to avoid slowing page loads.
