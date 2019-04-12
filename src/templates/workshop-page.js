import React from 'react'
import {graphql} from 'gatsby'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/seo'
import Container from 'components/container'
import Layout from 'components/layout'
import SubscribeForm from 'components/forms/subscribe'
import {css} from '@emotion/core'
import {fonts} from '../lib/typography'
import {get} from 'lodash'
import Header from '../components/workshops/header'
import Register from '../components/workshops/register'
import axios from 'axios'
import find from 'lodash/find'

function reducer(state, action) {
  const {loading, error, events} = action
  switch (action.type) {
    case 'loading':
      return {...state, loading}
    case 'response':
      return {...state, events}
    case 'error':
      return {...state, error}
    default:
      throw new Error()
  }
}

export default function Workshop({data: {site, mdx}}) {
  const {title, banner, noFooter} = mdx.fields
  const {discount, dealEndDate} = mdx.frontmatter

  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    events: [],
  })

  const event = find(state.events, ws => {
    return ws.title.toLowerCase() === title.toLowerCase()
  })

  React.useEffect(() => {
    dispatch({type: 'loading', loading: true})

    const fetchData = async () => {
      try {
        const result = await axios(
          `${process.env.NETLIFY_FUNCTIONS_URL}/tickets`,
        )
        dispatch({type: 'loading', loading: false})
        dispatch({
          type: 'response',
          events: get(result, 'data.events', []),
        })
      } catch (error) {
        dispatch({type: 'loading', loading: false})
        dispatch({type: 'error', error})
      }
    }

    fetchData()
  }, [])

  const soldOut = event ? event.quantity <= event.sold : false

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
          <Header
            soldOut={soldOut}
            title={title}
            date={event && event.date}
            discount={discount}
            image={banner ? banner.childImageSharp.fluid : false}
            buttonText={soldOut ? 'Join the waiting list' : 'Secure your seat'}
            startTime={event && event.startTime}
            endTime={event && event.endTime}
            url={event && event.url}
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
          {event && (
            <Register
              light
              event={event}
              discountAvailable={discount}
              dealEndDate={dealEndDate}
            />
          )}
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
