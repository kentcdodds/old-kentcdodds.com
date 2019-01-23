import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/SEO'
import { css } from '@emotion/core'
import Container from 'components/Container'
import Layout from '../components/Layout'
import { fonts } from '../lib/typography'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <article
        css={css`
          width: 100%;
          padding: 30px 0 50px 0;
          display: flex;
        `}
      >
        <Container>
          <h1
            css={css`
              text-align: center;
            `}
          >
            {mdx.frontmatter.title}
          </h1>
          <h3
            css={css`
              text-align: center;
              font-size: 15px;
              opacity: 0.6;
              font-family: ${fonts.regular}, sans-serif;
              font-weight: normal;
            `}
          >
            {mdx.frontmatter.date}
          </h3>
          {mdx.frontmatter.banner && (
            <Img
              sizes={mdx.frontmatter.banner.childImageSharp.sizes}
              alt={site.siteMetadata.keywords.join(', ')}
            />
          )}
          <br />
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`
