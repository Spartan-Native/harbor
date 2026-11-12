# Security policy

## Supported versions

Harbor is a sample app, not a product: only the latest commit on `main` gets fixes.

## Reporting a vulnerability

Please do not open a public issue. Report it privately through GitHub instead: on this repository, open **Security → Report a vulnerability** ([direct link](https://github.com/Spartan-Native/harbor/security/advisories/new)).

You will get an answer within a week. Once a fix is in, the advisory is published with credit to you, unless you ask not to be named.

## Scope

The code in this repository: the Angular app in `app/`, the desktop shells in `desktop/`, the project page in `site/` and the live demo built from them.

Problems in the packages Harbor uses go to their own repositories:

| Package | Report to |
| --- | --- |
| `@spartan-native/theme`, `helm`, `desktop-ui`, `host-web` | [Spartan-Native/spartan-native](https://github.com/Spartan-Native/spartan-native/security/advisories/new) |
| `@spartan-native/host-wails` and `github.com/spartan-native/host-wails` | [Spartan-Native/host-wails](https://github.com/Spartan-Native/host-wails/security/advisories/new) |
| The stock spartan/ui components in `components/ui` | [spartan/ui](https://github.com/spartan-ng/spartan), upstream |
