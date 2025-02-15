---
publish_date: "2016-11-07"
image: 2017/09/getamac
tags:
  - hacks
  - i3
  - windows
  - linux
  - mac
title: 'Switching - Irony and Operating systems'
excerpt: Moving to Windows from macOS
profile: bketelsen

---

TLDR; I've traded in my Mac on a Surface Pro. Here's why:

I've been whining about Apple and the way they've ignored the power users for quite some time now. I've been using Linux for development for several years, and always wanted a way to run Linux as my primary OS. But the sad truth (for me) is that there are just some things that prevent me from using Linux as my full time operating system. Email might be the biggest, but there are other apps that are missing or just sub-par.

MacOS was always "close-enough" to Linux that most things worked well. Docker made things a little more difficult initially, then a little better with the new Docker for Mac. But it still wasn't Linux, and it's hard to argue that developing on the platform you ship to is the right choice. The OS itself is still visually superior to anything else, but it's been showing the signs of neglect for a few years now. It's clear from Apple's recent announcements that they are a mobile OS/hardware company that happens to sell computers too. They're not sad to lose me, I'm sure.

My article in July about [Windows Subsystem for Linux](/blog/i3-windows/) hinted at my excitement about being able to run a solid desktop OS but still do the open source sort of development that really needs to be done on a Linux type operating system. I abandoned that effort in July because it was still too alpha quality. Too many things didn't work. But it's November now, several builds later and Microsoft is shipping Ubuntu 16.04.1 in the latest Windows Insider releases.

I took the plunge and bought a Surface Pro 4 when Microsoft announced the trade in program (still good until the 10th of November I think...) to give up to $650 off of a Surface device. This Surface is just the right size for an airplane tray, has an i7 and 16GB of RAM, and most importantly the Linux subsystem just works for the most part. I haven't done anything yet that failed. I'm sure there are still things that won't work, but for my primary use -- writing Go applications, teaching Kubernetes and Go, hacking on open source projects -- it all works.

I was even able to run i3 Window manager again. No flaws, no errors. Windows has solid email and calendar applications, and let's face it; Chrome is Chrome on every OS, and we spend more time there than any other app besides the terminal. SPEAKING OF THE TERMINAL, Microsoft has done some serious house cleaning there. The terminal is fast, has true color support, transparency, auto layout correction on resizing, who knows what else has been fixed under the covers? It's 80% of what you'd expect from gnome-terminal. And that's a far cry from the old CMD.exe days.

I don't expect to be running X Windows often, when I'm deep in a hacking session I'll probably open up i3 window manager, it's still the most productive way to code. Neovim and vim-go work perfectly in Windows bash, so it's not a stretch to think I could just have a couple of bash windows open and alt-tab between them. SSH and SCP work perfectly, and I can still cross-compile Go binaries for any platform (like my Raspberry Pi for my bbq app!).

The most amazing part of all of this is that I simply git cloned my [dotfiles](https://github.com/bketelsen/dotfiles) from my Ubuntu installs and ran them un-altered. It's the same experience, but without the hardware headaches that Linux always brings, nor the lack of good quality applications.

<hr/>
I think Apple has lost its hunger, and Microsoft found it.  The tables have turned from the funny switching campaigns with Justin Long looking hip and making fun of the frumpy John Hodgman.  Today's Microsoft is a completely different animal.  They're contributing heavily to open source projects, they've opened up the .Net platform, they're embracing developers and open source enthusiasts openly while Apple counts dollar bills from iPhone sales in a vault in Switzerland somewhere.

I got a lot of amused responses on Twitter when I announced my switch. This environment may not yet be perfect, but my bet is on Microsoft for the future. I'm surprised to be saying that, but the evidence is clear that Apple isn't the company it was under Steve Jobs. And Microsoft isn't the company it was under Balmer. The irony hurts.

[image credit wikipedia](https://en.wikipedia.org/w/index.php?curid=26608065)
