import React from 'react'
import {graphql} from 'gatsby'
import {Redirect} from '@reach/router'
import first from 'lodash/first'
import get from 'lodash/get'

function SeasonIndex({data: {allMdx}}) {
  const episode = first(allMdx.nodes)
  return <Redirect noThrow to={`/${get(episode, 'fields.slug', '/')}`} />
}

export default SeasonIndex

export const seasonIndexQuery = graphql`
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
