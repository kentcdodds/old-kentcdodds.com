import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Subscribe from '../components/Forms/Subscribe'

export default function SubscribePage({data: {site}}) {
  return (
    <Layout site={site} noFooter>
      <Container>
        <Subscribe />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
