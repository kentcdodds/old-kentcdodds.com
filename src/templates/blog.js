import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/Layout'
import Link from '../components/Link'

const Blog = ({
  data: { site, allMdx },
  pageContext: { pagination, categories },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page.map(id => allMdx.edges.find(edge => edge.node.id === id))

  return (
    <Layout site={site}>
      {posts.map(({ node: post }) => (
        <div key={post.id}>
          {post.frontmatter.banner && (
            <Img sizes={post.frontmatter.banner.childImageSharp.sizes} />
          )}

          <h2>
            <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
          </h2>

          <small>{post.frontmatter.date}</small>

          <p>{post.excerpt}</p>

          <Link to={post.fields.slug}>Continue Reading</Link>
        </div>
      ))}

      <hr />

      <div>
        Pagination:
        <ul>
          {nextPagePath && (
            <li>
              <Link to={nextPagePath}>Next Page</Link>
            </li>
          )}

          {previousPagePath && (
            <li>
              <Link to={previousPagePath}>Previous Page</Link>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx {
      edges {
        node {
          excerpt(pruneLength: 300)
          id
          fields {
            title
            slug
            date
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
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
