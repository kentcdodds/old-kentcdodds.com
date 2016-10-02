import {PropTypes} from 'react'

export default InlineScript

function InlineScript({fn}) {
  const innerHtml = {__html: toStringFn(fn)}
  return <script dangerouslySetInnerHTML={innerHtml} />
}

InlineScript.propTypes = {
  fn: PropTypes.func.isRequired,
}

function toStringFn(fn) {
  return `(function(){${fn.toString()};${fn.name}()})()`
}
