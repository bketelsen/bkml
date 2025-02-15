---
publish_date: "2015-11-11"
image: markus-spiske-iar-afB0QQw-unsplash
tags:
  - open-source
title: "Caddy and Let's Encrypt"
excerpt: Caddy and Let's Encrypt
profile: bketelsen

---

I spent all of 5 minutes configuring [Caddy](https://caddyserver.com) to automatically pull content from github, post-process it with [hugo](http://gohugo.io) and serve it up with fresh SSL/TLS certificates from Let's Encrypt.

When you think about it, that's pretty damned amazing. Caddy already made web serving easy. It powers everything I do now: gopheracademy.com, gophercon.com and a dozen more. Add hugo to the mix and you have a really powerful publishing platform that is fully automated with just a git push. I really love that Caddy polls my github repository and publishes new content. It's a zero-overhead proposition to publish a new post.

After configuring the Let's Encrypt integration, my esteem for Caddy leveled up to 11. I did almost nothing to enable it. Changed a flag in the command line to invoke Caddy, changed the URL in the Caddy configuration file from http to https. In the background, Caddy requested and installed the certificates for me, and will continue to renew them before they expire. SSL Everywhere is no longer a dream, it's real, it's here, and the tools couldn't be easier to use.
