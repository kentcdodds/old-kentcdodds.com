import * as React from 'react'

function ZencastrLink() {
  const [{link, retrievedLink}, dispatch] = React.useReducer(
    (state, zencastrParam) => {
      if (zencastrParam) {
        return {
          link: `https://zencastr.com/kentcdodds/${zencastrParam
            .replace(/'/g, '')
            .toLowerCase()}`,
          retrievedLink: true,
        }
      } else {
        return {retrievedLink: true}
      }
    },
    {link: null, retrievedLink: false},
  )
  React.useEffect(() => {
    const searchParams = new URL(window.location).searchParams
    dispatch(searchParams.get('zencastr'))
  }, [link])

  return (
    <div css={{minHeight: 80}}>
      {retrievedLink ? (
        link ? (
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
        ) : (
          `Your calendar event will be updated with a link to this page that includes a link to your Zencastr page. Please watch for that update.`
        )
      ) : null}
    </div>
  )
}

export default ZencastrLink
