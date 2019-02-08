import React from 'react'
import Container from 'components/Container'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import BigHero from 'components/big-hero'
import theme from '../../config/theme'

function MarkdownPage({children, pageContext: {frontmatter}}) {
  return (
    <>
      <SEO />
      <Layout
        Hero={frontmatter.useBigHero ? BigHero : undefined}
        noFooter={frontmatter.noFooter}
        frontmatter={frontmatter}
        headerColor={theme.colors.white}
      >
        <Container>{children}</Container>
      </Layout>
    </>
  )
}

export default MarkdownPage
