# Repository Guidelines

## Project Structure & Module Organization
This repository is a static GitHub Pages site. Keep page structure in `index.html`, presentation rules in `style.css`, and client-side behavior in `meetings.js`. Meeting schedules live in `meetings-data/` as term modules such as `2026-1st.js`; `meetings-data/index.js` imports and aggregates them. Store images and logos in `figs/`. If you add a new term file or cacheable asset, update `service-worker.js` as well.

## Build, Test, and Development Commands
There is no package manager, bundler, or formal test runner in this repo.

- `python3 -m http.server 8000` runs a local preview from the repository root.
- `node --check meetings.js` performs a quick syntax check for the main script.
- `node --check meetings-data/2026-1st.js` validates a meeting data module before commit.

Use a browser against `http://localhost:8000` to verify rendered changes.

## Coding Style & Naming Conventions
Match the existing style: 4-space indentation in HTML, CSS, and JavaScript; ES module imports; and descriptive CSS class names. Use kebab-case file names for assets and meeting term files. Preserve the current meeting object shape: `date`, `presenter`, `article`, `video`, and `ppt`. Keep dates in ISO format (`YYYY-MM-DD`) so upcoming-meeting logic continues to work correctly.

## Testing Guidelines
Testing is manual. After any content or UI change, confirm the upcoming meeting card, past-meeting term buttons, article links, and lazy-loaded images behave correctly. When editing `meetings-data/*.js`, verify meetings stay in chronological order and that `meetings-data/index.js` includes the new module. If cached files change, bump the cache version and confirm the update loads after a refresh.

## Commit & Pull Request Guidelines
Follow the existing history: short, imperative, content-specific commit subjects such as `Update 2026 first meeting data with article titles and video links`. Pull requests should summarize the visible change, list touched meeting-data files, and mention any `service-worker.js` cache updates. Include screenshots only for layout or styling changes.
