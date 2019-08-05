import React from 'react'
import {css} from '@emotion/core'
import externalLinkIcon from '../../images/icons/external-link.svg'

function Resources({children = []}) {
  return (
    <div
      css={css({
        li: {
          listStyleImage: `url(${externalLinkIcon})`,
        },
      })}
    >
      <h3>Resources</h3>
      {children}
    </div>
  )
}

export default Resources
