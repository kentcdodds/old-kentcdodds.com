import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { fonts } from '../lib/typography'
import Link from '../components/Link'

export default () => (
  <Center>
    <div>{Illustration}</div>
    <h2>I’m sorry to see you go!</h2>
    <p>
      <Link to="#">Click here</Link> to unsubscribe.
    </p>
  </Center>
)

const FadeIn = keyframes`
from, 0% {
    opacity: 0;
}
to, 100% {
    opacity: 1;
}
`

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  text-align: center;
  h2,
  p {
    font-family: ${fonts.regular};
    font-weight: normal;
    max-width: 400px;
  }
  h2 {
    animation: ${FadeIn} 500ms ease-in-out 1;
  }
  p {
    padding-top: 10px;
    animation: ${FadeIn} 800ms ease-in-out 1;
  }
`

// Animation

const MailSlide = keyframes`
from, 0% {
    opacity: 0;
    transform: translate(18px, 20px);
}
20% {
    opacity: 1;
    
}
to, 100% {
    opacity: 1;
    transform: translate(18px, 70px);
}
`

const PiecesSlide = keyframes`
from, 0% {
    transform: scale(1, 0);
    opacity: 0;
}
20% {
    transform: scale(1, 0);
    opacity: 1;
}
85% {
    opacity: 1;
    transform: scale(1, 1);    

}
to, 100% {
    transform: scale(1,1) translate(0, 50px);
    opacity: 1;
}
`

const LightBlink = keyframes`
from, 20% {
opacity: 0.4;
}
80% {
    fill: white;
    opacity: 1;
}
to, 100% {
    opacity: 0.4;
}
`

const ShadowOpacity = keyframes`
from, 0% {
    opacity: 0;
}
80% {
    opacity: 1;
}
to, 100% {
    opacity: 0;
}
`

const LoadShredder = keyframes`
from, 0% {
    transform: scale(0, 1) translate(0, 67px);
}

to, 100% {
    transform: scale(1, 1) translate(0, 67px);
}
`
// SVG

export const Illustration = (
  <div
    css={css`
      .pieces {
        rect {
          animation: ${PiecesSlide} 4s linear infinite;
          transform: scale(1, 1);
          opacity: 0;
          height: 80;
        }
        rect:nth-of-type(1) {
          transform: translate(0, -10px);
        }
      }
      .shredder {
        animation: ${LoadShredder} 500ms cubic-bezier(0.19, 1, 0.22, 1) 1;
        transform-origin: center center;
        transform: translate(0, 67px);
      }
      .mail {
        animation: ${MailSlide} 4s linear infinite;
        transform: translate(18px, 70px);
        transform-origin: center center;
      }
      .light {
        animation: ${LightBlink} 4s cubic-bezier(0.19, 1, 0.22, 1) infinite;
      }
      .shadow {
        animation: ${ShadowOpacity} 4s linear infinite;
      }
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="85"
      height="110"
      viewBox="0 0 85 50"
    >
      <defs>
        <rect id="unsubscribe-a" width="85" height="70" />
        <radialGradient
          className="shadow"
          id="welcome-c"
          r="80%"
          fx="50%"
          fy="50%"
          gradientTransform="matrix(.52439 0 0 .30542 .238 .347)"
        >
          <stop offset="0%" stop-opacity=".13" />
          <stop offset="100%" stop-color="#F0F0F0" stop-opacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(0 -17)">
        <mask id="unsubscribe-b" fill="#fff">
          <use xlinkHref="#unsubscribe-a" />
        </mask>
        <g mask="url(#unsubscribe-b)">
          <g className="mail" transform="translate(18 17)">
            <path
              fill="#B4BDDC"
              d="M47.9347826,37 L1.06521739,37 C0.47691913,37 0,36.5127753 0,35.9117647 L0,1.08823529 C0,0.487224706 0.47691913,0 1.06521739,0 L47.9347826,0 C48.5230809,0 49,0.487224706 49,1.08823529 L49,35.9117647 C49,36.5127753 48.5230809,37 47.9347826,37 Z"
            />
            <path
              fill="#9DA6C5"
              d="M24.5000034,13 C24.7569448,13 25.0133642,13.0948109 25.2167358,13.2833855 L48.6515475,35.1015673 C48.9771422,35.4051891 49.0868917,35.8824618 48.9282593,36.3022109 C48.7696163,36.7230073 48.3748463,37 47.9348151,37 L1.06519171,37 C0.625160512,37 0.230390457,36.7230073 0.0717474343,36.3022 C-0.0868955885,35.8824509 0.0228538954,35.4051782 0.348459299,35.1015564 L23.783271,13.2833745 C23.9866425,13.0948109 24.243062,13 24.5000034,13 Z"
            />
            <path
              fill="#CFD6E9"
              d="M24.4999976,24 C24.2430563,24 23.9866368,23.9051891 23.7832653,23.7166145 L0.348454577,1.89843273 C0.0228491872,1.59481091 -0.0868896399,1.11753818 0.0717427241,0.6978 C0.23038574,0.276992727 0.625155778,0 1.06518696,0 L47.9348083,0 C48.3748395,0 48.7696096,0.276992727 48.9282526,0.6978 C49.0868956,1.11754909 48.9771461,1.59482182 48.6515407,1.89844364 L25.21673,23.7166255 C25.0133585,23.9051891 24.756939,24 24.4999976,24 Z"
            />
          </g>
        </g>
        <ellipse
          className="shadow"
          cx="40"
          cy="100"
          fill="url(#welcome-c)"
          fill-rule="nonzero"
          rx="60"
          ry="60"
        />
        <g
          className="pieces"
          fill="#CFD6E9"
          fill-rule="nonzero"
          transform="translate(18 77)"
        >
          <rect width="2.816" height="30" />
          <rect width="2.816" height="30" x="20.184" />
          <rect width="2.816" height="30" x="9.857" />
          <rect width="2.816" height="24" x="4.694" />
          <rect width="2.816" height="24" x="15.02" />
          <g transform="translate(26)">
            <rect width="2.816" height="30" />
            <rect width="2.816" height="30" x="20.184" />
            <rect width="2.816" height="30" x="9.857" />
            <rect width="2.816" height="24" x="4.694" />
            <rect width="2.816" height="24" x="15.02" />
          </g>
        </g>

        <g className="shredder" fill-rule="nonzero" transform="translate(0 64)">
          <rect width="85" height="13" fill="#737794" rx="5" />
          <circle className="light" cx="7" cy="6" r="3" fill="#CFD6E9" />
        </g>
      </g>
    </svg>
  </div>
)
