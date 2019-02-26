---
slug: >-
  introducing-using-webpack-for-production-javascript-applications-course-on-egghead-io
title: >-
  Introducing "Using Webpack for Production JavaScript Applications" course on
  Egghead.io
date: '2016-06-20'
author: Kent C. Dodds
description: >-
  _I'm so excited to announce the release of my latest course all about
  production Webpack. It was released a few days ago and I've been so..._
keywords:
  - JavaScript
  - Webpack
  - Js
  - Webpack 2
  - Web Development
banner: ./images/banner.jpg
bannerCredit: '[kcd.im/webpack-course](http://kcd.im/webpack-course)'
---

I'm so excited to announce the release of
[my latest course](http://kcd.im/webpack-course) all about production Webpack.
It was released a few days ago and I've been so happy by the enthusiasm of
people wanting to watch the course.

https://twitter.com/kentcdodds/status/743915472626712578

This course is a compilation of 16 lessons (including a
[course intro lesson](https://egghead.io/lessons/tools-intro-to-the-production-webpack-course?course=using-webpack-for-production-javascript-applications))
about some of the more advanced features of Webpack. From
[code splitting](https://egghead.io/lessons/tools-maintain-sane-file-sizes-with-webpack-code-splitting?course=using-webpack-for-production-javascript-applications)
to
[resource hashing](https://egghead.io/lessons/tools-hashing-with-webpack-for-long-term-caching?course=using-webpack-for-production-javascript-applications)
to
[chunking](https://egghead.io/lessons/tools-chunking-common-modules-from-multiple-apps-with-the-webpack-commonschunkplugin?course=using-webpack-for-production-javascript-applications)
to
[tree shaking](https://egghead.io/lessons/tools-tree-shaking-with-webpack-2?course=using-webpack-for-production-javascript-applications)
to
[testing](https://egghead.io/lessons/tools-use-karma-for-unit-testing-with-webpack?course=using-webpack-for-production-javascript-applications)
and [more](https://kcd.im/webpack-course), this course is full of
[useful info](https://egghead.io/lessons/tools-validate-your-webpack-config-with-webpack-validator?course=using-webpack-for-production-javascript-applications)
about Webpack.

In the course I use Webpack 2 (because why live in the here and now, when the
future is just a beta version away? 😎) though most of the concepts translate
really closely (if not exactly) to Webpack 1. All of the source code for the
lessons is available [in this repo](https://github.com/kentcdodds/es6-todomvc)
(see the various branches).

Whether you've used webpack a lot or a little, this course is definitely going
to teach you something new about webpack and solidify your understanding of
concepts you're already familiar with. I recommend you give it a watch at least
once, if not twice. Then use it as a reference as things come up in your
development.

There are definitely more subjects to cover in future lessons. What would you
like to see? [Let me know](https://www.thenpoll.com/#/mm2idt)!

https://twitter.com/kentcdodds/status/744876461929070592

#### Feedback and questions

I've gotten a TON of feedback on this course. It's really been a bit
overwhelming (considering that I went on vacation right after the course was
published). People are enthusiastically pleased with the Webpack course, but at
the same time have plenty to say by way of questions and feedback.

**Isolated lessons vs. follow along**

https://twitter.com/kentcdodds/status/744374161624072192

Originally, it was planned that this would be more of a "Cookbook Course" rather
than a follow along course. Meaning that each lesson would be isolated from the
others so someone could jump into the course at any lesson and learn something
without having to watch the whole course. Based on feedback, I guess this was a
bad call as it made things harder for some to follow along as they eagerly watch
the whole course.

**Misspelling in a lesson**

Another common question has to do with the
[CommonsChunkPlugin lesson](https://egghead.io/lessons/tools-grouping-vendor-files-with-the-webpack-commonschunkplugin)
in which I misspell "vendor" as "vender" and everything still works. I gotta be
honest here. I made a mistake. If you're interested in why it magically worked
anyway, see below. I'll try to have that fixed ASAP. _Yes, they do need to have
the same spelling to work!_

**peerDependencies issues**

Webpack 2 is still in beta, so even though most tools and plugins work great
with it, some do not have the beta version 2 releases in the semver version
range for their
[peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies/). This
caused a problem for people trying to follow along who are still using npm 2
(which will throw an error in this scenario). I've updated the README.md of the
project to indicate that you must use npm 3 (which simply logs warnings
instead). This will hopefully be resolved by the time Webpack 2 is officially
released.

**Is Webpack 2 ready?**

People have asked me whether Webpack 2 is ready for production. Tobias Koppers
(aka [@sokra](https://github.com/sokra), the creator of webpack)
[said](https://youtu.be/admLV6V2eDg?t=1h8m56s) on
[JavaScriptAir](https://javascriptair.com):

> You can try webpack 2. It's pretty stable, if you don't mind small little
> bugs.

I haven't had much trouble when creating this lesson. So feel free to give it a
go!

**What editor are you using!?**

I've been surprised how many questions like this I've gotten. I'm using
[Atom editor](https://atom.io/) in
[vim mode](https://www.briefs.fm/3-minutes-with-kent/16) with
[these plugins](https://github.com/kentcdodds/ama/issues/113) and the
[default font](https://discuss.atom.io/t/what-is-the-default-font-in-atom/374).
