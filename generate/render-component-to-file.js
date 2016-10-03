import {writeFile} from 'fs'
import ReactDOMServer from 'react-dom/server'

export default renderComponent

function renderComponent(comp, destination, callback = () => {}) {
  const html = ReactDOMServer.renderToStaticMarkup(comp)
  writeFile(destination, html, callback)
}
