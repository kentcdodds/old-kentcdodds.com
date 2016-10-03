import {configure, storiesOf} from '@kadira/storybook'
import Home from '../src/pages/home'
import Links from '../src/pages/links'

function loadStories() {
  storiesOf('Pages', module)
    .add('Home', () => <Home />)
    .add('Links', () => <Links />)
}

configure(loadStories, module)
