/* eslint no-console:0 */
import Rx from 'rxjs/Rx'
import {random as randomEmoji} from 'random-emoji'

const maxConcurrent = 10

Rx.Observable
  .from([
    './home',
    './404',
    './links',
    './talks',
    './blog',
    './appearances',
    './workshops',
  ])
  .map(modPath => require(modPath).default) // eslint-disable-line
  .mergeMap(fn => Rx.Observable.of(fn()), undefined, maxConcurrent)
  .subscribe({
    error: err => {
      console.error('something wrong happened:', err)
      process.exitCode = 1
    },
    complete: () => {
      console.log('Done! And your random emoji are:')
      console.log(getRandomEmoji(10))
    },
  })

function getRandomEmoji(count) {
  return randomEmoji({count})
    .reduce((string, {character, name}) => `${string}\n${name}: ${character}`, '').trim()
}
