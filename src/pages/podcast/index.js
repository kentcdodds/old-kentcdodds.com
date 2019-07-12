import React from 'react'
import {graphql} from 'gatsby'
import PodcastEpisodePage from '../../templates/podcast-episode'

function PodcastPage({data: {allEpisode, allMdx}}) {
  const MarkdownForLatestEpisode = allMdx.edges.filter(
    Markdown => Markdown.node.frontmatter.id === allEpisode.nodes[0].id,
  )
  return (
    <PodcastEpisodePage
      data={{
        // always display latest episode under /podcast
        episode: allEpisode.nodes[0],
        mdx: MarkdownForLatestEpisode[0].node,
      }}
    />
  )
}

export default PodcastPage

export const episodeQuery = graphql`
  {
    allEpisode {
      totalCount
      nodes {
        id
        title
        description
        number
        enclosure_url
        season {
          number
        }
      }
    }
    allMdx(filter: {fileAbsolutePath: {regex: "//content/podcast//"}}) {
      edges {
        node {
          code {
            body
          }
          frontmatter {
            id
          }
        }
      }
    }
  }
`
