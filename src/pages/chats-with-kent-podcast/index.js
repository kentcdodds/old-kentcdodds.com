/** @jsx jsx */
import {jsx} from '@emotion/core'
import {graphql} from 'gatsby'
import Container from 'components/container'
import Layout from 'components/layout'
import PodcastSeason from 'components/podcast/season'
import DistributionPlatforms from 'components/podcast/platforms'
import Hero from 'components/big-hero'
import HeaderImage from '../../images/chats-with-kent.svg'
import theme from '../../../config/theme'
import {bpMaxSM, bpMaxMD} from 'lib/breakpoints'

function SeasonIndex({data: {s1, s2}}) {
  return (
    <Layout
      hero={
        <Hero
          title="Chats with Kent"
          text="Kent C. Dodds chats with developers about life, career, and code."
          image={HeaderImage}
          background="linear-gradient(213deg, #854BF1 0%, #4335DF 100%), linear-gradient(32deg, rgba(255,255,255,0.25) 33%, rgba(153,153,153,0.25) 100%)"
        >
          <div
            css={{
              display: 'flex',
              a: {
                backgroundColor: '#765CF9',
                color: 'white !important',
                border: 'none',
              },
              [bpMaxMD]: {
                paddingBottom: '2rem',
              },
              [bpMaxSM]: {
                paddingBottom: '1rem',
              },
            }}
          >
            <DistributionPlatforms />
          </div>
        </Hero>
      }
      headerColor={theme.colors.white}
    >
      <Container
        css={{
          [bpMaxMD]: {margin: 0},
          marginTop: -60,
          position: 'relative',
          zIndex: 5,
        }}
      >
        <PodcastSeason data={s2} />
        <PodcastSeason css={{marginTop: '1.5rem'}} data={s1} />
      </Container>
    </Layout>
  )
}

export default SeasonIndex

export const seasonIndexQuery = graphql`
  {
    s1: allMdx(
      filter: {frontmatter: {season: {eq: 1}}, fields: {isPodcast: {eq: true}}}
      sort: {order: ASC, fields: frontmatter___number}
    ) {
      totalCount
      nodes {
        id
        fields {
          isPodcast
          slug
        }
        frontmatter {
          title
          season
          number
          guestPhoto {
            childImageSharp {
              fluid(maxWidth: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
    s2: allMdx(
      filter: {frontmatter: {season: {eq: 2}}, fields: {isPodcast: {eq: true}}}
      sort: {order: ASC, fields: frontmatter___number}
    ) {
      totalCount
      nodes {
        id
        fields {
          isPodcast
          slug
        }
        frontmatter {
          title
          season
          number
          guestPhoto {
            childImageSharp {
              fluid(maxWidth: 80) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
