# Docker Buildx

## Buildx and BuildKit

- **Buildx** is the CLI that sends build requests.
- **BuildKit** is the engine that runs the build.
- `docker build` already uses Buildx and the default BuildKit builder.

Use `docker buildx` when you need builder management or multi-platform images.

## docker buildx build

Builds an image with BuildKit.

```
docker buildx build [OPTIONS] PATH | URL | -
```

```bash
docker buildx build -t myapp:1.0 --load .                         # build for the local machine
docker buildx build --platform linux/amd64,linux/arm64 --push .  # build and push two platforms
```

| Option | Does |
|---|---|
| `-t`, `--tag` | Names the image |
| `--platform` | Sets the target platform |
| `--load` | Loads a single-platform image into local images |
| `--push` | Pushes the result to a registry |

## Builder management

```bash
docker buildx ls
docker buildx create --name mybuilder --driver docker-container --use
docker buildx inspect --bootstrap
docker buildx rm mybuilder
```

A `docker-container` builder supports multi-platform builds. Its result is not added to local images unless you use `--load`.
