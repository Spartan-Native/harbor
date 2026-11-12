# Changelog

Notable changes to Harbor Backup. Harbor's version follows the Spartan Native release it is built and tested against.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.2.0] - 2026-11-12

### Added

- A project page with a live demo of the app, published to GitHub Pages at <https://spartan-native.github.io/harbor/>.
- MIT license, contributing guide, code of conduct, security policy, and issue and pull request templates.
- Dependabot for npm, the Wails shell's Go module and the GitHub Actions.

### Changed

- Built against Spartan Native `0.2.0`: `@spartan-native/theme`, `helm`, `desktop-ui`, `host-web` and `host-wails` at `^0.2.0`, and the Go module `github.com/spartan-native/host-wails` at `v0.2.0`.
- The packages come from npmjs.org and the Go module from the public Go proxy. No `.npmrc` token, `GOPRIVATE` or `HOST_WAILS_TOKEN` is needed any more, locally or in CI.
- The web app manifest no longer sets `id: "/"`, so the installed demo doesn't claim the root of the GitHub Pages domain.

## [0.1.0] - 2026-11-12

First version in its own repository, built against Spartan Native `0.1.0` from GitHub Packages.

[Unreleased]: https://github.com/Spartan-Native/harbor/commits/main
