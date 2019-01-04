import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from '../components/Layout'
import Link from '../components/Link'

import underConstruction from './uc.gif'

export default function Index({ data: { site } }) {
  return (
    <Layout site={site}>
      <div
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            max-width: 600px;
            margin-top: 75px;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
            `}
          >
            This site is under construction.
            {'    '}
            <img
              css={css`
                padding-left: 15px;
              `}
              src={underConstruction}
              alt="stick man digging"
            />
          </div>
          <div
            css={css`
              margin-top: 35px;
            `}
          >
            <Link to="/blog">Blog Archive</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
  }
`
