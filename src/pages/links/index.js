import {oneLine} from 'common-tags'
import Markdown from '../../components/markdown'

export default Links

function Links() {
  const eggheadio = '[egghead.io](https://egghead.io)'
  const links = [
    {text: 'Home', url: 'http://kentcdodds.com', desc: 'This website :)'},
    {text: 'Links', url: 'http://kentcdodds.com/links', desc: 'This page'},
    {text: 'AMA', url: 'https://kcd.im/ama', desc: 'Ask Me Anything'},
    {
      text: 'Blog',
      url: 'https://kcd.im/blog',
      desc: 'My various musings about JavaScript and software development',
    },
    {text: 'Twitter', url: 'https://kcd.im/twitter'},
    {
      text: 'LinkedIn',
      url: 'https://kcd.im/linkedin',
      desc: oneLine`
        I only connect with people I know.
        Connect with me on twitter otherwise.
      `,
    },
    {
      text: 'GitHub',
      url: 'https://kcd.im/github',
      desc: 'I have a bunch of projects on here :)',
    },
    {
      text: 'npm',
      url: 'https://kcd.im/npm',
      desc: 'My published open source JavaScript modules',
    },
    {
      text: 'Email',
      url: 'mailto:kent@doddsfamily.us',
      desc: oneLine`
        Please feel free to email me with anything you
        don't feel comfortable posting to my AMA
      `,
    },
    {
      text: 'JavaScript Air',
      url: 'https://javascriptair.com',
      desc: oneLine`
        A podcast I created
        (I also started [Angular Air](http://angularair.com/))
      `,
    },
    {
      text: 'React30',
      url: 'https://react30.com',
      desc: 'A podcast about React that I co-host',
    },
    {
      text: '3 Minutes with Kent',
      url: 'https://kcd.im/3-mins',
      desc: 'A [briefs.fm](https://briefs.fm) podcast I occasionally do',
    },
    {text: 'Talks', url: '/talks', desc: `Talks I've given`},
    {
      text: 'Workshops',
      url: 'https://kcd.im/workshops',
      desc: `Workshops I've given`,
    },
    {
      text: 'Egghead.io',
      url: 'https://kcd.im/egghead',
      desc: `
        My ${eggheadio} instructor page with over 100 lessons on
        [JavaScript](https://kcd.im/egghead-js),
        [Open](https://kcd.im/pull-request) [Source](https://kcd.im/write-oss),
        [Webpack](https://kcd.im/egghead-webpack),
        [React](https://kcd.im/egghead-react),
        [Jest](https://kcd.im/egghead-jest),
        and Angular.
        (over half are free)
      `,
    },
    {
      text: 'Frontend Masters Courses',
      url: 'https://frontendmasters.com/courses/',
      desc: oneLine`
        My [Webpack](https://kcd.im/fem-webpack)
        [Open Source](https://kcd.im/fem-oss) courses are coming soon!
      `,
    },
    {
      text: 'Tech Chats',
      url: 'https://kcd.im/tech-chats',
      desc: `
        A playlist of chats I've had with awesome people about tech stuff
        ([learn more](https://github.com/kentcdodds/ama/issues/125))
      `,
    },
    {
      text: '"Appearances"',
      url: 'https://kcd.im/appearances',
      desc: oneLine`
        A list of podcasts, interviews, and other
        places that I've had chats and stuff
      `,
    },
  ]
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{fontSize: 50, marginBottom: 20}}>
        Links
      </h1>
      <em>Search with <pre style={{display: 'inline'}}>⌘/ctrl + f</pre></em>
      <div
        style={{maxWidth: 600, margin: 'auto', textAlign: 'left', fontSize: 18}}
      >
        <ul>
          {links.map(({url, text, desc}, i) => (
            <li key={i} style={{marginBottom: 4}}>
              <a href={url}>{text}</a>
              {' '}
              {desc ?
                <span>
                    -{' '}
                  <Markdown noPTag style={{display: 'inline'}}>
                    {desc}
                  </Markdown>
                </span> :
                ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
