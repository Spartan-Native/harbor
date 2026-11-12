# AGENTS.md

Instructions for AI coding agents working in this repository.

Harbor Backup is the sample app for the Spartan Native packages (`@spartan-native/theme`, `helm`, `desktop-ui`, `host-web`, `host-wails`). The packages live in their own repositories and come from npmjs.org; each ships an `AGENTS.md` in `node_modules/@spartan-native/<package>/AGENTS.md`. Read those before changing how the app uses a package.

## Layout

- **`app/`:** the Angular app (project `harbor-backup` in `angular.json`). Pages are in `app/src/app/harbor/pages/`, shared state in `app/src/app/harbor/data/harbor-store.ts`.
- **`components/ui/`:** stock spartan/ui helm components, imported as `@spartan-ng/helm/*` (paths in `tsconfig.json`). Don't edit them by hand; add new ones with `npx ng g @spartan-ng/cli:ui <name>` and add the path to `tsconfig.json`.
- **`desktop/<shell>/`:** one folder per desktop shell. `desktop/wails/` is the Wails v3 shell (Go).
- **`docs/sample-app.md`:** the spec: pages, components, acceptance.
- **`site/`:** the project page (plain HTML, CSS and JS). `scripts/build-site.mjs` builds it into `dist/site`, and `.github/workflows/pages.yml` deploys it to GitHub Pages together with the app as a live demo under `demo/` (built with `--base-href /harbor/demo/`).

## Rules

- **The app must stay host-agnostic.** Only `app/src/app/app.config.ts` knows which host runs it (`isWails() ? wailsHost() : webHost()`). UI code talks to `@spartan-native/theme` only.
- **Same version for host-wails.** `@spartan-native/host-wails` in `package.json` and `github.com/spartan-native/host-wails` in `desktop/wails/go.mod` must be the same version. Never commit a `replace` in `go.mod`.
- **The demo date is fixed** (Thu 12 March 2026, 09:12) so screenshots are stable. Don't use the real clock in page content.

## Do not run the visual tests unless asked

**Never run `npm run test:visual`** (or `playwright test` / `npx playwright test` directly) unless the user explicitly asks for it. It builds the Storybook and screenshots every page on every skin in light and dark; it is slow.

To check a change, use the lighter commands instead:

| Command | Use it for |
| --- | --- |
| `npm test` | Unit tests |
| `npm run build` | Checking that the app compiles |
| `npm run build:desktop:wails` | Checking the Wails shell (needs Go) |

If a change probably affects the screenshots (styles, layout, page content), say so in your summary and suggest that the user run `npm run test:visual`. Don't run it yourself.
