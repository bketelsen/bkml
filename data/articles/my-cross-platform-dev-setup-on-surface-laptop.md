---
publish_date: "2017-09-29"
image: 2017/09/desktop
tags:
  - development
  - linux
  - windows
title: 'My Cross-Platform Dev Setup on Surface Laptop'
excerpt: A setup that works well using Windows 10 and WSL
profile: bketelsen

---

I want to document a setup that I've found that works really well for me using Windows 10 and [Windows Subsystem for Linux](https://blogs.msdn.microsoft.com/wsl/2016/04/22/windows-subsystem-for-linux-overview/) for general development. Before we dive into any specifics, though, I want to provide some background and explain my objectives which will help to frame the decisions I've made and the trade-offs chosen to reach a more ideal environment.

### Objective

My objective is to build a development environment that is comfortable for Open Source development with a target of mostly Linux servers. I develop primarily in [Go](https://golang.org) but infrequently do some Javascript and HTML work too. Prior to this setup, I have been using a Linux dev machine either directly or remotely over SSH. My ultimate goal is to replicate a Linux development environment without having to use a separate machine.

### Trade Offs

There are some implicit trade-offs in this setup, and I will acknowledge them along the way. I recognize that this setup isn't perfect, but I've found it to be very comfortable with very few limitations.

### Preferences

It's also useful to acknowledge my personal preferences, since they obviously inform these decisions. I prefer to develop completely in Linux. I prefer not to have to fight to use Linux as a primary desktop operating system. I prefer to have only one computer. I prefer [neo]vim for most editing, but reserve the right to use a GUI when I want to. Another preference that is important here: I really dislike local VM's for development. They get lost, they aren't sharable, file sharing between host and VM is flaky. I just can't use a local VM for development work.

### The TL;DR

<iframe width="560" height="315" src="https://www.youtube.com/embed/_y2e4QaUktQ" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

### The Setup

- **Surface Laptop:** i7, 16GB RAM, 512GB SSD, Surface Dock
- **Operating System:** Windows 10 - Insider Edition
- **Shell:** Windows Subsystem for Linux (also called Windows Bash)
- **Code Editors:** neovim and Visual Studio Code

### Configuration

There are a few key components to this configuration that make it unique, and improved my happiness dramatically.

#### Where to put the code

I store my code in Windows. For the past year I treated the WSL filesystem and the Windows filesystem as two separate entities with a hard border between them. WSL allows you to access the Windows filesystem through a mount at '/mnt/c' which is awesome, but viewing those files in WSL just bothered me because the permissions show as '777' with an owner of 'root'. This bothers me most because of the ugly display of these permissions in bash. Like many people, I had an alias in my bash settings to append "--color=auto" to my 'ls' calls. This causes files with excessive permissions to show up in black text with a bright green background.

> It drove me crazy, and blocked me from even looking at the windows filesystem from bash.

![uglycolors](/static/images/2017/09/uglycolors.png)

That meant that my source code was only in WSL's filesystem, and completely invisible to Windows. In turn, this caused limitations on what I could do with the code. Because it was only in WSL, I had to operate on the files using either command-line tools, or X Windows tools using an X Client from Windows. It wasn't a show-stopper, but it was a little awkward.

I don't know why it didn't occur to me before, but I just removed the "--color=auto" settings in my .bashrc last weekend, and suddenly I was perfectly happy looking at files on the Windows filesystem from WSL's bash. ![nouglycolors](/content/images/2017/09/nouglycolors.png) No strange colors, no mental block about viewing the files! This was actually a pretty big turning point for me. As crazy as it may sound, just removing coloring from my bash prompt unblocked me from using and viewing the Windows filesystem from WSL. Tiny change, huge mental gain. I moved my code from WSL to the Windows filesystem:

```
mv ~/src /mnt/c/projects
```

Then I set my $GOPATH to "/mnt/c/projects" and Go worked beautifully from WSL.  I also installed Go on Windows and set my GOPATH to "C:\projects", which is the same folder.  Now I have one folder accessible to both WSL and Windows. Because Go stores compiled libraries in a folder named after the architecture under "$GOPATH/pkg", I can compile from both Windows and Linux without overwriting any object files or binaries.

> That's pretty damn nice.

On the Windows side, I installed Visual Studio Code and set it up to use the Windows installation of Go for all the tooling required by the VSCode plugin for Go. The only change to my VS Code configuration file was to specify the global $GOPATH:

```
{
    "go.gopath": "c:\\projects"
}
```

This setup uses the Windows Go installation to do code linting and other niceties that the VS Code Go plugin provides. It also allows me to switch Go toolsets easily between Windows and Linux. To build in Windows, I just open Powershell. To build in Linux, I open a WSL prompt. 90% of the time, I'm using Neovim in WSL anyway, but it's really nice to have VS Code working on the same files. It's also really nice to be able to build and test an app in Windows easily.

### Docker

I installed Docker for Windows, and installed the "docker" command in WSL. To let Docker work against the Windows installation, I needed to export "DOCKER_HOST" in my .bashrc

```
export DOCKER_HOST=tcp://127.0.0.1:2375
```

It's also necessary to tell Docker for Windows to listen on TCP:
![dockersettings](/static/images/2017/09/dockersettings.png)

Now Docker works from both Windows and WSL. All my code and scripts that expected a local Docker instance continue to work as they did when I was developing directly on a Linux host.

### The Kicker

The Surface Laptop is an awesome little machine. It is roughly the same size as a MacBook Air, but it has a full touch screen that allows you to use the Surface Pen to draw. The sound is fantastic; some of the best speakers I've ever heard on a laptop. The keyboard is comfortable, and the cool fuzzy leather keyboard cover is comfortable and prevents that awful pain many of us experience when resting your hands on a MacBook for too long -- from those sharp edges on the case.

But maybe most exciting is using the Surface Laptop with the [Surface Dock](https://www.microsoft.com/en-us/store/d/microsoft-surface-dock/8qrh2npz0s0p/hpr1?OCID=AID620866_SEM_WcsVqgAABYJtT8Nn%3a20170929022339%3as). The dock has several USB ports, two mini Display Port ports, and audio out. When I want to work at my desk, I just plug the single (slightly awkward) dock plug in to the side of the laptop and close the lid. I get my nice WASD Code mechanical keyboard, a big 4k monitor, and all the comforts of working on a desktop. Reliable and easy docking is something I missed terribly in both Linux laptops and macOS. Single plug, simple docking experience. I love this probably most of all.

### Summary

None of this is revolutionary, but the setup as a whole makes me happy. I have all the comforts of a consumer-grade operating system (Windows), so I can easily use Skype, Slack, Microsoft Teams, Outlook, etc without fighting to install them on Linux, or worse -- settling for a nasty web interface.
I also have all the benefits of a full Linux development environment. I can use "apt" to install any packages I want, I use Neovim, all my dotfiles work perfectly in WSL. It's a full Linux development environment without a VM.
**This setup has enabled me to go down to a single computer for my day-to-day usage.** Only one computer on my desk now, instead of the three that were there before. I haven't turned on my MacBook Pro in almost a week.
