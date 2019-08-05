import React from 'react'
import {css} from '@emotion/core'

function Transcript({children}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  return (
    <>
      <div
        css={css({
          maxHeight: isOpen ? '100%' : 620,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 5,
        })}
      >
        <div>{children}</div>
        {!isOpen && (
          <div
            css={css({
              position: 'absolute',
              height: 100,
              bottom: 0,
              width: '100%',
              zIndex: 10,
              backgroundImage:
                'linear-gradient(180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 100%)',
            })}
          />
        )}
      </div>
      <button
        onClick={toggleMenu}
        aria-expanded={isOpen ? 'true' : 'false'}
        css={css({marginTop: '1rem'})}
      >
        {isOpen ? 'Collapse' : 'Expand'} Transcript
      </button>
    </>
  )
}

export default Transcript
