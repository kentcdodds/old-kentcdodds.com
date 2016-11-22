import {resolve} from 'path'
import Page from '../src/components/page'
import FourOFour from '../src/pages/404'
import renderComponentToFile from './render-component-to-file'

export default renderToFile

function renderToFile() {
  return renderComponentToFile(
    <Page>
      <FourOFour />
    </Page>,
    resolve(__dirname, '../dist/404.html'),
  )
}
