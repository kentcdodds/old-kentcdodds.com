import {PropTypes} from 'react'

export default InlineScript

function InlineScript({fn}) {
  const code = toStringFn(fn)
  let html = code
  if (!process.env.STORYBOOK_RUNNING) {
    html = require('uglify-js').minify(code, {fromString: true}).code // eslint-disable-line global-require
  }
  return <script dangerouslySetInnerHTML={{__html: html}} />
}

InlineScript.propTypes = {
  fn: PropTypes.func.isRequired,
}

function toStringFn(fn) {
  return `(function(){${fn.toString()};${fn.name}()})()`
}
