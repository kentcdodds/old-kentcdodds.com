import React from 'react'
import styled from '@emotion/styled'
import {graphql, useStaticQuery} from 'gatsby'
import Img from 'gatsby-image'
import {css} from '@emotion/core'
import {bpMaxSM} from 'lib/breakpoints'
import {fonts} from 'lib/typography'
import ReactCountdown from 'react-countdown-now'
import theme from '../../config/theme'
import Link from 'components/link'

export default function EpicReactCta({
  title = `Get Really Good at React`,
  button = `Blast Off`,
  byline = `Get yourself the most comprehensive guide to React for professional developers in the universe.`,
  background = '#0F1B35',
  countdownEndDate,
}) {
  const data = useStaticQuery(graphql`
    {
      epicReact: file(relativePath: {eq: "images/courses/epic-react@2x.png"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  return (
    <Banner
      css={css({
        background,
      })}
    >
      <Content>
        <Link
          css={css({
            color: theme.colors.white,
          })}
          to="https://epicreact.dev"
        >
          EpicReact.Dev
        </Link>
        <Title>{title}</Title>
        <Byline>{byline}</Byline>
        <Button href="https://epicreact.dev">{button}</Button>
      </Content>
      <Box>
        <Card>
          {countdownEndDate ? (
            <>
              <div css={css({padding: '0 0 16px', color: '#d2d6ef'})}>
                Taking off in...
              </div>
              <ReactCountdown
                date={countdownEndDate}
                renderer={({days, hours, minutes, seconds, completed}) => {
                  return completed ? null : (
                    <Countdown>
                      <div>
                        {days}
                        <span>days</span>
                      </div>
                      <div>
                        {hours}
                        <span>hrs</span>
                      </div>
                      <div>
                        {minutes}
                        <span>mins</span>
                      </div>
                      <div>
                        {seconds}
                        <span>secs</span>
                      </div>
                    </Countdown>
                  )
                }}
              />
            </>
          ) : (
            <div className="card-content">
              <h3 css={{color: 'white'}}>Write professional React.</h3>
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" width="116" height="19" viewBox="0 0 116 19"> <path fill="#FFCD5D" d="M10,0.5 L12.645,6.86 L19.511,7.41 L14.28,11.89 L15.878,18.59 L10,15 L4.122,18.59 L5.72,11.89 L0.49,7.41 L7.355,6.86 L10,0.5 Z M34,0.5 L36.645,6.86 L43.511,7.41 L38.28,11.89 L39.878,18.59 L34,15 L28.122,18.59 L29.72,11.89 L24.49,7.41 L31.355,6.86 L34,0.5 Z M58,0.5 L60.645,6.86 L67.511,7.41 L62.28,11.89 L63.878,18.59 L58,15 L52.122,18.59 L53.72,11.89 L48.49,7.41 L55.355,6.86 L58,0.5 Z M82,0.5 L84.645,6.86 L91.511,7.41 L86.28,11.89 L87.878,18.59 L82,15 L76.122,18.59 L77.72,11.89 L72.49,7.41 L79.355,6.86 L82,0.5 Z M106,0.5 L108.645,6.86 L115.511,7.41 L110.28,11.89 L111.878,18.59 L106,15 L100.122,18.59 L101.72,11.89 L96.49,7.41 L103.355,6.86 L106,0.5 Z"/></svg>
            </div>
          )}
        </Card>
        <RocketContainer>
          <Img fluid={data.epicReact.childImageSharp.fluid} />
        </RocketContainer>
      </Box>
    </Banner>
  )
}

const Banner = styled.div({
  display: 'flex',
  borderRadius: 8,
  overflow: 'hidden',
  maxWidth: 800,
  margin: '0 auto',
  [bpMaxSM]: {
    flexDirection: 'column',
  },
})

const Content = styled.div({
  width: '100%',
  padding: '40px 0 40px 40px',
  color: theme.colors.white,
  [bpMaxSM]: {
    padding: '32px 16px',
    textAlign: 'center',
  },
})

const Title = styled.h3({
  fontSize: 28,
  lineHeight: '32px',
  fontFamily: fonts.bold,
  marginTop: '1rem',
  marginBottom: 0,
  color: theme.colors.white,
})

const Byline = styled.p({
  margin: '0.75rem 0',
  paddingBottom: '1rem',
  fontSize: 16,
  opacity: 0.8,
})

const Button = styled.a({
  padding: '10px 16px',
  color: 'white !important',
  backgroundImage: 'linear-gradient(180deg, #566FF8 0%, #394FDC 100%)',
  borderRadius: '5px',
  fontSize: '17px',
  fontFamily: fonts.semibold,
  border: 'none',
  transition: 'all 250ms ease',
  ':hover': {
    transition: 'all 250ms ease',
    backgroundImage:
      'linear-gradient(180deg, #4A60DE 0%, #2F43C2 100%) !important',
    border: 'none !important',
  },
})

const Box = styled.div({
  width: '100%',
  maxWidth: 340,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: '0 20px',
  position: 'relative',
  overflow: 'hidden',
  [bpMaxSM]: {
    maxWidth: '100%',
  },
})

const Card = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px 16px',
  maxWidth: 250,
  maxHeight: 200,
  width: '100%',
  height: '100%',
  '.card-content': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    h3: {
      fontSize: 20,
      marginTop: '1.5rem',
      color: theme.colors.white,
    },
  },
})

const RocketContainer = styled.div({
  width: '100%',
})

const Countdown = styled.div({
  color: '#d2d6ef',
  padding: 10,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  width: '100%',
  textAlign: 'center',
  fontFamily: fonts.semibold,
  div: {
    width: '100%',
    fontSize: 20,
    fontVariantNumeric: 'tabular-nums',
    span: {
      fontSize: 9,
      opacity: 0.8,
      textTransform: 'uppercase',
      display: 'block',
    },
  },
})
