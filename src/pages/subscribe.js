import React from 'react'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import Layout from 'components/Layout'
import Container from 'components/Container'
import Subscribe from 'components/Forms/Subscribe'
import Hero from 'components/big-hero'

export default function SubscribePage() {
  return (
    <Layout Hero={Hero} headerColor={theme.colors.white} noFooter>
      <Container>
        <p>
          <strong>Kent C. Dodds</strong>
          {`
            is a world-renowned JavaScript software engineer and teacher. He's
            taught hundreds of thousands of people all over the globe how to
            make the world a better place with quality software development
            tools and practices. He lives with his wife and four kids in Utah.
        `}
        </p>
        <div>
          <strong>{`Here's how this works:`}</strong>
          <ol
            css={{
              marginTop: 16,
              '& li': {marginBottom: 4},
            }}
          >
            <li>You give me your email address</li>
            <li>I send you an email every week</li>
            <li>You get better at building quality software</li>
          </ol>
        </div>
        <p>
          {`
            I focus on JavaScript for the browser and Node. I'm pretty into
            React, Testing, tooling, and Babel. My weekly emails reflect this
            preference. I'll occasionally give career advice as well. It's
            normally pretty brief and reflects what I'm learning and currently
            working on, or what people are asking me on
          `}
          <a href="https://kcd.im/ama">my AMA</a>.
        </p>
        <p>
          <small>
            {`
              I will not sell your email address to spammers. I will
              occasionally send emails outside the regular cadence. 
            `}
          </small>
        </p>
        <Subscribe
          css={css`
            margin: auto;
          `}
        />
      </Container>
    </Layout>
  )
}
