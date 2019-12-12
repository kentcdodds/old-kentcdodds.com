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

  return `https://${host}/${pathname}/embed${search}`
}

const getHTML = url => {
  const iframeSrc = getEggheadIFrameSrc(url)

  return `
    <iframe
      src="${iframeSrc}"
      style="width: 100%; height: 54vw; max-height: 410px; border: none; border-radius: 4px;"
      allowfullscreen
    >
    </iframe>
  `
}

module.exports = {getHTML, shouldTransform}
