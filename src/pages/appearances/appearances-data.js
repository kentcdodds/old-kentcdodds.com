/* eslint max-len:0, max-lines:0 */
import marked from 'marked'
import stripIndent from 'strip-indent'
import moment from 'moment'

const tagEmojiMap = {
  'open source': '🌎',
  testing: '⚠️',
  react: '⚛',
  silly: '🙃',
}

// {
//   thing: '',
//   description: '',
//   date: '',
//   tags: [],
// },
export default [
  {
    title: 'Podcasts',
    appearances: [
      {
        thing:
          '[Workshop.me](https://www.youtube.com/channel/UCIGqC7zgqiFrGztcgXSSWOg)',
        description:
          '[E1 - Kent C. Dodds, Testing, React, TC39](https://www.youtube.com/watch?v=deWkGD7ylcw&index=1&list=PLV5CVI1eNcJi8sor_aQ2AzOeQ3On3suOr)',
        date: '2018-03-01',
        tags: ['react', 'testing'],
      },
      {
        thing: '[Fixate on Code](http://fixate.it)',
        description:
          '[16 - Kent C. Dodds](http://fixate.it/podcast/consume-build-and-teach-kent-c-dodds)',
        date: '2018-01-25',
        tags: [
          'story',
          'open source',
          'career',
          'react',
          'learning',
          'teaching',
          'advice',
        ],
      },
      {
        thing: '[Adventures in Angular](https://devchat.tv/adv-in-angular)',
        description:
          '[My Angular Story 020: Kent C. Dodds](https://devchat.tv/adv-in-angular/mas-020-kent-c-dodds)',
        date: '2018-01-05',
        tags: ['story', 'open source', 'career'],
      },
      {
        thing: '[Web of Tomorrow](http://www.weboftomorrowpodcast.com/)',
        description:
          '[44: How to Jumpstart Your Career - Kent C. Dodds](http://www.weboftomorrowpodcast.com/44)',
        date: '2018-01-02',
        tags: ['open source', 'career', 'teaching'],
      },
      {
        thing: '[Full Stack Radio](http://www.fullstackradio.com)',
        description:
          '[79: Kent C. Dodds - Building Reusable React Components with Render Props](http://www.fullstackradio.com/79)',
        date: '2017-12-27',
        tags: ['downshift', 'open source', 'react'],
      },
      {
        thing:
          '[#!hashbang](https://www.youtube.com/playlist?list=PLZ66c9_z3umOuPSGsTu3mfzt6PGZeUyQZ)',
        description:
          '[HashBang Episode 5: Assert(js) panel: Kent C. Dodds, Justin Searls, Gleb Bahmutov and Brian Mann](https://www.youtube.com/watch?v=ltzNIOF_L3E)',
        date: '2017-12-15',
        tags: ['testing', 'javascript'],
      },
      {
        thing:
          '[JAMStack Radio](https://www.heavybit.com/library/podcasts/jamstack-radio/)',
        description:
          '[Ep. #23, Introduction to Downshift and Glamorous](https://www.heavybit.com/library/podcasts/jamstack-radio/ep-23-introduction-to-downshift-and-glamorous/?utm_campaign=coschedule&utm_source=twitter&utm_medium=heavybit&utm_content=Ep.%20%2323,%20Introduction%20to%20Downshift%20and%20Glamorous)',
        date: '2017-12-14',
        tags: ['react', 'oss', 'tc39', 'work life balance'],
      },
      {
        thing: '[I.T. Career Energizer](http://itcareerenergizer.com/)',
        description:
          '[Episode 35 - Learn, Build, and Teach with Kent C. Dodds](http://itcareerenergizer.com/e35/)',
        date: '2017-12-11',
        tags: ['career', 'oss', 'teaching', 'communication', 'relationships'],
      },
      {
        thing:
          '[NADCAST](https://www.youtube.com/playlist?list=PL1XPwt2TrDrxWL3ohvospBDFP3GMeXgQE)',
        description:
          '[Kent C. Dodds](https://www.youtube.com/watch?v=FEeL_c2wtpU)',
        date: '2017-08-14',
        tags: ['prettier', 'react', 'testing', 'open source'],
      },
      {
        thing: '[Tyler McGinnis Podcast](https://tylermcginnis.com/podcast)',
        description:
          '[Work/Life Balance, Education, and Open Source with Kent C. Dodds](https://tylermcginnis.com/podcast/kentcdodds/)',
        date: '2017-08-09',
        tags: [
          'tc39',
          'teaching',
          'education',
          'open source',
          'privilege',
          'personal',
        ],
      },
      {
        thing: '[Developer on Fire](http://developeronfire.com)',
        description:
          '[Episode 239 | Kent C. Dodds - Nice and Inclusive](http://developeronfire.com/podcast/episode-239-kent-c-dodds-nice-and-inclusive)',
        date: '2017-06-01',
        tags: [
          'tc39',
          'teaching',
          'podcasting',
          'open source',
          'glamorous',
          'personal',
          'privilege',
        ],
      },
      {
        thing: '[The Changelog](https://changelog.com)',
        description:
          '[First-time Contributors and Maintainer Balance](https://changelog.com/podcast/246)',
        date: '2017-04-10',
        tags: [
          'oss',
          'open source',
          'glamorous',
          'maintaining open source',
          'community',
        ],
      },
      {
        thing: '[Dads in Development](http://www.dadsindev.com/)',
        description:
          '[Episode 12: CSS Modules](http://www.dadsindev.com/12) (and CSS in JS)',
        date: '2016-08-11',
        tags: ['css', 'aphrodite', 'webpack', 'css modules'],
      },
      {
        thing: '[Career.js](http://careerjs.com/)',
        description:
          '[Ep. 3 - How to Level Up Your Career with Kent C. Dodds](http://careerjs.com/#/3)',
        date: '2016-07-11',
        tags: ['soft skills', 'about me'],
      },
      {
        thing: '[This Developing Story](http://developingstory.netlify.com/)',
        description:
          '[Ep. 56 - Kent C. Dodds](http://developingstory.netlify.com/tds-56-kent-c-dodds)',
        date: '2016-06-07',
        tags: ['about me'],
      },
      {
        thing: '[The Web Behind](https://webbehind.com)',
        description:
          '[Kent C. Dodds](https://webbehind.com/episode-2-kent-c-dodds/)',
        date: '1970-01-01',
        tags: ['about me'],
      },
      {
        thing: '[Modern Web Podcast](http://www.modern-web.org/)',
        description:
          '[S01E03 - ES6, Beard of Jeff Cross, Air Squats, and JavaScript Air with Kent C. Dodds and Ben Lesh](http://modernweb.podbean.com/e/s01e03-es6-beard-of-jeff-cross-air-squats-and-javascript-air-with-kent-c-dodds-and-ben-lesh/)',
        date: '1970-01-01',
        duration: '00:53:31',
        tags: [
          'about me',
          'JavaScript Air',
          'Angular Air',
          'speaking',
          'learning',
        ],
      },
      {
        thing: '[The Web Platform Podcast](http://thewebplatformpodcast.com)',
        description:
          '[Teaching and Learning Angular](http://thewebplatformpodcast.com/72-teaching-and-learning-angular)',
        date: '1970-01-01',
        tags: ['angular', 'teaching', 'learning'],
      },
      {
        thing: '[Adventures in Angular](https://devchat.tv/adv-in-angular)',
        description:
          '[022 AiA Form Validation with Kent C. Dodds](https://devchat.tv/adv-in-angular/022-aia-form-validation-with-kent-c-dodds)',
        date: '1970-01-01',
        tags: ['angular', 'forms'],
      },
    ],
  },
  {
    title: 'Interviews & Chats',
    appearances: [
      {
        thing: '[Modern Web Podcast](http://www.modern-web.org/)',
        description: `[:) O'Reilly FluentConf 2016 - @getify love, best talks, conferences, wizard hats, and pajamas (Part 1 of 2)](https://www.youtube.com/watch?v=QRt9QBdpQQ0)`,
        date: '2016-03-10',
        duration: '00:19:16',
        tags: ['conferences', 'silly'],
      },
      {
        thing: '[Modern Web Podcast](http://www.modern-web.org/)',
        description: `[O'Reilly FluentConf 2016 - JavaScript 2016 and The "Good 'Ol Days" of the Internet (Part 2 of 2)](https://www.youtube.com/watch?v=rMbL1w-Bby4)`,
        date: '2016-03-10',
        duration: '00:29:14',
        tags: ['conferences', 'silly'],
      },
      {
        thing: `[O'Reilly Media](https://www.youtube.com/user/OreillyMedia)`,
        description: `[Interview with Kent C. Dodds (O'Reilly Fluent Conference 2016)](https://www.youtube.com/watch?v=7O2dpgNoY4M)`,
        date: '2016-03-10',
        duration: '00:09:00',
        tags: ['angular', 'react', 'tooling', 'open source', 'learning'],
      },
    ],
  },
  {
    title: 'Blogposts',
    appearances: [
      {
        thing: '[paysa blog](https://www.paysa.com/blog/)',
        description: `[Expert Roundup: Coding Bootcamps](https://www.paysa.com/blog/2017/08/31/expert-roundup-coding-bootcamps/)`,
        date: '2017-08-31',
        tags: ['learning', 'coding', 'bootcamp', 'education'],
      },
      {
        thing: '[onalytica Influencer Library](http://www.onalytica.com/blog/)',
        description: `[Digital Inclusion and Accessibility: Top 100 Influencers and Brands](http://www.onalytica.com/blog/posts/digital-inclusion-accessibility-top-100-influencers-brands/) (I'm #29)`,
        date: '2016-10-13',
        tags: ['accessibility', 'a11y'],
      },
      {
        thing: '[opensource.com](https://opensource.com)',
        description: `[Tips from a software engineer for a balanced life](https://opensource.com/business/16/10/all-things-open-interview-kent-c-dodds)`,
        date: '2016-10-05',
        tags: [
          'balance',
          'open source',
          'time management',
          'teaching',
          'speaking',
          'learning',
          'automation',
        ],
      },
      {
        thing: '[techbeacon.com](http://techbeacon.com/)',
        description: `[41 JavaScript experts to follow on Twitter](http://techbeacon.com/javascript-leaders-you-should-follow-twitter)`,
        date: '2016-10-05',
        tags: [
          'balance',
          'open source',
          'time management',
          'teaching',
          'speaking',
          'learning',
          'automation',
        ],
      },
    ],
  },
].map(group => ({
  ...group,
  appearances: group.appearances.map(fixupData).sort(sortByMostRecent),
}))

function fixupData(appearance) {
  return {
    // defaults
    ...appearance,

    // overrides
    thing: markdownToHTMLWithNoPTag(appearance.thing),
    date: moment(appearance.date),
    isFuture: moment().isBefore(appearance.date),
    tags: (appearance.tags || []).map(
      t => `${t}${tagEmojiMap[t] ? ` ${tagEmojiMap[t]}` : ''}`,
    ),
    description: markdownToHTMLWithNoPTag(appearance.description || ''),
    duration: appearance.duration
      ? moment.duration(appearance.duration).humanize()
      : null,
  }
}

function sortByMostRecent(a, b) {
  return a.date.isAfter(b.date) ? -1 : 1
}

function markdownToHTML(string) {
  return marked(stripIndent(string))
}

function markdownToHTMLWithNoPTag(string) {
  return markdownToHTML(string).slice(3, -5)
}
