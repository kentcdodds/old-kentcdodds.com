import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import Container from 'components/Container'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { fonts } from '../lib/typography'

const Blog = ({
  data: { site, allMdx },
  pageContext: { pagination, categories },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const posts = page
    .map(id =>
      allMdx.edges.find(
        edge =>
          edge.node.id === id &&
          edge.node.parent.sourceInstanceName !== 'pages',
      ),
    )
    .filter(post => post !== undefined)

  return (
    <Layout site={site}>
      <SEO />
      <Container
        css={css`
          a,
          p {
            display: inline;
          }
          h2 {
            a {
              color: inherit;
            }
          }
          small {
            display: block;
            margin-bottom: 15px;
          }
        `}
      >
        {posts.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              :not(:first-of-type) {
                margin-top: 80px;
              }
              :first-of-type {
                margin-top: 40px;
              }
              .gatsby-image-wrapper {
                max-width: 300px;
              }
            `}
          >
            {post.frontmatter.banner && (
              <Link
                aria-label={`View "${post.frontmatter.title}" article`}
                to={`/${post.fields.slug}`}
              >
                <Img sizes={post.frontmatter.banner.childImageSharp.fluid} />
              </Link>
            )}
            <h2
              css={css`
                margin-top: 30px;
                margin-bottom: 10px;
              `}
            >
              <Link
                aria-label={`View "${post.frontmatter.title}" article`}
                to={`/${post.fields.slug}`}
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            <small>{post.frontmatter.date}</small>
            <p>{post.excerpt}</p>{' '}
            <Link
              to={`/${post.fields.slug}`}
              aria-label={`view "${post.frontmatter.title}" article`}
            >
              Read Article →
            </Link>
          </div>
        ))}
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
        <div>
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="view next page">
              Next Page →
            </Link>
          )}
          {previousPagePath && (
            <Link to={previousPagePath} aria-label="view previous page">
              ← Previous Page
            </Link>
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 255)
          id
          fields {
            title
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
