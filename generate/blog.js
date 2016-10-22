import fs from 'fs'
import {resolve, join} from 'path'
import glob from 'glob'
import Page from '../src/components/page'
import Blog from '../src/pages/blog'
import renderComponentToFile from './render-component-to-file'
import {getPosts, getLastUpdatedFromFileStats} from './utils'

const posts = getPosts()
const postListPageFilesStats = glob.sync('src/pages/blog/**/*', {
  ignore: '**/posts/**',
  nodir: true,
}).map(file => fs.statSync(file))

const lastUpdatedFromFileStats = getLastUpdatedFromFileStats(postListPageFilesStats)

renderComponentToFile(
  <Page
    title="Blog post listings | Kent C. Dodds"
    lastUpdated={lastUpdatedFromFileStats}
  >
    <Blog posts={posts} />
  </Page>,
  resolve(__dirname, '../dist/post/index.html'),
)

posts.forEach(({url, date, title, subtitle, default: Post}) => {
  renderComponentToFile(
    <Page
      title={`${title} | Kent C. Dodds Blog`}
      lastUpdated={date}
    >
      <Post
        url={url}
        date={date}
        title={title}
        subtitle={subtitle}
      />
    </Page>,
    join(__dirname, '../dist', url, 'index.html'),
  )
})
