import React from 'react'
import {css} from '@emotion/core'
import {fonts, rhythm} from '../../lib/typography'
import {bpMaxSM} from '../../lib/breakpoints'
import theme from '../../../config/theme'
import {lighten} from 'polished'
import CalendarIcon from '../../images/icons/calendar.svg'
import LocationIcon from '../../images/icons/location.svg'
import {DaysLeft} from './CallToAction'

const Banner = ({children, title, date, location, image}) => {
  return (
    <div
      css={css`
        background: white;
        border-radius: 5px;
        padding: 40px;
        margin-left: -40px;
        margin-right: -40px;
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
            background: url(${CalendarIcon}) no-repeat 0 0 transparent;
            margin-left: -22px;
            margin-top: 5px;
          }
        }
        address {
          margin-left: ${date ? '40px' : '22px'};
          font-style: normal;
          ::before {
            content: '';
            width: 13px;
            height: 17px;
            position: absolute;
            background-size: 13px 17px;
            background: url(${LocationIcon}) no-repeat 0 0 transparent;
            margin-left: -20px;
            margin-top: 5px;
          }
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
          margin-top: ${rhythm(0.5)};
          padding: 10px 15px;
          background: ${lighten(0.4, `${theme.brand.primary}`)};
          border: 1px solid transparent;
          color: ${theme.brand.primary};
          font-size: 16px;
          border-radius: 5px;
          :hover {
            border: 1px solid transparent;
            background: ${theme.colors.green_lighten};
          }
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
            opacity: 0.8;
            transition: ${theme.transition.ease};
            :hover {
              opacity: 1;
              transition: ${theme.transition.ease};
            }
          `}
        >
          {date && <time>{date}</time>}
          {location && <address>{location}</address>}
        </div>
        {children}
        <DaysLeft />
        <a
          href="#register"
          className="button"
          aria-label="scroll to registration"
        >
          Reserve a spot
        </a>
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
