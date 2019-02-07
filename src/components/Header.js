import React from 'react'
import {Link} from 'gatsby'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import {fonts} from '../lib/typography'

import Container from './Container'
import {bpMaxSM} from '../lib/breakpoints'

const Header = ({
  dark,
  bgColor = 'none',
  siteTitle,
  headerColor = 'black',
  fixed = false,
}) => (
  <header
    css={css`
      width: 100%;
      flex-shrink: 0;
      background: none;
      padding: 30px 0 0 0;
      background: ${dark ? '#090909' : `${bgColor}` || 'none'};
      z-index: 10;
      position: ${fixed ? 'fixed' : 'absolute'};
      top: 0;
      font-family: ${fonts.light};
    `}
  >
    <Container noVerticalPadding>
      <nav
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: ${headerColor};
          a {
            color: ${headerColor ? headerColor : theme.colors.body_color};
          }
          a:hover {
            color: ${headerColor === theme.colors.white
              ? 'white'
              : theme.colors.link_color_hover};
          }
        `}
      >
        <Link to="/" aria-label="go to homepage" activeClassName="active">
          {siteTitle}
        </Link>
        <div
          css={css`
            font-size: 16px;
            line-height: 1.25;
            display: flex;
            align-items: center;
            a {
              padding: 8px;
              border-radius: 3px;
              background: transparent;
              color: ${headerColor ? headerColor : theme.colors.body_color};
              text-decoration: none;
              opacity: 0.9;
              :hover {
                opacity: 1;
              }
              & + a {
                margin-left: 15px;
              }
              ${bpMaxSM} {
                visibility: hidden;
                display: none;
              }
            }
            .active {
              background: rgba(40, 28, 77, 0.7);
            }
          `}
        >
          <Link to="/blog" activeClassName="active" aria-label="View blog page">
            Blog
          </Link>
          <Link
            to="/talks"
            activeClassName="active"
            aria-label="View blog page"
          >
            Talks
          </Link>
          <Link
            to="/workshops"
            activeClassName="active"
            aria-label="View blog page"
          >
            Workshops
          </Link>
          <Link
            to="/about"
            activeClassName="active"
            aria-label="View blog page"
          >
            About
          </Link>
        </div>
      </nav>
    </Container>
  </header>
)

export default Header
