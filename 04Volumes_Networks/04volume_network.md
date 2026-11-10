# Docker Quick Notes

## 1. Port Mapping

### 1.1 What is Port Mapping?
Port mapping exposes a container's internal port to the host machine.

### 1.2 Syntax
```bash
docker run -p <host_port>:<container_port> <image>
```

### 1.3 Example
```bash
docker run -d -p 8080:80 nginx
```

- Host Port: `8080`
- Container Port: `80`

Access application:

```text
http://localhost:8080
```

### Multiple Port Mapping
```bash
docker run -p 8080:80 -p 8443:443 nginx
```

### 1.5 Verify
```bash
docker ps
```

Output:
```text
0.0.0.0:8080->80/tcp
```

---
## 2. Volumes

Files written inside a container are deleted with the container. Mount storage when the data should outlive it.

### 2.1 Named volume vs bind mount

| | Named volume | Bind mount |
|---|---|---|
| What it is | Storage Docker creates and keeps | A folder that already exists on the host |
| Use it for | Data the app owns (database, uploads) | Config or code you edit on the host |
| `-v` | `-v mydata:/app/data` | `-v /host/path:/app/config` |
| `--mount` | `--mount type=volume,source=mydata,target=/app/data` | `--mount type=bind,source=/host/path,target=/app/config` |

`-v` and `--mount` do the same job. `--mount` names `type`, `source`, and `target`, so it is easier to read.

```bash
docker run -d -v mydata:/app/data myapp
docker run -d --mount type=bind,source=/host/path,target=/app/config myapp
```

### 2.2 Volume commands

```bash
docker volume create mydata
docker volume ls
docker volume inspect mydata
docker volume rm mydata
```

`docker volume rm` works only when no container is using the volume. It deletes a named volume. It does not delete a bind-mount folder.

---