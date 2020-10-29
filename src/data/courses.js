import * as React from 'react'
import TestingTrophy from 'components/courses/testing-js/trophy'

export default [
  {
    title: 'Epic React',
    summary:
      'The Most Comprehensive Guide to React for Professional Developers',
    url: 'https://epicreact.dev',
    cta: 'Visit',
    tags: ['react'],
  },
  {
    title: 'Testing JavaScript',
    summary:
      'Learn the smart, efficient way to test any JavaScript application',
    url: 'https://testingjavascript.com/',
    cta: 'Visit',
    image: <TestingTrophy />,
    tags: ['testing'],
  },
  {
    title: "The Beginner's Guide to React",
    summary:
      'This course is for React newbies and anyone looking to build a solid foundation. It’s designed to teach you everything you need to start building web applications in React right away.',
    url: 'https://egghead.io/courses/the-beginner-s-guide-to-react',
    cta: 'Get Started with React',
    tags: ['react'],
    reviews: [
      {
        content:
          'Great course and a great teacher. I have been a React dev for two years but still learned a lot!',
        author: 'Bret Funk',
      },
    ],
  },
  {
    title: 'Use Suspense to Simplify Your Async UI',
    summary:
      'In this course, I teach how Suspense works under the hood, preparing you for the future of asynchronous state management in React.',
    url: 'https://egghead.io/courses/use-suspense-to-simplify-your-async-ui',
    cta: 'Meet new possibilities in React',
    tags: ['react'],
    reviews: [
      {
        content:
          'Absolutely love this course, the thought that Kent has put into it, and the new possibilities of React Suspense itself, of course. Thanks for making this!',
        author: 'Maxim Zubarev',
      },
    ],
  },
  {
    title: 'Simplify React Apps with React Hooks',
    summary:
      'In this course, I will take a modern React codebase that uses classes and refactor the entire thing to use function components as much as possible. We’ll look at state, side effects, async code, caching, and more!',
    url: 'https://egghead.io/courses/simplify-react-apps-with-react-hooks',
    cta: 'Simplify your React apps',
    tags: ['react'],
    reviews: [
      {
        content:
          'I really love that real-world examples are presented on an existing codebase. This is exactly what I needed to better understand, beyond simple todo apps and contrived examples.',
        author: 'David Poindexter',
      },
    ],
  },
  {
    title: 'Advanced React Component Patterns',
    summary:
      'Once you’ve nailed the fundamentals of React, that’s when things get really fun. This course teaches you advanced patterns in React that you can use to make components that are simple, flexible, and enjoyable to work with.',
    url: 'https://egghead.io/courses/advanced-react-component-patterns',
    cta: 'Ship flexible React components',
    tags: ['react'],
    reviews: [
      {
        content:
          "Just wow. That was a lot of info to unpack in one hour. I did a straight walkthrough with no code. Now I'm going to go back and rewatch every video while creating my own components. I would love to write about this. I'm currently working on a fairly complex React project and this is so helpful! Another great course from Kent C. Dodds!!",
        author: 'Babs Craig',
      },
    ],
  },
  {
    title: `JavaScript Testing Practices and Principles`,
    summary: `Learn the principles and best practices for writing maintainable test applications to catch errors before your product reaches the end user!`,
    url: `https://frontendmasters.com/courses/testing-practices-principles/`,
    cta: `Gain a solid foundation on testing`,
    tags: ['testing'],
    reviews: [],
  },
  {
    title: `Testing React Applications`,
    summary: `Fix errors before your app reaches the end user by writing maintainable unit test & integration tests for your React applications!`,
    url: `https://frontendmasters.com/courses/testing-react/`,
    cta: `Ship React Applications with Confidence`,
    tags: ['react', 'testing'],
    reviews: [],
  },
  {
    title: `Code Transformation and Linting with ASTs`,
    summary: `Learn to use Abstract Syntax Trees (ASTs) to make stylistic code changes, reveal logical problems, and prevent bugs from entering your codebase.`,
    url: `https://frontendmasters.com/courses/linting-asts/`,
    cta: `Bend JavaScript to your will 💪`,
    tags: ['babel', 'eslint', 'asts'],
    reviews: [],
  },

  {
    title: 'How to Write an Open Source JavaScript Library',
    summary:
      'From Github and npm, to releasing beta versions, semantic versioning, code coverage, continuous integration, and providing your library with a solid set of unit tests, there are a ton of things to learn.<br/><br/>This series will guide you through a set of steps to publish a JavaScript open source library.',
    url:
      'https://egghead.io/courses/how-to-write-an-open-source-javascript-library',
    cta: 'Publish your first JavaScript library',
    tags: ['open source', 'javascript', 'github', 'npm', 'versioning'],
    reviews: [
      {
        content:
          'I liked the level of detail. Kent covers a lot of concepts in short videos, always explaining clearly and concisely everything.',
        author: 'Johnny Zabala',
      },
    ],
  },
  {
    title: 'How to Contribute to an Open Source Project on GitHub',
    summary:
      '“Feel free to submit a PR!” - words often found in GitHub issues, but met with confusion and fear by many. Getting started with contributing open source is not always straightforward and can be tricky. With this series, you’ll be equipped with the the tools, knowledge, and understanding you need to be productive and contribute to the wonderful world of open source projects.',
    url:
      'https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github',
    cta: 'Contribute to open source project',
    tags: ['open source', 'github'],
  },
]
