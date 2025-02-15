---
publish_date: '2017-12-13'
tags:
  - wsl
title: 'Getting Crazy with Windows Subsystem for Linux'
excerpt: Getting Crazy with Windows Subsystem for Linux
image: 2017/12/startmenu
profile: bketelsen

---

Lately I've been on a [mission](https://blog.gopheracademy.com/advent-2017/repeatable-isolated-dev-environments/) to separate my development environments by project, and by category (personal/work/Gophercon/etc). The writeup on the Gopheracademy blog describes a fun way to create an isolated container-based environment for each project by using LXD on Ubuntu.

Last night I wondered to myself if there was a way to get a similar experience by manipulating [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/faq) somehow. That was a rabbit hole of searching, let me tell ya true.

Since the [Fall Creator's Update](http://www.zdnet.com/article/windows-subsystem-for-linux-graduates-in-windows-10-fall-creators-update/) WSL has had more than one distribution available to install. You can install SUSE, Ubuntu, and soon Fedora. So deep down in my soul, I KNOW that I can have multiple copies of Ubuntu running with separate filesystems. That would reproduce the LXD environments I created in Linux.

After some research, it turns out that the WSL management API is available in the Windows SDK, and several projects already take advantage of this fact. First I found [this one](https://github.com/yuk7/WSL-DistroLauncher) which allows you to do a lot of work and install any Linux distro you want. I knew I was on the right track. My next big find was [LxRunOffline](https://github.com/DDoSolitary/LxRunOffline) which was built to allow you to install WSL without being online. It also has the secondary ability to let you install any number of WSL instances. Now we're cooking with gas!

I downloaded `LxRunOffline` and read the [wiki](https://github.com/DDoSolitary/LxRunOffline/wiki/Ubuntu), which has links to the Ubuntu root filesystem that is installed during a regular WSL install. Following their instructions, I downloaded the rootfs, put it next to the `LxRunOffline` binary, and installed _another_ copy of Ubuntu as a new WSL instance.

```
LxRunOffline 2.1.1
Copyright (C) 2017 DDoSolitary

ERROR(S):
  No verb selected.

  list                List all installed distributions.

  default             Get or set the default distribution, which is used by bash.exe.

  install             Install a new distribution.

  register            Register an existing installation directory.

  uninstall           Uninstall a distribution

  unregister          Unregister a distribution but not delete the directory containing it.

  move                Move a distribution to a new directory.

  run                 Run a command in a distribution.

  dir                 Get the installation directory of a distribution.

  config-env          Get or set the default environment variables of a distribution. (Currently unusable because of a problem of the command line
                      parser library.)

  config-uid          Get or set the UID of the default user of a distribution.

  config-kernelcmd    Get or set the default kernel command line of a distribution.

  config-flag         Get or set some flags of a distribution. See https://msdn.microsoft.com/en-us/library/windows/desktop/mt826872(v=vs.85).aspx for
                      details.

  help                Display more information on a specific command.

  version             Display version information.


C:\Users\bkete\Downloads\LxRunOffline-v2.1.1\LxRunOffline-v2.1.1>
```

_SuccessKid.jpg_

I repeated this process several times until I had enough instances of WSL for my current project load, each time putting the storage folder in a new path named for its usage -- like `c:\microsoftfs` or `c:\gopherconfs`.

The last step was to figure out how to launch them. I use [wsltty](https://github.com/mintty/wsltty) sometimes as my terminal emulator, and it comes with convenient batch files to launch WSL as a user, as root, and other scenarios. I copied one of those batch files and modified it to point to one of my new Ubuntu instances like this:

### Original

```
%LOCALAPPDATA%\wsltty\bin\mintty.exe -i "%PROGRAMFILES%/WindowsApps/CanonicalGroupLimited.UbuntuonWindows_1604.2017.922.0_x64__79rhkp1fndgsc/images/icon.ico" --WSL= -h err --configdir="%APPDATA%\wsltty"  -~
```

### Modified

```
%LOCALAPPDATA%\wsltty\bin\mintty.exe -i "%PROGRAMFILES%/WindowsApps/CanonicalGroupLimited.UbuntuonWindows_1604.2017.922.0_x64__79rhkp1fndgsc/images/icon.ico" --WSL="Gophercon" -h err --configdir="%APPDATA%\wsltty"  -~
```

In the modified batch file, the `--WSL="Gophercon"` references a registered WSL distribution called `Gophercon` which I created with `LxRunOffline`. I repeated this process for each of the new instances, and changed the icons for them so I can launch them easily from the start menu.

Now I have multiple installations of WSL/Ubuntu that are isolated from each other. Exactly what I wanted. The development workflow is nearly identical to the Linux/LXD version, I open a terminal and start coding.

The end result is that each WSL Ubuntu installation has a separate filesystem, so each project is isolated. Using [yadm](https://thelocehiliosan.github.io/yadm/) I can clone my [dotfiles](https://github.com/bketelsen/dotfiles) and run the included `bootstrap` script which updates the system and installs all the packages I need for development with a single command. That's quick and easy.

Windows looks better and better for Linux development. And the webcam always works...
