import * as React from 'react'
import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'
import TrophyImage from '../../../images/testing/trophy@2x.png'

const sparkleAnimation = keyframes`
from {
  opacity: 1;
  transform: rotate(0deg) scale(1.25);
  filter: blur(0px);
}
50% {
  opacity: 0;
  transform: rotate(180deg) scale(0);
  filter: blur(3px);
}
100% {
  opacity: 1;
  transform: rotate(360deg) scale(1.25);
  filter: blur(0px);
}
`
const sparkleAnimation2 = keyframes`
from {
  opacity: 1;
  transform: rotate(360deg) scale(1.15);
  filter: blur(0px);
}

25% {
  opacity: 0;
  transform: rotate(450deg) scale(0);
  filter: blur(5px);
}
50% {
  opacity: 1;
  transform: rotate(540deg) scale(1.15);
  filter: blur(0px);
}
75% {
  opacity: 0;
  transform: rotate(630deg) scale(0);
  filter: blur(5px);
}
100% {
  opacity: 1;
  transform: rotate(720deg) scale(1.15);
  filter: blur(0px);
}
`

export default function SparklingTrophy() {
  return (
    <div css={css({position: 'relative'})}>
      <img src={TrophyImage} alt="" css={css({maxWidth: 100})} />
      {/* prettier-ignore */}
      <SparkleSvg 
          css={css({
            animation: `${sparkleAnimation2} 5s linear infinite`,
          })}
          xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g fill="none" fillRule="evenodd"><polygon fill="#FFF" points="25.084 0 27.441 20.707 37.373 12.627 29.461 22.727 50 25.084 29.461 27.441 37.373 37.373 27.441 29.461 25.084 50 22.727 29.461 12.627 37.373 20.707 27.441 0 25.084 20.707 22.727 12.627 12.627 22.727 20.707"/></g>
        </SparkleSvg>
      {/* prettier-ignore */}
      <SparkleSvg 
          css={css({
            top: 15,
            position: 'absolute',
            transformOrigin: 'center center',
            animation: `${sparkleAnimation} 3s linear infinite`,
          })}
          xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><g fill="none" fillRule="evenodd"><polygon fill="#FFF" points="25.084 0 27.441 20.707 37.373 12.627 29.461 22.727 50 25.084 29.461 27.441 37.373 37.373 27.441 29.461 25.084 50 22.727 29.461 12.627 37.373 20.707 27.441 0 25.084 20.707 22.727 12.627 12.627 22.727 20.707"/></g>
        </SparkleSvg>
    </div>
  )
}

const SparkleSvg = styled.svg({
  top: 20,
  opacity: 0.5,
  left: '40%',
  position: 'absolute',
  transformOrigin: 'center center',
})

export const Sparkle = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="50"
    height="50"
    viewBox="0 0 50 50"
  >
    <g fill="none" fillRule="evenodd">
      <polygon
        fill="#F9F9F9"
        points="25.084 0 27.441 20.707 37.373 12.627 29.461 22.727 50 25.084 29.461 27.441 37.373 37.373 27.441 29.461 25.084 50 22.727 29.461 12.627 37.373 20.707 27.441 0 25.084 20.707 22.727 12.627 12.627 22.727 20.707"
      />
    </g>
  </svg>
)
