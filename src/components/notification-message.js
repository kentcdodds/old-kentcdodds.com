import React from 'react'
import ReactDOM from 'react-dom'
import {css} from '@emotion/core'
import theme from '../../config/theme'

// this component is one big shrug. I didn't have time to get good at animation
// and it's such a simple single-use component hack something I could ship...
function NotificationMessage({onClick, children}) {
  const portalContainerRef = React.useRef(null)
  if (!portalContainerRef.current && typeof document !== 'undefined') {
    portalContainerRef.current = document.createElement('div')
  }

  const container = portalContainerRef.current

  const [animateIn, setAnimateIn] = React.useState(false)

  React.useEffect(() => {
    Object.assign(container.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 11,
    })
    document.body.append(container)

    return () => document.body.removeChild(container)
  }, [container])

  React.useEffect(() => {
    setAnimateIn(!!children)
  }, [children])

  if (!container) {
    return null
  }

  return ReactDOM.createPortal(
    <button
      onClick={onClick || (() => setAnimateIn(false))}
      css={css`
        border-radius: 0;
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: center;
        background-color: ${theme.colors.green};
        color: ${theme.colors.primary_light};
        transition: 0.3s;
        transform: translateY(${animateIn ? '0' : '-85'}px);
      `}
    >
      {children}
    </button>,
    container,
  )
}

function QueryParamNotificationMessage({
  queryStringKey,
  visibleMs = 8000,
  children,
}) {
  const [message, setMessage] = React.useState(null)

  React.useEffect(() => {
    const searchParams = new URL(window.location).searchParams
    if (searchParams.has(queryStringKey)) {
      const searchParamValue = searchParams.get(queryStringKey)
      if (searchParamValue) {
        setMessage(searchParamValue)
      } else {
        setMessage(children)
      }

      const timeout = setTimeout(() => {
        setMessage(null)
      }, visibleMs)

      return () => clearTimeout(timeout)
    }
  }, [queryStringKey, children, visibleMs])

  return <NotificationMessage>{message}</NotificationMessage>
}

export default NotificationMessage

export {QueryParamNotificationMessage}
