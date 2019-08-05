import React from 'react'
import {css} from '@emotion/core'

function Guest({children, name, image}) {
  return (
    <div>
      <div css={image && css({display: 'flex', alignItems: 'flex-start'})}>
        {image && (
          <img
            src={image}
            alt={name}
            css={css({width: 120, borderRadius: '50%', margin: 0})}
          />
        )}
        <div
          css={css({
            marginLeft: image ? 20 : 0,
            ul: {display: 'flex', flexWrap: 'wrap'},
            li: {
              listStyle: 'none',
              margin: '5px 10px 0 0',
              fontSize: 16,
            },
          })}
        >
          <h2 css={css({margin: '28px 0 10px 0'})}>{name}</h2>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Guest
