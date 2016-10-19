import {configure, storiesOf} from '@kadira/storybook'
import Home from '../src/pages/home'
import Links from '../src/pages/links'
import FourOFour from '../src/pages/404'
import Talks from '../src/pages/talks'
import Blog from '../src/pages/blog'
import Draft from '../src/pages/blog/posts/sunsetting-javascriptair'

function loadStories() {
  storiesOf('Pages', module)
    .add('Home', () => <Home />)
    .add('Links', () => <Links />)
    .add('404', () => <FourOFour />)
    .add('Talks', () => <Talks />)
  storiesOf('Posts', module)
    .add('Home', () => <Blog posts={getPostStubs()} />)
    .add('Draft', () => <Draft />)
}

configure(loadStories, module)

function getPostStubs() {
  return [
    {url: '/post/foobar', title: 'Foo Bar', date: '2016-08-23'},
    {
      url: '/post/something-a-little-longer',
      date: '2015-03-12',
      title: 'Something a little longer',
      subtitle: 'Because sometimes it can be nice to test things out a bit',
    },
    {url: '/post/foobaz', date: '2015-02-22', title: 'The time I ate a sandwich'},
    {url: '/post/short', date: '2015-01-01', title: 'Short title', subtitle: 'Short subtitle'},
  ]
}
