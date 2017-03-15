import {resolve} from 'path'
import Page from '../src/components/page'
import Workshops from '../src/pages/workshops'
import renderComponentToFile from './render-component-to-file'
import {getLastUpdated, getLinks} from './utils'

export default renderToFile

function renderToFile() {
  const lastUpdated = getLastUpdated(
    resolve(__dirname, '../src/pages/workshops'),
  )
  return renderComponentToFile(
    <Page
      lastUpdated={lastUpdated}
      title="My Workshops | Kent C. Dodds"
      links={getLinks()}
    >
      <Workshops />
    </Page>,
    resolve(__dirname, '../dist/workshops/index.html'),
  )
}
