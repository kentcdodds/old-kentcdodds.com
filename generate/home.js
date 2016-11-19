import {resolve} from 'path'
import Page from '../src/components/page'
import Home from '../src/pages/home'
import renderComponentToFile from './render-component-to-file'
import {getLastUpdated, getLinks} from './utils'

const lastUpdated = getLastUpdated(resolve(__dirname, '../src/pages/home'))
renderComponentToFile(
  <Page
    lastUpdated={lastUpdated}
    title="Home | Kent C. Dodds"
    links={getLinks()}
  >
    <Home />
  </Page>,
  resolve(__dirname, '../dist/index.html'),
)
