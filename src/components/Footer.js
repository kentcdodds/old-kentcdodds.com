import React from 'react'
import { css } from '@emotion/core'
import { bpMaxSM } from '../lib/breakpoints'
import SubscribeForm from './Forms/Subscribe'
import { Twitter, GitHub, LinkedIn } from './Social'
import Container from './Container'

const Footer = ({ author }) => (
  <footer>
    <Container
      css={css`
        padding-top: 0;
        ${bpMaxSM} {
          padding-top: 0;
        }
      `}
    >
      <SubscribeForm />
      <br />
      <br />
      <br />
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            font-size: 90%;
            opacity: 0.7;
          `}
        >
          {author && `${author} \u00A9 ${new Date().getFullYear()}`}
        </div>
        <div>
          <Twitter />
          <GitHub />
        </div>
      </div>
    </Container>
  </footer>
)

export default Footer
