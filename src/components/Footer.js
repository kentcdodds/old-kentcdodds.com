import React from 'react'
import { css } from '@emotion/core'
import SubscribeForm from './Forms/Subscribe'
import { Twitter, GitHub, LinkedIn } from './Social'
import Container from './Container'

const Footer = () => (
  <footer>
    <Container>
      <SubscribeForm />
      <br />
      <br />
      <br />
      <Twitter />
      <GitHub />
    </Container>
  </footer>
)

export default Footer
