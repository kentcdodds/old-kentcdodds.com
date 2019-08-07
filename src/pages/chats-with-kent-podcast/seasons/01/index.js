import React from 'react'
import {graphql} from 'gatsby'
import {Redirect} from '@reach/router'
import first from 'lodash/first'
import get from 'lodash/get'

function Season1({data: {allMdx}}) {
  const episode = first(allMdx.nodes)
  return <Redirect noThrow to={`/${get(episode, 'fields.slug', '/')}`} />
}

export default Season1

export const latestEpisodeQuery = graphql`
  {
    allMdx(
      filter: {frontmatter: {season: {eq: 1}}, fields: {isPodcast: {eq: true}}}
      sort: {order: ASC, fields: frontmatter___number}
    ) {
      nodes {
        fields {
          isPodcast
          slug
        }
      }
    }
  }
`
