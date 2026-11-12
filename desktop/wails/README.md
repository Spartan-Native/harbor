# Harbor Backup · desktop (Wails v3)

The Harbor Backup Angular app (`app/`) as a native desktop app. The Spartan Native Go service (`github.com/spartan-native/host-wails`) reads the real OS settings, and the window is Harbor's own.

```bash
npm run start:desktop:wails    # build Harbor, embed it, build and run the binary
npm run build:desktop:wails    # build only → desktop/wails/bin/harbor-backup[.exe]
SPARTAN_NATIVE_DEBUG=1 desktop/wails/bin/harbor-backup   # log what the OS reports
```

Needs Go ≥ 1.26 and the Wails v3 platform prerequisites (WebView2 on Windows, WebKitGTK on Linux; see the Wails docs). The Go module `github.com/spartan-native/host-wails` comes from the public Go proxy; on macOS, building it needs the Xcode Command Line Tools (cgo).

| OS | Window | Harbor draws |
| --- | --- | --- |
| Windows | frameless | the Fluent title bar and caption buttons (they act on the window) |
| macOS | hidden-inset title bar | its sidebar under the system traffic lights |
| Linux | frameless | the GNOME header bar and close button |

Harbor picks the host at runtime: `isWails() ? wailsHost() : webHost()`. Change the system accent, dark mode, contrast or (on Windows) the text size while it runs, and the window follows within about a second.

| File | What it is |
| --- | --- |
| `main.go` | The Wails app: embeds `frontend/dist`, registers `spartannative.New()`, opens the window |
| `scripts/build.mjs` | Cross-platform build: `ng build` → copy → `go build` (`--run` to start) |
| `go.mod` | Requires `github.com/spartan-native/host-wails` |
| `frontend/dist/index.html` | Placeholder, so `go build` works before the app is built; the build replaces the folder's contents |

## Versions

The Go module and the npm package `@spartan-native/host-wails` are released together from one tag and talk through bound-method names, so **keep them at the same version**: the `github.com/spartan-native/host-wails` line in `go.mod` and `@spartan-native/host-wails` in the root `package.json`. To update both:

```bash
npm install @spartan-native/host-wails@1.2.3
(cd desktop/wails && go get github.com/spartan-native/host-wails@v1.2.3 && go mod tidy)
```

To work against a local checkout of host-wails, don't edit `go.mod`; use a Go workspace outside the repository, or `go mod edit -replace github.com/spartan-native/host-wails=../../../host-wails` and drop it before committing.
