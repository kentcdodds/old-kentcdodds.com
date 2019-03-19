import React from 'react'
import Container from 'components/container'
import SEO from 'components/seo'
import Layout from 'components/layout'
import BigHero from 'components/big-hero'
import theme from '../../config/theme'

function WorkshopPage({children, pageContext: {frontmatter}}) {
  return (
    <>
      <SEO frontmatter={frontmatter} />
      <Layout
        pageTitle={frontmatter.title}
        hero={
          frontmatter.useBigHero ? (
            <BigHero message={frontmatter.heroMessage} />
          ) : (
            undefined
          )
        }
        noFooter={frontmatter.noFooter}
        frontmatter={frontmatter}
        headerColor={theme.colors.white}
      >
        <Container>
          <h1>workshop</h1>
          {children}
        </Container>
      </Layout>
    </>
  )
}

export default WorkshopPage
