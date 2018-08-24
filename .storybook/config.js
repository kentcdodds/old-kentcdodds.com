import {configure, storiesOf} from '@storybook/react'
import Home from '../src/pages/home'
import Links from '../src/pages/links'
import FourOFour from '../src/pages/404'
import Talks from '../src/pages/talks'
import Workshops from '../src/pages/workshops'
import Appearances from '../src/pages/appearances'
import Info from '../src/pages/info'
import importAll from 'import-all.macro'

function loadStories() {
  storiesOf('Pages', module)
    .add('Home', () => <Home />)
    .add('Links', () => <Links />)
    .add('404', () => <FourOFour />)
    .add('Talks', () => <Talks />)
    .add('Workshops', () => <Workshops />)
    .add('Appearances', () => <Appearances />)
    .add('Info', () => <Info />)
}

configure(loadStories, module)
