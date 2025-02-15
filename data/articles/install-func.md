---
title: Bash Helpers for Quick Installs
publish_date: "2020-08-14"
image: 4pPzKfd6BEg
excerpt: 'A quick helper function and directory layout for repeatable software installs.'
tags:
  - linux
  - open source
  - terminal
profile: bketelsen

---

This bash setup is the latest evolution of my quest to make a new system install as fast as possible.

## Speed Up Software Installs with this Bash Trick

I've created a `bash` function that enables quick software installs without being as heavy as something like `ansible`. The system relies on a single function in my `bashrc` and a directory full of bash scripts. Let's dive in and see how it works.

### Installation Scripts

In my dotfiles directory, which is stored at `~/dotfiles` there's a subdirectory called `install`. That directory contains a few dozen bash scripts that install the various software components and packages I might use. Some of them are needed on all the computers I use, some of them are used only infrequently for certain projects. Here's an example that installs Go:

```bash
❯ go.sh
#! /bin/bash
set -e
VERSION=1.15
# Delete existing Go installation
sudo rm -rf /usr/local/go
# Install Go in /usr/local
sudo mkdir -p /usr/local/go && curl -Ls https://storage.googleapis.com/golang/go$VERSION.linux-amd64.tar.gz | sudo tar xvzf - -C /usr/local/go --strip-components=1
```

The script declares a `VERSION` variable so I can change the version to be installed when there's a new release of Go. Then it deletes the existing Go installation and replaces it with a freshly downloaded version. Because it deletes the existing install and replaces it, it can be run more than once with no unwanted side-effects. I've attempted to make all my scripts idempotent like this, but some of them just aren't because my bash skills are just mediocre.

### Installation Function

To use these installation scripts I've created a bash function that searches for scripts in the `~/dotfiles/install` folder matching the first argument of the function:

```bash
inst() {
	if [ -f $HOME/dotfiles/install/$1.sh ] ; then
		echo Installing $1
		. $HOME/dotfiles/install/$1.sh
	else
		echo $1 not found
	fi
}
```

To install Go using this function I would type `$> inst go`, which would search for a script called `~/dotfiles/install/go.sh` and execute it if it exists. It's not complicated, and only took a few minutes to write the function, but I'm getting a lot of ROI on the time I spend writing installation scripts. When I spin up a new VM somewhere, I can quickly clone my dotfiles and install just the bits I need for a particular task.

### Direnv integration

I've been playing with `direnv` integrations to make the installation of required tools or commands automatic when entering a project directory. I haven't found anything yet that doesn't feel too "hacky", so I haven't finished this part.

## Future Ideas

In the future I may extend the script to search for installation scripts with an `arch` component in the file path, like `~/dotfiles/install/linux/go.sh` or `~/dotfiles/install/macos/go.sh`. I don't have a need for this right now because I'm not using my Mac for development work.

I may also consider making `meta` scripts that call others. It might be similar to installing a Development metapackage, where the metapackage simply calls the other packages it wants to wrap.
