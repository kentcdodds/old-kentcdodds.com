import React from 'react'
import {css} from '@emotion/core'
import {fonts} from '../../lib/typography'
import Calendar from '../../images/icons/calendar.svg'

const Banner = ({children, title, date, image}) => {
  return (
    <div
      css={css`
        h1 {
          font-family: ${fonts.regular}, sans-serif;
          font-weight: normal;
        }
        img {
          margin: 0;
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
      `};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        `}
      >
        {title && <h1>{title}</h1>}
        <time>{date}</time>
        {children}
      </div>
      {image && <img src={image} alt={title} />}
    </div>
  )
}

export default Banner
