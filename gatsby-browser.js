import React from 'react'
import ReactDOM from 'react-dom'
import NotificationMessage from './src/components/notification-message'

function onServiceWorkerUpdateReady() {
  const root = document.createElement('div')
  document.body.appendChild(root)
  ReactDOM.render(
    <NotificationMessage onClick={() => window.location.reload()}>
      The app has been updated in the background. Click here to display the
      latest version.
    </NotificationMessage>,
    root,
  )
}

export {onServiceWorkerUpdateReady}
