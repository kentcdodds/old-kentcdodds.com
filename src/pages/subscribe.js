import React from 'react'
import Layout from '../components/Layout'
import Container from '../components/Container'
import Subscribe from '../components/Forms/Subscribe'

export default function SubscribePage() {
  return (
    <Layout noFooter>
      <Container>
        <Subscribe />
      </Container>
    </Layout>
  )
}
