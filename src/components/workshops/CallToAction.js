import React from 'react'
import {css} from '@emotion/core'
import theme from '../../../config/theme'
import {rhythm, fonts} from '../../lib/typography'
import Link from '../Link'
import {bpMaxSM} from '../../lib/breakpoints'
import Countdown from 'react-countdown-now'

const SpotsLeft = 20

export const DaysLeft = () => (
  <Countdown
    date={1553036399000} //3/19/2019 23:59:59
    renderer={({days}) => {
      return (
        <div>
          {days > 0 ? (
            <p>
              The early bird discount of <strong>$200</strong> ends in{' '}
              <strong>{days}</strong> days!
            </p>
          ) : (
            ''
          )}
        </div>
      )
    }}
  />
)

export const Counter = () => (
  <Countdown
    date={1553036399000} //3/19/2019 23:59:59
    renderer={({days, hours, minutes, seconds, completed}) => {
      return (
        <div>
          {!completed && (
            <div
              css={css`
                display: flex;
                text-align: center;
                flex-wrap: nowrap;
                align-items: center;
                //margin-top: ${rhythm(1)};
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        border-radius: 5px;
        margin-top: ${rhythm(2.5)};
        background-image: linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%),
          linear-gradient(
            32deg,
            rgba(255, 255, 255, 0.25) 33%,
            rgba(0, 0, 0, 0.25) 100%
          );
        ${bpMaxSM} {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        h1,
        h2,
        h4,
        h3,
        p,
        div {
          color: ${theme.colors.white};
        }
        h1 {
          max-width: ${rhythm(13)};
          margin-bottom: ${rhythm(1)};
          margin-top: 0;
        }
        h2 {
          font-size: 48px;
        }

        .button {
          width: 100%;
          padding: 20px 25px;
          background: white;
          text-align: center;
          border: 1px solid transparent;
          color: ${theme.colors.body_color};
          border-radius: 5px;
          :hover {
            border: 1px solid transparent;
            background: ${theme.colors.green_lighten};
          }
        }
        del {
          text-transform: line-through;
          font-size: 50%;
          opacity: 0.8;
          font-family: ${fonts.regular};
        }
      `}
      {...restProps}
    >
      <div
        css={css`
          width: 100%;
          display: flex;
          align-items: flex-start;
          text-align: left;
          flex-direction: column;
          padding: ${rhythm(2)};
          //box-shadow: inset -10 0 30px hsla(0, 0%, 0%, 0.05);
          ${bpMaxSM} {
            padding: ${rhythm(1)};
            align-items: center;
            text-align: center;
          }
          background: hsla(0, 0%, 0%, 0.2);
        `}
      >
        {title && <h1>{title}</h1>}
        <p>
          Your chance to save <strong>$200</strong> in early bird discount ends
          in:
        </p>
        <Counter />
      </div>
      <div
        css={css`
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: space-between;
          padding: ${rhythm(2)};
          padding-top: ${rhythm(1)};
          ${bpMaxSM} {
            h2 {
              margin-top: 0;
            }
            padding: ${rhythm(1)};
            justify-content: flex-start;
            text-align: center;
            align-items: center;
          }
        `}
      >
        <>
          <h2>
            $300 <del>$500</del>
          </h2>
          <p>Spots left: {SpotsLeft}</p>
          <p>{props.children}</p>
        </>
        <Link to={link} className="button">
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default CallToAction
