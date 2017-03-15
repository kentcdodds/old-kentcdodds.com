import marked from 'marked'
import stripIndent from 'strip-indent'
import moment from 'moment'

const tagEmojiMap = {
  lightning: '⚡',
  'open source': '🌎',
  'live coding': '💻',
  testing: '⚠️',
  react: '⚛',
}

export {intersperse, sortPresentations, preparePresentationData}

/* intersperse: Return an array with the separator interspersed between
 * each element of the input array.
 *
 * > intersperse([1,2,3], 0)
 * [1,0,2,0,3]
 * modified from http://stackoverflow.com/a/23619085/971592
 */
function intersperse(arr, sep) {
  if (arr.length === 0) {
    return []
  }
  return arr.reduce(
    function intersperseReduce(xs, x, i) {
      if (i === 0) {
        return [x]
      } else if (typeof sep === 'function') {
        return xs.concat([sep(x, i), x])
      } else {
        return xs.concat([sep, x])
      }
    },
    [],
  )
}

function preparePresentationData(presentation) {
  return {
    // defaults
    ...presentation,

    // overrides
    title: markdownToHTMLWithNoPTag(presentation.title),
    presentations: (presentation.presentations || [])
      .map(delivery => ({
        ...delivery,
        event: markdownToHTMLWithNoPTag(delivery.event),
        date: moment(delivery.date),
        isFuture: moment().isBefore(delivery.date),
      }))
      .sort((a, b) => {
        return a.date.isAfter(b.date) ? -1 : 1
      }),
    tags: (presentation.tags || []).map(
      t => `${t}${tagEmojiMap[t] ? ` ${tagEmojiMap[t]}` : ''}`,
    ),
    resources: (presentation.resources || []).map(markdownToHTMLWithNoPTag),
    abstract: markdownToHTML(presentation.abstract || ''),
  }
}

function sortPresentations(a, b) {
  const mostRecentA = mostRecent(presentationDates(a.presentations))
  const mostRecentB = mostRecent(presentationDates(b.presentations))
  return mostRecentA.isAfter(mostRecentB) ? -1 : 1
}

function markdownToHTML(string) {
  return marked(stripIndent(string))
}

function markdownToHTMLWithNoPTag(string) {
  return markdownToHTML(string).slice(3, -5)
}

function presentationDates(presentations) {
  return presentations.map(({date}) => date)
}

function mostRecent(dates) {
  return dates.reduce((recent, compare) => {
    return compare.isAfter(recent) ? compare : recent
  })
}
