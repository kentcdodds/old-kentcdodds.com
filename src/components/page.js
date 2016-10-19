import GoogleAnalyticsScript from './scripts/google-analytics'

export default Page

function Page({
  children,
  title = 'Kent C. Dodds',
  lastUpdated = getDateStamp(),
} = {}) {
  return (
    <html lang="en">
      <head>
        <title>Kent C. Dodds</title>
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#223891" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Personal portfolio website of Kent C. Dodds. Connect with Kent here." />
        <meta name="keywords" content="Kent Dodds, kentcdodds, Kent C. Dodds, web developer, frontend developer" />
        <meta name="author" content="Kent C. Dodds" />
        <link rel="publisher" href="https://plus.google.com/b/105493143005968326308" />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/favicon.png"
        />
        <style
          dangerouslySetInnerHTML={{__html: `body {font-family: 'MS Sans Serif', Geneva, 'sans-serif';}`}}
        />
      </head>
      <body>
        {children}
        <div style={{textAlign: 'center', fontSize: 'xx-small'}}>Last Updated: {lastUpdated}</div>
        <GoogleAnalyticsScript />
      </body>
    </html>
  )
}

function getDateStamp() {
  const date = new Date()
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
