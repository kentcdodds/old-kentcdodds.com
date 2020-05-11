import React from 'react'
import Container from 'components/container'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import {fonts} from '../lib/typography'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import theme from '../../config/theme'
import styled from '@emotion/styled'
import SEO from 'components/seo'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import Layout from 'components/layout'
import EpisodeList from 'components/podcast/list'
import podcastMetaImage from '../images/podcast/metaImage.jpg'
import DistributionPlatforms from '../components/podcast/platforms'

const Sidebar = styled.aside(
  css({
    width: '100%',
    maxWidth: '330px',
    display: 'block',
    position: 'relative',
    '.fade-out': {
      display: 'none',
      visibility: 'hidden',
      position: 'absolute',
      bottom: '0',
      zIndex: '9',
      width: '100%',
      height: 40,
      backgroundImage:
        'linear-gradient(180deg, rgba(250,250,250,0) 0%, #fafafa 100%)',
    },
    [bpMaxMD]: {
      maxWidth: '100%',
      ul: {
        padding: '10px 20px 40px 10px',
        maxHeight: 220,
        overflowY: 'auto',
      },
      '.fade-out': {
        display: 'block',
        visibility: 'visible',
      },
    },
  }),
)

const SidebarHeading = styled.h3(
  css({
    textTransform: 'uppercase',
    fontSize: 12,
    opacity: 0.7,
    letterSpacing: 0.5,
    marginTop: 0,
    marginLeft: 0,
    [bpMaxMD]: {
      marginLeft: 30,
    },
    '.episode-label-mobile': {
      display: 'none',
      visibility: 'hidden',
      [bpMaxMD]: {
        display: 'inline-block',
        visibility: 'visible',
      },
    },
  }),
)

const Article = styled.article(
  css({
    background: 'white',
    boxShadow:
      '0 25px 30px -10px rgba(0,0,0,0.025), 0 15px 30px -20px rgba(0,0,0,0.1)',
    border: '1px solid #f6f6f6',
    width: '100%',
    height: 'auto',
    borderRadius: 5,
    padding: '40px',
    marginLeft: '30px',
    [bpMaxMD]: {
      padding: '20px',
      marginLeft: 0,
    },
  }),
)

function PodcastEpisodePage({data: {mdx, allMdx}, children}) {
  const metaImage = mdx.frontmatter.metaImage
    ? mdx.frontmatter.metaImage.childImageSharp.original.src
    : podcastMetaImage
  return (
    <>
      <SEO frontmatter={mdx.frontmatter} metaImage={metaImage} />
      <Layout maxWidth={1180} siteTitle="Chats with Kent" pageTitle="episode">
        <Container
          maxWidth={1180}
          noVerticalPadding
          css={css({
            display: 'flex',
            justifyContent: 'flex-end',

            [bpMaxSM]: {
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: 10,
            },
            marginBottom: 10,
          })}
        >
          <DistributionPlatforms />
        </Container>
        <Container
          noVerticalPadding
          maxWidth={1180}
          css={css({
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            [bpMaxMD]: {
              flexDirection: 'column',
              padding: 0,
            },
          })}
        >
          <Sidebar>
            <SidebarHeading>
              season {mdx.frontmatter.season <= 9 && '0'}
              {mdx.frontmatter.season}{' '}
              <span className="episode-label-mobile">
                ∙ {allMdx && allMdx.totalCount} episodes
              </span>
            </SidebarHeading>
            <div className="fade-out" />
            <EpisodeList data={allMdx} />
          </Sidebar>
          <Article>
            <iframe
              title="player"
              height="200px"
              width="100%"
              frameBorder="no"
              scrolling="no"
              seamless
              src={`https://player.simplecast.com/${mdx.frontmatter.simpleCastId}?dark=false`}
            />
            <h1
              css={css({
                color: theme.colors.body_color,
                fontSize: 32,
                maxWidth: 700,
                lineHeight: 1.35,
                margin: 0,
                fontFamily: fonts.semibold,
              })}
            >
              {mdx.frontmatter.title}
            </h1>
            <h3 css={css({marginBottom: '2rem', marginTop: '1rem'})}>
              {mdx.frontmatter.description}
            </h3>
            <MDXRenderer>{mdx.body}</MDXRenderer>
            {children}
          </Article>
        </Container>
      </Layout>
    </>
  )
}

export default PodcastEpisodePage

export const query = graphql`
  query($simpleCastId: String!, $season: Int!) {
    mdx(frontmatter: {simpleCastId: {eq: $simpleCastId}}) {
      body
      frontmatter {
        simpleCastId
        title
        description
        number
        season
        guestPhoto {
          childImageSharp {
            fixed(width: 80, height: 80) {
              ...GatsbyImageSharpFixed
            }
            original {
              src
            }
          }
        }
        metaImage {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
      fields {
        slug
      }
    }
    allMdx(
      filter: {frontmatter: {season: {eq: $season}}}
      sort: {order: ASC, fields: frontmatter___number}
    ) {
      totalCount
      nodes {
        frontmatter {
          simpleCastId
          title
          description
          number
          season
          guestPhoto {
            childImageSharp {
              fixed(width: 48, height: 48) {
                ...GatsbyImageSharpFixed
              }
              original {
                src
              }
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`
