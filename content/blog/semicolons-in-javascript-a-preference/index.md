---
slug: semicolons-in-javascript-a-preference
title: 'Semicolons in JavaScript: A preference'
date: '2015-11-16'
author: Kent C. Dodds
description:
  _An argument for why use of semicolons in JavaScript source is a preference_
keywords:
  - JavaScript
  - ES6
banner: ./images/banner.jpg
bannerCredit: '[ImageGenerator.net](http://www.imagegenerator.net/create/clippy/)'
---

Semicolons in JavaScript has got to be one of the worst
[bikeshedded](https://en.wikipedia.org/wiki/Parkinson%27s_law_of_triviality)
topics of all time (right after spaces vs. tabs... 2 spaces please).
[Here](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)
[are](http://inimino.org/~inimino/blog/javascript_semicolons)
[three](https://www.youtube.com/watch?v=gsfbh17Ax9I) resources on the subject of
why semicolons are not necessary. Here's some criteria that need to be in place
before I will sanction omitting semicolons in a project.

#### Transpilation and/or Uglification

The first thing that you need to know is something called Automatic Semicolon
Insertion (ASI). It's the "feature" that allows us to even have this
conversation. Read up on that if you're not familiar. Like
[Kyle](https://medium.com/u/5dccb9bb4625)
([post](http://blog.getify.com/not-all-semicolons/)), I agree that you **should
not** rely on ASI. It's a really bad idea for many reasons.

The problems with relying on ASI go away when you transpile or minify your code
(depending on your technology). For example, transpiling with
[Babel](http://babeljs.io/) will add the semicolons back and uglifying with
[UglifyJS2](https://github.com/mishoo/UglifyJS2) will too.

So for me to say you're good to go on omitting semicolons in your source code,
you first need to make sure that whatever you end up shipping to production
(whether browser or node) has the semicolons added back.

#### Linting the bad parts

There are a few gotchas with ASI. However, if you are using ESLint and you
enable the
[no-unexpected-multiline](http://eslint.org/docs/rules/no-unexpected-multiline)
rule, then you're safe. Just make sure that your build pipeline will fail if
that rule is broken because most assuredly your app will! You may also be
interested in the [semi](http://eslint.org/docs/rules/semi) rule.
