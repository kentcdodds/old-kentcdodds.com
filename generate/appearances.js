import {resolve} from 'path'
import Page from '../src/components/page'
import Appearances from '../src/pages/appearances'
import renderComponentToFile from './render-component-to-file'

renderComponentToFile(
  <Page>
    <Appearances />
  </Page>,
  resolve(__dirname, '../dist/appearances/index.html'),
)
