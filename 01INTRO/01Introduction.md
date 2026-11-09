# 1. Why Docker

An app moved to another machine often failed for two reasons:

- **OS compatibility** — the userspace on the new machine did not match what the app expected
- **Library and dependency compatibility** — a package was missing, or the version was wrong

Docker packs the app, its libraries, and its dependencies into an **image**. Run that image and the app gets the same userspace every time.

Containers on a host all share that host's kernel. The image is the set of files that sits on top of it.

# 2. Containers

A Container is a a runnable instance of a Docker Image. A container is a running environment with its own processes, network, and mounts. Every container on the host shares that host's kernel.

Docker used to create containers with **LXC**. From version 0.9 (2014) it used its own **libcontainer**. That code became **runc**.

**OCI** (Open Container Initiative) is the open spec for the container runtime and the image format. **runc** is the reference runtime for that spec.

Starting a container today:

1. **dockerd** takes the request
2. **containerd** manages the container
3. **runc** creates the process

# 3. Images

An image is a read-only package of the app, its libraries, and its dependencies.

A container is a running copy of an image. Build or pull the image once, then start as many containers from it as you need. Version controlled using tags

# 4. How Docker Works

An OS is two parts:

- **Kernel** — talks to the hardware
- **Userspace** — the files and programs that make one distro different from another

Docker runs different Linux userspaces on the same kernel. A Linux host runs Linux containers. A Windows container needs a Windows kernel.

Docker Desktop on Windows runs Linux containers inside a Linux VM. A hypervisor boots a separate kernel for each VM. Docker uses the kernel already on the host and only packages the app.

# 5. Containers vs VMs

The Docker host is hardware, an OS, and Docker installed on that OS. Docker starts containers on it. Each container carries the app and its libraries.

| | Container | VM |
|---|---|---|
| Kernel | Shares the host kernel | Own kernel |
| What you ship | App + libraries | Full OS + app |
| Start | Seconds | Slower |
| Disk | Small | Larger |
| Isolation | Processes, network, files | Whole OS |

Containers often run on a VM. The Docker host is virtual, and the containers run on that virtual machine.

# 6. Docker Registry

A Docker Registry is a repository or that hosts multiple repositories which is used to store and distribute Docker Images. Most org has their containerized application available in our docker repositories called docker hub

- **Docker Hub**: the public default
- **Others**: GitHub Container Registry, Google Artifact Registry, AWS ECR, Azure Container Registry

# 7. Kernel features

Containers share one Linux kernel. On Docker Desktop for Windows, that kernel is the Linux VM's.

Three kernel features make a container work:

- **Namespaces** — isolate processes, network, and mounts
- **cgroups** — limit CPU, memory, and other resources
- **UnionFS** — stack image layers into one filesystem

Many containers run on that one kernel. Each stays isolated from the others.

# 8. The LXC family

LXC, LXD, and LXCFS sit on the same kernel features: namespaces and cgroups.

- **LXC** — the original toolkit. Runs a system container: a full Linux userspace with its own init. Feels like a light VM, and still shares the host kernel.
- **LXD** — a manager on top of LXC. API and CLI for images, snapshots, and day-to-day operations. Not a runtime.
- **LXCFS** — fixes what the container sees in `/proc`. `cpuinfo` and `meminfo` show the container's limits, not the host's.

# 9. Docker runtime evolution

```text
LXC → libcontainer → runc → containerd
```

- **LXC** — early Docker created containers with it.
- **libcontainer** — Docker's own library. Talks to namespaces and cgroups directly. From 0.9 (2014) this replaced LXC. That code became runc.
- **runc** — the OCI runtime. Creates the container process, then exits.
- **containerd** — manages images and the container lifecycle for Docker and Kubernetes. Calls runc to start the process.

containerd is the manager. runc is the starter.

