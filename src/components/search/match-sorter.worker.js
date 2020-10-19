import {matchSorter, rankings} from 'match-sorter'

export function searchAndSort(items, searchString, options) {
  const allResults = matchSorter(items, searchString, options)
  const searches = new Set(searchString.split(' '))
  if (searches.length < 2) {
    return allResults
  }
  const individualWordOptions = {
    ...options,
    keys: options.keys.map(key => {
      if (typeof key === 'string') key = {key}
      return {
        ...key,
        maxRanking: Infinity,
        threshold: rankings.WORD_STARTS_WITH,
      }
    }),
  }

  const resultsArray = []
  for (const search of searches) {
    const searchResult = matchSorter(items, search, individualWordOptions)
    if (searchResult.length < 1) {
      return []
    }
    resultsArray.push(...searchResult)
  }

  for (const item of new Set(resultsArray.reverse())) {
    const appearancesInResults = resultsArray.filter(i => i === item)
    if (appearancesInResults.length === searches.size) {
      allResults.push(item)
    }
  }
  return Array.from(new Set(allResults))
}

// this is just here to make the IDE/static checkers happy.
export default function pretendMatchSorter(...args) {
  return () => matchSorter(...args)
}
