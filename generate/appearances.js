import {resolve} from 'path'
import Page from '../src/components/page'
import Appearances from '../src/pages/appearances'
import renderComponentToFile from './render-component-to-file'
import {getLastUpdated, getLinks} from './utils'

export default renderToFile

function renderToFile() {
  const lastUpdated = getLastUpdated(resolve(__dirname, '../src/pages/appearances'))
  return renderComponentToFile(
    <Page
      lastUpdated={lastUpdated}
      title="Appearances | Kent C. Dodds"
      links={getLinks()}
    >
      <Appearances />
    </Page>,
    resolve(__dirname, '../dist/appearances/index.html'),
  )
}
