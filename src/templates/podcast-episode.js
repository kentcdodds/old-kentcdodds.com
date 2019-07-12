import React from 'react'
import Container from 'components/container'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import {fonts} from '../lib/typography'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import styled from '@emotion/styled'
import Link from 'components/link'
import SEO from 'components/seo'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import Layout from 'components/layout'
import PodcastList from 'components/podcast/list'

// podcast provider icons
import ApplePodcasts from '../images/podcast/apple.svg'
import GooglePodcasts from '../images/podcast/google.svg'
import Spotify from '../images/podcast/spotify.svg'
import Rss from '../images/podcast/rss.svg'

const ProviderLink = styled(Link)(
  css({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    fontSize: 15,

    borderRadius: 5,
    backgroundColor: 'white',
    color: 'rgba(0,0,0,0.8) !important',
    border: '1px solid rgba(0,0,0,0.05)',
    img: {
      margin: '0 10px 0 0',
    },
    ':not(:last-of-type)': {
      marginRight: 10,
      [bpMaxSM]: {
        margin: '0 3px 5px',
      },
    },

    ':hover': {
      boxShadow: '0 5px 30px -5px rgba(0,0,0,0.075)',
    },
    [bpMaxSM]: {
      margin: '0 3px 5px',
      fontSize: 12,
      padding: '5px 7px',

      img: {
        maxWidth: 20,
      },
    },
  }),
)

const Sidebar = styled.aside(
  css({
    width: '100%',
    maxWidth: '280px',
    flexGrow: '1',
    fontSize: '15px',
    display: 'block',
    position: 'relative',
    '.fade-out': {
      display: 'none',
      visibility: 'hidden',
      position: 'absolute',
      bottom: '0',
      zIndex: '10',
      width: '100%',
      height: 50,
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
      '0 25px 50px -10px rgba(0,0,0,0.025), 0 15px 50px -20px rgba(0,0,0,0.1)',
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

function PodcastEpisodePage({data: {episode, mdx}, children}) {
  return (
    <>
      <SEO frontmatter={episode} podcastImage={episode.image_url} />
      <Layout maxWidth={1080} siteTitle="Chats with Kent" pageTitle="episode">
        <Container
          maxWidth={1080}
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
          <ProviderLink to="/">
            <img src={ApplePodcasts} alt="Listen on Apple Podcasts" /> Apple
          </ProviderLink>
          <ProviderLink to="/">
            <img src={GooglePodcasts} alt="Listen on Google Podcasts" /> Google
          </ProviderLink>
          <ProviderLink to="/">
            <img src={Spotify} alt="Listen on Spotify" /> Spotify
          </ProviderLink>
          <ProviderLink to="/">
            <img src={Rss} alt="Subscribe via RSS" /> RSS
          </ProviderLink>
        </Container>
        <Container
          noVerticalPadding
          maxWidth={1080}
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
              <span className="episode-label-mobile">episodes |</span> season{' '}
              {episode.season.number <= 9 && '0'}
              {episode.season.number}
            </SidebarHeading>
            <div className="fade-out" />
            <PodcastList />
          </Sidebar>
          <Article>
            <iframe
              title="player"
              height="200px"
              width="100%"
              frameBorder="no"
              scrolling="no"
              seamless
              src={`https://player.simplecast.com/${episode.id}?dark=false`}
            />
            <h1
              css={css({
                fontSize: 28,
                maxWidth: 700,
                lineHeight: 1.35,
                marginTop: 0,
                fontFamily: fonts.semibold,
              })}
            >
              {episode.title}
            </h1>
            <p>{episode.description}</p>
            {mdx && <MDXRenderer>{mdx.code.body}</MDXRenderer>}
            {children}
          </Article>
        </Container>
      </Layout>
    </>
  )
}

export default PodcastEpisodePage

export const episodeQuery = graphql`
  query($id: String!) {
    episode(id: {eq: $id}) {
      id
      title
      description
      number
      guid
      id
      enclosure_url
      image_url
      fields {
        slug
      }
      season {
        number
      }
    }
    mdx(frontmatter: {id: {eq: $id}}) {
      code {
        body
      }
      frontmatter {
        id
      }
    }
  }
`
