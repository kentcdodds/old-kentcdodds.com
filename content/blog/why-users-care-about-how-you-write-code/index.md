---
slug: why-users-care-about-how-you-write-code
title: Why users care about how you write code
date: '2015-11-12'
author: Kent C. Dodds
description:
  _Your coding practices and technology choices impact user experience..._
keywords:
  - Code
  - Software Development
  - User Experience
banner: ./images/banner.jpg
---

Back in October of 2011 [Ryan Dahl](http://tinyclouds.org/) wrote a blogpost
entitled "[I hate almost all software](http://tinyclouds.org/rant.html)" in
which he asserts:

> The only thing that matters in software is the experience of the user.

I totally agree with this statement, but I believe that it has broader
implications than Ryan's suggesting.

At a previous employer, I was asked to add a single checkbox and label to the
contents of a popover. When asked how long this would take, I considered that
the logic for that part of the app was in a Backbone view that was over 1,000
lines long and it extended another Backbone view that was over 2,000 lines long.
I estimated it would take a week, and the PM was horrified. What's worse is it
actually took somewhere around two or three weeks.

Why did it take so long? The code was unmaintainable. I was able to add the
checkbox easily enough, but getting the data from the checkbox to update the
model was a nightmare. If that wasn't enough, the number of bugs I introduced
with my hacky example was frightening because (of course) those files had leaky
abstractions all over the place and absolutely no tests.

Now, consider if the component had been built with
[SOLID programming principles](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)
(DRY, SRP, etc. etc.). I probably could have finished that feature in a day or
less.

So did the way the app code was written impact the end user? You betcha. Did the
user care that they had to wait weeks rather than days for the new feature?
Yeah, they totally cared.
