import {basename} from 'path'
import Markdown from '../../../../components/markdown'
import Disqus from '../../../../components/disqus'

export const title = 'Write tests, not too many, mostly integration'

export default Post

function Post() {
  return (
    <div style={{maxWidth: 800, margin: 'auto', fontSize: '22px'}}>
      <h1 style={{textAlign: 'center', fontSize: '1.4em'}}>{title}</h1>
      <div>
        <Markdown>
          {`
            A while back, [Guillermo Rauch‏](https://twitter.com/rauchg) (creator of [Socket.io](https://socket.io/) and
            founder of [Zeit.co](https://zeit.co/) (the company behind a ton of the awesome stuff coming out lately))
            [tweeted something profound](https://twitter.com/rauchg/status/807626710350839808):

            [![tweet screenshot](write-tests.png)](https://twitter.com/rauchg/status/807626710350839808)

            > **Write tests. Not too many. Mostly integration.**

            This is deep, albeit short, so let's dive in:

            > **Write tests.**

            Yes, for most projects you should write automated tests. You should if you value your time anyway. Much
            better to catch a bug locally from the tests than getting a call at 2:00 in the morning and fix it then.
            Often I find myself saving time when I put time in to write tests. It may or may not take longer to
            implement what I'm building, but I (and others) will almost definitely save time maintaining it.

            The thing you should be thinking about when writing tests is how much confidence they bring you that your
            project is free of bugs. Static typing and linting tools like [Flow](https://flow.org/) and
            [ESLint](https://eslint.org/) can get your a remarkable amount of confidence, and if you're not using these
            tools I highly suggest you give them a look. That said, even a strongly typed language should have tests.
            Typing and linting can't ensure your business logic is free of bugs. So you can still seriously increase
            your confidence with a good test suite.

            > **Not too many.**

            I've heard managers and teams mandating 100% code coverage for applications. That's a really bad idea. The
            problem is that **you get diminishing returns on our tests as the coverage increases much beyond 70%**
            (I made that number up... no science there). Why is that? Well, when you strive for 100% all the time, you
            find yourself spending time testing things that really don't need to be tested. Things that really have no
            logic in them at all (so any bugs could be caught by ESLint and Flow). Maintaining tests like this actually
            really slow you and your team down.

            You may also find yourself testing implementation details just so you can make sure you get that one line
            of code that's hard to reproduce in a test environment. You _really_ want to avoid testing implementation
            details because it doesn't give you very much confidence that your application is working and it slows you
            down when refactoring. **You should very rarely have to change tests when you refactor code.**

            I should mention that almost all of my open source projects have 100% code coverage. This is because most of
            my open source projects are smaller libraries and tools that are reusable in many different situations
            (a breakage could lead to a serious problem in a lot of consuming projects) and they're relatively easy to
            get 100% code coverage one anyway.

            > **Mostly integration.**

            There are all sorts of different types of testing (check out my 5 minute talk about it at Fluent Conf:
            ["What we can learn about testing from the wheel"](https://www.youtube.com/watch?v=Da9wfQ0frGA&feature=youtu.be&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)).
            They each have trade-offs. The three most common forms of testing we're talking about when we talk of
            automated testing are: Unit, Integration, and End to End.

            Here's [a slide](http://slides.com/kentcdodds/testing-workshop#/4/8) from my Frontend Masters workshop: ["Testing JavaScript Applications"](https://frontendmasters.com/courses/testing-javascript/).

            ![testing pyramid](pyramid.png)

            This testing pyramid is a combination of one I got from [Martin Fowler's blog](https://martinfowler.com/bliki/TestPyramid.html)
            and one I got from [the Google Testing blog](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html).

            As indicated here, the pyramid shows from bottom to top: Unit, Integration, E2E. As you move up the pyramid
            the tests get slower to write/run and more expensive (in terms of time and resources) to run/maintain.

            One thing that it doesn't show though is that as you move up the pyramid, the confidence quotient of each
            form of testing increases. You get more bang for your buck. So while E2E tests may be slower and more
            expensive than unit tests, they bring you much more confidence that your application is working as intended.

            [My all-time most retweeted tweet](https://twitter.com/kentcdodds/status/628658648001048577) has to do with
            the main issue with unit tests:

            > Still love this one. Unit testers be like: "Looks like it's working"
            > ![Gif of man cut in three peices, running in place, doing pushups, and reading](unit-tests.gif)

            We've written unit tests that verify the man can run in place, do pushups, and read, but the man isn't
            integrating with his various body parts very effectively. It doesn't matter if your button calls the
            ~onClick~ handler if that handler doesn't make the right request with the right data!

            **Integration tests strike a great balance on the trade-offs between confidence and speed/expense.** This is
            why it's advisable to spend most (not all, mind you) of your effort there.

            ---

            **How to write more integration tests**

            I think the biggest thing you can do to write more integration tests is to just stop mocking so much stuff.
            When you mock something you're basically removing all confidence in the integration between what you're
            testing and what's being mocked. I understand that sometimes it can't be helped
            (though [some would disagree](https://youtu.be/EaxDl5NPuCA)). You don't _actually_ want to send emails or
            charge credit cards every test, but most of the time you can avoid mocking and you'll be better for it.

            If you're doing React, then this includes shallow rendering. I've been saying for a long time that
            I feel like shallow rendering is testing implementation details. For 3 minutes more on this (and other tips
            for testing react) checkout [this 3 minute podcast](https://www.briefs.fm/3-minutes-with-kent/49).

            I hope that's helpful! Good luck to you all! 👍

            **Things to not miss:**

            - [blog.kentcdodds.com](https://blog.kentcdodds.com) - I've started posting to my own Medium publication. Be sure to follow me there!
            - [hacktoberfest](https://hacktoberfest.digitalocean.com/) - Sign up with GitHub here and if you make 4 pull requests in the month of October they'll send you a free shirt. Rad right!?
            - [~draggable~](https://shopify.github.io/draggable/) - probably one of the coolest demos for a project I've ever seen.
            - [Funky Karts demo](https://twitter.com/_jayphelps/status/914242367766401024) - A cool game that's built by WebAssembly. Thanks for sharing Jay!

            _**P.S. If you like this, make sure to [subscribe](http://kcd.im/news),
            [follow me on twitter](https://twitter.com/kentcdodds),
            [buy me lunch](http://kcd.im/donate),
            and [share this with your friends](http://kcd.im/news) 😀**_
          `.replace(/~/g, '`')}
        </Markdown>
        <small>
          See more blogposts from me <a href="/post">here</a>.
        </small>
      </div>
      <Disqus
        style={{marginTop: 50}}
        id={title}
        url={`https://kentcdodds.com/post/${basename(__dirname)}`}
      />
    </div>
  )
}

/*

            I think this is awesome advice. For the longest time, I was totally sold on the importance of unit testing
            every bit of my code that I would break it out into little peices to make it even easier to test. I thought
            that the easier it was to test, the more maintainable it would be. Now however, I believe this to be more
            of a [correlation rather than causation situation](https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation).

            If your code is easier to test then it's quite possibly more maintainable. However, the thing that I was
            doing wrong was I changed my implementation code (sometimes in negative and messy ways) to make it easier
            to unit test. This has lead to some code that's actually even harder to maintain because all the glue I had
            to put in place to wire these smaller bits together and the pre-mature abstraction that I was required to
            implement.

            > If you'd like to see a good example of code that became harder to maintain because it was test driven in
            > this way, you can look at (but don't use) a module I wrote a few years ago called
            > [~api-check~](https://github.com/kentcdodds/api-check). Specifically, give
            > [~checkers.js~](https://github.com/kentcdodds/api-check/blob/master/src/checkers.js) a look. If you can
            > figure out that code, I'll hand the project off to you 😉

            **Before people start tuning out...** I'm not saying that
            [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) and unit tests are bad
            and should be avoided. What should be avoided (most of the time, no dogma here) though is changing your
            implementation in a way to simply make things easier to test.

 */
