import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Container from 'components/Container'
import { rhythm } from '../lib/typography'
import theme from '../../config/theme'

const Hero = () => (
  <section
    css={css`
      width: 100%;
      background: ${theme.colors.grey};
      padding: 20px 0 30px 0;
      display: flex;
      margin-bottom: 20px;
    `}
  >
    <Container
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <h1
        css={css`
          position: relative;
          z-index: 5;
          line-height: 1.5;
          margin: 0;
          max-width: 440px;
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 1);
          color: black;
        `}
      >
        Your blog says the things you want to say.
      </h1>
    </Container>
  </section>
)

const PostTitle = styled.h2`
  margin-bottom: ${rhythm(0.3)};
`

const Description = styled.p`
  margin-bottom: ${rhythm(1.5)};
`

export default function Index({ data: { site, allMdx } }) {
  return (
    <Layout site={site} headerBg={theme.colors.grey}>
      <Hero />
      <Container>
        {allMdx.edges.map(({ node: post }) => (
          <div key={post.id}>
            <Link to={post.frontmatter.slug}>
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </Link>
            <Description>{post.frontmatter.description}</Description>
          </div>
        ))}
        <Link to="/blog">Show all blog posts</Link>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 285)
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
            description
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
