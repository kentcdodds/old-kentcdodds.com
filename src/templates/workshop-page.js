import React from 'react'
import {graphql} from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/seo'
import Container from 'components/container'
import Layout from 'components/layout'
import SubscribeForm from 'components/forms/subscribe'
import {css} from '@emotion/core'
import {fonts} from '../lib/typography'
import get from 'lodash/get'
import Header from 'components/workshops/header'
import useGetWorkshops from 'components/workshops/use-get-workshops'

export default function Workshop({data: {site, mdx}}) {
  const {title, banner, noFooter} = mdx.fields
  const state = useGetWorkshops()
  return (
    <Layout
      site={site}
      frontmatter={mdx.fields}
      headerLink="/workshops"
      noFooter={noFooter}
      subscribeForm={<SubscribeForm />}
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
          {!state.loading &&
            state.events
              .filter(ws => {
                return ws.title.toLowerCase() === title.toLowerCase()
              })
              .map(scheduledEvent => {
                const soldOut = scheduledEvent.remaining <= 0
                const discount = get(scheduledEvent, 'discounts.early', false)
                return (
                  <Header
                    key={scheduledEvent.slug}
                    soldOut={soldOut}
                    title={title}
                    date={scheduledEvent && scheduledEvent.date}
                    image={banner ? banner.childImageSharp.fluid : false}
                    buttonText={
                      discount ? 'Secure Your Discount' : 'Secure Your Seat'
                    }
                    startTime={scheduledEvent && scheduledEvent.startTime}
                    endTime={scheduledEvent && scheduledEvent.endTime}
                    url={scheduledEvent && scheduledEvent.url}
                    discount={discount}
                  />
                )
              })}

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
        dealEndDate
      }
      fields {
        editLink
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
