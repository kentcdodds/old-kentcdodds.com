import React from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/seo'
import {css} from '@emotion/core'
import Container from 'components/container'
import Layout from 'components/layout'
import Share from 'components/share'
import SubscribeForm, {TinyLetterSubscribe} from 'components/forms/subscribe'
import BlogPostFooter from 'components/blog-post-footer'
import TestingCta from 'components/testing-cta'
import Markdown from 'react-markdown'
import {fonts} from '../lib/typography'
import config from '../../config/website'
import {bpMaxSM} from '../lib/breakpoints'
import get from 'lodash/get'
import intersection from 'lodash/intersection'
import flatMap from 'lodash/flatMap'
import first from 'lodash/first'
import useGetWorkshops from 'components/workshops/use-get-workshops'
import UpcomingWorkshops from 'components/workshops/upcoming-workshops'
import titleCase from 'ap-style-title-case'

export default function Post({data: {site, mdx}}) {
  const {
    isWriting,
    editLink,
    title,
    slug,
    date,
    description,
    banner,
    bannerCredit,
    noFooter,
    keywords,
  } = mdx.fields

  const {events} = useGetWorkshops(keywords)

  const commonKeyword = first(
    intersection(flatMap(events, event => event.keywords), keywords),
  )

  const blogPostUrl = `${config.siteUrl}${slug}`

  return (
    <Layout
      site={site}
      frontmatter={mdx.fields}
      headerLink={isWriting ? '/writing/blog' : '/blog'}
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
            padding-top: 20px;
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin-bottom: 20px;
              margin-top: 0;
              font-family: ${fonts.light};
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
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
          >
            {date && <h3>{date}</h3>}
          </div>
          {banner && (
            <div
              css={css`
                text-align: center;

                p {
                  margin-bottom: 0;
                }
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              <Img
                fluid={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
              {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
            </div>
          )}
          <br />
          {description ? <Markdown>{description}</Markdown> : null}
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <p css={{textAlign: 'right'}}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
          >
            Discuss on Twitter
          </a>
          <span css={{marginLeft: 10, marginRight: 10}}>{` • `}</span>
          <a target="_blank" rel="noopener noreferrer" href={editLink}>
            Edit post on GitHub
          </a>
        </p>
      </Container>
      <Container noVerticalPadding css={{marginBottom: 40}}>
        <Share
          url={blogPostUrl}
          title={title}
          twitterHandle={config.twitterHandle}
        />
      </Container>
      {events && (
        <div
          css={css`
            margin-top: 55px;
            display: flex;
            justify-content: center;
          `}
        >
          <UpcomingWorkshops
            headline={
              commonKeyword
                ? titleCase(`Upcoming ${commonKeyword} Workshops`)
                : 'Upcoming Workshops'
            }
            byKeywords={keywords}
          />
        </div>
      )}
      {keywords.map(keyword => keyword.toLowerCase()).includes('testing') && (
        <TestingCta />
      )}
      <Container>
        <BlogPostFooter />
      </Container>
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
      fields {
        editLink
        isWriting
        title
        noFooter
        description
        plainTextDescription
        date(formatString: "MMMM DD, YYYY")
        author
        banner {
          ...bannerImage720
        }
        bannerCredit
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`
