require('dotenv').config()
const axios = require('axios')
const _ = require('lodash')

const site = 'kent-c-dodds'

axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.TITO_API_SECRET
}`
axios.defaults.headers.common.Accept = 'application/json'

function buildEvents(eventsData) {
  const events = _.map(_.filter(eventsData, {live: true}), eventData => {
    const {slug, url, start_date, logo, title} = eventData
    function getReleases(eventSlug) {
      return axios
        .get(`https://api.tito.io/v3/${site}/${eventSlug}/releases`)
        .then(({data}) => data.releases)
    }

    function getDiscountCodes(eventSlug) {
      return axios
        .get(`https://api.tito.io/v3/${site}/${eventSlug}/discount_codes`)
        .then(({data}) => data.discount_codes)
    }

    return axios.all([getReleases(slug), getDiscountCodes(slug)]).then(
      axios.spread((releases, codes) => {
        const discounts = _.map(_.filter(codes, {state: 'current'}), code => {
          return code.share_url
        })
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
        }
      }),
    )
  })

  return axios.all(events).then(axios.spread((...rest) => rest))
}

export function handler() {
  return axios
    .get(`https://api.tito.io/v3/${site}/events`)
    .then(({data}) => data.events)
    .then(buildEvents)
    .then(events => {
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
