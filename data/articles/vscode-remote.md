---
title: VS Code Remote Development
image: fpoHihXiMhg
excerpt: Use VS Code against a remote computer or container
tags:
  - vscode
  - development
publish_date: "2018-12-05"
profile: bketelsen

---

The [Visual Studio Code](https://code.visualstudio.com/) team just [announced](https://cda.ms/RN) perhaps the most eagerly anticipated feature yet. Remote editing.

[Twitch Stream - Mac to SSH](https://www.twitch.tv/videos/419428954##)
[Twitch Stream - WSL & Containers](https://www.twitch.tv/videos/419800747)

### Remote Editing

An [extension pack](https://aka.ms/VSCodeRemoteExtensionPack) was released today that consists of three related extensions to Code.

- [Remote - WSL](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)
- [Remote - Container](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

These extensions enable development from a local VS Code instance against a remote environment. And they're a dream come true for me.

Each of these extensions allows you to run VS Code on `some computer` but the code and tools are on `some other compute device`.

#### Remote - WSL

If you're a Windows user, you know the frustration of working on a project that expects to be developed in Linux. There are hacks and workarounds for using VS Code in Windows and keeping the development tools in WSL, but the [remote-wsl](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) extension solves this problem officially. You use Code in Windows, but the dev tools and environment live in WSL. Talk about the best of both worlds!

#### Remote - Container

With the [remote-containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) plugin, you add a Dockerfile and a configuration file to your project and VS Code will automatically prompt you to spin up the container as your development environment. It will mount your code inside the container, and run as if you are developing inside the target environment.

This is the `perfect` way to ship a pre-configured development environment for an Open Source project, for example. I'm really excited to add this to several of my projects.

#### Remote - SSH

Of the three, I will probably use this one the most. In fact I'm using it to write this blog post.

![remote-ssh](/static/images/remotessh.png)

The [remote-ssh](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension uses an SSH client on the host to communicate with a remote computer. If you have a beefy development machine (either locally or in the cloud), this is the perfect way to keep your development experience stable no matter what computer you're sitting at. No more syncing unfinished code between machines for me.

The extension even does port forwarding over your ssh connection. When you start your website or service, it will forward that port for you to the local machine.

![remote-menu](/static/images/remotemenu.png)

I've been using the preview version of these three extensions for a few weeks now, and I couldn't be happier with the setup. I've used them from a Mac, from a Chromebook with Crostini, from Linux, and from Windows. It works equally well across all platforms.

Go forth and remotely develop!
