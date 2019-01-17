import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/SEO'
import { css } from '@emotion/core'
import Container from 'components/Container'
import { bpMaxMD } from '../lib/breakpoints'
import SubscribeForm from '../components/SubscribeForm'
import Layout from '../components/Layout'
import { fonts } from '../lib/typography'
import { bpMaxSM } from '../lib/breakpoints'

export default function Post({
  data: { site, mdx },
  pageContext: { next, prev },
}) {
  return (
    <Layout site={site} frontmatter={mdx.frontmatter}>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <div
        css={css`
          display: flex;
          z-index: 1;
          align-items: center;
          justify-content: center;
          top: 0;
          position: absolute;
          height: 130px;
          width: 100%;
          background-size: 550px;
          background-position: top center;
        `}
      />
      <Container
        maxWidth={640}
        css={css`
          z-index: 999;
          margin-top: 7vh;
          margin-bottom: 100px;
          ${bpMaxMD} {
            margin-top: 60px;
          }
        `}
      >
        <h1
          css={css`
            text-align: center;
            font-size: 40px;
            ${bpMaxSM} {
              font-size: 30px;
            }
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
      <SubscribeForm />
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
