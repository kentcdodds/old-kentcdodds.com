---
slug: what-open-source-project-should-i-contribute-to
title: What open source project should I contribute to?
date: '2015-12-04'
author: Kent C. Dodds
description: >-
  _My silver bullet answer to this frequently posed question, and how to get
  started_
keywords:
  - open source
  - github
  - javascript
banner: ./images/banner.jpg
bannerCredit: '[https://octodex.github.com/repo/](https://octodex.github.com/repo/)'
---

This is a question I've had countless times:

https://twitter.com/sarna_pranu/status/672438850724175872

_Pranu just made his first pull request:
[https://github.com/Automattic/mongoose/pull/3644](https://github.com/Automattic/mongoose/pull/3644)_

https://twitter.com/geraldchecka/status/670445392706736128

And in direct messages, emails, etc. The general gist of it is: "What open
source project can you recommend I start contributing to?" Many of these people
read my
[First Timers Only](https://medium.com/@kentcdodds/first-timers-only-78281ea47455)
post and are hoping to find a project that is friendly to newcomers
[making](https://help.github.com/articles/creating-a-pull-request/)
[pull requests](https://help.github.com/articles/using-pull-requests/).

## The Answer

My silver bullet answer comes from my blog post
[Open Source Stamina](https://medium.com/@kentcdodds/open-source-stamina-dafd063f9932):

> You contribute best to something you use regularly

Where I've found the most satisfaction out of contributing to open source is in
projects that matter to me and (possibly) others. And then contributing to that
project regularly. To do that you need to have an understanding of the use cases
and pains associated with a particular tool or library. This is why I say _it's
best to contribute to something you use regularly_.

What open source libraries/frameworks/tools do you use regularly? Perhaps you're
working with Grunt, Gulp, Webpack, or Browserify and feel like an API could be
improved or documented better. Or maybe you're working with a React library or
Angular module that could use a little polish. One thing's certain, whatever
you're building, you're probably using an open source project or tool that you
could personally benefit from contributing to.

## Contributing

Once you've found the project you want to contribute to, how do you know what to
contribute? Many projects have
[a CONTRIBUTING file](https://github.com/blog/1184-contributing-guidelines).
Look for that first to find instructions for contributing to the project. If
there isn't one, there may be instructions in the README (normally shown on the
homepage of the project). If there aren't any such instructions, you might
submit a pull request to add just a skeleton CONTRIBUTING.md file to start a
conversation about adding one.

Familiarize yourself with the project. Reading documentation is good, but my
favorite way to learn how a project works is by reading the code. My favorite
way to do this is by stepping into function calls with a debugger. For example,
what happens when you call angular.module? (gif below may take time to load,
sorry).

![a gif showing angular.module call in Chrome console](./images/0.gif)

_So nobody feels left out, see_ [_React's_](https://infinit.io/_/QzJrScq.gif)
_and_ [_Ember's_](https://infinit.io/_/XkZD3JH.gif)_ :-)_

Step through the code and you'll learn a lot about how the framework/library
works. Don't worry if you don't understand what's going on right away. That will
come with time. Keep at it. You can do it! You can do this same thing with
non-browser based tools with your favorite node debugger (or just add
console.logs).

Once you've figured out the standards and processes for contributing to the
project and familiarized yourself with its inner-workings a bit, you'll need to
identify the changes that the project needs. I recommend you look at existing
issues and comment on ones you think are interesting. Work with the
maintainer(s) to identify a good implementation and
[make your pull request](https://help.github.com/articles/creating-a-pull-request/)!

If you have your own idea of a bug fix or a feature you want to implement, I
strongly recommend you run it by the project maintainer(s) in a
[GitHub issue](https://guides.github.com/features/issues/) first. Perhaps
they'll say it's out of scope for the project or they're working on it, or they
could give you some direction. You'll waste less time by making sure your pull
request will be accepted before you make it (just like how I was certain my wife
would answer "yes" when I asked her to marry me _before_ I asked 😃).

_Also, see [this page](http://24pullrequests.com/contributing) for more tips on
contributing._

## Your First Pull Request

For your first
[pull request](https://help.github.com/articles/using-pull-requests/), feel free
to just find a random project out there with a good first timer bug/feature and
try your hand at contributing. Let the project maintainer know that you're new
and are wanting some guidance to learn how to get into it. Maybe they're too
busy to help, if so, move on and find another project. That first contribution
is the hardest, you may want some help and coaching. The actual code
contribution matters less than learning the process. So find a project or
someone who has time and patience to mentor you.

You might also be interested in watching my recently released series about how
to contribute to open source projects on GitHub:

[**Introducing: How to Contribute to Open Source**](/blog/introducing-how-to-contribute-to-open-source)

## Resources

Take a look at GitHub's issues for issues labeled
[first-timers-only](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Afirst-timers-only),
[good for beginners](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3A%22good+for+beginners%22+),
[good first bug](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3A%22good+first+bug%22+)
(or
[good-first-bug](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Agood-first-bug)),
or
[help wanted](https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22+)
(more [here](https://twitter.com/kentcdodds/status/672873736974897152)... we
_need_ to standardize on this).

Also, here are good resources for finding simple ways to contribute:

[**Your First PR (@yourfirstpr)**](https://twitter.com/yourfirstpr)

[**first-timers-only (@first_tmrs_only)**](https://twitter.com/first_tmrs_only)

[**24 Pull Requests**](http://24pullrequests.com/)

[**Up For Grabs**](http://up-for-grabs.net/#/)

[**MunGell/awesome-for-beginners**](https://github.com/MunGell/awesome-for-beginners)

[My first PR](http://firstpr.me/#kentcdodds) was to fix a typo in a comment
([find yours](http://firstpr.me/)). It was super small and it was to a project
that I didn't really use all that much (discovered the typo when stepping
through their code in a debugger). It was a great first contribution, even
though I didn't really make a lasting impact on the project and I wasn't
motivated to continue contributing, it got me over the hump of contributing for
the first time which is the hardest part.

## Conclusion

Contributing to open source
[has been awesome for me](https://medium.com/@kentcdodds/how-getting-into-open-source-has-been-awesome-for-me-8480cd756a80)
and I highly recommend others to get into it. It's really hard getting started,
but once you get over the first contribution, making future contributions is
much easier. It's not all roses. The open source community has its warts here
and there. Keep working at it. You'll do great! Good luck!

![thumbs up](./images/1.png)

Do you need an introduction to GitHub and Git? Check this out from GitHub:

[**GitHub for Developers \* GitHub Training**](https://training.github.com/classes/developers/)

And if you're interested in creating your own project, be sure to check out my
series on egghead.io:

[**How to Write an Open Source JavaScript Library - Course by @kentcdodds**](https://egghead.io/series/how-to-write-an-open-source-javascript-library)

And as always, I'll see you around on [Twitter](https://twitter.com/kentcdodds)
and [GitHub](https://github.com/kentcdodds) :-)

![See you on Twitter!](./images/2.png)
