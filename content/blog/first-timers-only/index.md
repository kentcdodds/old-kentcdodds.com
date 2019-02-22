---
slug: first-timers-only
title: First Timers Only
date: '2015-08-04'
author: Kent C. Dodds
description: _A suggestion to Open Source project maintainers..._
keywords:
  - Open Source
  - Friendliness
  - Inclusion
banner: ./images/banner.jpg
---

## First Timers Only

I've started doing something recently that's been really rewarding. I'm the
maintainer of [angular-formly](https://github.com/formly-js/angular-formly) a
fairly popular library for forms with [AngularJS](https://angularjs.org/). I've
committed a lot of code and the library has
[33 contributors](https://github.com/formly-js/angular-formly/graphs/contributors)
right now. For at least five of these contributors, it was their first time
contributing to an open source library.

I've tried really hard to make it easy to contribute to angular-formly. I've
done all of the common things an open source project maintainer does and some
less common things...

- Set up the (often ignored)
  [CONTRIBUTING.md](https://github.com/formly-js/angular-formly/blob/master/CONTRIBUTING.md)
- Try hard to organize the code and comment where necessary
- Add an
  [up-for-grabs](https://github.com/formly-js/angular-formly/issues?utf8=%E2%9C%93&q=label%3Aup-for-grabs+)
  label (and angular-formly is now on
  [up-for-grabs.net](http://up-for-grabs.net/#/))
- Add a githook (using [ghooks](http://npm.im/ghooks)) that runs the tests and
  checks coding standards with [eslint](http://eslint.org/) so people don't have
  the frustration of going back and forth on the PR.
- Use [npm scripts](https://docs.npmjs.com/misc/scripts) so people don't have to
  understand or globally install any build tools

I've even recorded
[screencasts](https://www.youtube.com/watch?v=QOchwBm9W-g&index=5&list=PLV5CVI1eNcJi7lVVIuNyRhEuck1Z007BH)
to demonstrate how to get things setup. But what I didn't realize was that there
was still something missing...
