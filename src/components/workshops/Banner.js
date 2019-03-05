import React from 'react'
import {css} from '@emotion/core'
import {fonts, rhythm} from '../../lib/typography'
import {bpMaxSM} from '../../lib/breakpoints'
import Calendar from '../../images/icons/calendar.svg'

const Banner = ({children, title, date, image}) => {
  return (
    <div
      css={css`
        h1 {
          font-family: ${fonts.regular}, sans-serif;
          font-weight: normal;
          margin-top: 10px;
        }
        h4 {
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
          opacity: 0.8;
        }
        img {
          margin: 0;
          width: 100%;
          max-width: 280px;
          height: auto;
          ${bpMaxSM} {
            max-width: 200px;
          }
        }
        time {
          margin-left: 22px;
          ::before {
            content: '';
            width: 16px;
            height: 16px;
            position: absolute;
            background-size: 16px 16px;
            background: url(${Calendar}) no-repeat 0 0 transparent;
            margin-left: -22px;
            margin-top: 5px;
          }
        }
        ${image &&
          `display: grid;
            grid-template-columns: 1fr 1fr;
            ${bpMaxSM} {
                display: flex;
                flex-direction: column-reverse;
                align-items: center;
            }
      `};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          ${bpMaxSM} {
            margin-top: ${rhythm(2)};
            width: 100%;
          }
        `}
      >
        <h4>Online Workshop</h4>
        {title && <h1>{title}</h1>}
        <time>{date}</time>
        {children}
      </div>
      {image && (
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            align-items: center;
            ${bpMaxSM} {
              justify-content: center;
            }
          `}
        >
          <img src={image} alt={title} />
        </div>
      )}
    </div>
  )
}

export default Banner
