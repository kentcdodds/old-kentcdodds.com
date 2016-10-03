import {resolve} from 'path'
import Page from '../src/components/page'
import FourOFour from '../src/pages/404'
import renderComponentToFile from './render-component-to-file'

renderComponentToFile(
  <Page>
    <FourOFour />
  </Page>,
  resolve(__dirname, '../404.html'),
)
