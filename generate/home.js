import {resolve} from 'path'
import Page from '../src/components/page'
import Home from '../src/pages/home'
import renderComponentToFile from './render-component-to-file'

renderComponentToFile(
  <Page>
    <Home />
  </Page>,
  resolve(__dirname, '../index.html'),
)
