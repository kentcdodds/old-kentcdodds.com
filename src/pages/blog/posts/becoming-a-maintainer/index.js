import {basename} from 'path'
import {css} from 'glamor'
import Markdown from '../../../../components/markdown'
import Disqus from '../../../../components/disqus'

export const title = 'Becoming an Open Source Project Maintainer'

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
            I have a lot of open source projects that I maintain. I have personally published over 100 packages to npm.
            Not all of them are widely used (or used at all), but many of them are. I have some ideas about how to
            maintain open source projects. I've given a talk on this in the past (unfortunately each time the recording
            sadly failed, but there's a practice run, so
            [check it out here](https://kentcdodds.com/talks/#managing-an-open-source-project)).

            In this newsletter though, I want to talk about how you become a project maintainer. The easiest way to do
            this is to create your own project from scratch, but often what's more needed than a new project is to
            improve an existing project. So how do you get involved?

            ![good question](good-question.gif)

            Well,
            ["You contribute best to something you use regularly."](https://blog.kentcdodds.com/what-open-source-project-should-i-contribute-to-7d50ecfe1cb4)
            So before you decide you want to be a maintainer of a project, make sure it's one that you use yourself,
            otherwise you'll lose motivation pretty quickly.

            The first project I maintained that became widely used was
            [~angular-formly~](https://github.com/formly-js/angular-formly). Several years ago, I needed a library to
            make creating forms easier with angular. I tried a few projects and finally landed with ~angular-formly~ as
            the one I liked the most. As what often happens with open source projects, it didn't quite meet my use
            cases. So I [filed an issue](https://github.com/formly-js/angular-formly/issues/16) and
            [made a pull request](https://github.com/formly-js/angular-formly/pull/17). It was great.

            Then something else came up and I [made a pull request](https://github.com/formly-js/angular-formly/pull/19)
            for that too. Then I started
            [helping](https://github.com/formly-js/angular-formly/issues/21)
            [in](https://github.com/formly-js/angular-formly/issues/23)
            [issues](https://github.com/formly-js/angular-formly/issues/32) and
            [reviewing](https://github.com/formly-js/angular-formly/pull/26)
            [pull](https://github.com/formly-js/angular-formly/pull/54)
            [requests](https://github.com/formly-js/angular-formly/pull/61). Then one day, all of a sudden, the
            maintainer asked me if I wanted commit and publish access. I was surprised and thrilled. It made so much
            sense though. I was doing more for the project than he was at the time, so the transition worked well.

            So here's the key takeaway:

            ![Are you ready for this?](ready.gif)

            > To become a project maintainer, act like a project maintainer.

            That means help with issues, make pull requests, help with documentation, answer questions, make tutorials,
            review pull requests, etc. etc. etc. There's really no need to get permission for doing those things. Just
            start doing it as much as you're willing and able and magic things happen.

            Now, I can't promise that you'll become a core maintainer of React if you start helping in issues and pull
            requests. But I can tell you that a lot of
            [the benefits of open source](https://blog.kentcdodds.com/how-getting-into-open-source-has-been-awesome-for-me-8480cd756a80)
            will come even if you aren't the project maintainer. And many projects really do need new maintainers
            (~angular-formly~ included). You don't need permission to start acting like a maintainer. If you start doing
            the work, then it's pretty likely that the project maintainers will eventually give you decision making
            power and you'll be able to make an impact on the project direction.

            I should note also that not all maintainers are the same. Some really don't want to reliquish control over
            the project. If you have an issue with the way the project is maintained and they're not willing to let you
            help in the way you want, you can definitely fork the project (famous example of this is
            [~lodash~](https://lodash.com/)).

            What I love about open source is that you don't need anyone's permission to do good work. So long as you're
            following the project code of conduct and respect the project maintainers, your help will likely be very
            welcome. And if that doesn't workout, your [BATNA](http://www.beyondintractability.org/essay/batna) is to
            fork the project (learn about and be aware of the project license if you ever do this).

            I hope this is helpful! I personally have many projects that could use more active project maintainers. And
            I've transitioned some of them to others in the past as well. So feel free to start helping out on the
            projects you're using. You never know. Good luck!

            **Things to not miss**:

            - [Improving the usability of your modules](https://medium.com/p/b45436f34a00) - The published version of my newsletter from two weeks ago. If you thought it was good, go ahead and [give it some claps](https://blog.kentcdodds.com/did-you-know-3079d5aec43b) and a retweet.
            - [Simplicity Matters](https://youtu.be/rI8tNMsozo0) - Always a good talk to review every few months.
            - [Carbon](https://carbon.now.sh) - Create and share beautiful images of your source code.

            Some tweets from this last week:

            > [Today in things you'd never do with JavaScript but totally can... Define a class that extends another which is defined inline... n times.](https://twitter.com/kentcdodds/status/927001189207572480)

            > [People need to chill out and stop building their identities around technology and methodologies. Seriously, it's not healthy out worth it.](https://twitter.com/kentcdodds/status/924450974327980032) - (Thread)

            > [Guess who I am for #Halloween? Hint: "Your website is slow. Let me go out of my way to help you make it faster."](https://twitter.com/kentcdodds/status/925421964570841088)

            > [I aspire to be like this man:](https://twitter.com/kentcdodds/status/926529326362873856) - (there's a gif that you'll probably enjoy)

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
