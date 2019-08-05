import React from 'react'
import {graphql} from 'gatsby'
import PodcastEpisodePage from '../../../../templates/podcast-episode'

function Season1({data: {allEpisode, allMdx}}) {
  const MarkdownForLatestEpisode = allMdx.edges.filter(
    Markdown => Markdown.node.frontmatter.id === allEpisode.nodes[0].id,
  )
  return (
    <PodcastEpisodePage
      data={{
        episode: allEpisode.nodes[0],
        mdx: MarkdownForLatestEpisode[0] && MarkdownForLatestEpisode[0].node,
        allEpisode,
      }}
    />
  )
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
    allMdx(filter: {fileAbsolutePath: {regex: "//content/podcast//"}}) {
      edges {
        node {
          body
          frontmatter {
            id
          }
        }
      }
    }
  }
`
