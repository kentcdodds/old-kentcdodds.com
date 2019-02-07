import stripIndent from 'strip-indent'

function preparePresentationData(presentation) {
  return {
    // defaults
    ...presentation,

    // overrides
    title: stripIndent(presentation.title || ''),
    abstract: stripIndent(presentation.abstract || ''),
    resources: (presentation.resources || []).map(r => stripIndent(r)),
    presentations: (presentation.presentations || [])
      .map(delivery => ({
        ...delivery,
        endDate: delivery.endDate || delivery.date,
        isFuture: moreRecent(delivery.date),
      }))
      .sort((a, b) => {
        return moreRecent(a.date, b.date) ? -1 : 1
      }),
    tags: presentation.tags || [],
  }
}

function sortByPresentationDate(a, b) {
  const mostRecentA = mostRecent(a.presentations.map(({date}) => date))
  const mostRecentB = mostRecent(b.presentations.map(({date}) => date))
  return moreRecent(mostRecentA, mostRecentB) ? -1 : 1
}

function mostRecent(dates) {
  return dates.reduce((recent, compare) => {
    return moreRecent(compare, recent) ? compare : recent
  })
}

// returns true if a is more recent than b
function moreRecent(a, b = new Date()) {
  return new Date(a).getTime() > new Date(b).getTime()
}

export {preparePresentationData, sortByPresentationDate}
