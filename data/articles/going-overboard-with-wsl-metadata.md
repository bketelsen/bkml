---
publish_date: "2018-03-10"
excerpt: Use a folder from your Windows drive as your $HOME directory in WSL
image: 2018/03/windows-side
tags:
  - wsl
title: 'Going Overboard with WSL metadata'
profile: bketelsen

---

### Nerd Sniped

It all started with a simple tweet from [@nunixtech](https://twitter.com/nunixtech):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/VirtualScooley?ref_src=twsrc%5Etfw">@VirtualScooley</a> <a href="https://twitter.com/richturn_ms?ref_src=twsrc%5Etfw">@richturn_ms</a> <a href="https://twitter.com/tara_msft?ref_src=twsrc%5Etfw">@tara_msft</a> <a href="https://twitter.com/CraigWilhite?ref_src=twsrc%5Etfw">@CraigWilhite</a> <a href="https://twitter.com/benhillis?ref_src=twsrc%5Etfw">@benhillis</a> In order to Thank You for the new Distros, here is a small hack from your &quot;favorite&quot; WSLCorsair. the mount options might need some review though. <a href="https://twitter.com/bketelsen?ref_src=twsrc%5Etfw">@bketelsen</a> this might help you (do I enter the HAT gift list? ?) <a href="https://t.co/7ouUX5Jm3h">pic.twitter.com/7ouUX5Jm3h</a></p>&mdash; Nuno do Carmo (@nunixtech) <a href="https://twitter.com/nunixtech/status/971145708018466816?ref_src=twsrc%5Etfw">March 6, 2018</a></blockquote>

Nuno showed how to use new [metadata support](https://cda.ms/hs) in Windows Subsystem For Linux to enable Linux permissions and metadata on a mounted Windows share. Never content to let a good hack go unexplored, I wanted to see if it was possible to make a Windows folder be my WSL home directory with no adverse side-effects.

### The Setup

I started with an existing and well-used WSL installation of Ubuntu. My first step was to replicate Nuno's example, mounting a Windows shared drive with appropriate Linux metadata. It worked well. But I wanted to make that directory my `$HOME`, and have access from both Windows and WSL with no penalties or worries about permissions or corrupted files.

I created a folder on my `C:\` drive called `home`. I then shared the directory as Nuno did so it could be mounted from `/etc/fstab` on the WSL side of things.

### First Attempt

The first thing I tried doing was changing my `/etc/fstab` entry for the mounted share to mount it at `/home/bketelsen`. It worked, but of course it replaced my existing home directory with the mounted one. I reversed my change in `fstab` and made a new mountpoint at `/home/bketelsen2`. I mounted the Windows share there, then used `rsync` to copy my old WSL-only home into the mounted directory:

```
$> rsync -azvh /home/bketelsen/ /home/bketelsen2
```

This took quite a while to complete because my home directory in WSL was full of code. When it finished, I had a full copy of my WSL home `/home/bketelsen2` directory which was mounted from `C:\home`. On the Windows side, the `C:\home` directory shows all of my WSL files:

![Windows Side](/static/images/windows-side-1.PNG)

That's pretty slick! Now all I needed to do was make that my $HOME and I'd be set.

> Narrator: Nothing is ever that easy.

[Nuno's post](http://wslcorsair.blogspot.ch/2018/03/wsl-one-home-to-host-them-all.html) shows mounting the Windows share using `/etc/fstab` which works, but I couldn't get the extra `metadata` flag in the mount line to actually make metadata support work. I don't know if this is by design, or an omission, but I didn't notice it until I tried making an ssh connection and my ssh keys had overly broad permissions. After changing the keys' permissions, it still failed. The `chmod` command didn't apply the expected permissions.

### Second Attempt

I pondered a bit and realized that I was dealing with Linux, and mounting the share at `/home/bketelsen` was only one way to solve the problem. The other way is to change my home directory's location in the Linux user database. Specifically, using the `usermod` command:

```
sudo usermod -d /mnt/c/home bketelsen
```

This is the right command, but it fails because the WSL process is spawned as a `bash` process started by my user, `bketelsen`. There can be no processes running as `bketelsen` when you make the `usermod` change, so that approach wouldn't work. I searched for ways to launch WSL directly as the root user, but in the middle of that search I remembered that the home directory is actually specified in `/etc/passwd`:

```
bketelsen:x:1000:1000:,,,:/home/bketelsen:/bin/bash
```

YES! I edited this file to reflect my new desired $HOME directory:

```
bketelsen:x:1000:1000:,,,:/mnt/c/home:/bin/bash
```

Closing and re-opening WSL confirmed that my WSL `$HOME` directory was now `/mnt/c/home` which contained all the files that were previously stored in `/home/bketelsen`. I quickly created a text file from the Windows side at `C:\home\thing.txt` and verified that it existed on the WSL mount too.

### SUCCESS

With this setup, I have a single folder -- `C:\home` -- available in Windows, but also mounted as my WSL `$HOME`, too. Files can be modified on either side, with no apparent ill effects. **_Editors Note: This is unproven, and not for risk-averse people. Use this setup at your own risk. Backup your data._**

![wsl-side](/static/images/wsl-side.PNG)

### One More Thing

Because too much is never enough, I wanted to prove that this would work for more than one WSL installation. So I installed the just-announced Debian WSL app, and applied exactly the same change to my `/etc/passwd` file and `/etc/wsl.conf` files.

![debian-installer](/static/images/debian-installer.PNG)

Now I have two different Linux installations in WSL: Ubuntu and Debian. They have separate root filesystems, but a single shared `$HOME` directory:

![debian](/static/images/debian.PNG)

This is extremely cool. I set up my Go development environment on the Windows side using [Visual Studio Code](https://cda.ms/ht) but set the `$GOPATH` to `C:\home\go`, which is the same as `$HOME/go` on the WSL side. Now I can develop in Windows or WSL/Linux against the exact same code without any strange permission problems. Most of the time I'll probably stay in `neovim`, because it's my first love. But there are no issues when I use VS Code from the Windows side. I can compile and test from both Windows and Linux with the same source directory.

Here's the contents of my `/etc/wsl.conf` for your perusal:

```
# Enable extra metadata options by default
[automount]
enabled = true
options = "metadata,umask=22,fmask=11"
mountFsTab = true

# Enable DNS – even though these are turned on by default, we’ll specify here just to be explicit.
[network]
generateHosts = true
generateResolvConf = true
```

Thank you to [@nunixtech](https://twitter.com/nunixtech) for the idea that spawned this probably-evil hack. I'm unreasonably delighted with how cool this little hack is, and it opens a lot of other possibilities for other potentially unauthorized or dangerous hacks, too. If you've done something equally unorthodox with your WSL install, tell me about it on [twitter](https://twitter.com/bketelsen)!

### Update

I realized after this worked that the next logical progression of this experiment was to share the same $HOME between Windows and WSL.  TLDR; It works perfectly.  I updated my `/etc/passwd` home directory entry to `/mnt/c/Users/bkete`, moved the contents of the `c:\home` directory into `c:\Users\bkete`, and now I have a single shared home directory between Windows and WSL.  Here's a picture of my OneDrive directory being accessed from WSL as `$HOME/OneDrive`:

![onedrive](/static/images/onedrive.PNG)
