import {resolve} from 'path'
import Page from '../src/components/page'
import Links from '../src/pages/links'
import renderComponentToFile from './render-component-to-file'
import {getLastUpdated, getLinks} from './utils'

export default renderToFile

function renderToFile() {
  const lastUpdated = getLastUpdated(resolve(__dirname, '../src/pages/links'))
  return renderComponentToFile(
    <Page
      lastUpdated={lastUpdated}
      title="Interesting Links | Kent C. Dodds"
      links={getLinks()}
    >
      <Links />
    </Page>,
    resolve(__dirname, '../dist/links/index.html'),
  )
}
