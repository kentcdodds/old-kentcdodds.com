---
slug: please-dont-commit-commented-out-code
title: Please, don't commit commented out code
date: '2015-10-27'
author: Kent C. Dodds
description: _Some solid reasons you should delete code that is not used_
keywords:
  - Git
  - Github
  - Code
banner: ./images/banner.jpg
bannerCredit: 'git diff contains the knowledge we_seek'
---

I often find stuff like this in codebases I review:

```js
function foo(bar) {
  const baz = bar(false)
  // we no longer do this for some good reason
  // if (baz === 'foobar') {
  // return baz
  // } else {
  // return bar.foobar()
  // }
  return baz
}
```

This function should look like this:

```js
function foo(bar) {
  return bar(false)
}
```

You might be thinking: "But Kent! What if that 'good reason' is no longer true,
and we need to do it the old way again later?" The answer, my dear reader, is
[_git diff_](https://git-scm.com/docs/git-diff)_:_

There's the precious code. We can grab those changes and boom! We're back in
business!

Now you might be thinking: "Ok, cool, but what's the problem with leaving the
commented code in there? It's easier for people to see how things used to be, it
_might_ be helpful to them, and it's a way for me to leave my mark on the
codebase **forever**!!"

Here are a few of the reasons you should probably not commit commented out code:

#### **Focus and cognitive load**

For me, **this is the biggest reason** and reason enough to avoid doing it
altogether. I don't know about you, but when I come to commented out code, I'll
often stop what I'm doing to read it. I think "maybe it's important" or I may
simply be curious. **Either way,**
[**my workflow has been derailed**](http://heeris.id.au/2013/this-is-why-you-shouldnt-interrupt-a-programmer/)**.**

#### Hides what's important

I have seen stuff like this:

```js
// dozens
// of
// lines
// of
// commented
// code
someImportantCode()
// dozens
// of
// more
// lines
// of
// commented
// code
```

It can be possible to skip over _someImportantCode()_ when scanning over a file.
This is less likely with the right syntax highlighting but it can happen, and
the comments are simply not worth keeping around.

#### Out of date

I've long held the opinion that the only thing that can tell you the truth about
the code is the code. The instant you add a comment, it's out of date.
Documentation comments are beneficial enough to justify their existence (though
you should try to make your code self-documenting for people other than
yourself).

However commented out code does not justify its existence. It wont take long
before that commented code is out of context, no longer tested, linted, or run,
the APIs it was using have changed or been removed, and now it's just in the
way.
