import React from 'react'
import {css} from '@emotion/core'
import theme from '../../../config/theme'
import {rhythm} from '../../lib/typography'
import Link from '../Link'
import {bpMaxSM} from '../../lib/breakpoints'
import Countdown from 'react-countdown-now'

const Counter = () => (
  <Countdown
    date={1553986740000}
    renderer={({days, hours, minutes, seconds, completed}) => {
      return (
        <div>
          {!completed && (
            <div
              css={css`
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                margin-top: ${rhythm(1)};
                font-variant-numeric: tabular-nums;
                font-size: 32px;
                span:not(:last-of-type) {
                  margin-right: ${rhythm(1)};
                }
                span > div {
                  font-size: 50%;
                  opacity: 0.7;
                }
                ${bpMaxSM} {
                  font-size: 28px;
                  span {
                    flex-grow: 1;
                  }
                }
              `}
            >
              <span>
                {days}
                <div>days</div>
              </span>
              <span>
                {hours}
                <div>hours</div>
              </span>
              <span>
                {minutes}
                <div>minutes</div>
              </span>
              <span>
                {seconds}
                <div>seconds</div>
              </span>
            </div>
          )}
        </div>
      )
    }}
  />
)

const CallToAction = props => {
  const {title, buttonText, link, restProps} = props
  return (
    <div
      id="register"
      css={css`
        width: 100%;
        margin: 0 auto;
        display: flex;

        align-items: center;
        text-align: center;
        flex-direction: column;
        background-image: linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%),
          linear-gradient(
            32deg,
            rgba(255, 255, 255, 0.25) 33%,
            rgba(0, 0, 0, 0.25) 100%
          );
        h1,
        h4,
        p,
        div {
          color: ${theme.colors.white};
        }
        h1 {
          max-width: ${rhythm(13)};
        }
        border-radius: 5px;
        margin-top: ${rhythm(2.5)};
        padding: ${rhythm(2)};
        ${bpMaxSM} {
          padding: ${rhythm(1)};
        }
        .button {
          margin-bottom: ${rhythm(1)};
          padding: 20px 25px;
          background: black;
          border: 1px solid transparent;
          color: white;
          border-radius: 5px;
          :hover {
            border: 1px solid transparent;
            background: ${theme.colors.green_lighten};
          }
        }
      `}
      {...restProps}
    >
      {title && <h1>{title}</h1>}
      <h4>Your chance to save $70 in early-bird sale expires in:</h4>
      <Counter />
      <p>{props.children}</p>

      <Link to={link} className="button">
        {buttonText}
      </Link>
    </div>
  )
}

export default CallToAction
