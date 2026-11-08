# 1. Why Docker

An app moved to another machine often failed for two reasons:

- **OS compatibility** — the userspace on the new machine did not match what the app expected
- **Library and dependency compatibility** — a package was missing, or the version was wrong

Docker packs the app, its libraries, and its dependencies into an **image**. Run that image and the app gets the same userspace every time.

Containers on a host all share that host's kernel. The image is the set of files that sits on top of it.

# 2. Containers

A container is a running environment with its own processes, network, and mounts. Every container on the host shares that host's kernel.

Docker used to create containers with **LXC**. From version 0.9 (2014) it used its own **libcontainer**. That code became **runc**.

**OCI** (Open Container Initiative) is the open spec for the container runtime and the image format. **runc** is the reference runtime for that spec.

Starting a container today:

1. **dockerd** takes the request
2. **containerd** manages the container
3. **runc** creates the process

# 3. Images

An image is a read-only package of the app, its libraries, and its dependencies.

A container is a running copy of an image. Build or pull the image once, then start as many containers from it as you need.

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

