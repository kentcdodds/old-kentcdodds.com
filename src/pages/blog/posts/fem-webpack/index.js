/* eslint max-len:off */
import {basename} from 'path'
import Markdown from '../../../../components/markdown'
import Disqus from '../../../../components/disqus'

export const title = 'Introducing the Webpack Deep Dive Workshop'

export default Post

function Post() {
  return (
    <div style={{maxWidth: 800, margin: 'auto', fontSize: '22px'}}>
      <h1 style={{textAlign: 'center', fontSize: '1.4em'}}>
        <span role="img" aria-label="tada">
          🎉
        </span>{' '}
        Introducing the{' '}
        <a href="http://kcd.im/fem-webpack">Webpack Deep Dive</a> Workshop{' '}
        <span role="img" aria-label="confetti">
          🎊
        </span>
        <br />
        <small>
          on <a href="https://frontendmasters.com">Frontend Masters</a>
        </small>
      </h1>
      <div style={{textAlign: 'center'}}>
        <img
          style={{width: '100%'}}
          src="image.png"
          alt="Frontend Masters + Webpack = Love"
        />
      </div>
      <div>
        <Markdown>
          {`
          This is an exciting announcement! [Let your friends know!](https://twitter.com/intent/tweet?text=There%27s%20a%20new%20webpack%20workshop%20on%20@FrontendMasters%20from%20@kentcdodds!%20Check%20it%20out!%20kcd.im/fem-webpack%20%F0%9F%8E%8A)

          Here's a preview:
        `}
        </Markdown>

        <div style={{textAlign: 'center'}}>
          <iframe
            src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FFrontendMasters%2Fvideos%2F674236152752541%2F&amp;show_text=0&amp;width=560"
            title="Facebook video"
            width="560"
            height="315"
            style={{border: 'none', overflow: 'hidden'}}
            scrolling="no"
            frameBorder="0"
            // eslint-disable-next-line react/no-unknown-property
            allowtransparency="true"
            allowFullScreen="true"
          />
        </div>

        <Markdown>
          {`
          I've spent countless hours working with [webpack](https://webpack.js.org). I remember the first time I tried
          it out way back around December of 2014. I had built a reeeeally complicated gulp process (you can see some of
          that [here](https://medium.com/@kentcdodds/angularjs-script-loading-108652bde20e)) and decided that I wanted
          to simplify things. I had heard about webpack and decided to give it a try.

          After two weeks of refactoring and being totally lost, I finally got it working. Over the course of the next
          few weeks I would find myself telling people:

          > It's not a matter of whether webpack can do something you need it to for your app, it's a matter of **how**
          > to configure it to do that for you

          And the configuration was not entirely straightforward. Also, because it's such a hugely powerful tool, built
          mostly by one person (who knows English as a second language), the docs were often sparse and confusing. So I
          spent a great deal of time learning how to use this tool to effectively build my applications. And I was
          hooked by the amazing things it could enable me to do. Webpack is an enabling technology. And as someone who
          gets really enthusiastic about tech I find interesting and helpful, I wanted to share my new-found interest
          with others. As an [egghead.io instructor](http://kcd.im/egghead), I have a platform to do that!

          Since then, I've made dozens of webpack related videos [on egghead](http://kcd.im/egghead-webpack). And I have
          several webpack related videos on [my YouTube channel](https://youtube.com/kentcdodds) as well. _Real_ people
          are getting _real_ value out of my content. That's pretty rewarding to me!

          That's why I'm so excited to have my Frontend Masters workshop released and made available to you all. **It's
          the most comprehensive webpack material available** (AFAIK).
          [Let me know what you think](https://twitter.com/intent/tweet?text=Thanks%20for%20the%20@FrontendMasters%20Webpack%20Deep%20Dive%20workshop%20@kentcdodds!%20It%20was%20awesome!%20kcd.im/fem-webpack%20%F0%9F%8E%89)!
          If you're not already
          a subscriber, I seriously recommend you give
          [subscribing to Frontend Masters](https://frontendmasters.com/enroll/) some solid consideration. There's a ton
          of fantastic content on there! So much learning to be had!

          Here's the little marketing spiel about the course:

          > “Why have I spent so much time on mastering Webpack? I’ve tried script tags, require.js, grunt, gulp, and
          > shell scripts. When I finally looked into Webpack, so many problem categories went away. Not just in my
          > build process, but in my entire architecture of my applications. Unfortunately, Webpack is a bit of a beast
          > to learn. I’ve spent hours upon hours learning and using Webpack. I’m so excited to share my experiences
          > with you.”
          > ~Kent C. Dodds

          > - Learn the role of webpack and fundamental concepts like loaders and plugins
          > - Learn how to setup a webpack file (and use webpack-validator to save yourself hours of debugging typos)
          > - Learn how to setup a unit testing environment for a webpack project
          > - Learn how tree-shaking works and how to leverage it for smaller bundles
          > - Learn how to maintain sane file sizes with webpack code splitting
          > - Learn how to leverage hashing for long term caching
          > - Learn how to group vendor/common files with the CommonsChunkPlugin to save bytes in the code that changes
          regularly
          > - Learn the latest features of Webpack 2!

          If you want to get a little preview of the course materials, start with
          [the full slide deck](http://kcd.im/webpack-workshop) 😎

          Big thank you to [Marc](https://twitter.com/1Marc) for Frontend Masters. It's an incredible resource, and he's
          an incredible guy.

          <small>
          You may also be interested in my other workshop that will soon be released on Frontend Masters:
          [Writing an Open Source JavaScript Library](http://kcd.im/fem-oss) which is an updated version of the
          Egghead.io course [How to Write an Open Source JavaScript Library](http://kcd.im/write-oss).
          </small>
        `}
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
