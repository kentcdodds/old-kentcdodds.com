import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import {rhythm} from '../lib/typography'
import Container from 'components/Container'

import heroImageRight from '../images/hero/path-right.svg'
import heroImageLeft from '../images/hero/path-left.svg'
import photoOfKent from '../images/hero/kent.png'

function Hero({children}) {
  return (
    <section
      css={css`
        * {
          color: ${theme.colors.white};
        }
        width: 100%;
        background: #3155dc;
        background-image: url(${heroImageRight}), url(${heroImageLeft}),
          linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%);
        background-position: center right, center left;
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 0;
        align-items: center;
        display: flex;
        padding-top: 40px;
        ${bpMaxMD} {
          background-size: cover;
        }
        ${bpMaxSM} {
          padding-top: 60px;
        }
      `}
    >
      {children}
      <Container
        css={css`
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          //justify-content: center;
          padding-bottom: 0;
          ${bpMaxMD} {
            flex-direction: column;
            align-items: center;
          }
        `}
      >
        <div
          css={css`
            display: none;
            visibility: hidden;
            ${bpMaxMD} {
              display: block;
              visibility: visible;
              border-radius: 50%;
              width: 160px;
              height: 160px;
              overflow: hidden;
              //background: #241d44;
              background: #4b4ddf;
              background-image: url(${photoOfKent});
              background-size: cover;
              background-position-y: 10px;
              background-repeat: no-repeat;
              margin-bottom: 25px;
            }
          `}
        />
        <h1
          css={css`
            z-index: 5;
            line-height: 1.5;
            margin: 0;
            max-width: ${rhythm(17)};
            font-size: 30px;
            height: 100%;
            display: flex;
            align-self: center;
            padding-bottom: 40px;
          `}
        >
          {`Hi, I’m Kent C. Dodds. I help people make the world better through
          quality software.`}
        </h1>
        <img
          src={photoOfKent}
          alt="Kent C. Dodds"
          css={css`
            max-width: 380px;
            margin-right: -160px;
            margin-bottom: 0;
            ${bpMaxMD} {
              display: none;
              visibility: hidden;
            }
          `}
        />
      </Container>
    </section>
  )
}

export default Hero
