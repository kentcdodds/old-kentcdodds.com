import * as React from 'react'
import {graphql} from 'gatsby'
import {Redirect} from '@reach/router'
import first from 'lodash/first'
import get from 'lodash/get'

function Season2({data: {allMdx}}) {
  const episode = first(allMdx.nodes)
  return <Redirect noThrow to={`/${get(episode, 'fields.slug', '/')}`} />
}

export default Season2

export const query = graphql`
  {
    allMdx(
      filter: {frontmatter: {season: {eq: 2}}, fields: {isPodcast: {eq: true}}}
      sort: {order: ASC, fields: frontmatter___number}
    ) {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`
