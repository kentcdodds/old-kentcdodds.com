import {resolve} from 'path'
import Page from '../src/components/page'
import Info from '../src/pages/links'
import renderComponentToFile from './render-component-to-file'
import {getLastUpdated, getLinks} from './utils'

export default renderToFile

function renderToFile() {
  const lastUpdated = getLastUpdated(resolve(__dirname, '../src/pages/info'))
  return renderComponentToFile(
    <Page
      lastUpdated={lastUpdated}
      title="Kent C. Dodds info"
      links={getLinks()}
    >
      <Info />
    </Page>,
    resolve(__dirname, '../dist/info/index.html'),
  )
}
