require('dotenv').config()
const axios = require('axios')
const _ = require('lodash')
const cache = require('memory-cache')
const {isFuture} = require('date-fns')

const site = 'kent-c-dodds'

axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.TITO_API_SECRET
}`
axios.defaults.headers.common.Accept = 'application/json'

function buildEvents(eventsData) {
  const events = _.map(
    _.filter(_.sortBy(eventsData, 'start_date'), event => {
      return isFuture(new Date(event.start_date)) && event.live
    }),
    eventData => {
      const {slug, url, start_date, logo, title} = eventData
      function getReleases(eventSlug) {
        return axios
          .get(`https://api.tito.io/v3/${site}/${eventSlug}/releases`)
          .then(({data}) => data.releases)
      }

      function getDiscountCodes(eventSlug) {
        return axios
          .get(`https://api.tito.io/v3/${site}/${eventSlug}/discount_codes`)
          .then(({data}) =>
            _.filter(data.discount_codes, code => {
              return (
                code.code === 'early' &&
                code.state === 'current' &&
                (code.quantity || 0) > code.quantity_used
              )
            }),
          )
      }

      function getActivities(eventSlug) {
        return axios
          .get(`https://api.tito.io/v3/${site}/${eventSlug}/activities`)
          .then(({data}) => data.activities)
      }

      return axios
        .all([getReleases(slug), getDiscountCodes(slug), getActivities(slug)])
        .then(
          axios.spread((releases, codes, activities) => {
            const discounts = _.reduce(
              _.map(codes, code => {
                return {url: code.share_url, code: code.code, ends: code.end_at}
              }),
              (acc, discount) => {
                return {
                  ...acc,
                  [discount.code]: {
                    url: discount.url,
                    ends: discount.ends,
                  },
                }
              },
              {},
            )

            const activity = _.first(activities)

            const event = _.reduce(
              releases,
              (acc, release) => {
                return {
                  quantity: acc.quantity + release.quantity,
                  sold: acc.sold + release.tickets_count,
                  remaining:
                    acc.remaining + (release.quantity - release.tickets_count),
                }
              },
              {
                quantity: 0,
                sold: 0,
                remaining: 0,
              },
            )
            return {
              ...event,
              slug,
              discounts,
              title,
              logo,
              url,
              date: start_date,
              startTime: _.get(activity, 'start_at'),
              endTime: _.get(activity, 'end_at'),
            }
          }),
        )
    },
  )

  return axios.all(events).then(axios.spread((...rest) => rest))
}

export function handler() {
  const cacheDuration = 1000 * 60 * 30 //30mins
  const cachedEvents = cache.get('events')

  if (cachedEvents) {
    return Promise.resolve({
      statusCode: 200,
      body: cachedEvents,
    })
  }

  return axios
    .get(`https://api.tito.io/v3/${site}/events`)
    .then(({data}) => data.events)
    .then(buildEvents)
    .then(events => {
      cache.put('events', JSON.stringify({events}), cacheDuration)
      return {
        statusCode: 200,
        body: JSON.stringify({events}),
      }
    })
    .catch(({response}) => {
      return {
        statusCode: response.status,
        body: JSON.stringify({error: response.statusText}),
      }
    })
}
