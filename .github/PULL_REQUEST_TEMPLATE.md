## What and why

<!-- What this changes, and the problem it solves. Link the issue if there is one. -->

## Checklist

- [ ] `npm test` and `npm run build` pass
- [ ] Desktop shell touched: `npm run build:desktop:wails` passes
- [ ] The app is still host-agnostic: only `app/src/app/app.config.ts` knows the runtime
- [ ] `@spartan-native/host-wails` changed: `desktop/wails/go.mod` is on the same version
- [ ] `CHANGELOG.md` has an entry under **Unreleased** (skip for docs and internal changes)
- [ ] Affects the screenshots (styles, layout, page content): **yes / no**. If yes, `npm run test:visual` was run locally
