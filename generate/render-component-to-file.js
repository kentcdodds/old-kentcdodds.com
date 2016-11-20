import {writeFile} from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import ReactDOMServer from 'react-dom/server'
import {renderStatic} from 'glamor/server'

export default renderComponent

function renderComponent(comp, destination, callback = throwErrorCb) {
  const {html, css} = renderStatic(() => {
    return ReactDOMServer.renderToStaticMarkup(comp)
  })
  const string = html.replace('/* glamor-styles */', css)
  const dir = path.dirname(destination)
  mkdirp(dir, {}, err => {
    if (err) {
      throw err
    }
    writeFile(destination, string, callback)
  })
}

function throwErrorCb(err) {
  if (err) {
    throw err
  }
}
