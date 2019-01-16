import React from 'react'
import { css } from '@emotion/core'
import Link from './Link'
import { bpMaxSM, bpMaxMD } from '../lib/breakpoints'
import { fonts } from '../lib/typography'

import Container from './Container'

import { Twitter, GitHub, LinkedIn } from '../images/social'

const Footer = () => (
  <footer
    css={css`
      width: 100%;
      margin-top: 50px;
      ${bpMaxSM} {
        margin-top: 40px;
      }
      background: #fafafa;
      flex-shrink: 0;
      h4 {
        font-size: 20px;
        font-family: ${fonts.bold}, sans-serif;
      }
    `}
  >
    <Container
      maxWidth={1000}
      css={css`
        background: white;
        box-shadow: 0 10px 50px -10px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        padding-top: 80px;
        padding-bottom: 80px;
        ${bpMaxSM} {
          padding-top: 40px;
          padding-bottom: 40px;
        }
      `}
    >
      <Container maxWidth={900} noPadding>
        {/* <SubscribeForm /> */}
        <div
          css={css`
            display: flex;
            align-items: flex-start;
            a {
              color: #090909;
            }
            &:not(:first-of-type) {
              margin-top: 80px;
            }
            ${bpMaxMD} {
              padding: 50px 0;
            }
            ${bpMaxSM} {
              &:not(:first-of-type) {
                margin-top: 40px;
              }
              flex-direction: column;
              padding: 0;
            }
          `}
        />
      </Container>
    </Container>
    <div
      css={css`
        padding: 70px 0;
      `}
    >
      <Container maxWidth={900}>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-between;
            ${bpMaxSM} {
              justify-content: space-around;
            }
            a {
              display: block;
              color: rgba(0, 0, 0, 0.9);
            }
            address {
              margin: 0;
              font-style: normal;
            }
            color: rgba(0, 0, 0, 0.55);
            font-size: 13px;
            line-height: 1.65;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              .active {
                display: none;
                visibility: hidden;
              }

              a:first-of-type {
                margin-right: 20px;
              }
              a:not(:first-of-type) {
                margin-left: 40px;
                font-size: 17px;
                opacity: 0.7;
                :hover {
                  opacity: 1;
                }
              }
            `}
          >
            <Link to="/" aria-label="go to homepage">
              Home
            </Link>
            {/*
            Secondary navigation
            <Link
              to="/about"
              activeClassName="active"
              aria-label="read more about moon highway"
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
            */}
          </div>
          <div
            css={css`
              display: flex;
              align-items: center;
              ${bpMaxSM} {
                flex-direction: column-reverse;
                align-items: flex-start;
              }
            `}
          >
            <div
              css={css`
                margin-right: 60px;
                margin-top: 0;
                ${bpMaxSM} {
                  margin-right: 0;
                  margin-top: 20px;
                }
                display: flex;
                align-items: center;
                svg {
                  width: 20px;
                }
                a:hover {
                  transition: fill 250ms ease;
                  path {
                    fill: black;
                  }
                }
                a {
                  path {
                    transition: fill 250ms ease;
                  }
                }

                a:not(:last-child) {
                  margin-right: 20px;
                }
              `}
            >
              <Link
                to="https://twitter.com/moonhighway/"
                aria-label="Visit our Twitter"
              >
                <Twitter color={`#797979`} />
              </Link>
              <Link
                to="https://www.linkedin.com/company/moon-highway"
                aria-label="Visit our LinkedIn"
              >
                <LinkedIn color={`#797979`} />
              </Link>
              <Link
                to="https://github.com/MoonHighway"
                aria-label="Visit our GitHub"
              >
                <GitHub color={`#797979`} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </footer>
)

export default Footer
