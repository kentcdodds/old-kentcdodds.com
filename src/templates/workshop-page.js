import React from 'react'
import {graphql} from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/seo'
import Container from 'components/container'
import Layout from 'components/layout'
import SubscribeForm, {TinyLetterSubscribe} from 'components/forms/subscribe'
import {css} from '@emotion/core'
import {fonts} from '../lib/typography'
import {get} from 'lodash'
import Header from '../components/workshops/header'
import Register from '../components/workshops/register'

export default function Workshop({data: {site, mdx}}) {
  const {isWriting, title, date, banner, noFooter} = mdx.fields
  const {discount, event, soldOut, time} = mdx.frontmatter

  return (
    <Layout
      site={site}
      frontmatter={mdx.fields}
      headerLink="/workshops"
      noFooter={noFooter}
      subscribeForm={isWriting ? <TinyLetterSubscribe /> : <SubscribeForm />}
    >
      <SEO
        frontmatter={mdx.fields}
        metaImage={get(mdx, 'fields.banner.childImageSharp.fluid.src')}
        isBlogPost
      />
      <article
        css={css`
          width: 100%;
          display: flex;
          twitter-widget {
            margin-left: auto;
            margin-right: auto;
          }
        `}
      >
        <Container
          css={css`
            padding-top: 0;
          `}
        >
          <Header
            soldOut={soldOut}
            title={title}
            date={date}
            image={banner ? banner.childImageSharp.fluid : false}
            buttonText="Get on the wait list"
            time={time}
          />
          <div
            css={css`
              display: flex;
              justify-content: center;
              h3,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-family: ${fonts.regular}, sans-serif;
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          />
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
          <Register
            light
            event={event}
            discountAvailable={discount}
            title="Join the waiting list to get notified of future workshops."
          />
        </Container>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        keywords
      }
    }
    mdx(fields: {id: {eq: $id}}) {
      frontmatter {
        soldOut
        discount
        event
        time
      }
      fields {
        editLink
        isWriting
        title
        noFooter
        description
        date(formatString: "MMMM DD, YYYY")
        author
        banner {
          ...bannerImage720
        }
        bannerCredit
        slug
        description
        keywords
      }
      code {
        body
      }
    }
  }
`
