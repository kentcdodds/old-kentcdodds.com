import {PropTypes} from 'react'

export default InlineScript

function InlineScript({fn, vars}) {
  const code = toStringFn(fn, vars)
  let html = code
  if (!process.env.STORYBOOK_RUNNING) {
    try {
      html = require('uglify-js').minify(code, {fromString: true}).code // eslint-disable-line global-require
    } catch (e) {
      console.error('there was a problem minifying your code!\n\n', code, '\n\n') // eslint-disable-line
      throw e
    }
  }
  return <script dangerouslySetInnerHTML={{__html: html}} />
}

InlineScript.propTypes = {
  fn: PropTypes.func.isRequired,
  vars: PropTypes.object,
}

function toStringFn(fn, vars = {}) {
  return `(function(){${replaceAll(fn.toString(), vars)};${fn.name}()})()`
}

function replaceAll(string, thingsToReplace) {
  return Object.keys(thingsToReplace).reduce((replaced, regexString) => {
    const valueToUse = thingsToReplace[regexString]
    return replaced.replace(new RegExp(regexString, 'g'), valueToUse)
  }, string)
}
