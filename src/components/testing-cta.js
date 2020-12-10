import * as React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/react'
import {bpMaxSM} from 'lib/breakpoints'
import {fonts} from 'lib/typography'
import ReactCountdown from 'react-countdown-now'
import theme from '../../config/theme'
import Link from 'components/link'
import Trophy from 'components/courses/testing-js/trophy'

export default function TestingCta({
  title = `Your Essential Guide to Flawless Testing`,
  button = `Start Now`,
  byline = `Jump on this self-paced workshop and learn the smart, efficient way to test any JavaScript application.`,
  background = '#fff',
  saleEndDate,
}) {
  return (
    <Banner
      css={css({
        background,
      })}
    >
      <Content>
        <Link
          css={css({
            color: theme.colors.black,
          })}
          to="https://testingjavascript.com"
        >
          TestingJavaScript.com
        </Link>
        <Title>{title}</Title>
        <Byline>{byline}</Byline>
        <Button href="https://testingjavascript.com">{button}</Button>
      </Content>
      <Box>
        <TrophyContainer>
          <Trophy />
        </TrophyContainer>

        <Card>
          {saleEndDate ? (
            <>
              {/* prettier-ignore */}
              <div css={css({padding: '0 0 16px'})}>
            <Link to ="https://testingjavascript.com#pricing" css={css({
              path: {fill: "#2D2E37"},
              ':hover': {
                path: {fill: "#3A3C54"}
              }
            })}>
              <svg xmlns="http://www.w3.org/2000/svg" width="150" height="38" viewBox="0 0 150 38"><g fill="none" fillRule="evenodd"><path d="M3.13314787,0.0002063401 L146.867307,0.00967225807 C147.971877,0.00974500184 148.867248,0.905234471 148.867175,2.00980397 C148.867156,2.30054886 148.803747,2.58779373 148.681364,2.85152679 L141.5762,18.1630897 C141.328452,18.6969851 141.328452,19.3129038 141.5762,19.8467991 L148.681172,35.1579388 C149.146115,36.1598875 148.710787,37.3490386 147.708838,37.8139823 C147.445024,37.9364022 147.157685,37.9998128 146.866851,37.9997937 L3.13269367,37.9903277 C2.02812418,37.990255 1.13275265,37.0947655 1.13282539,35.990196 C1.13284454,35.699451 1.19625421,35.412206 1.31863678,35.1484728 L8.4237996,19.8369206 C8.67154806,19.3030252 8.67154812,18.6871065 8.42379977,18.1532111 L1.31882737,2.84206087 C0.85388395,1.84011207 1.28921282,0.650960971 2.29116162,0.186017551 C2.55497528,0.0635976981 2.84231412,0.000187186626 3.13314787,0.0002063401 Z"/><text fill="#FFF" fontFamily="Inter-Bold, Inter, sans-serif" fontSize="20" fontWeight="bold" letterSpacing="-.273"><tspan x="25.458" y="26">SAVE 40%</tspan></text></g></svg></Link>
          </div>
              <ReactCountdown
                date={saleEndDate}
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
              <h3>Write well tested JavaScript.</h3>
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" width="116" height="19" viewBox="0 0 116 19"> <path fill="#FFCD5D" d="M10,0.5 L12.645,6.86 L19.511,7.41 L14.28,11.89 L15.878,18.59 L10,15 L4.122,18.59 L5.72,11.89 L0.49,7.41 L7.355,6.86 L10,0.5 Z M34,0.5 L36.645,6.86 L43.511,7.41 L38.28,11.89 L39.878,18.59 L34,15 L28.122,18.59 L29.72,11.89 L24.49,7.41 L31.355,6.86 L34,0.5 Z M58,0.5 L60.645,6.86 L67.511,7.41 L62.28,11.89 L63.878,18.59 L58,15 L52.122,18.59 L53.72,11.89 L48.49,7.41 L55.355,6.86 L58,0.5 Z M82,0.5 L84.645,6.86 L91.511,7.41 L86.28,11.89 L87.878,18.59 L82,15 L76.122,18.59 L77.72,11.89 L72.49,7.41 L79.355,6.86 L82,0.5 Z M106,0.5 L108.645,6.86 L115.511,7.41 L110.28,11.89 L111.878,18.59 L106,15 L100.122,18.59 L101.72,11.89 L96.49,7.41 L103.355,6.86 L106,0.5 Z"/></svg>
            </div>
          )}
        </Card>
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
  border: '1px solid #F6F6F6',
  [bpMaxSM]: {
    flexDirection: 'column',
  },
})

const Content = styled.div({
  width: '100%',
  padding: '40px 0 40px 40px',
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
  div: {
    color: '#485FEA',
  },
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
    paddingTop: '7rem',
    maxWidth: '100%',
  },
})

const Card = styled.div({
  border: '1px solid #F6F6F6',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '50px 16px',
  background: '#FFFFFF',
  boxShadow: '0 7px 19px 0 rgba(0,0,0,0.04), 0 12px 47px 0 rgba(0,0,0,0.05)',
  borderRadius: '8px 8px 0 0',
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
    },
  },
})

const TrophyContainer = styled.div({
  position: 'absolute',
  maxWidth: 86,
  top: 16,
})

const Countdown = styled.div({
  color: '#485FEA',
  padding: 10,
  background: '#F5F5F8',
  borderRadius: 5,
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
