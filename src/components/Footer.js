import React from 'react'
import Link from '../components/Link'
import {css} from '@emotion/core'
import {bpMaxSM} from '../lib/breakpoints'
import SubscribeForm from './Forms/Subscribe'
import {Twitter, GitHub, YouTube} from './Social'
import Container from './Container'

import Signature from '../images/signature.png'

const Footer = ({noSubscribeForm}) => (
  <footer
    css={css`
      background: #231c42;
      color: white;
      margin-top: 70px;
    `}
  >
    <Container
      css={css`
        padding-top: 0;
        padding-bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${bpMaxSM} {
          padding-top: 0;
          flex-direction: column;
        }
      `}
    >
      {!noSubscribeForm && (
        <div
          css={css`
            margin-top: -40px;
          `}
        >
          <SubscribeForm />
          <br />
          <br />
        </div>
      )}
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          div,
          img {
            margin: 50px 0;
            ${bpMaxSM} {
              margin: 20px 0;
            }
          }
          ${bpMaxSM} {
            align-items: center;
          }
        `}
      >
        <div>
          <Twitter />
          <GitHub />
          <YouTube />
        </div>

        <Link to="/" aria-label="Return to homepage">
          <img
            src={Signature}
            alt="Kent C. Dodds"
            css={css`
              max-width: 100px;
            `}
          />
        </Link>
      </div>
    </Container>
  </footer>
)

export default Footer
