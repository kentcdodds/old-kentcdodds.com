import React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import Layout from '../components/Layout'
import {isEmpty} from 'lodash'
import Container from 'components/Container'
import theme from '../../config/theme'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import talks from '../data/talks'
import Markdown from 'react-markdown'

export const Hero = () => (
  <section
    css={css`
      * {
        color: ${theme.colors.white};
      }
      width: 100%;
      background: #3155dc;
      background-image: linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%);
      background-position: center right, center left;
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 0;
      align-items: center;
      display: flex;
      height: 100px;
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
        padding-bottom: 0;
        ${bpMaxMD} {
          flex-direction: column;
          align-items: center;
        }
      `}
    />
  </section>
)

const Talk = ({
  title,
  abstract,
  presentations = [],
  resources = [],
  tags = [],
}) => (
  <div
    css={css`
      background: white;
      border-radius: 5px;
      padding: 40px;
      ${bpMaxSM} {
        padding: 20px;
      }
      margin-bottom: 20px;
      ul {
        list-style: none;
        margin: 0;
      }
      h4 {
        text-transform: uppercase;
        opacity: 0.6;
        font-size: 13px;
        letter-spacing: 1px;
        line-height: 34px;
        margin: 10px 0;
      }
      h2 {
        margin: 0;
        ${bpMaxSM} {
          margin-bottom: 10px;
        }
        max-width: 80%;
        ${bpMaxSM} {
          max-width: 100%;
        }
      }
      hr {
        margin: 20px 0;
        opacity: 0.5;
      }
      li > time {
        float: right;
        font-size: 14px;
        opacity: 0.8;
        margin-bottom: 10px;
      }
      li {
        display: flex;
        align-items: center;
        margin: 0;
        justify-content: space-between;
      }

      .tag {
        padding: 8px 10px;
        background: white;
        border: 1px solid #f1f1f1;
        border-radius: 3px;
        font-size: 16px;
        margin-right: 5px;
        ${bpMaxSM} {
          padding: 6px 8px;
          font-size: 14px;
        }
      }
    `}
  >
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${bpMaxSM} {
          flex-direction: column;
          align-items: flex-start;
        }
      `}
    >
      <h2>{title}</h2>
      <div>
        {tags.map(tag => (
          <span key={tag.index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
    <p
      css={css`
        margin-top: 20px;
        font-size: 16px;
      `}
    >
      {abstract}
    </p>
    <hr />
    {!isEmpty(presentations) && <h4>Presentations</h4>}
    <ul>
      {presentations.map(presentation => (
        <li key={presentation.index}>
          <Markdown source={presentation.event} />
          <time>{presentation.date}</time>
        </li>
      ))}
    </ul>
    {!isEmpty(resources) && <h4>Resources</h4>}
    <ul>
      {resources.map((resource, i) => (
        <li key={i}>
          <Markdown source={resource} />
        </li>
      ))}
    </ul>
  </div>
)

export default function Talks({data: {site}}) {
  return (
    <Layout site={site} headerColor={theme.colors.white}>
      <Hero />
      <Container
        noVerticalPadding
        css={css`
          margin-top: 30px;
        `}
      >
        {talks.map(talk => (
          <Talk
            key={talk.title}
            title={talk.title}
            abstract={talk.abstract}
            presentations={talk.presentations}
            resources={talk.resources}
            tags={talk.tags}
          />
        ))}
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
  }
`
