import {resolve} from 'path'
import Page from '../src/components/page'
import Links from '../src/pages/links'
import renderComponentToFile from './render-component-to-file'
import {getLastUpdated} from './utils'

const lastUpdated = getLastUpdated(resolve(__dirname, '../src/pages/links'))
renderComponentToFile(
  <Page
    lastUpdated={lastUpdated}
    title="Interesting Links | Kent C. Dodds"
  >
    <Links />
  </Page>,
  resolve(__dirname, '../dist/links/index.html'),
)
