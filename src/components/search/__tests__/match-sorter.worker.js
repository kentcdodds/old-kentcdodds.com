import {searchAndSort} from '../match-sorter.worker'

test('combines search results for multiple words', () => {
  const items = [{title: 'How to fix a sink', category: 'home improvement'}]
  const results = searchAndSort(items, 'fix home', {
    keys: ['title', 'category'],
  })
  expect(results).toEqual(items)
})

test('returns nothing if any of the words return nothing', () => {
  const items = [{title: 'How to fix a sink', category: 'home improvement'}]
  const results = searchAndSort(items, 'fix home blah', {
    keys: ['title', 'category'],
  })
  expect(results).toEqual([])
})

test('items that appear multiple times in the search are first in the list', () => {
  const sink = {title: 'How to fix a sink', category: 'home improvement'}
  const dishes = {title: 'I do the dishes', category: 'cleaning'}
  const laundry = {title: 'You do my laundry', category: 'home keeping'}
  const items = [sink, dishes, laundry]
  const results = searchAndSort(items, 'do home', {
    keys: ['title', 'category'],
  })
  expect(results).toEqual([laundry])
})
