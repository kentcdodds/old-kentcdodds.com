import {writeFile} from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import ReactDOMServer from 'react-dom/server'

export default renderComponent

function renderComponent(comp, destination, callback = throwErrorCb) {
  const html = ReactDOMServer.renderToStaticMarkup(comp)
  const dir = path.dirname(destination)
  mkdirp(dir, {}, err => {
    if (err) {
      throw err
    }
    writeFile(destination, html, callback)
  })
}

function throwErrorCb(err) {
  if (err) {
    throw err
  }
}
