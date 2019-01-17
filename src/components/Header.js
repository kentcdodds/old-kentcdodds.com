import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { bpMaxSM } from '../lib/breakpoints'

import Container from './Container'

const Header = ({ dark }) => (
  <header
    css={css`
      position: relative;
      z-index: 999;
      width: 100%;
      flex-shrink: 0;
      background: none;
      padding: 30px 0 0 0;
      ${bpMaxSM} {
        padding: 20px 0 0 0;
      }
      background: ${dark ? '#090909' : 'none'};
    `}
  >
    <Container>
      <nav
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Link to="/" aria-label="go to homepage">
          home
        </Link>
        <div
          css={css`
            font-size: 16px;
            line-height: 1.25;
            display: flex;
            align-items: center;
            a {
              color: ${dark ? '#fbfbfb' : 'rgba(0,0,0,0.85)'};
              text-decoration: none;
              & + a {
                margin-left: 32px;
              }
            }
            .active {
              display: none;
              visibility: hidden;
            }
          `}
        >
          <Link
            to="/about"
            activeClassName="active"
            aria-label="Read more about moon highway"
          >
            About
          </Link>
          <Link
            to="/contact"
            activeClassName="active"
            aria-label="Go to contact form"
          >
            Contact us
          </Link>
        </div>
      </nav>
    </Container>
  </header>
)

export default Header
