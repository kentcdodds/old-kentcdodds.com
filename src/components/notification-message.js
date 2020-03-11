import React from 'react'
import ReactDOM from 'react-dom'
import {css} from '@emotion/core'
import theme from '../../config/theme'

// this component is one big shrug. I didn't have time to get good at animation
// and it's such a simple single-use component hack something I could ship...
function NotificationMessage({children}) {
  const portalContainerRef = React.useRef(null)
  if (!portalContainerRef.current && typeof document !== 'undefined') {
    portalContainerRef.current = document.createElement('div')
  }

  const [animateIn, setAnimateIn] = React.useState(false)

  React.useEffect(() => {
    const container = portalContainerRef.current
    Object.assign(container.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 11,
      display: 'none',
    })
    document.body.append(container)

    return () => document.body.removeChild(container)
  }, [])

  const hasChildren = !!children
  React.useEffect(() => {
    setAnimateIn(hasChildren)
  }, [hasChildren])

  React.useEffect(() => {
    if (animateIn) {
      portalContainerRef.current.style.display = 'block'
    } else {
      const timeout = setTimeout(() => {
        portalContainerRef.current.style.display = 'none'
      }, 350)
      return () => clearTimeout(timeout)
    }
  }, [animateIn])

  if (!portalContainerRef.current) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      css={css`
        border-radius: 0;
        width: 100%;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: ${theme.colors.green};
        color: ${theme.colors.primary_light};
        transition: 0.3s;
        transform: translateY(${animateIn ? '0' : '-85'}px);
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        {children}
      </div>
      <button css={{marginLeft: 10}} onClick={() => setAnimateIn(false)}>
        Close
      </button>
    </div>,
    portalContainerRef.current,
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
