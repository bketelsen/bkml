---
title: Windows for Open Source Development
publish_date: '2020-02-24'
image: h3GAGi5tXMU
excerpt: A Series on Using Windows for Open Source Development
tags:
  - windows
  - linux
  - open source
  - 30daywslchallenge
profile: bketelsen

---

I've long used macOS or Linux when I make my Open Source contributions, but I think that the time is right to try Windows as a full-time development environment. If you want to jump on board, this article series is for you!

## A Guide for Open Source Developers Moving To Windows

In this first article we'll start with the installation and configuration of the Windows Subsystem for Linux, and get you to the point where you can clone and compile/run your OSS projects.

The series will continue with other articles and advice on using Windows as your daily driver if you're used to macOS or Linux desktops.

### Preface

In a discussion with [Rob Conery](https://twitter.com/robconery) I made the bold statement that with the addition of the [Windows Subsystem for Linux 2(WSL2)](https://docs.microsoft.com/en-us/windows/wsl/wsl2-about) there were no blockers for the average Open Source developer to use Windows as a daily driver.

To put my money where my mouth is, I've (personally) purchased a [Surface Laptop 3](https://www.microsoft.com/en-us/surface/business/surface-laptop-3), and I'm going to use it as my daily workhorse for the next 30 days. We'll call it the #30DayWSLChallenge.

Find other articles in this series [with this link](/tags/30daywslchallenge/).

### Assumptions

_This guide is for you if you're traditionally a macOS or Linux desktop user and you're looking for information on how to use a Windows 10 device with Windows Subsystem for Linux as your primary development environment._

- I’m assuming you’re coming from a \*Nix system like MacOS or a Linux distribution
- I’m assuming you’re looking for a setup on Windows that feels like the dev environment that you already have
- I’m assuming that you’re familiar with the bash or zsh shell, and have basic skills on the command line
- I'm assuming that you're open minded enough to stay with the switch beyond the first few days of discomfort with something new

## Getting Started

As an open source developer, almost all the projects I work on are best developed on Linux. My goal in this guide is to set up a modern Windows 10 environment that rivals the development experience on Linux while providing the comforts of a mainstream operating system. And by "comforts" I mean things like working audio, long battery life, and stable office suites. Linux has come a _long_ way, but it's still hard to make it a daily driver for most people.

## Installation

After unboxing your new laptop the first thing to do is rename it. Windows comes with a randomly generated host name by default. Yuck!

- Rename your PC

`Desktop-R4NDH3X` isn't my speed. When it asks you to reboot, you can choose the "later" option, we have plenty of rebooting coming up.

Go to `Start > Settings > System > About` and click the `Rename this PC` button. I like to name my computers after [planets in the Dune series of novels](https://dune.fandom.com/wiki/Category:Planets), but you do you...

![Rename PC](/static/images/wsl/renamepc.jpg)

- Move to Windows Insider to get beta builds.
  Update:
  -- This is no longer necessary, WSL2 is enabled in current and previous releases of Windows now --

Open the Start Menu, then choose Settings, then Update & Security

![Insider](/static/images/wsl/insider.png)

Add or link an account, and set up [Windows Insider](https://insider.windows.com/en-us/) preferences to be either ["Slow Ring" or "Fast Ring"](https://insider.windows.com/en-us/how-to-pc/#about-rings) to enable WSL2. Enabling Windows Insider will require a reboot. Slow ring is the minimum required for WSL2 (build 18917 or higher), Fast ring has all the latest features and potentially some bugs that could prevent you from being productive. Use your judgement to choose which to install based on your tolerance for risk.

- Windows Update

Now go into Windows Update and get the updates. One of them will be the version that enables WSL2. When all your updates are installed you can proceed.

- Install the new Microsoft Edge (optional, but awesome)

Head to the [edge download site](https://www.microsoft.com/en-us/edge) and install the new version of Microsoft Edge. It's based on Chromium and a lot nicer than the older Edge. Be sure to checkout the multiple profile support. I have profiles for different contexts (work, banking, personal) and really enjoy the separation of cookies.

It will be automatically installed after an update or two, so this isn't critical, but it's nice to get it out of the way up front.

- Install the features to enable [WSL2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install)

Open PowerShell as an Administrator:

![Elevated Access Powershell](/static/images/wsl/wsl-powershell-admin.png)

run these two commands:

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

This enables the Virtual Machine Platform, which gives us the hypervisor from HyperV without installing HyperV. It is also available on Windows 10 Home, which has previously been a blocker for developers who want to run Docker, etc, on Windows 10 Home edition.

- Microsoft Store

Open the Microsoft Store app and install any updates that are pending. If you want to use X11 applications from WSL you'll need an X server too. I use [X410](https://token2shell.com/x410/) and heartily endorse the purchase if you can catch it ON SALE, like it is now for $9.99 US. Don't pay full price though, there are others that are available if X410 isn't on sale.

Install [Ubuntu](https://www.microsoft.com/store/productId/9NBLGGH4MSV6) from the Microsoft Store. Don't pick a versioned app, just choose the `Ubuntu` app without a version. It follows LTS.

![Ubuntu](/static/images/wsl/microsoft-store-ubuntu.png)

Let's and make WSL 2 our _default_ per the [Installation Instructions for WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-install). If we don't do this we risk running WSL 1 accidentally and WSL 2 has _much_ better performance. Let's open a terminal and run:

```
wsl --set-default-version 2
```

Install [Windows Terminal](https://www.microsoft.com/store/productId/9N0DX20HK701). The new Windows Terminal is a solid terminal emulator, and you'll feel at home here if you're used to iTerm2 or Gnome Terminal. I didn't mark this as optional, because you're used to using a real terminal, and Windows Terminal is the only thing that will satisfy you. Trust me on this.

![Windows Terminal](/static/images/wsl/windows-terminal.png)

- Open the `Ubuntu` app from your Start menu

![ubuntu](/static/images/wsl/wsl-first-run.png)

After a moment, it will ask for a username and password. These are your credentials inside the Linux world. You can choose any \*nix friendly username.

![success](/static/images/wsl/wsl-success.png)

- Download and install Visual Studio Code

Go to [the VS Code website](https://code.visualstudio.com/Download) and download it. Install it when the download is complete.

- Pin VS Code and Windows Terminal to your start menu (and maybe your taskbar)

![pin](/static/images/wsl/pintostart.png)

- Install the Remote WSL extension in Visual Studio Code which is part of the [VS Code Remote Development extension pack](https://code.visualstudio.com/docs/remote/remote-overview#_remote-development-extension-pack)

![remote](/static/images/wsl/vscode-remote-extensionpack.png)

- Configure Windows Terminal

Open Windows Terminal, then click the "down arrow" next to the new tab button. Choose "Settings".

Find the stanza with your "Ubuntu" installation and copy the `guid`. Paste it into the value for "defaultProfile" at the top of the settings file.

![default](/static/images/wsl/terminal-default-profile.png)

While you're in there, download [Cascadia Code PL](https://github.com/microsoft/cascadia-code/releases) and install it (by double-clicking on the ttf file). Edit your "Ubuntu" profile in the Windows Terminal settings to use the new font:

```
	{
            "guid": "{2c4de342-38b7-51cf-b940-2309a097f518}",
            "hidden": false,
            "name": "Ubuntu",
            "source": "Windows.Terminal.Wsl",
            "startingDirectory": "//wsl$/Ubuntu/home/YOURUSER",
            "fontFace": "Cascadia Code PL",
            "fontSize": 12,
        },
```

Finally, change your starting directory too, by modifying the "startingDirectory" value. Change `YOURUSER` to the username you chose when you installed WSL. Mine was `bjk`. If you don't do this, WSL will start up in your Windows User profile directory, which will be mighty confusing since it's not `$HOME`.

### Sidebar

In the last step we set the starting directory for Windows Terminal's Ubuntu instance to `//wsl$/Ubuntu/home/bjk`. This is an awesome little trick you can use from the Windows side of things to browse your WSL file system. Sometimes Windows Explorer is much easier than using some bash commands to move files around. Speaking of bash commands, by default your `C:\` drive is mounted in WSL at `/mnt/c`. How awesome is that? You can do all kinds of crazy things using these interop tricks. See the references and links below for more.

To navigate there directly enter `\\wsl$` in the address bar of Windows Explorer:

![Windows Explorer](/static/images/wsl/explorer-integration.png)

### Continuing On...

- Install your dotfiles

Mine are on [Github](https://github.com/bketelsen/dotfiles). I created a `git.io` shortcut so I could curl | bash install them. Install yours however you're accustomed. If you're searching for options, I am enjoying [chezmoi](https://github.com/twpayne/chezmoi) these days, my repo is a good starting point, showing how you can do different installation tasks by operating system.

Note that WSL is just Linux, Ubuntu to be precise (get that??). You shouldn't have to modify anything if your dotfiles are already Linux-friendly.

### Docker

Recently [Docker announced](https://docs.docker.com/docker-for-windows/wsl-tech-preview/) a version of Docker Desktop that works very nicely with both the Windows and WSL sides of your development. Impressive reading in that link if you're interested in the technical details. Follow the directions in that link to install and enable WSL2-friendly Docker Desktop.

![Docker from Both Sides](/static/images/docker-two-sides.png)

You can even just [install Docker Engine - Community for Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/) right inside WSL, if you prefer.

Finally, once we have WSL setup the way we'd like, we can export and import our distro(s) to or from a tar file using the [following commands](https://docs.microsoft.com/en-us/windows/wsl/reference#arguments-for-managing-windows-subsystem-for-linux):

```
wsl --export <Distro> <FileName>

wsl --import <Distro> <InstallLocation> <FileName>
```

This allows you to move a WSL installation to a new computer if necessary, or just keep a backup somewhere safe.

### Integrations

If you're in the terminal in a directory you want to edit, you can type `code .`, which will open Visual Studio Code on the Windows side (!! right?? !!) and install the "Remote WSL" extension for you. Crazy awesome stuff.

## Conclusion

From here you are ready to clone a repo and start making changes. Follow along [here](/tags/30daywslchallenge/) as I add more tips and tricks that I discover on my journey to reduce the number of physical and virtual computers required to do my job.

## References and Further Information

- [WSL Tips and Tricks](https://wsl.dev)
- [Awesome WSL](https://github.com/sirredbeard/Awesome-WSL/blob/master/README.md)
- [Windows Subsystem for Linux Documentation](https://docs.microsoft.com/en-us/windows/wsl/about)
- [All WSL distributions in the Microsoft Store](https://aka.ms/wslstore)
