import React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Container from 'components/Container'
import {rhythm, fonts} from '../lib/typography'
import theme from '../../config/theme'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'

import heroImageRight from '../images/hero/path-right.svg'
import heroImageLeft from '../images/hero/path-left.svg'
import photoOfKent from '../images/hero/kent.png'

import workshopsImg from '../images/workshops.svg'
import talksImg from '../images/talks.svg'
import minutesImg from '../images/3-minutes.svg'

const Hero = () => (
  <section
    css={css`
      * {
        color: ${theme.colors.white};
      }
      width: 100%;
      background: #3155dc;
      background-image: url(${heroImageRight}), url(${heroImageLeft}),
        linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%);
      background-position: center right, center left;
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 0;
      align-items: center;
      display: flex;
      padding-top: 40px;
      ${bpMaxMD} {
        background-size: cover;
      }
      ${bpMaxSM} {
        padding-top: 60px;
      }
    `}
  >
    <Container
      css={css`
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        //justify-content: center;
        padding-bottom: 0;
        ${bpMaxMD} {
          flex-direction: column;
          align-items: center;
        }
      `}
    >
      <div
        css={css`
          display: none;
          visibility: hidden;
          ${bpMaxMD} {
            display: block;
            visibility: visible;
            border-radius: 50%;
            width: 160px;
            height: 160px;
            overflow: hidden;
            //background: #241d44;
            background: #4b4ddf;
            background-image: url(${photoOfKent});
            background-size: cover;
            background-position-y: 10px;
            background-repeat: no-repeat;
            margin-bottom: 25px;
          }
        `}
      />
      <h1
        css={css`
          z-index: 5;
          line-height: 1.5;
          margin: 0;
          max-width: ${rhythm(17)};
          font-size: 30px;
          height: 100%;
          display: flex;
          align-self: center;
          padding-bottom: 40px;
        `}
      >
        {`Hi, I’m Kent C. Dodds. I help people make the world better through
        quality software.`}
      </h1>
      <img
        src={photoOfKent}
        alt="Kent C. Dodds"
        css={css`
          max-width: 380px;
          margin-right: -160px;
          margin-bottom: 0;
          ${bpMaxMD} {
            display: none;
            visibility: hidden;
          }
        `}
      />
    </Container>
  </section>
)

const Card = ({backgroundColor = '#E75248', image, title, link}) => (
  <Link
    to={link}
    css={css`
      * {
        color: white;
        margin: 0;
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: ${backgroundColor};
      overflow: hidden;
      border-radius: 5px;
      h4 {
        padding: 40px 40px 0 40px;
      }
      img {
        margin-top: 20px;
      }
      :hover {
        transform: scale(1.03);
        box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.15);
      }
    `}
  >
    <h4>{title}</h4>
    <img src={image} alt={title} />
  </Link>
)

const PostTitle = styled.h3`
  margin-bottom: ${rhythm(0.3)};
  transition: ${theme.transition.ease};
  font-size: 22px;
  font-family: ${fonts.regular};
  :hover {
    color: ${theme.brand.primary};
    transition: ${theme.transition.ease};
  }
`

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

export default function Index({data: {site, allMdx}}) {
  return (
    <Layout site={site} headerColor={theme.colors.white}>
      <Hero />
      <Container
        css={css`
          margin-top: -20px;
          z-index: 999;
          padding-bottom: 0;
          background: white;
          border-radius: 5px;
          padding: 40px 80px 60px 80px;
          ${bpMaxMD} {
            padding: auto;
          }
          ${bpMaxSM} {
            border-radius: 0;
          }
        `}
      >
        <h2>Blog</h2>
        <br />
        {allMdx.edges.map(({node: post}) => (
          <div
            key={post.id}
            css={css`
              margin-bottom: 40px;
            `}
          >
            <Link
              to={post.frontmatter.slug}
              aria-label={`View ${post.frontmatter.title}`}
            >
              <PostTitle>{post.frontmatter.title}</PostTitle>
            </Link>
            <Description>
              {post.excerpt}{' '}
              <Link
                to={post.frontmatter.slug}
                aria-label={`View ${post.frontmatter.title}`}
              >
                Read →
              </Link>
            </Description>
            <span />
          </div>
        ))}
        <Link to="/blog" aria-label="Visit blog page">
          View all articles
        </Link>
      </Container>
      <Container>
        <br />
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, 226px);
            grid-gap: 20px;

            ${bpMaxSM} {
              grid-template-columns: 1fr;
            }
          `}
        >
          <Card
            backgroundColor={theme.colors.red}
            title="Workshops"
            image={workshopsImg}
            link="/workshops"
          />
          <Card
            title="Talks"
            backgroundColor={theme.colors.blue}
            image={talksImg}
            link="/talks"
          />
          <Card
            title="3 Minutes with Kent"
            backgroundColor={theme.colors.yellow}
            image={minutesImg}
            link="https://www.briefs.fm/3-minutes-with-kent"
          />
        </div>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
    allMdx(
      limit: 5
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {published: {ne: false}}}
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
