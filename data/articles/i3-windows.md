---
publish_date: "2016-07-03"
image: 2017/09/windows-on-top
tags:
  - windows
  - linux
excerpt: 'Running i3 Window Manager on Bash For Windows'
title: 'Running i3 Window Manager on Bash For Windows'
profile: bketelsen

---

That might be the longest title for a blog post ever, but it's kind of hard to describe what's going on here if you're not familiar with the latest updates from Microsoft land. Here's a quick refresher:

- This spring Microsoft announced [Bash on Ubuntu on Windows](https://msdn.microsoft.com/en-us/commandline/wsl/about), also known as the Windows Subsystem for Linux. Read the post, the FAQ, etc in that link. I'll summarize: Microsoft wants to make Windows the best place for ALL developers to work. A lofty and ambitious goal, to say the least. Their crazy idea -- translate Linux system calls into NT Kernel calls using a small shim layer.

- This is not a virtual machine. The system calls are translated by the shim layer (WSL) and run directly on the NT Kernel.

- This is kind of a Big Deal. If it works, it has the potential to win back many developers who abandoned the Windows platform years ago because of the inability of Windows to deal with the *nix world. The huge popularity of Ruby, Python, Redis, and dozens of other *nix first tools that were born in \*nix. Some of these tools, like Ruby, have Windows installers, but Windows is an afterthought and second-class citizen at best.

- Many developers (like me) started using Windows but moved to Mac or Linux operating systems over the years as it became increasingly hard to write software in Windows.

- [Opinion] Linux isn't the best place to work 100% of the time. Office applications are lacking compatibility and features. There is no decent email client for Linux. Save your apologist comments and _what about Open Office/Geary/Thunderbird_ comments. If you've used them, you know that they're not as nice as the applications available in macOS and Windows.

- [Opinion] macOS is slipping in quality, and falling behind in features. I've grown increasingly frustrated over the past 3 years using MacOS X as my daily driver. Frequent crashes and very poor QA from Apple have lead to an operating system that used to be amazing becoming less so at each release. I used to be a dyed in the wool Mac zealot. Apple eroded my confidence in their operating system to the point that macOS is now where I go to do emails and other administrative tasks, but I do daily development on an Arch linux desktop sitting next to my MacBook Pro. Worse, although macOS is UNIX compliant and has an almost-\*nix like environment available, far too many things don't work in macOS that are required for modern Internet software development. The hacks that we've put up with over the years are a testament to how poor Linux is for administrative work and how nice macOS was for the same.

Given this set of circumstances and opinions, I was more than a little excited when Microsoft announced WSL. It promised to give developers what could be the best of all worlds. A modern and capable desktop operating system -- Windows 10 -- with all of the quality features and support for modern hardware that we would expect. AND a real installation of Ubuntu Linux running along side of it. Not virtualized, running in Virtual Box or Parallels Desktop or VMWare, but right there on my laptop running at native speed. The idea has real promise.

So when I got a new Dell XPS 13 Developer Edition (Ubuntu Pre-installed) the first thing I did was put the latest version of Windows 10 Insider Edition on it. Over the course of a day it updated to Build 14379, which is the latest as of July 2, 2016. I had tried previous builds, but found simple things like git or zsh didn't work well.

Imagine my surprise when I installed Bash for Windows on this build and pretty much everything worked. I cloned my [dotfiles](https://github.com/bketelsen/dotfiles) and ran the post-install scripts that install i3 window manager, neovim, zsh, Go, and all the requisite development tools that I'm used to. Nothing failed. (I didn't try running i3 yet, because I knew there was no X server installed)

_Nothing Failed_

The real shortfall of running Bash for Windows right now is the lack of a good terminal emulator. I tried ConEmu and maybe half a dozen others, with ConEmu being the best of this sorry lot. If you're used to using a good terminal in Linux, none of the tools available on Windows are going to satisfy you.

I knew from my Windows work 20 years ago that there were XWindows servers available. I searched and found MobaXterm. It has a built in terminal emulator (also crap -- sorry), but among the other features included there's a pretty good X Windows server.

I've been in love with i3 window manager since Erik St. Martin introduced me to it 3 years ago. Having such nicely organized and tiled windows over multiple desktops is an amazing productivity boon. With good keyboard shortcuts for every operation, I found I never took my hands off the keyboard.

I started MobaXTerm and looked at the X Server settings. I shrugged, fired up the X Server and typed "i3" in my bash prompt. `i3` complained that there was another window manager already running. I went back to the X Server settings and chose "Windowed Mode: X11 Server constrained to a single window". It was the only X Server that didn't also start a window manager like `dwm` or `fvwm`. So it started a simple "rooted" X Server which appears as a window on my Windows desktop with a black screen.

Returning to bash, I typed `i3` again. Gloriously, the famililar `i3` session appeared. I'm able to install and run Linux GUI applications like Firefox. I have `terminator` running as my terminal emulator. I'm running `zsh` as my shell. Neovim _just works_, as does Go. All of them think they're running on a Linux computer, because for all intents and purposes they are. It just happens to have a Windows NT kernel at its core.

Strange, strange times we live in. 20 years ago Microsoft called Linux a cancer and did everything they could to make it die. Today they're embracing Linux -- and by extension me -- and I have to say I'm really impressed with the outcome.

_This article was created in `neovim` for Linux, running on a `zsh` shell inside `i3 window manager` running in a MobaXTerm X Server on a Windows 10 laptop._

Screen shots:

[i3 in MobaXTerm](//static/images/2017/09/i3.png)
[i3 behind Windows](/static/images/2017/09/windows-on-top.png)
