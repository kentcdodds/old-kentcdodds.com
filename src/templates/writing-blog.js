import React from 'react'
import {graphql} from 'gatsby'
import Blog from 'components/blog'
import {TinyLetterSubscribe} from 'components/Forms/Subscribe'

function WritingBlog(props) {
  return <Blog {...props} subscribeForm={<TinyLetterSubscribe />} />
}

export default WritingBlog

export const pageQuery = graphql`
  query {
    allMdx(
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {
        frontmatter: {published: {ne: false}}
        fileAbsolutePath: {regex: "//content/writing-blog//"}
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
`
