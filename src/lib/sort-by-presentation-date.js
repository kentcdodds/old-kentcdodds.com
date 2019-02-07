function sortByPresentationDate(a, b) {
  const mostRecentA = mostRecent(a.presentations.map(({date}) => date))
  const mostRecentB = mostRecent(b.presentations.map(({date}) => date))
  return new Date(mostRecentA).getTime() > new Date(mostRecentB).getTime()
    ? -1
    : 1
}

function mostRecent(dates) {
  return dates.reduce((recent, compare) => {
    return new Date(compare).getTime() > new Date(recent).getTime()
      ? compare
      : recent
  })
}

export default sortByPresentationDate
