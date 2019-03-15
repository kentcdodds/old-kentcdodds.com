import React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import Layout from 'components/layout'
import Container from 'components/container'
import {rhythm} from '../../lib/typography'
import SEO from 'components/seo'
import theme from '../../../config/theme'
import Hero from 'components/big-hero'
import Illustration from '../../images/workshops-hero.svg'
import UpcomingWorkshop from 'components/workshops/upcoming-workshop'
import Workshop from 'components/workshops/workshop'

export default function RemoteWorkshops({data: {remoteWorkshops}}) {
  return (
    <Layout
      hero={
        <Hero
          title="Remote Workshops"
          text="Interdum et malesuada fames ac ante ipsum [primis](#primis) in **faucibus**. Phasellus ac interdum elit. Pellentesque sodales neque eros, a vehicula."
          image={Illustration}
          background="linear-gradient(213deg, #854BF1 0%, #4335DF 100%), linear-gradient(32deg, rgba(255,255,255,0.25) 33%, rgba(153,153,153,0.25) 100%)"
        />
      }
      headerColor={theme.colors.white}
    >
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          margin-top: 30px;
        `}
      >
        <div
          css={css`
            margin-top: -60px;
            position: relative;
            z-index: 999;
          `}
        >
          <UpcomingWorkshop
            title="React JS Fundamentals"
            description="In this workshop, we’ll go over all of those things and more to help you become productive with using the ReactJS framework for building applications for the web."
            date="April 3, 2019"
            spotsRemaining="20"
            bookUrl="#"
            waitlistUrl="#"
            url="#"
          />
          <UpcomingWorkshop
            title="Testing Fundamentals"
            description="In this workshop, we’ll learn how testing frameworks, assertion libraries, and mocking libraries work by building our own, simple version of each."
            date="April 3, 2019"
            spotsRemaining="20"
            bookUrl="#"
            waitlistUrl="#"
            url="#"
          />
          <UpcomingWorkshop
            title="Learn React Hooks"
            description="In this workshop, you’ll learn everything you need to be effective with the fundamental building block of React applications. When you’re finished, you’ll go back to your applications and refactor your components to be simpler, more flexible, and easier to maintain because of what you’ve learned."
            date="April 3, 2019"
            spotsRemaining="0"
            bookUrl="#"
            waitlistUrl="#"
            url="#"
          />
        </div>
        <div
          css={css`
            text-align: center;
            margin: ${rhythm(2)} 0;
          `}
        >
          <h1>Lorem Ipsum</h1>
          <p>Lorem ipsum dolor sit amet, lorem ipsum.</p>
        </div>
        <div
          css={css`
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            margin-bottom: ${rhythm(2)};
          `}
        >
          {remoteWorkshops.edges.map(({node: workshop}) => (
            <Workshop
              key={workshop.id}
              title={workshop.frontmatter.title}
              description={workshop.frontmatter.description}
              url={workshop.fields.slug}
              topic={workshop.frontmatter.topic}
            />
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export const remoteWorkshopsQuery = graphql`
  query {
    remoteWorkshops: allMdx(
      filter: {
        frontmatter: {published: {ne: false}}
        fileAbsolutePath: {regex: "//src/pages/workshops//"}
      }
      sort: {order: ASC, fields: [frontmatter___topic]}
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            topic
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
