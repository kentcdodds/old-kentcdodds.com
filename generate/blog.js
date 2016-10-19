import {resolve, join} from 'path'
import Page from '../src/components/page'
import Blog from '../src/pages/blog'
import renderComponentToFile from './render-component-to-file'
import {getPosts} from './utils'

const posts = getPosts()

renderComponentToFile(
  <Page>
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
