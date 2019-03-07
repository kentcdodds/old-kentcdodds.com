import React from 'react'
import Title from '../mdx/title'
import parseQueryString from '../../lib/parse-query-string'

function ZencastrLink() {
  const [link, setLink] = React.useState()
  React.useEffect(() => {
    const qs = parseQueryString(window.location.search)
    setLink(`https://zencastr.com/kentcdodds/${qs.zencastr}`)
  }, [link])
  return link ? (
    <div>
      <Title>
        Ready to go?{' '}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </Title>
      <a
        css={{fontSize: '1.1em', fontWeight: 'bold'}}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        Join Your Zencastr Here{' '}
        <span role="img" aria-label="microphone">
          🎙
        </span>
      </a>
    </div>
  ) : null
}

export default ZencastrLink
