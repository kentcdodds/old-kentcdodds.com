import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/tag'
import { css, Global } from '@emotion/core'
import { fonts } from '../lib/typography'
import { bpMaxSM } from '../lib/breakpoints'

import mdxComponents from './mdx'
import Header from './Header'
import Footer from './Footer'

const globalStyles = css`
  * {
    box-sizing: border-box;
    font-family: ${fonts.regular}, sans-serif;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    background: #fafafa;
    color: #090909;
    //scroll-behavior: smooth;
    max-width: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${fonts.semibold}, sans-serif;
    font-weight: bold;
    a {
      color: inherit;
    }
  }
  h3 {
    margin-top: 30px;
    font-size: 20px;
    font-family: ${fonts.bold}, sans-serif;
  }
  p {
    margin: 0 0 20px 0;
    &:last-child {
      margin: 0;
    }
    em {
      font-family: ${fonts.regularItalic}, sans-serif;
    }
    strong {
      em {
        font-family: ${fonts.semiboldItalic}, sans-serif;
      }
    }
  }
  blockquote {
    text-align: center;
    font-size: 22px;
    p {
      padding-top: 15px;
      font-size: 22px !important;
      font-family: ${fonts.regularItalic}, sans-serif;
    }
  }
  ul,
  ol {
    list-style-position: inside;
    margin: 25px 0;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    color: blue;
    &:hover {
      text-decoration: underline;
      text-decoration-color: #c4c4c4;
      outline: none;
    }
  }
  hr {
    margin-top: 50px;
  }
  input,
  textarea,
  button {
    -webkit-appearance: none;
  }

  ${() => {
    /* Override PrismJS Defaults */ return null
  }} pre {
    background-color: #061526 !important;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;

    ${bpMaxSM} {
      padding: 10px;
    }

    overflow-x: auto;
    /* Track */
    ::-webkit-scrollbar {
      width: 100%;
      height: 7px;
      border-radius: 0 0 4px 4px;
    }
    ::-webkit-scrollbar-track {
      background: #061526;
      border-radius: 0 0 4px 4px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
  }
  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }
`

export default ({ site, frontmatter = {}, children, dark, noFooter }) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter

  const keywords = (frontmatterKeywords || siteKeywords).join(', ')
  const description = frontmatterDescription || siteDescription

  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100vh;
        `}
      >
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Global styles={globalStyles} />
        <Header dark={dark} />
        <MDXProvider components={mdxComponents}>
          <Fragment>
            <div
              css={css`
                flex-grow: 1;
                width: 100vw;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                ${bpMaxSM} {
                  justify-content: flex-start;
                }
              `}
            >
              {children}
            </div>
          </Fragment>
        </MDXProvider>
        {!noFooter && <Footer />}
      </div>
    </Fragment>
  )
}

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author {
        name
      }
      keywords
    }
  }
`
