# Dockerfile

A **Dockerfile** is a text document that contains all the commands a user could call on the command line to assemble an image. Docker can build images automatically by reading the instructions from a Dockerfile.

## Basic Example

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "app.py"]
```

## Common Instructions

| Instruction | Description |
|------------|-------------|
| `FROM` | Base image |
| `WORKDIR` | Set working directory |
| `COPY` | Copy files into container |
| `RUN` | Execute build commands |
| `ENV` | Set environment variables |
| `ARG` | Build-time variables |
| `EXPOSE` | Expose application port |
| `CMD` | Default startup command |
| `ENTRYPOINT` | Main executable |
| `USER` | Run as specific user |

## CMD vs ENTRYPOINT vs ARG

These three instructions serve different purposes:

### ARG

`ARG` defines variables that are available **only during image build time**.

```dockerfile
ARG APP_VERSION=1.0
RUN echo "Building version ${APP_VERSION}"
```

Build with a custom value:

```bash
docker build --build-arg APP_VERSION=2.0 -t my-app .
```

**Key points**
- Available only while building the image.
- Not available inside the running container unless copied to `ENV`.
- Useful for image versions, build options, and environment-specific builds.

### CMD

`CMD` provides the **default command** that runs when a container starts.

```dockerfile
CMD ["python", "app.py"]
```

It can be overridden at runtime:

```bash
docker run my-app python test.py
```

**Key points**
- Defines default behavior.
- Easy to override.
- Typically used for application startup commands.

### ENTRYPOINT

`ENTRYPOINT` defines the **main executable** for the container.

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

When running:

```bash
docker run my-app
```

Docker executes:

```bash
python app.py
```

If a user passes arguments:

```bash
docker run my-app test.py
```

Docker executes:

```bash
python test.py
```

**Key points**
- Makes the container behave like a dedicated executable.
- Runtime arguments are appended to the entrypoint.
- Harder to override (requires `--entrypoint`).

### Quick Comparison

| Feature | ARG | CMD | ENTRYPOINT |
|---------|-----|-----|------------|
| Available during build | ✅ | ❌ | ❌ |
| Available at runtime | ❌ | ✅ | ✅ |
| Can be overridden easily | N/A | ✅ | ⚠️ With `--entrypoint` |
| Purpose | Build configuration | Default command | Main executable |

### Common Pattern

A common production pattern is to use **ENTRYPOINT** for the executable and **CMD** for default arguments.

```dockerfile
ENTRYPOINT ["python"]
CMD ["app.py"]
```

This provides sensible defaults while allowing runtime customization.

## Build & Run

### Building an Image

The `docker build` command reads the Dockerfile and creates a Docker Image. The `.` at the end specifies the **build context** (the current directory), which contains the Dockerfile and application files.

```bash
docker build -t my-app .
```

Where:

- `docker build` → Builds an image from a Dockerfile.
- `-t my-app` → Assigns a name (tag) to the image.
- `.` → Uses the current directory as the build context.

Verify the image was created:

```bash
docker images
```

Example output:

```text
REPOSITORY   TAG       IMAGE ID
my-app       latest    a1b2c3d4e5f6
```

### Using Tags

Tags help identify different versions of an image.

```bash
docker build -t my-app:v1.0 .
docker build -t my-app:latest .
```

View specific images:

```bash
docker images my-app
```

### Using Build Arguments

If the Dockerfile contains `ARG` instructions, values can be supplied during build time.

Dockerfile:

```dockerfile
ARG APP_VERSION=1.0
```

Build command:

```bash
docker build \
  --build-arg APP_VERSION=2.0 \
  -t my-app:2.0 .
```

Build arguments are available only during image creation and are not automatically persisted in the running container.

### Running a Container

Start a container from the image:

```bash
docker run -p 5000:5000 my-app
```

Where:

- `docker run` → Creates and starts a container.
- `-p 5000:5000` → Maps host port `5000` to container port `5000`.
- `my-app` → Image to run.

### Running in Detached Mode

To run the container in the background:

```bash
docker run -d -p 5000:5000 --name my-app-container my-app
```

Where:

- `-d` → Detached (background) mode.
- `--name` → Assigns a friendly container name.

### Passing Environment Variables

```bash
docker run \
  -e ENVIRONMENT=production \
  -p 5000:5000 \
  my-app
```

### Viewing Running Containers

```bash
docker ps
```

View all containers (including stopped ones):

```bash
docker ps -a
```

### Viewing Logs

```bash
docker logs my-app-container
```

Follow logs in real time:

```bash
docker logs -f my-app-container
```

### Stopping and Removing Containers

Stop a container:

```bash
docker stop my-app-container
```

Remove a container:

```bash
docker rm my-app-container
```

### Removing Images

```bash
docker rmi my-app:v1.0
```

### Typical Workflow

```bash
# Build image
docker build -t my-app:v1.0 .

# Verify image
docker images

# Run container
docker run -d -p 5000:5000 --name my-app-container my-app:v1.0

# Check container status
docker ps

# View logs
docker logs -f my-app-container
```

**Flow:**

```text
Dockerfile
    ↓
docker build
    ↓
Docker Image
    ↓
docker run
    ↓
Docker Container
```

## Best Practices

- Use lightweight base images.
- Combine `RUN` commands where possible.
- Use `.dockerignore`.
- Avoid running as root.
- Pin image versions.
- Use `ARG` for build-time configuration and `ENV` for runtime configuration.
- Prefer exec-form syntax (`["executable", "param"]`) for `CMD` and `ENTRYPOINT`.
- Keep images small and secure.

## Output

Dockerfile → Docker Image → Docker Container

## References

- https://docs.docker.com/build/concepts/dockerfile/