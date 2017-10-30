import {basename} from 'path'
import {css} from 'glamor'
import Markdown from '../../../../components/markdown'
import Disqus from '../../../../components/disqus'

export const title = 'Rendering a function with React'

export default Post

const maxWidth = 800
const maxWidthImage = css({'& img': {maxWidth}})

function Post() {
  return (
    <div
      className={maxWidthImage}
      style={{maxWidth, margin: 'auto', fontSize: '22px'}}
    >
      <h1 style={{textAlign: 'center', fontSize: '1.4em'}}>{title}</h1>
      <div>
        <Markdown>
          {`
            # Rendering a function with React

            > No, this isn't about [render props](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
            > If you were hoping for that... callback later 😉

            ![I see you what you did there](see.gif)

            ## Context

            So ~react-i18n~ (not the npm one... one we made at PayPal internally) has this
            API that I call "sorta-curried". I wrote about it a bit in
            [my last newsletter](https://tinyletter.com/kentcdodds/letters/improving-the-usability-of-your-modules).

            So here's an example:

            ~~~javascript
            import getContent, {init} from 'react-i18n'
            init({
              content: {
                pages: {
                  home: {
                    nav: {
                      about: 'About',
                      contactUs: 'Contact us',
                    }
                  }
                }
              }
            })

            // here's the sorta-curried part...
            // These all result in exactly the same thing: "About"
            getContent('pages.home.nav.about')
            getContent('pages')('home')('nav')('about')
            getContent('pages.home')('nav.about')
            getContent('pages')('home.nav')('about')
            // etc...
            ~~~

            > There are reasons the API is this way, and I'm not going to go over them all. If you're not a fan of the
            > API, [you're not alone](https://twitter.com/dan_abramov/status/923326332020449280). But there are reasons
            > for the API as it is and that's not what we're going over in this newsletter...

            ## With React

            So thinking about this in the context of React:

            ~~~javascript
            const getHomeContent = getContent('pages.home')
            const ui = (
              <a href="/about">
                {getHomeContent('nav.about')}
              </a>
            )
            // that'll get you:
            <a href="/about">About</a>
            ~~~

            So far so good. But, **what if you mess up and have a typo**?

            Before this week, here's what happened:

            ~~~javascript
            const ui = (
              <a href="/about">
                {getContent('pages.typo.nav.about')}
              </a>
            )
            // that'll get you:
            <a href="/about">{pages.typo.nav.about}</a>
            // note, that's a string of "{" and "}"...
            // not jsx interpolation...
            ~~~

            ## The problem

            So that's fine. But here's where things get tricky. Because we return a string
            of ~{full.path.to.content}~, if content is missing or there's a typo
            you can't call a function on what you get back. If you try, you're calling a function
            on a string and that'll give you an error that would crash the app. Error
            boundaries could help with this, though sometimes we call ~getContent~ outside
            of a React context, so that wouldn't help in every case. Anyway, this will break
            the app:

            ~~~javascript
            const getHomeContent = getContent('pages.typo')
            const ui = (
              <a href="/about">
                {getHomeContent('nav.about')}
              </a>
            )
            // 💥 error 💥
            ~~~

            Again, this is happening because ~getContent('pages.typo')~ will return the
            string ~{pages.typo}~ (to indicate that there's no content at that path and
            the developer needs to fix that problem to get the content). The issue is
            that you can't invoke a string but that's what's happening because
            ~getHomeContent~ is a string, not a function.

            ## A solution and a new problem

            So the change I made this week makes it so when there's no content at a given
            path, instead of a string, it returns a "sorta-curried" function (just like it
            would if you hadn't made the typo). This way you can keep calling it all day
            long if you want. No problem.

            So now this wont throw an error, but we lose rendering the path if there's no content!

            ~~~javascript
            const getHomeContent = getContent('pages.typo')
            const ui = (
              <a href="/about">
                {getHomeContent('nav.about')}
              </a>
            )
            // that'll get you:
            <a href="/about"></a>
            ~~~

            And we want to make sure that we show the missing content so it's more obvious
            for developers (yes we log to the console as well) and if the world is on fire
            🔥🌎🔥🌏🔥🌍🔥 and the content failed to load for some reason, it's better for a
            button to say ~{pages.transfer.sendMoney}~ than to say nothing at all.

            So here's where the challenge comes in. Let's rewrite the above to make this
            more clear:

            ~~~javascript
            const getHomeContent = getContent('pages.typo')
            const aboutContent = getHomeContent('nav.about')
            const ui = <a href="/about">{aboutContent}</a>
            ~~~

            ~aboutContent~ in this example is a function because the call to ~getContent~
            had a typo, so we'll never actually find content that matches the full path.
            So the challenge is how do we make sure that we can render the full path in a
            situation like this?

            ## Developing the solution

            At first I thought I could monkey-patch ~toString~ on the content getter
            function. But that didn't work. I still got this warning from React:

            > Warning: Functions are not valid as a React child. This may happen if you
            > return a Component instead of <Component /> from render. Or maybe you meant to
            > call this function rather than return it.

            So I stuck a breakpoint at the line where that error was logged and stepped up
            the stack to find where the problem was.

            ~~~
            > printWarning
            > warning
            > warnOnFunctionType
            > reconcileChildFibers <-- ding ding! 🔔
            ~~~

            The [~reconcileChildFibers~](https://github.com/facebook/react/blob/2c0a8fb99e945315c9dce7a15c85775d51f5755d/packages/react-reconciler/src/ReactChildFiber.js#L1355-L1484)
            function is where I discovered that react will check the children you're trying
            to render to make sure they're render-able.

            Looking through that code, it checks if it's an object first, then it checks if
            it's a string or number, then an array, then an iterator. If it's none of those
            things, then it'll throw (for a non-ReactElement object) or warn (for a
            function, like in our case).

            So, in my case, the thing I want to render _has_ to be a function due to the
            constraints mentioned earlier. So I can't make it work as an object, string,
            number, or array. But I realized that there's nothing stopping me from making
            my function iterable (if you're unfamiliar,
            [here's the iterators part of my ES6 workshop recording](https://www.youtube.com/watch?v=eOKQDh50ECU&t=2h43m44s)).

            So... I made my function iterable 😉

            ![easy button](easy-button.gif)

            ~~~javascript
            const ITERATOR_SYMBOL =
              (typeof Symbol === 'function' && Symbol.iterator) || '@@iterator'

            // ...

            function iterator() {
              let timesCalled = 0
              // useful logging happens here...
              return {
                next() {
                  // this is called twice. Once to get the value, and the second time
                  // will report that it's done.
                  return {done: timesCalled++ > 0, value: pathAsString}
                },
              }
            }

            // ...

            contentGetterFn[ITERATOR_SYMBOL] = iterator

            // ...
            ~~~

            I made a handy function for this and created [a CodeSandbox demo](https://codesandbox.io/s/mj5020xz98)
            for you to try out! Enjoy!

            ![You're welcome](you-are-welcome.gif)

            The cool thing about this too is that I can log an error with a bunch of context
            to help the developer figure out what's going on. This is possible because if
            ~iterator~ is called I can assume that React is attempting to render the
            ~contentGetterFn~.

            So yeah, there's my use case for making a function iterable 😉

            I hope that's helpful and interesting! Good luck!

            **Things to not miss**:

            - [Effective Snapshot Testing](https://medium.com/p/e0d1a2c28eca) - The published version of my newsletter from two weeks ago. If you thought it was good, go ahead and give it some claps and a retweet.
            - [React Call Return](https://www.youtube.com/watch?v=GK_rI4V4tZE) - A new **experimental** that should be available in React@16.0.1 explained by Ryan Florence. Pretty interesting.
            - [Between Microsoft, Google, and Apple, Microsoft's the only one that knows how to make a burger](https://twitter.com/shanselman/status/924782140272795648)
            - [A relevant bug I found while writing this newsletter](https://github.com/facebook/react/issues/11396).

            I had a few thoughts this weekend that I want you to not miss too:

            > [People need to chill out and stop building their identities around technology and methodologies. Seriously, it's not healthy out worth it.](https://twitter.com/kentcdodds/status/924450974327980032)

            > [I think when you learn to transpile JSX in your head and see it as "just JavaScript" a whole new world of understanding presents itself.](https://twitter.com/kentcdodds/status/924364306304479232)

            > [This is so great. The "right tool for the job" is absolutely subjective based on who will be using the tool!](https://twitter.com/kentcdodds/status/924703329422270464)

            That last one's a quote tweet. Give it a look!

            _**P.S. If you like this, make sure to [subscribe](http://kcd.im/news),
            [follow me on twitter](https://twitter.com/kentcdodds),
            [buy me lunch](http://kcd.im/donate),
            and [share this with your friends](http://kcd.im/news) 😀**_

            I also want to say "Thanks for the lunch!!" to the following people:
            - Dan and Anna Seethaler
            - M. MacAdams
            - Nicholas Chaves
            - Ian Stewart
            - Iurii Kucherov

            Ya'll are awesome! 😎
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
