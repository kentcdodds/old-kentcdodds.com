import React from 'react'
import { css } from '@emotion/core'
import SubscribeForm from './Forms/Subscribe'
import { Twitter, GitHub, LinkedIn } from './Social'
import Container from './Container'

const Footer = ({ author }) => (
  <footer>
    <Container>
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
            opacity: 0.6;
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
