import matchSorter from 'match-sorter'

export function searchAndSort(...args) {
  return matchSorter(...args)
}

// this is just here to make the IDE/static checkers happy.
export default function pretendMatchSorter(...args) {
  return () => matchSorter(...args)
}
