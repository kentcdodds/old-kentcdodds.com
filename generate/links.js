import {resolve} from 'path'
import Page from '../src/components/page'
import Links from '../src/pages/links'
import renderComponentToFile from './render-component-to-file'

renderComponentToFile(
  <Page>
    <Links />
  </Page>,
  resolve(__dirname, '../dist/links/index.html'),
)
