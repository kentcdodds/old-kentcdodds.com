import React from 'react'
import {css} from '@emotion/core'
import {fonts, rhythm} from '../../lib/typography'
import {bpMaxSM} from '../../lib/breakpoints'
import theme from '../../../config/theme'
import {lighten} from 'polished'
import styles from './styles'

const Banner = ({children, title, date, location, buttonText, image}) => {
  return (
    <div
      css={css`
        ${styles}
        background: white;
        border-radius: 5px;
        padding: 40px;
        ${bpMaxSM} {
          padding: 20px;
          margin-left: 0;
          margin-right: 0;
        }
        h1 {
          font-family: ${fonts.semibold}, sans-serif;
          font-weight: normal;
          margin-top: 10px;
        }
        h4 {
          font-size: 14px;
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

        address {
          margin-left: ${date ? '40px' : '22px'};
        }
        ${image &&
          `display: grid;
            grid-template-columns: 2fr 1fr;
            ${bpMaxSM} {
                display: flex;
                flex-direction: column-reverse;
                align-items: center;
            }
      `};
        .button {
          background: ${lighten(0.4, `${theme.brand.primary}`)};
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-right: 10px;
          ${bpMaxSM} {
            margin-top: ${rhythm(2)};
            width: 100%;
            padding-right: 0;
          }
        `}
      >
        <h4>Online Workshop</h4>
        {title && <h1>{title}</h1>}
        <div
          css={css`
            display: flex;
            transition: ${theme.transition.ease};
          `}
        >
          {date && <time>{date}</time>}
          {location && <address>{location}</address>}
        </div>
        {children}
        Sold out.
        {buttonText && (
          <a
            href="#register"
            className="button"
            aria-label="scroll to registration"
          >
            {buttonText}
          </a>
        )}
      </div>
      {image && (
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding-left: 20px;
            ${bpMaxSM} {
              justify-content: center;
              padding-left: 0;
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
