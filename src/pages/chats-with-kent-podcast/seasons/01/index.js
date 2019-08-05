import React from 'react'
import {graphql} from 'gatsby'
import {Redirect} from '@reach/router'
import first from 'lodash/first'
import get from 'lodash/get'

function Season1({data: {allEpisode}}) {
  const episode = first(allEpisode.nodes)
  return <Redirect noThrow to={`/${get(episode, 'fields.slug', '/')}`} />
}

export default Season1

export const season1Query = graphql`
  {
    allEpisode(
      filter: {season: {number: {eq: 1}}}
      sort: {order: ASC, fields: number}
    ) {
      totalCount
      nodes {
        id
        title
        description
        number
        enclosure_url
        image_url
        season {
          number
        }
        fields {
          slug
        }
      }
    }
  }
`
