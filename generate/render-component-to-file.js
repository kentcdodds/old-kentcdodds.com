import {writeFile} from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import ReactDOMServer from 'react-dom/server'
import {renderStatic} from 'glamor/server'
import Rx from 'rxjs/Rx'

export default renderComponent

function renderComponent(comp, destination) {
  return Rx.Observable.create(observer => {
    const {html, css} = renderStatic(() => {
      return ReactDOMServer.renderToStaticMarkup(comp)
    })
    const string = html.replace('/* glamor-styles */', css)
    const dir = path.dirname(destination)
    mkdirp(dir, {}, err1 => {
      if (err1) {
        observer.error(err1)
      }
      writeFile(destination, string, err2 => {
        if (err2) {
          observer.error(err2)
        }
        observer.complete()
      })
    })
  })
}
