import * as React from 'react'
import {Helmet} from 'react-helmet'
import {graphql, useStaticQuery} from 'gatsby'
import {MDXProvider} from '@mdx-js/react'
import {Global, css, ThemeProvider} from '@emotion/react'
import styled from '@emotion/styled'
import {QueryParamNotificationMessage} from 'components/notification-message'
import Header from 'components/header'
import Footer from 'components/footer'
import mdxComponents from 'components/mdx'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import theme from '../../config/theme'
import reset from '../lib/reset'
import {fonts} from '../lib/typography'
import config from '../../config/website'

export const globalStyles = css`
  .button-secondary {
    border-radius: 4px;
    padding: 12px 12px;
    background: ${theme.colors.primary_light};
  }
  ${bpMaxSM} {
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
  strong,
  b {
    font-family: ${fonts.semibold};
    em {
      font-family: ${fonts.semiboldItalic};
    }
  }
  input,
  textarea {
    border-radius: 4px;
    border: 1px solid ${theme.colors.gray};
    padding: 5px 10px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    font-family: ${fonts.regular};
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
    :hover:not(:disabled) {
      background: ${theme.colors.link_color_hover};
      border: 1px solid ${theme.colors.link_color_hover};
      transition: ${theme.transition.ease};
    }
    :disabled {
      opacity: 0.6;
      cursor: auto;
    }
  }
  code {
    padding: 2px 4px;
    background: #f4f3fa;
    color: ${theme.colors.body_color};
    border-radius: 3px;
  }
  a {
    code {
      color: ${theme.brand.primary};
    }
  }
  pre {
    background-color: #061526;
    border-radius: 4px;
    font-size: 16px;
    padding: 10px;
    overflow-x: auto;
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
  .highlight-line {
    background-color: rgba(201, 167, 255, 0.2);
    margin: 0 -10px;
    padding: 0 5px;
    border-left: 5px solid #c9a7ff;
  }

  /* the permalink icon */
  h1 .anchor svg,
  h2 .anchor svg,
  h3 .anchor svg,
  h4 .anchor svg,
  h5 .anchor svg,
  h6 .anchor svg {
    position: absolute;
    left: -24px;
    height: 100%; /* vertically center */
    width: 20px;
    transition: all 0.2s;
    opacity: 0;
  }
  h1:hover .anchor svg,
  h2:hover .anchor svg,
  h3:hover .anchor svg,
  h4:hover .anchor svg,
  h5:hover .anchor svg,
  h6:hover .anchor svg {
    opacity: 1;
  }

  ${reset};
`

const DefaultHero = styled.section`
  * {
    color: ${theme.colors.white};
  }
  width: 100%;
  ${({headerColor}) =>
    headerColor
      ? css`
          background: #3155dc;
          background-image: linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%);
          background-position: center right, center left;
          background-repeat: no-repeat;
          background-size: contain;
        `
      : null} position: relative;
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

const copyToClipboard = e => {
  const textToClip = e.currentTarget?.href
  navigator.clipboard.writeText(textToClip)
}

function Layout({
  headerLink,
  siteTitle = 'Kent C. Dodds',
  frontmatter = {},
  hero = <DefaultHero />,
  subscribeForm,
  children,
  dark,
  headerBg,
  headerColor,
  noFooter,
  backgroundColor,
  backgroundImage,
  fixedHeader,
  logo,
  maxWidth = 720,
}) {
  const data = useStaticQuery(graphql`
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
  `)
  const {
    site: {
      siteMetadata,
      siteMetadata: {description: siteDescription, keywords: siteKeywords},
    },
  } = data

  const {
    keywords = siteKeywords,
    description = siteDescription,
    title = config.siteTitle,
  } = frontmatter

  // the sale is over:
  React.useEffect(() => {
    window.localStorage.removeItem('show-epic-react-2021-07-sale-notification')
  }, [])

  React.useEffect(() => {
    const headers = document.querySelectorAll('.autolinked-header')
    headers.forEach(headerEl => {
      headerEl.addEventListener('click', copyToClipboard)
    })
    return () =>
      headers.forEach(headerEl =>
        headerEl.removeEventListener('click', copyToClipboard),
      )
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <QueryParamNotificationMessage queryStringKey="message" />
      <QueryParamNotificationMessage queryStringKey="subscribed">{`Thanks for subscribing!`}</QueryParamNotificationMessage>
      <QueryParamNotificationMessage queryStringKey="remain-subscribed">{`Glad you're still here!`}</QueryParamNotificationMessage>
      <Global styles={globalStyles} />
      <Helmet
        title={title}
        meta={[
          {name: 'description', content: description},
          {name: 'keywords', content: keywords.join()},
        ]}
      >
        <html lang="en" />
        <script src="https://js.tito.io/v1" async />
        <noscript>This site runs best with JavaScript enabled.</noscript>
      </Helmet>
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
        <div css={{flex: '1 0 auto'}}>
          {React.cloneElement(hero, {headerColor})}
          <Header
            maxWidth={maxWidth}
            siteTitle={siteTitle}
            headerLink={headerLink}
            dark={dark}
            bgColor={headerBg}
            headerColor={headerColor}
            fixed={fixedHeader}
            headerImage={logo}
          />
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </div>
        <div css={{flexShrink: '0'}}>
          {noFooter ? null : (
            <Footer
              maxWidth={maxWidth}
              author={siteMetadata.author.name}
              subscribeForm={subscribeForm}
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Layout
