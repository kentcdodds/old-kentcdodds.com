import React from 'react'
import {css} from '@emotion/core'
import {rhythm} from '../../lib/typography'
import theme from '../../../config/theme'
import Markdown from 'react-markdown'
import Link from '../link'
import styles from './styles'
import {bpMaxSM} from '../../lib/breakpoints'

function UpcomingWorkshop({
  title,
  url,
  bookUrl,
  waitlistUrl,
  description,
  date,
  buttonText = 'Book a seat',
  spotsRemaining,
}) {
  return (
    <div
      css={css`
        ${styles}
        address {
          margin-left: ${date ? '40px' : '22px'};
        }
        ${spotsRemaining == 0 &&
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
        <div>
          <Link to={url}>
            <h1>{title}</h1>
          </Link>
          <div
            css={css`
              display: flex;
            `}
          >
            <time>{date}</time>
            <address>Zoom</address>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            ${bpMaxSM} {
              margin-top: 30px;
            }
          `}
        >
          <Link
            to={spotsRemaining == 0 ? `${waitlistUrl}` : `${bookUrl}`}
            className="button"
          >
            {spotsRemaining == 0 ? 'Get on the wait list' : `${buttonText}`}
          </Link>
          <div
            css={css`
              font-size: 15px;
              margin-top: 8px;
              text-align: center;
            `}
          >
            {spotsRemaining == 0 ? (
              <b>sold out</b>
            ) : (
              <div>
                <b>{spotsRemaining}</b> spots remaining
              </div>
            )}
          </div>
        </div>
      </div>
      <br />
      <Markdown
        css={css`
          p {
            margin-bottom: ${rhythm(1)};
            color: hsla(0, 0%, 0%, 0.93);
          }
        `}
      >
        {description}
      </Markdown>
      <Link
        to={url}
        css={css`
          color: ${theme.brand.primary};
        `}
      >
        Learn more
      </Link>
    </div>
  )
}

export default UpcomingWorkshop
