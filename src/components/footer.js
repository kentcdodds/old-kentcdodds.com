import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import {bpMaxSM} from '../lib/breakpoints'
import {Twitter, GitHub, YouTube} from './social'
import Container from './container'

// import Signature from '../images/signature.png'

const Footer = ({/*subscribeForm = <SubscribeForm />, */ maxWidth}) => (
  <footer
    css={css`
      display: flex;
      background: ${theme.colors.black};
      color: white;
      width: 100%;
    `}
  >
    <Container
      maxWidth={maxWidth}
      css={css`
        padding-top: 0;
        padding-bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        ${bpMaxSM} {
          padding-top: 0;
          flex-direction: column;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          div,
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
      </div>
    </Container>
  </footer>
)

export default Footer
