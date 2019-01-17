import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Container from 'components/Container'
import { bpMaxSM, bpMaxMD } from '../lib/breakpoints'
import SubscribeForm from '../components/SubscribeForm'

const Hero = () => (
  <section
    css={css`
      width: 100%;
      background: #090909;
      padding: 30px 0 50px 0;
      height: 25vh;
      display: flex;
      ${bpMaxMD} {
        padding: 20px 0 40px 0;
        height: 30vh;
      }
      ${bpMaxSM} {
        height: auto;
        padding: 10px 0 30px 0;
      }
    `}
  >
    <Container
      maxWidth={920}
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-grow: 1;
          ${bpMaxSM} {
            flex-direction: column-reverse;
            align-items: center;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            width: 50%;
            flex-shrink: 0;
            ${bpMaxSM} {
              width: 100%;
              margin-top: 30px;
            }
          `}
        >
          <h1
            css={css`
              color: #fff;
              font-size: 2.1rem;
              line-height: 1.5;
              margin: 0;
              max-width: 540px;
              ${bpMaxSM} {
                line-height: 1.4;
                font-size: 1.6rem;
              }
            `}
          >
            Your blog says the things you want to say.
          </h1>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;
            ${bpMaxSM} {
              justify-content: center;
            }
          `}
        />
      </div>
    </Container>
  </section>
)

export default function Index({ data: { site } }) {
  return (
    <Layout site={site} dark>
      <Hero />
      <section
        css={css`
          padding: 100px 0 20px 0;
          ${bpMaxMD} {
            padding: 40px 0;
          }
          ${bpMaxSM} {
            padding: 20px 0;
          }
        `}
      >
        <Container maxWidth={920}>
          <div
            css={css`
              margin-top: 50px;
              ${bpMaxSM} {
                margin-top: 50px;
                border-top: 1px solid #f1f1f1;
                padding-top: 30px;
              }
            `}
          >
            <Link to="/blog">There are things to see over here.</Link>
            <div
              css={css`
                margin-top: 50px;
                ${bpMaxSM} {
                  margin-top: 50px;
                  border-top: 1px solid #f1f1f1;
                  padding-top: 30px;
                }
              `}
            >
              <SubscribeForm />
            </div>
          </div>
        </Container>
      </section>
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
