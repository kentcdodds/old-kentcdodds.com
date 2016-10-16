import {resolve} from 'path'
import Page from '../src/components/page'
import Talks from '../src/pages/talks'
import renderComponentToFile from './render-component-to-file'

renderComponentToFile(
  <Page>
    <Talks />
  </Page>,
  resolve(__dirname, '../talks/index.html'),
)
