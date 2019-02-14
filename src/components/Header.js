import React from 'react'
import {Link} from 'gatsby'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import theme from '../../config/theme'
import {fonts} from '../lib/typography'

import MobileNav from './MobileNav'
import Container from './Container'
import {bpMaxSM} from '../lib/breakpoints'

function HeaderLink({headerColor, ...props}) {
  return (
    <Link
      activeClassName="active"
      css={{
        textDecoration: 'none',
        color: headerColor ? headerColor : theme.colors.body_color,
        '&:hover,&:focus': {
          color:
            headerColor === theme.colors.white
              ? 'white'
              : theme.colors.link_color_hover,
        },
      }}
      {...props}
    />
  )
}

const NavLink = styled(HeaderLink)({
  padding: '8px',
  borderRadius: '3px',
  background: 'transparent',
  opacity: 0.8,
  '& + &': {marginLeft: 15},
  '&:hover': {
    opacity: 1,
  },
  [bpMaxSM]: {
    display: 'none',
  },
  '&.active': {
    background: 'rgba(40, 28, 77, 0.7)',
  },
})

const Header = ({
  dark,
  bgColor = 'none',
  siteTitle,
  headerLink = '/',
  headerColor = 'black',
  fixed = false,
}) => (
  <header
    css={css`
      width: 100%;
      flex-shrink: 0;
      background: none;
      padding: 30px 0 0 0;
      ${bpMaxSM} {
        padding: 35px 0 0 0;
      }
      background: ${dark ? '#090909' : `${bgColor}` || 'none'};
      z-index: 10;
      position: ${fixed ? 'fixed' : 'absolute'};
      top: 0;
      font-family: ${fonts.light};
    `}
  >
    <Container noVerticalPadding>
      <nav
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <HeaderLink
          to={headerLink}
          aria-label="go to homepage"
          headerColor={headerColor}
        >
          {siteTitle}
        </HeaderLink>
        <div
          css={css`
            font-size: 16px;
            line-height: 1.25;
            display: flex;
            align-items: center;
            .mobile-nav {
              display: none;
              visibility: hidden;
              ${bpMaxSM} {
                display: block;
                visibility: visible;
              }
            }
          `}
        >
          <MobileNav color={headerColor} />
          <NavLink
            headerColor={headerColor}
            to="/blog"
            aria-label="View blog page"
          >
            Blog
          </NavLink>
          <NavLink
            headerColor={headerColor}
            to="/talks"
            aria-label="View talks page"
          >
            Talks
          </NavLink>
          <NavLink
            headerColor={headerColor}
            to="/workshops"
            aria-label="View workshops page"
          >
            Workshops
          </NavLink>
          <NavLink
            headerColor={headerColor}
            to="/about"
            aria-label="View about page"
          >
            About
          </NavLink>
        </div>
      </nav>
    </Container>
  </header>
)

export default Header
