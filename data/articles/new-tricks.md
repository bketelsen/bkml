---
publish_date: "2016-05-04"
image: cubicroot-xyz-rFNVqR2rJE0-unsplash
tags:
  - frontend
  - javascript
title: 'New Tricks - notes as I learn modern front-end development'
excerpt: Notes as I learn modern front-end development
profile: bketelsen

---

I promised [here](https://brianketelsen.com/opensource/) that I would document my progress learning frontend development. This isn't a book-length treatise on the subject, but I do have a few notes about my progress.

It's been a little overwhelming going from zero to having an idea about what I'm doing. Many other people have mentioned it, so I won't belabor the point -- the Javascript ecosystem is huge and confusing. Seriously.

> I played with several different frameworks with varying results. I'm not sure whether my success and/or appreciation of the frameworks is based on my bias and previous learnings, but some are much easier than others to pick up.

- React - I really like React as a concept -- at least what I _understand_ of the concept of React. I have had the most success with React, and accomplished the most here. I really love mixing inline markup with code. That's nice and feels comfortable. Seems like there are too many ways to put together a React project and it felt like the heaviest of all of the things I tried. Still probably my favorite, though.
- Polymer - The Polymer project appeals to me because of the nice UI components, but I had a harder time here due to the lack of documentation and sample projects that I can learn from. I still had moderate success, but it wasn't as easy to understand as React was, especially around how to tie things together using events.
- Vue.js - Vue.js looks nice, but I disliked the strange decoration syntax, which reminds me a bit of Angular. I tried a little "hello world" app and abandoned it due to my distaste for the syntax and concepts.
- Mithril - This one looks really promising, and felt the "lightest" of all of the frameworks I tried. I really disliked the process of assembling the views with javascript functions rather than inline markup (React style). That feels so clunky. Maybe there is a way to use templates, I didn't investigate enough.

Overall, I did make quite a bit of progress on the Javascript side of the equation. I'll keep experimenting and learning. I know I said I wouldn't belabor the point, but do we really need NPM, Webpack, Grunt, Gulp, Bower and all the rest of this mess just to build a web app? I am really unsure of what each of them is supposed to do and where they fit -- which are complementary and which aren't. Seems strange to have a project with bower dependencies and npm dependencies vendored in two different folders. And I never did figure out by looking at the configuration files how the app knows where to find those vendored libraries. Too much magic.

As I get more comfortable, I think I'd like to try doing some things with just jQuery or backbone.js - something much lighter and farther down the framework stack to see how it feels. Would love recommendations if you have any.

It hasn't been as hard as I thought it would be. It hasn't really been _fun_ either, though. I suspect with time I'll be more comfortable and I continue to press myself to learn. Thanks for following along.

Post Script:
I've done each of these test projects using either Javascript or TypeScript, but where possible I also did a version using [GopherJS](http://www.gopherjs.org) which I found to be really fun. I have decided not to do my learning using GopherJS because it is an additional layer of translation that is causing me more mental load than it should. I really love that project though, and when I'm feeling stronger in the JS world, I'll move back to GopherJS because it still feels like home. The people in the GopherJS community have been awesome - Luna Duclos, Dominik Honnef, Dmitri Shuralyov, and Bjorn Erik Pedersen have had a tremendous amount of patience with me. Many thanks!
