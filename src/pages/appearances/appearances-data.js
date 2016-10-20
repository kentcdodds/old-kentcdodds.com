/* eslint max-len:[1, 120], max-lines:0 */
import marked from 'marked'
import stripIndent from 'strip-indent'
import moment from 'moment'

const tagEmojiMap = {
  'open source': '🌎',
  testing: '⚠️',
  react: '⚛',
}

// {
//   title: '',
//   description: '',
//   date: '',
//   tags: [],
// },
export default [
  {
    title: 'Podcasts',
    appearances: [
      {
        thing: '[Dads in Development](http://www.dadsindev.com/)',
        description: '[Episode 12: CSS Modules](http://www.dadsindev.com/12) (and CSS in JS)',
        date: '', //fixme
        tags: ['css', 'aphrodite', 'webpack', 'css modules'],
      },
      {
        thing: '[Career.js](http://careerjs.com/)',
        description: '[Ep. 3 - How to Level Up Your Career with Kent C. Dodds](http://careerjs.com/#/3)',
        date: '', //fixme
        tags: ['soft skills'],
      },
      {
        thing: '[This Developing Story](http://developingstory.netlify.com/)',
        description: '[Ep. 56 - Kent C. Dodds](http://developingstory.netlify.com/tds-56-kent-c-dodds)',
        date: '', // fixme
      },
    ],
  },
].map(group => ({
  ...group,
  appearances: group.appearances.map(fixupData).sort(sortByMostRecent),
}))

function fixupData(appearance) {
  return ({
    // defaults
    ...appearance,

    // overrides
    thing: markdownToHTMLWithNoPTag(appearance.thing),
    date: moment(appearance.date),
    isFuture: moment().isBefore(appearance.date),
    tags: (appearance.tags || []).map(t => `${t}${tagEmojiMap[t] ? ` ${tagEmojiMap[t]}` : ''}`),
    description: markdownToHTMLWithNoPTag(appearance.description || ''),
  })
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
