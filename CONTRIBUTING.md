# Contributing to Harbor

Thanks for helping. Harbor Backup is the sample app and end-to-end acceptance test for [Spartan Native](https://github.com/Spartan-Native/spartan-native). By taking part you agree to the [code of conduct](CODE_OF_CONDUCT.md). Report security problems privately, as described in [SECURITY.md](SECURITY.md).

**Where does it belong?** If a component, skin or host adapter is wrong in any app, fix it in [spartan-native](https://github.com/Spartan-Native/spartan-native) or the adapter's repository ([host-wails](https://github.com/Spartan-Native/host-wails)), not with a workaround here. Harbor's job is to show those packages as they are.

## Requirements

| Tool | Version |
| --- | --- |
| Node.js | `^24.15.0 \|\| >=26.0.0`; **26** for development (`.nvmrc`) |
| npm | ≥ 11 (`engine-strict=true` in `.npmrc`) |
| Go | ≥ 1.26, for the Wails shell only, plus the [Wails v3 platform prerequisites](https://v3.wails.io) |
| Xcode Command Line Tools | macOS only, for the Wails shell (host-wails uses cgo) |

```bash
nvm install && nvm use   # Node 26 from .nvmrc
npm install
```

All packages come from npmjs.org and the Go proxy: no token or registry setup.

## Commands

| Command | What it does |
| --- | --- |
| `npm start` | Serve the app at http://localhost:4200 |
| `npm test` | Unit tests |
| `npm run build` | Production build into `dist/harbor-backup/browser` |
| `npm run storybook` | Storybook with one story per page, on port 6010 |
| `npm run test:visual` | Screenshots every page on every skin, light and dark (slow; see below) |
| `npm run start:desktop:wails` / `build:desktop:wails` | Run / build the Wails desktop app |
| `npm run build:site` | The project page into `dist/site` (`npx serve dist/site` to look at it) |
| `npm run build:site:demo` | The project page plus the live demo, as GitHub Pages serves it |

### Visual tests

`npm run test:visual` builds Storybook and takes a Playwright screenshot of every page on all seven skins in light and dark. The baselines depend on the operating system's fonts and anti-aliasing, so they are not committed and CI doesn't run them. Run it before and after a change to styles, layout or page content (`-- --update-snapshots` to record baselines on `main`), and say in the pull request that you did.

## Rules for changes

- **Stay host-agnostic.** Only `app/src/app/app.config.ts` knows which host runs the app (`isWails() ? wailsHost() : webHost()`). UI code talks to `@spartan-native/theme` only.
- **Keep host-wails in step.** `@spartan-native/host-wails` in `package.json` and `github.com/spartan-native/host-wails` in `desktop/wails/go.mod` must be the same version. Never commit a `replace` in `go.mod`.
- **Don't edit `components/ui/` by hand.** These are the stock spartan/ui helm components. Add one with `npx ng g @spartan-ng/cli:ui <name>` and add its path to `tsconfig.json`.
- **Keep the demo date fixed** (Thu 12 March 2026, 09:12) so screenshots are stable. Don't use the real clock in page content.
- **Update the spec.** A new page, flow or component on a page goes into [`docs/sample-app.md`](docs/sample-app.md).
- Add an entry to `CHANGELOG.md` under **Unreleased** for anything a visitor of the app or demo would notice.

Code style is Prettier's (`.prettierrc`, 100 columns).

## Pull requests

1. Branch from `main`.
2. Make the change, with unit tests for new behavior.
3. Run `npm test` and `npm run build`, plus `npm run build:desktop:wails` if you touched `desktop/`, and `npm run test:visual` if the change affects the screenshots.
4. Open the pull request and fill in the checklist. CI builds and tests the app on Ubuntu and the Wails shell on macOS.

Keep a pull request to one topic.

## Moving to a new Spartan Native release

Harbor's version follows the Spartan Native release it is built against.

```bash
npm install @spartan-native/theme@x.y.z @spartan-native/helm@x.y.z @spartan-native/desktop-ui@x.y.z \
  @spartan-native/host-web@x.y.z @spartan-native/host-wails@x.y.z
(cd desktop/wails && go get github.com/spartan-native/host-wails@vx.y.z && go mod tidy)
```

Then set `"version"` in `package.json`, move the **Unreleased** changelog entries under a new heading, check the app in the browser and in Wails, and run the visual tests.

## The website

`site/` is the project page: plain HTML, CSS and JS in the style of the other Spartan Native pages, with images from `docs/images/`. `.github/workflows/pages.yml` builds it together with the app (base href `/harbor/demo/`) on every push to `main` and deploys both to GitHub Pages.
