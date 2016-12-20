import React, {PropTypes} from 'react'
import InlineScript from './scripts/inline-script'

export default Disqus

function Disqus({url, id, ...rest}) {
  return (
    <div {...rest}>
      <div id="disqus_thread" />
      <InlineScript
        fn={runScript}
        vars={{
          __URL__: JSON.stringify(url),
          __ID__: JSON.stringify(id),
        }}
      />
    </div>
  )
}

Disqus.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

function runScript() {
  window.disqus_config = function disqus_config() { // eslint-disable-line camelcase
    this.page.url = __URL__ // eslint-disable-line no-undef
    this.page.identifier = __ID__ // eslint-disable-line no-undef
  }

  disqusInit()

  function disqusInit() {
    const parent = document.head || document.body
    const script = document.createElement('script')
    script.src = '//kentcdodds-com.disqus.com/embed.js'
    script.setAttribute('data-timestamp', +new Date())
    parent.appendChild(script)
  }
}
