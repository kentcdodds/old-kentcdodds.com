import React from 'react'

import Title from './title'
import Subtitle from './subtitle'
import SmallTitle from './small-title'
import Paragraph from './paragraph'
import List from './list'
import Code from './code'
import {preToCodeBlock} from 'mdx-utils'

export default {
  h1: props => <Title {...props} />,
  h2: props => <Subtitle {...props} />,
  h3: props => <SmallTitle {...props} />,
  p: props => <Paragraph {...props} />,
  ul: props => <List {...props} />,
  pre: preProps => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />
    }
  },
}

/* eslint react/display-name:0 */
