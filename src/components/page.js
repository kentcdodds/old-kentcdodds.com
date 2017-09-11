import {PropTypes} from 'react'
import {oneLine} from 'common-tags'
import GoogleAnalyticsScript from './scripts/google-analytics'

export default Page

function Page(
  {children, title = 'Kent C. Dodds', lastUpdated = getDateStamp(), links} = {},
) {
  return (
    <html lang="en">
      <head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#223891" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Personal website of Kent C. Dodds" />
        <meta
          name="keywords"
          content={oneLine`
              Kent Dodds, kentcdodds, Kent C. Dodds,
              web developer, frontend developer
            `}
        />
        <meta name="author" content="Kent C. Dodds" />
        <link
          rel="publisher"
          href="https://plus.google.com/b/105493143005968326308"
        />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <style
          dangerouslySetInnerHTML={{
            __html: oneLine`
              body {
                font-family: 'MS Sans Serif', Geneva, 'sans-serif';
              }
            `,
          }}
        />
        <style>{`/* glamor-styles */`}</style>
      </head>
      <body>
        {children}
        <Footer links={links} />
        <div style={{textAlign: 'center', fontSize: 'xx-small'}}>
          Last Updated: {lastUpdated}
        </div>
        <GoogleAnalyticsScript />
      </body>
    </html>
  )
}

function getDateStamp() {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function Footer({links = []}) {
  if (!links.length) {
    return null
  }
  return (
    <footer style={{margin: '40px 0'}}>
      <nav>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          {links.map(({url, text}) => (
            <li key={url} style={{margin: '0 10px'}}>
              <a href={url}>{text}</a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

Footer.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ),
}
