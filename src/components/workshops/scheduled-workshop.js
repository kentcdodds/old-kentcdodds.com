import React from 'react'
import {css} from '@emotion/core'
import {rhythm} from '../../lib/typography'
import theme from '../../../config/theme'
import Markdown from 'react-markdown'
import Link from '../link'
import styles from './styles'
import {bpMaxSM} from '../../lib/breakpoints'
import jsIcon from '../../images/icons/js.svg'
import reactIcon from '../../images/icons/react.svg'
import testingIcon from '../../images/icons/testing.svg'
import discountStripe from '../../images/icons/stripe.svg'

function ScheduledWorkshop({
  title,
  url,
  bookUrl,
  waitlistUrl,
  description,
  date,
  buttonText = 'Book a seat',
  spotsRemaining = '20',
  tech,
  location,
  discount,
  soldOut = false,
  time,
}) {
  const techImage = workshopTech => {
    return (
      (workshopTech === 'react' && `${reactIcon}`) ||
      (workshopTech === 'javascript' && `${jsIcon}`) ||
      (workshopTech === 'testing' && `${testingIcon}`)
    )
  }
  const Stripe = props => (
    <div
      css={css`
        ${discount
          ? `
          display: block;
          position: absolute;
          width: 70px;
          height: 70px;
          background-image: url(${discountStripe});
          background-size: 100% 100%;
          background-repeat: no-repeat;
        margin-top: -42px;
        margin-left: -42px;
        ${bpMaxSM} {
          margin-top: -21px;
          margin-left: -21px;
          width: 40px;
          height: 40px;
          h1 {
            margin-top: ${discount ? '40px' : 'auto'};
          }
        }
        `
          : `display: none;`}
      `}
      {...props}
    />
  )

  return (
    <div
      css={css`
        ${styles}
        margin-bottom: 20px;
        time {
          margin-right: ${date ? '20px' : '22px'};
        }
        .date {
          margin-right: 20px;
        }
        ${soldOut &&
          `
        .button {
         color: ${theme.brand.primary};
         border: 2px solid ${theme.brand.primary};
         background: transparent;
         :hover {
            color: ${theme.colors.green};
            background-image: none;
            background: transparent;
            border: 2px solid ${theme.colors.green};
         }
        }
        `}
      `}
    >
      <Stripe />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          ${bpMaxSM} {
            flex-direction: column;
          }
        `}
      >
        <div
          css={css`
            max-width: 450px;
          `}
        >
          <Link to={url}>
            <h1>{title}</h1>
          </Link>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            <span
              css={css`
                padding-right: 10px;
              `}
            >
              <img src={techImage(tech)} alt={tech} />
            </span>
            <div
              css={css`
                padding-right: 15px;
                color: ${theme.colors.body_color};
              `}
            >
              {soldOut ? (
                <b>Sold out</b>
              ) : (
                <span>
                  <b>{spotsRemaining}</b> spots remaining
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 200px;
            ${bpMaxSM} {
              margin: 10px 0;
            }
          `}
        >
          <Link
            to={
              spotsRemaining === 0
                ? `/workshops/${waitlistUrl}`
                : `/workshops/${bookUrl}`
            }
            className="button"
          >
            {soldOut ? 'Join the waiting list' : `${buttonText}`}
          </Link>
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
        `}
      >
        <div className="date">{date}</div>
        {time ? <time>{time}</time> : <time>TBA</time>}
        {location ? <address>{location}</address> : <address>Zoom</address>}
      </div>
      <br />
      <Markdown
        css={css`
          p {
            margin-bottom: ${rhythm(1)};
            color: ${theme.colors.body_color};
          }
        `}
      >
        {description}
      </Markdown>
      <Link
        to={`/workshops/${url}`}
        css={css`
          color: ${theme.brand.primary};
        `}
      >
        Learn more
      </Link>
    </div>
  )
}

export default ScheduledWorkshop
