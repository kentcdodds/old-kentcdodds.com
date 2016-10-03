import {configure, storiesOf} from '@kadira/storybook'
import Home from '../src/pages/home'
import Links from '../src/pages/links'
import FourOFour from '../src/pages/404'

function loadStories() {
  storiesOf('Pages', module)
    .add('Home', () => <Home />)
    .add('Links', () => <Links />)
    .add('404', () => <FourOFour />)
}

configure(loadStories, module)
