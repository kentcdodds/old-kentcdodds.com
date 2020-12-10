import * as React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import Layout from 'components/layout'
import Container from 'components/container'
import SEO from 'components/seo'
import theme from '../../config/theme'
import courses from 'data/courses'
import {bpMaxSM} from 'lib/breakpoints'
import {fonts} from '../lib/typography'
import Hero from 'components/big-hero'
import slugify from '@sindresorhus/slugify'
import Markdown from 'react-markdown'
import HeaderImage from '../images/courses/header.svg'
import ShareCard from '../images/courses/share-card@2x.png'

export default function Courses({data}) {
  function courseImageByTitle(title) {
    switch (title) {
      case `The Beginner's Guide to React`:
        return (
          <Img fluid={data.theBeginnersGuideToReact.childImageSharp.fluid} />
        )
      case `Use Suspense to Simplify Your Async UI`:
        return (
          <Img
            fluid={data.useSuspenseToSimplifyYourAsyncUi.childImageSharp.fluid}
          />
        )
      case `Simplify React Apps with React Hooks`:
        return (
          <Img
            fluid={data.simplifyReactAppsWithReactHooks.childImageSharp.fluid}
          />
        )
      case `Advanced React Component Patterns`:
        return (
          <Img
            fluid={data.advancedReactComponentPatterns.childImageSharp.fluid}
          />
        )
      case `JavaScript Testing Practices and Principles`:
        return <Img fluid={data.testingPrinciples.childImageSharp.fluid} />
      case `Testing React Applications`:
        return <Img fluid={data.testingReact.childImageSharp.fluid} />
      case `Code Transformation and Linting with ASTs`:
        return <Img fluid={data.asts.childImageSharp.fluid} />
      case `How to Write an Open Source JavaScript Library`:
        return (
          <Img
            fluid={
              data.howToWriteAnOpenSourceJavaScriptLibrary.childImageSharp.fluid
            }
          />
        )
      case `How to Contribute to an Open Source Project on GitHub`:
        return (
          <Img
            fluid={
              data.howToContributeToAnOpenSourceProjectOnGitHub.childImageSharp
                .fluid
            }
          />
        )
      case `Epic React`:
        return <Img fluid={data.epicReact.childImageSharp.fluid} />
      default:
        return null
    }
  }

  return (
    <Layout
      headerColor={theme.colors.white}
      backgroundColor="#F6F5F9"
      hero={
        <Hero
          title="Courses by Kent"
          text="High-quality video courses to level-up your skills as a web developer. Most of them are free to watch."
          image={HeaderImage}
          background="linear-gradient(213deg, #854BF1 0%, #4335DF 100%), linear-gradient(32deg, rgba(255,255,255,0.25) 33%, rgba(153,153,153,0.25) 100%)"
        />
      }
    >
      <SEO metaImage={ShareCard} />
      <Container maxWidth={900} noVerticalPadding>
        <Grid>
          {courses
            .filter(course => course.title === 'Epic React')
            .map(course => (
              <EpicReact key={slugify(course.title)}>
                <div css={css({height: '100%'})}>
                  <a href={course.url}>
                    <h2>{course.title}</h2>
                  </a>
                  <p>{course.summary}</p>
                  <a className="button" href={course.url}>
                    {course.cta}{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="9"
                      viewBox="0 0 6 9"
                    >
                      <polyline
                        fill="none"
                        stroke="#A0C3FF"
                        strokeWidth="2"
                        points="57 18 60.5 21.5 57 25"
                        transform="translate(-56 -17)"
                      />
                    </svg>
                  </a>
                </div>
                <div css={css({width: '100%'})}>
                  {courseImageByTitle('Epic React')}
                </div>
              </EpicReact>
            ))}
          {courses
            .filter(course => course.title === 'Testing JavaScript')
            .map(course => (
              <TestingJS key={slugify(course.title)}>
                <div css={css({height: '100%'})}>
                  <a href={course.url}>
                    <h2>{course.title}</h2>
                  </a>
                  <p>{course.summary}</p>
                  <a className="button" href={course.url}>
                    {course.cta}{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="9"
                      viewBox="0 0 6 9"
                    >
                      <polyline
                        fill="none"
                        stroke="#CF8700"
                        strokeWidth="2"
                        points="57 18 60.5 21.5 57 25"
                        transform="translate(-56 -17)"
                      />
                    </svg>
                  </a>
                </div>
                <div
                  css={css({
                    marginBottom: 32,
                  })}
                >
                  {course.image}
                </div>
              </TestingJS>
            ))}
          {courses
            .filter(
              course =>
                course.title !== 'Epic React' &&
                course.title !== 'Testing JavaScript',
            )
            .map((course, i) => (
              <Card key={slugify(course.title)}>
                <a href={course.url}>{courseImageByTitle(course.title)}</a>
                <div css={css({width: '100%'})}>
                  <a href={course.url}>
                    <h2>{course.title}</h2>
                  </a>
                  <Markdown source={course.summary} escapeHtml={false} />
                  <a href={course.url}>
                    {course.cta}{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="6"
                      height="9"
                      viewBox="0 0 6 9"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        points="57 18 60.5 21.5 57 25"
                        transform="translate(-56 -17)"
                      />
                    </svg>
                  </a>
                </div>
                {course.reviews &&
                  course.reviews.map(review => (
                    <Review
                      key={review.author && slugify(review.author)}
                      left={i % 2 ? null : -310}
                      marginTop={i % 2 ? 340 : i % 3 ? 180 : 50}
                    >
                      <p>{review.content}</p>
                      <div>
                        {review.avatar && (
                          <img alt={review.author} src={review.avatar} />
                        )}
                        {review.author && <span>{review.author}</span>}
                      </div>
                    </Review>
                  ))}
              </Card>
            ))}
        </Grid>
      </Container>
    </Layout>
  )
}

const Grid = styled.div({
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  [bpMaxSM]: {
    gridTemplateColumns: '1fr',
  },
  gridGap: 20,
})

const Review = styled.div(props => ({
  p: {padding: 0},
  marginTop: props.marginTop,
  position: 'absolute',
  textAlign: 'start',
  zIndex: 0,
  top: props.top,
  right: props.right || props.left ? 'auto' : -310,
  left: props.left,
  bottom: props.bottom,
  width: 270,
  fontFamily: fonts.regular,
  fontStyle: 'italic',
  color: '#423F4B',
  opacity: 0.85,
  '& > p': {
    fontSize: 15.5,
    marginBottom: 10,
    padding: 0,
  },
  img: {
    padding: 2,
    border: '1px solid #D9D6E0',
    width: 35,
    height: 35,
    borderRadius: '50%',
    background: '#FFF',
    margin: '0 5px 0 0',
  },
  div: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: fonts.light,
    fontSize: 14,
  },
  '&::before': {
    content: '"“"',
    position: 'absolute',
    top: -70,
    left: -5,
    fontFamily: 'serif',
    fontSize: 80,
    opacity: 0.2,
  },
  '@media (max-width: 1579px)': {
    display: 'none',
  },
}))

const cardStyles = {
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px 0 rgba(0,0,0,0.06)',
  textAlign: 'center',
  borderRadius: 5,
  overflow: 'hidden',
  paddingTop: 40,
  '.button': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    lineHeight: '1',
    fontSize: 14,
    padding: '13px 20px',
    svg: {marginLeft: 5},
    marginBottom: 32,
  },
  img: {margin: 0},
  p: {
    opacity: 0.8,
  },
  'p, h2': {
    padding: '0 1rem',
  },
  'a:hover': {
    textDecoration: 'underline',
  },
}

const Card = styled.div({
  ...cardStyles,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textAlign: 'center',
  padding: '48px 24px',
  background: '#FFF',

  '.gatsby-image-wrapper': {width: '160px'},
})

const EpicReact = styled.div({
  ...cardStyles,
  marginTop: -40,
  background: '#0F1B35',
  '*': {color: '#FFF'},
  'p, h2': {padding: '0 56px'},
  'div > .button': {
    background: 'rgba(19, 103, 223, 0.3)',
    color: '#FFF',
    maxWidth: 100,
    margin: '0 auto',
    marginBottom: 56,
    textDecoration: 'none',
  },
  '.button:hover': {background: 'rgba(19, 103, 223, 0.8)', color: 'white'},
  'a:hover': {
    textDecoration: 'underline',
    textDecorationColor: theme.colors.white,
  },
})

const TestingJS = styled.div({
  ...cardStyles,
  marginTop: -40,
  background: '#FFF',
  backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #FEFAF2 76%)',
  '*': {color: '#0F1B35'},
  'p, h2': {padding: '0 56px'},
  'div > .button': {
    background: 'rgba(255, 177, 31, 0.3)',
    color: '#CF8700',
    maxWidth: 100,
    margin: '0 auto',
    marginBottom: 56,
    polyline: {transition: 'all 500ms ease'},
    textDecoration: 'none',
  },
  '.button:hover': {
    background: 'rgba(255, 177, 31, 0.8)',
    color: '#FFF',
    polyline: {stroke: '#FFF', transition: 'all 500ms ease'},
  },
  [bpMaxSM]: {
    marginTop: 0,
  },
})

export const imagesQuery = graphql`
  {
    theBeginnersGuideToReact: file(
      relativePath: {eq: "images/courses/the-beginners-guide-to-react@2x.png"}
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    useSuspenseToSimplifyYourAsyncUi: file(
      relativePath: {
        eq: "images/courses/use-suspense-to-simplify-your-async-ui@2x.png"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    simplifyReactAppsWithReactHooks: file(
      relativePath: {
        eq: "images/courses/simplify-react-apps-with-react-hooks@2x.png"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    advancedReactComponentPatterns: file(
      relativePath: {
        eq: "images/courses/advanced-react-component-patterns@2x.png"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    howToWriteAnOpenSourceJavaScriptLibrary: file(
      relativePath: {
        eq: "images/courses/how-to-write-an-open-source-javascript-library@2x.png"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    testingPrinciples: file(
      relativePath: {eq: "images/courses/testing-principles.png"}
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    testingReact: file(relativePath: {eq: "images/courses/testing-react.png"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    asts: file(relativePath: {eq: "images/courses/asts.png"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    howToContributeToAnOpenSourceProjectOnGitHub: file(
      relativePath: {
        eq: "images/courses/how-to-contribute-to-an-open-source-project-on-github@2x.png"
      }
    ) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }

    epicReact: file(relativePath: {eq: "images/courses/epic-react@2x.png"}) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
