const {URL} = require('url')

const shouldTransform = url => {
  const {host, pathname} = new URL(url)

  return (
    host === 'egghead.io' &&
    pathname.includes('/lessons/') &&
    !pathname.includes('/embed')
  )
}

const getEggheadIFrameSrc = url => {
  const {host, pathname, search} = new URL(url)

  return `https://${host}${pathname}/embed${search}`
}

const getHTML = url => {
  const iframeSrc = getEggheadIFrameSrc(url)

  return `
    <div style="position: relative;">
      <div style="height: 0px; padding-bottom: 56.25%;">
        <iframe
          src="${iframeSrc}"
          style="position: absolute; width: 100%; height: 100%; top: 0px; left: 0px; border: none; border-radius: 4px;"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>
  `
}

module.exports = {getHTML, shouldTransform}
