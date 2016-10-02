import {writeFile} from 'fs'
import ReactDOMServer from 'react-dom/server'
import {sheet} from 'aphrodisiac'
import {noop} from 'lodash'
import async from 'async'
import arrify from 'arrify'

export default renderComponent

function renderComponent(comp, destinations, callback = noop) {
  destinations = arrify(destinations)
  const html = ReactDOMServer.renderToStaticMarkup(comp)
  const css = sheet.options.jss.sheets.toString()
  const string = html.replace('/* aphrodisiac-content */', css)

  async.parallel(
    destinations.map(d => cb => writeFile(d, string, cb)),
    callback,
  )
}
