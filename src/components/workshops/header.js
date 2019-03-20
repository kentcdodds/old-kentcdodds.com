import React from 'react'
import Img from 'gatsby-image'
import {css} from '@emotion/core'
import {fonts, rhythm} from '../../lib/typography'
import {bpMaxSM} from '../../lib/breakpoints'
import theme from '../../../config/theme'
import {lighten} from 'polished'
import styles from './styles'
import discountStripe from '../../images/icons/stripe.svg'

const Header = ({
  children,
  title,
  date,
  location,
  soldOut = false,
  buttonText,
  image = {},
  discount = false,
}) => {
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
        background: white;
        border-radius: 5px;
        padding: 40px;
        ${bpMaxSM} {
          padding: 20px;
          margin-left: 0;
          margin-right: 0;
        }
        h1 {
          font-size: 1.75rem;
          font-family: ${fonts.semibold}, sans-serif;
          margin-top: 10px;
          margin-bottom: ${date ? location : buttonText ? '0.775rem' : 0};
        }
        h4 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 5px 0;
          opacity: 0.7;
        }

        img,
        .gatsby-image-wrapper {
          margin: 0;
          width: 100%;
          max-width: 280px;
          height: auto;
          ${bpMaxSM} {
            max-width: 200px;
          }
        }
        address {
          margin-left: 40px;
        }
        ${image &&
          `display: grid;
            grid-template-columns: ${image ? '1fr 2fr' : '2fr'};
            grid-gap: 20px;
            ${bpMaxSM} {
                display: flex;
                flex-direction: column-reverse;
                align-items: center;
            }
      `};
        .button {
          margin-top: ${rhythm(1)};
          background: ${lighten(0.4, `${theme.brand.primary}`)};
          color: ${theme.brand.primary};
          :hover {
            background: ${lighten(0.35, `${theme.brand.primary}`)};
            color: ${theme.brand.primary};
          }
        }
      `}
    >
      <Stripe />
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
          <Img fluid={image} />
        </div>
      )}

      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-left: ${image ? '40px' : '0'};
          ${bpMaxSM} {
            margin-top: ${rhythm(2)};
            width: 100%;
            padding-right: 0;
          }
        `}
      >
        <h4>Remote Workshop</h4>
        {title && <h1>{title}</h1>}
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            transition: ${theme.transition.ease};
          `}
        >
          {date ? <time>{date}</time> : <time>TBA</time>}
          {location ? <address>{location}</address> : <address>Zoom</address>}
        </div>
        {children}
        {buttonText && (
          <a
            href="#register"
            className="button"
            aria-label="scroll to registration"
          >
            {soldOut && `Sold out -`} {buttonText}
          </a>
        )}
      </div>
    </div>
  )
}

export default Header
