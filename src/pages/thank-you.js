import React from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { fonts } from '../lib/typography'
import theme from '../../config/theme'
import Link from '../components/Link'

export default ({ data: { allMdx } }) => (
  <Center>
    {Illustration}
    <h2>Success! Thank you!</h2>
    <p>In case you haven’t seen already, here’s my latest article:</p>
    {allMdx.totalCount >= 1 && (
      <div>
        {allMdx.edges.map(({ node: post }) => (
          <Link to={post.frontmatter.slug}>
            <h4>{post.frontmatter.title}</h4>
          </Link>
        ))}
      </div>
    )}
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
  h4,
  p {
    font-family: ${fonts.regular};
    font-weight: normal;
    max-width: 350px;
  }
  h2 {
    animation: ${FadeIn} 1500ms cubic-bezier(0.19, 1, 0.22, 1) 1;
  }
  p {
    padding-top: 10px;
    margin-bottom: 0;
    animation: ${FadeIn} 1800ms cubic-bezier(0.19, 1, 0.22, 1) 1;
  }
  h4 {
    animation: ${FadeIn} 1800ms cubic-bezier(0.19, 1, 0.22, 1) 1;
  }
`

// Animation

const RollOut = keyframes`
from, 0% {
//transform: translate(0, 115px) rotate(90deg);
transform: translate(0, 115px);
}
to, 100% {
  //transform: translate(0, 0) rotate(0);
  transform: translate(0, 0);
}
`
const SheetGrow = keyframes`
from, 0% {
transform: scale(0, 1) rotate(-20deg) skew(30deg);
}
to, 100% {
  transform: scale(1, 1) rotate(0) skew(0);
}
`

const TextFadeIn = keyframes`
from, 0% {
    opacity: 0;
    transform: rotate(-20deg);
}
5% {
  opacity: 0;
    transform: rotate(-20deg);
}
to, 100% {
    opacity: 1;
    transform: rotate(0);
}
`

const GrassGrow = keyframes`
from, 0% {

transform: translate(-35px, 20px);
}
40% {
  transform: translate(-35px, 20px);
}
to, 100% {

  transform: translate(-35px, 0);
}
`

const SlopeGrow = keyframes`
from, 0% {
transform: translate(0, 80px);
}
to, 100% {
  transform: translate(0, 0);
}
`

// SVG

const Illustration = (
  <div
    css={css`
      .sign {
        transform-origin: bottom center;
        animation: ${RollOut} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .sheet {
        transform-origin: center center;
        animation: ${SheetGrow} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      text {
        transform-origin: center center;
        animation: ${TextFadeIn} 1.5s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .grass {
        animation: ${GrassGrow} 2.2s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
      .slope {
        animation: ${SlopeGrow} 2.1s cubic-bezier(0.19, 1, 0.22, 1) 1;
      }
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="200"
      height="100"
      viewBox="0 0 100 100"
    >
      <defs>
        <rect id="welcome-a" width="200" height="100" />
        <radialGradient
          id="welcome-c"
          r="76.92%"
          fx="50%"
          fy="50%"
          gradientTransform="matrix(.52439 0 0 .30542 .238 .347)"
        >
          <stop offset="0%" stop-opacity=".136" />
          <stop offset="100%" stop-color="#F0F0F0" stop-opacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" fill-rule="evenodd">
        <mask id="welcome-b" fill="#fff">
          <use xlinkHref="#welcome-a" />
        </mask>
        <g mask="url(#welcome-b)" className="sign">
          <rect
            width="13"
            height="100"
            x="44"
            fill="#B4BDDC"
            rx="1"
            className="slope"
          />
          <ellipse
            cx="50"
            cy="100"
            fill="url(#welcome-c)"
            fill-rule="nonzero"
            rx="82"
            ry="43"
          />
          <path
            className="grass"
            fill={theme.colors.green}
            css={css`
              transform: translate(-35px, 0);
            `}
            d="M112.181818,95.2 L112.181818,96.9 C112.181818,92.2055796 108.518693,88.4 104,88.4 L104,93.5 C104,98.1944204 107.663125,102 112.181818,102 C114.785762,102 117.283055,100.92536 119.124321,99.0124892 C120.965587,97.0996181 122,94.5052082 122,91.8 L122,85 C116.577568,85 112.181818,89.5666956 112.181818,95.2 Z"
          />
          <rect
            className="sheet"
            width="100"
            height="48"
            y="9"
            fill={theme.brand.primary}
            rx="5"
          />
          <rect
            className="sheet"
            width="94"
            height="42"
            x="3"
            y="12"
            stroke="#FFF"
            opacity="0.5"
            rx="3"
            //strokeDasharray="5 2"
          />
          <text
            fill="#FFF"
            font-family={fonts.regular}
            font-size="14.3"
            font-weight="500"
          >
            <tspan x="13.713" y="39">
              WELCOME
            </tspan>
          </text>
          <rect width="13" height="4" x="44" y="57" fill="#7C87AA" />
        </g>
      </g>
    </svg>
  </div>
)

export const latestArticle = graphql`
  query {
    allMdx(
      limit: 1
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            title
            slug
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")

            slug
          }
        }
      }
    }
  }
`
