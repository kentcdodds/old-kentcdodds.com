import { configure } from '@kadira/storybook'

function loadStories() {
  require('../src/pages/home.example')
}

configure(loadStories, module)
