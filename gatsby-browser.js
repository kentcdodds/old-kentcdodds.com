import React from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import NotificationMessage from './src/components/notification-message'

const NEVER_SHOW_KEY = 'kcd_never_show_sw_update'

const learnMoreAboutServiceWorkers = (
  <a
    css={{
      color: 'white',
      textDecoration: 'underline',
      '&:hover,&:active,&:focus': {color: 'white'},
    }}
    target="_blank"
    rel="noopener noreferrer"
    href="https://developers.google.com/web/fundamentals/primers/service-workers"
  >
    Learn more.
  </a>
)

const LinkButton = styled.button({
  color: 'white',
  backgroundColor: 'transparent',
  textDecoration: 'underline',
  border: 'none',
  padding: 0,
  '&&:hover': {
    color: 'white',
    backgroundColor: 'transparent',
    border: 'none',
  },
})

function onServiceWorkerUpdateReady() {
  const neverShow = window.localStorage.getItem(NEVER_SHOW_KEY) === 'true'
  if (neverShow) {
    return
  }
  const root = document.createElement('div')
  document.body.appendChild(root)
  function Notification() {
    const [hide, setHide] = React.useState(false)
    return (
      <NotificationMessage>
        {hide ? null : (
          <div>
            {`This website has been updated in the background. `}
            <LinkButton onClick={() => window.location.reload()}>
              Click here to display the latest version.
            </LinkButton>{' '}
            {learnMoreAboutServiceWorkers}{' '}
            <LinkButton
              onClick={() => {
                window.localStorage.setItem(NEVER_SHOW_KEY, 'true')
                setHide(true)
              }}
            >
              Never show me this again.
            </LinkButton>
          </div>
        )}
      </NotificationMessage>
    )
  }
  ReactDOM.render(<Notification />, root)
}

function onServiceWorkerInstalled() {
  const root = document.createElement('div')
  document.body.appendChild(root)
  ReactDOM.render(
    <NotificationMessage>
      <div>
        {`This website has been installed and is now available offline. `}
        {learnMoreAboutServiceWorkers}
      </div>
    </NotificationMessage>,
    root,
  )
}

export {onServiceWorkerUpdateReady, onServiceWorkerInstalled}
