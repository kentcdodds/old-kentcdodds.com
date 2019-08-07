import React from 'react'
import {graphql} from 'gatsby'
import {Redirect} from '@reach/router'
import first from 'lodash/first'
import get from 'lodash/get'

function SeasonIndex({data: {allMDx}}) {
  const episode = first(allMDx.nodes)
  return <Redirect noThrow to={`/${get(episode, 'fields.slug', '/')}`} />
}

export default SeasonIndex

export const seasonIndexQuery = graphql`
  {
    allMdx(
      filter: {frontmatter: {season: {eq: 1}}}
      sort: {order: ASC, fields: frontmatter___number}
    ) {
      totalCount
      nodes {
        frontmatter {
          id
          title
          description
          number
          season
          guestPhoto {
            childImageSharp {
              original {
                src
              }
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`
