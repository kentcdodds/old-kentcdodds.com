import {configure, storiesOf} from '@storybook/react'
import Home from '../src/pages/home'
import Links from '../src/pages/links'
import FourOFour from '../src/pages/404'
import Talks from '../src/pages/talks'
import Workshops from '../src/pages/workshops'
import Appearances from '../src/pages/appearances'
import Blog from '../src/pages/blog'
import importAll from 'import-all.macro'

function loadStories() {
  storiesOf('Pages', module)
    .add('Home', () => <Home />)
    .add('Links', () => <Links />)
    .add('404', () => <FourOFour />)
    .add('Talks', () => <Talks />)
    .add('Workshops', () => <Workshops />)
    .add('Appearances', () => <Appearances />)
  const postsStories = storiesOf('Posts', module).add('Home', () => (
    <Blog posts={getPostStubs()} />
  ))
  Object.values(
    importAll.sync('../src/pages/blog/posts/*'),
  ).forEach(({title, default: Post}) => {
    postsStories.add(title, () => <Post />)
  })
}
// blah

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
    {
      url: '/post/foobaz',
      date: '2015-02-22',
      title: 'The time I ate a sandwich',
    },
    {
      url: '/post/short',
      date: '2015-01-01',
      title: 'Short title',
      subtitle: 'Short subtitle',
    },
  ]
}
