import React from 'react'
import {css} from '@emotion/core'
import Layout from '../components/Layout'
import Container from 'components/Container'
import SEO from '../components/SEO'
import theme from '../../config/theme'
import talks from '../data/talks'
import Presentations from 'components/presentations'

export default function Talks() {
  return (
    <Layout headerColor={theme.colors.white}>
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          margin-top: 30px;
        `}
      >
        <Presentations presentations={talks} />
      </Container>
    </Layout>
  )
}
