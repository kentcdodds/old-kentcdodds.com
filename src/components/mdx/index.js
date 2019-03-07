import React from 'react'

import Title from './title'
import Subtitle from './subtitle'
import SmallTitle from './small-title'
import Paragraph from './paragraph'
import List from './list'
import Code from './code'

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

// lifted this from mdx-utils
// it doesn't compile it's code and this busted IE, so I'm just vendoring it.
function preToCodeBlock(preProps) {
  if (
    // children is MDXTag
    preProps.children &&
    // MDXTag props
    preProps.children.props &&
    // if MDXTag is going to render a <code>
    preProps.children.props.name === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      props: {className, ...props},
    } = preProps.children.props

    return {
      codeString: codeString.trim(),
      language: className && className.split('-')[1],
      ...props,
    }
  }
}

/* eslint react/display-name:0, consistent-return:0 */
