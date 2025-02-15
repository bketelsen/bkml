---
publish_date: "2017-07-31"
tags:
  - go
  - azure
title: "Learn With Me: Moving Gophercon to Azure"
excerpt: Moving Gophercon to Azure
image: 2017/09/azure
profile: bketelsen

---

I've recently taken on a new role at Microsoft as a Cloud Developer Advocate for Open Source projects on Azure. My purview is Go, Linux, Containers, and Kubernetes. While brainstorming ways to learn about all that Azure has to offer an idea occured to me: Why not move Gophercon over to Azure as a learning tool. I've decided to do just that and share my learnings along the way.

This year we used [Buffalo](https://gobuffalo.io) and [Ponzu](https://ponzu-cms.org) as the main components of the website for Gophercon. Generally it was a huge improvement over our previous [hugo](https://gohugo.io) workflow, because Ponzu allowed us to get non-technical people contributing content. Hugo is amazing, but requiring `git` limits the people who can edit the site.

For 2018 I want to step up my game and build the site using [GopherJS](https://github.com/gopherjs/gopherjs). [Paul Jolly](https://twitter.com/_myitcv) has built some really clean React bindings for GopherJS, and I think this is a good opportunity for me to polish up my frontend chops which are sorely lacking.

Since we don't really need the site to be functional until roughly the end of December (beyond a placeholder page) that gives me an opportunity to get all of this worked out and setup. Here are my goals:

- 100% Continuous Integration and Continuous Delivery
- Enable content editors/creators to publish without a `git` workflow
- Explore as much of the Azure ecosystem as I can during the process
- Favor Go projects where I can, but choose the right tools for the job
- Use CDN for static assets

Last year, [Ashley McNamara](https://twitter.com/ashleymcnamara) was my partner in crime for the GopherCon website. She's graciously agreed to continue in this role for 2018, so we'll be learning together for some of this.

I'm excited to learn new things, and share as I go. Thanks for coming along for the ride.
