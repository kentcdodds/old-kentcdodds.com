import {basename} from 'path'
import {css} from 'glamor'
import Markdown from '../../../../components/markdown'
import Disqus from '../../../../components/disqus'

export const title = 'Use data-test attributes'

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
            You're a developer and you want to avoid shipping a broken login experience, so you're writing some tests
            to make sure you don't. Let's get a quick look at
            [an example of such a form](https://github.com/kentcdodds/testing-workshop/blob/1938d6fc2048e55362679905f700f938a3b497c4/client/src/screens/login.js#L50-L82):

            [![login form screenshot](login.png)](https://react-redux.realworld.io/#/login?_k=bkclkr)

            ~~~javascript
            const form = (
              <form onSubmit={this.submitForm}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="email-field form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="password-field form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            )
            ~~~

            Now, if we were to test this form, we'd want to fill in the username, password, and submit the form. To do
            that properly, we'd need to render the form and query the document to find and operate on those nodes.
            Here's what you might try to do to make that happen:

            ~~~javascript
            const emailField = rootNode.querySelector('.email-field')
            const passwordField = rootNode.querySelector('.password-field')
            const submitButton = rootNode.querySelector('.btn')
            ~~~

            And here's where the problem comes in. What happens when we add another button? What if we added a "Sign up"
            button before the "Sign in" button?

            ~~~javascript
            <button
              className="btn btn-lg btn-secondary pull-xs-right"
              disabled={this.props.inProgress}
            >
              Sign up
            </button>
            <button
              className="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled={this.props.inProgress}
            >
              Sign in
            </button>
            ~~~

            Whelp, that's going to break our tests. Total bummer. But that'd be pretty easy to fix right?

            ~~~javascript
            // change this:
            const submitButton = rootNode.querySelector('.btn')
            // to this:
            const submitButton = rootNode.querySelectorAll('.btn')[1]
            ~~~

            And we're good to go! Well, if we start using CSS-in-JS to style our form and no longer need the
            ~email-field~ and ~password-field~ class names, should we remove those? Or do we keep them because our tests
            use them? Hmmmmmmm..... 🤔

            What I don't like about using class names for my selectors is that normally we think of class names as a way
            to style things. So when we start adding a bunch of class names that are not for that purpose it makes it
            even _harder_ to know what those class names are for and when we can remove class names.

            And if we simply try to reuse class names that we're already just using for styling then we run into issues
            like the button up above. The core issue is that the relationship between the test and the source code is
            too implicit. We can overcome this issue if we make that relationship more explicit.

            If we could add some metadata to the element we're trying to select that would solve the problem. Well guess
            what! There's actually an existing API for this! It's ~data-~ attributes! So let's update our form to use
            ~data-~ attributes:

            ~~~javascript
            const form = (
              <form onSubmit={this.submitForm}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      data-test="email"
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      data-test="password"
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.inProgress}
                    data-test="submit"
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            )
            ~~~

            And now, with those attributes, our selectors look like this:

            ~~~javascript
            const emailField = rootNode.querySelector('[data-test="email"]')
            const passwordField = rootNode.querySelector('[data-test="password"]')
            const submitButton = rootNode.querySelector('[data-test="submit"]')
            ~~~

            Awesome! So now, no matter how we change our markup, as long as we keep those ~data-test~ attributes intact,
            then our tests wont break. Plus, it's much more clear what the purpose of these attributes is which makes
            our code more maintainable as well.

            Here's a little utility called ~sel~ (short for ~select~) that I use sometimes to make this a little easier:

            ~~~javascript
            const sel = id => ~[data-test="\${id}"]~
            const emailField = rootNode.querySelector(sel('email'))
            const passwordField = rootNode.querySelector(sel('password'))
            const submitButton = rootNode.querySelector(sel('submit'))
            ~~~

            This is great for
            [end to end tests](https://github.com/kentcdodds/testing-workshop/blob/1938d6fc2048e55362679905f700f938a3b497c4/cypress/e2e/post_spec.js)
            as well. So I suggest that you use it for that too! However, some folks have expressed to me concern about
            shipping these attributes to production. If that's you, please really consider whether it's actually a
            problem for you (becuase honestly there are probably other things you could focus your time on). But if
            you'd like, you can transpile those attributes away with
            [~babel-plugin-react-remove-properties~](https://www.npmjs.com/package/babel-plugin-react-remove-properties).

            I hope this is helpful to you. Good luck! Enjoy :)

            **Things to not miss:**

            - [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) - a blog post from [Michael Jackson](https://twitter.com/mjackson) about my favorite pattern in React.
            - [React, Inline Functions, and Performance](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578) - a blog post from [Ryan Florence](https://twitter.com/ryanflorence) about something I think is really important to remember.

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
