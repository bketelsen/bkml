---
title: Byobu on WSL
publish_date: "2019-10-09"
image: mbLr6NEatMI
excerpt: 'Make your life easier with Byobu'
profile: bketelsen
tags:
  - terminal
profile: bketelsen

---

[Byobu](http://byobu.co/) is a frontend for `tmux` and `screen` that allows you to save your terminal sessions and reconnect to them easily. It's one of the biggest time-savers in my bag of tricks. Read along to learn how I use it. This article applies to any \*nix-like system, despite the "on WSL" in the title.

### Installing

You can install Byobu on nearly any \*nix-like operating system. Since I'm using Ubuntu and Debian, I'll use `apt` to install the version that is shipped with the OS:

![byobu check](/static/images/byobucheck.png)

Once installed it's easy to start a session, just type the `byobu` command:

![new session](/static/images/byobuopen.png)

### Enabling

You can continue to use `byobu` this way, manually, but the real power of `byobu` comes by enabling login/ssh integration. From your shell prompt, type the command `byobu-enable`. This will enable a wrapper script that wraps your login session with a `byobu` session. You can disable this with `byobu-disable`.

With `byobu` in "enabled" mode, every time I open a terminal it drops me into either an existing `byobu` session if one exists, or creates a new one for me. It's a delightful way to resume where I left off without having to worry about whether I started a `tmux` session.

### Usage

In stark contrast to `tmux` and `screen`, `byobu` is pretty easy to use. By default it uses mostly function keys to manage your session. In the background, `byobu` issues appropriate commands to `tmux` or `screen` on your behalf, so you don't have to remember those crazy control sequences.

#### Windows

Once inside a `byobu` session, you can create multiple windows inside your terminal session. If you've used a terminal client that supports tabs, this isn't much different. The benefit is that your windows are persisted with your session. So you can exit and resume your session with all your windows intact.

![single window](/static/images/byobunvim.png)

Windows are labeled with a number in the status bar at the bottom of the screen. Press `F2` to open a new window and you should see a second terminal appear:

![second window](/static/images/byobuwin.png)

Now I have two windows open, labeled `0:neovim` and `1:` in the taskbar. I skipped a step here and renamed my original window so I wouldn't get lost when I add more than one. Press `F8` to rename a window. Note that the window name is just for decoration, it doesn't relate to running processes at all.

To navigate between your windows, use `F3` and `F4` for previous and next windows.

#### Splits

Sometimes, I like to have two different terminal applications running in one window. For example, when editing this blog:

![split](/static/images/byobusplit.png)

The top part of the split has `neovim` editing the content of this post. The bottom part of the split is the output of `hugo` as it watches the content directory.

Create a split by using `Shift F2` and `Control F2` for horizontal and vertical splits, respectively.

I can change back and forth between splits using `Shift + F3` and `Shift + F4`. That's easy to remember, because it's just adding `Shift` to the keys I use to change windows.

Resizing splits is accomplished with `Shift + Alt + [arrow key]`

#### Closing the Terminal

When I'm done working in the terminal, but not finished with a particular task, I use `F6` to detach from the `byobu` session. This closes the active terminal window, but keeps `byobu` and all my windows running in the background. Reoping my terminal window automatically re-attaches me to my `byobu` session as if I had never left.

### Reference / Links

Adding `byobu` to my toolbelt drastically cut the amount of time it takes to engage with a project I need to walk away from. I have a hard time guessing, but I think I'm saving an hour or more per week at a minimum. That's a lot of time.

- [Ubuntu Wiki: Byobu](https://help.ubuntu.com/community/Byobu)
- [Byobu Documentation](http://byobu.co/documentation.html)
