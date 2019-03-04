import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import {rhythm} from '../lib/typography'
import Link from '../components/Link'

const CallToAction = props => {
  const {title, buttonText, link, restProps} = props
  return (
    <div
      css={css`
        width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        text-align: center;
        flex-direction: column;
        //background-color: ${theme.brand.primary};
        background-image: linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%), linear-gradient(32deg, rgba(255, 255, 255, 0.25) 33%, rgba(0, 0, 0, 0.25) 100%);
        p, h1 {color: ${theme.colors.white};}
        h1 {
            max-width: ${rhythm(13)};
        }
        border-radius: 5px;
        margin-top: ${rhythm(2.5)};
        padding: ${rhythm(2)};
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
      <p>{props.children}</p>

      <Link to={link} className="button">
        {buttonText}
      </Link>
    </div>
  )
}

export default CallToAction
