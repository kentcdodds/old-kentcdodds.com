import React from 'react'
import Helmet from 'react-helmet'
import {graphql, StaticQuery} from 'gatsby'
import {MDXProvider} from '@mdx-js/tag'
import {Global, css} from '@emotion/core'
import styled from '@emotion/styled'
import {ThemeProvider} from 'emotion-theming'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import theme from '../../config/theme'
import mdxComponents from './mdx'
import Header from './Header'
import reset from '../lib/reset'
import {fonts} from '../lib/typography'
import config from '../../config/website'
import Footer from '../components/Footer'

export const globalStyles = css`
  .button-secondary {
    border-radius: 4px;
    padding: 12px 12px;
    background: ${theme.colors.primary_light};
  }
  ${bpMaxSM} {
    p,
    em,
    strong {
      font-size: 90%;
    }
    h1 {
      font-size: 30px;
    }
    h2 {
      font-size: 24px;
    }
  }
  hr {
    margin: 50px 0;
    border: none;
    border-top: 1px solid ${theme.colors.gray};
    background: none;
  }
  em {
    font-family: ${fonts.regularItalic};
  }
  strong {
    em {
      font-family: ${fonts.semiboldItalic};
    }
  }
  input {
    border-radius: 4px;
    border: 1px solid ${theme.colors.gray};
    padding: 5px 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    font-family: ${fonts.regular};
    margin-top: 5px;
    ::placeholder {
      opacity: 0.4;
    }
  }
  .gatsby-resp-image-image {
    background: none !important;
    box-shadow: 0;
  }
  button {
    border-radius: 4px;
    background-color: ${theme.colors.green};
    border: none;
    color: ${theme.colors.white};
    padding: 8px 15px;
    cursor: pointer;
    border: 1px solid ${theme.colors.green};
    transition: ${theme.transition.ease};
    :hover {
      background: ${theme.colors.link_color_hover};
      border: 1px solid ${theme.colors.link_color_hover};
      transition: ${theme.transition.ease};
    }
  }
  pre {
    background-color: #061526 !important;
    border-radius: 4px;
    font-size: 16px;
    padding: 10px;
    overflow-x: auto;
    white-space: nowrap;
    /* Track */
    ::-webkit-scrollbar {
      width: 100%;
      height: 5px;
      border-radius: 0 0 5px 5px;
    }
    ::-webkit-scrollbar-track {
      background: #061526;
      border-radius: 0 0 4px 4px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 5px;
    }
  }
  ${reset};
`

const DefaultHero = styled.section`
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
`

function Layout({
  data,
  frontmatter = {},
  Hero = DefaultHero,
  children,
  dark,
  headerBg,
  headerColor,
  noFooter,
  noSubscribeForm,
  backgroundColor,
  backgroundImage,
  fixedHeader,
}) {
  const {
    site: {
      siteMetadata,
      siteMetadata: {description: siteDescription, keywords: siteKeywords},
    },
  } = data

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter

  const keywords = (frontmatterKeywords || siteKeywords).join(', ')
  const description = frontmatterDescription || siteDescription

  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Helmet
        title={config.siteTitle}
        meta={[
          {name: 'description', content: description},
          {name: 'keywords', content: keywords},
        ]}
      >
        <html lang="en" />
        <noscript>This site runs best with JavaScript enabled.</noscript>
      </Helmet>
      <>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100vh;
            ${backgroundColor && `background: ${backgroundColor}`};
            ${backgroundImage && `background-image: url(${backgroundImage})`};
          `}
        >
          <Hero />
          <Header
            siteTitle={siteMetadata.title}
            dark={dark}
            bgColor={headerBg}
            headerColor={headerColor}
            fixed={fixedHeader}
          />
          <MDXProvider components={mdxComponents}>
            <>{children}</>
          </MDXProvider>
          {!noFooter && (
            <Footer
              author={siteMetadata.author.name}
              noSubscribeForm={noSubscribeForm}
            />
          )}
        </div>
      </>
    </ThemeProvider>
  )
}

export default function LayoutWithSiteData(props) {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
              author {
                name
              }
              keywords
            }
          }
        }
      `}
      render={data => <Layout data={data} {...props} />}
    />
  )
}
