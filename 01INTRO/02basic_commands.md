# Docker Basic Commands

## 1. docker run

Creates and starts a new container from an image.

```bash
docker run nginx
docker run -d nginx          # run in background
docker run -it ubuntu bash   # interactive shell
```

Common options:

| Option | Purpose |
|----------|----------|
| `-d` | Run in background (detached mode) |
| `-it` | Interactive terminal |
| `--name` | Assign a container name |
| `-p` | Map ports |
| `-v` | Mount a volume |

Example:

```bash
docker run -d --name web -p 8080:80 nginx
```

---
## 2. docker create

Creates a new container from an image but does not start it.

```bash
docker create nginx
docker create --name web nginx
```

Start the container later:

```bash
docker start web
```

Example:

```bash
docker create --name web nginx
docker start web
```

This creates the container first and starts it only when required.

---

## 3. docker ps

Lists running containers.

```bash
docker ps
```

Show all containers (including stopped):

```bash
docker ps -a
```

---

## 4. docker stop

Stops a running container.

```bash
docker stop web
docker stop <container_id>
```

---

## 5. docker start

Starts an existing stopped container.

```bash
docker start web
```

---

## 6. docker restart

Restarts a container.

```bash
docker restart web
```

---

## 7. docker rm

Removes a container.

```bash
docker rm web
docker rm -f $(docker ps -aq)    # force-remove every container, running or not
```

Remove a stopped container after use to free resources.

---

## 8. docker exec

Runs a command inside a running container.

```bash
docker exec -it web sh
docker exec web cat /etc/hosts
```

Use `-it` to open an interactive shell.

---

## 9. docker attach

Attach your terminal to a running container's main process.

```bash
docker attach web
# Press Ctrl + P, then Ctrl + Q to detach
```

---

## 10. docker logs

Displays container logs.

```bash
docker logs web
```

Follow logs in real time:

```bash
docker logs -f web
```

---

## 11. docker pull

Downloads an image from a registry.

```bash
docker pull nginx
docker pull ubuntu
```

---

## 12. docker images

Lists local images.

```bash
docker images
```

Equivalent command:

```bash
docker image ls
```

---

## 13. docker rmi

Removes a local image.

```bash
docker rmi nginx
docker rmi -f alpine        # force, even if tagged more than once
docker rmi -f $(docker images -aq)    # remove every local image
```

Remove unused images to free disk space.

---

## 14. docker inspect

Shows detailed information about a container or image.

```bash
docker inspect web
```

---

## 15. docker version

Displays Docker version information.

```bash
docker version
```

---

## 16. docker info

Shows Docker system information.

```bash
docker info
```

---

# Quick Reference

| Command | Purpose |
|----------|----------|
| `docker run IMAGE` | Create and start a container |
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker stop CONTAINER` | Stop a container |
| `docker start CONTAINER` | Start a container |
| `docker restart CONTAINER` | Restart a container |
| `docker rm CONTAINER` | Remove a container |
| `docker exec -it CONTAINER sh` | Open shell inside container |
| `docker attach CONTAINER` | Attach to a running container | 
| `Ctrl + P, Ctrl + Q` | Detach without stopping the container |
| `docker logs CONTAINER` | View logs |
| `docker pull IMAGE` | Download image |
| `docker images` | List images |
| `docker rmi IMAGE` | Remove image |
| `docker inspect OBJECT` | Show detailed information |
| `docker version` | Show Docker version |
| `docker info` | Show Docker system details |