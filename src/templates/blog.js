import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import Blog from 'components/blog'

function CodingBlog(props) {
  return <Blog {...props} />
}

export default function CodingBlogWithData(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMdx(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {
              frontmatter: {published: {ne: false}}
              fileAbsolutePath: {regex: "//content/blog//"}
            }
          ) {
            edges {
              node {
                excerpt(pruneLength: 300)
                id
                fields {
                  title
                  isWriting
                  slug
                  date
                }
                parent {
                  ... on File {
                    sourceInstanceName
                  }
                }
                frontmatter {
                  title
                  date(formatString: "MMMM DD, YYYY")
                  banner {
                    childImageSharp {
                      fluid(maxWidth: 600) {
                        ...GatsbyImageSharpFluid_withWebp_tracedSVG
                      }
                    }
                  }
                  slug
                  keywords
                }
              }
            }
          }
        }
      `}
      render={data => <CodingBlog data={data} {...props} />}
    />
  )
}
