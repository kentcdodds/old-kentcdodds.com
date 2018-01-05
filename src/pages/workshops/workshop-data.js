/* eslint max-len:[1, 120], max-lines:0 */
import {preparePresentationData, sortPresentations} from '../../utils'

export default [
  // {
  //   title: '',
  //   resources: [
  //   ],
  //   tags: [],
  //   presentations: [
  //     {
  //       event: '',
  //       date: '',
  //       recording: '',
  //     },
  //   ],
  //   abstract: `
  //   `,
  // },
  {
    title: 'Advanced React Component Patterns',
    resources: [
      '[repo](https://github.com/kentcdodds/advanced-react-patterns)',
    ],
    tags: ['react'],
    presentations: [
      {
        event:
          '[Egghead.io](https://egghead.io/courses/advanced-react-component-patterns)',
        date: '2017-12-04',
      },
    ],
    abstract: `
      The goal of this course is to give you the knowledge of advanced patterns you can use to make React components
      that are more flexible, simpler, and more fun to build, use, and maintain. You'll start with a simple
      \`<Toggle />\` component which you'll progressively refactor to each of the patterns so you can see the relative
      trade-offs of the patterns and how they can be used together to increase the usefulness of your component while at
      the same time simplifying things for everyone.

      Having built and shipped components using each of these patterns, Kent will help you understand and weigh the
      trade-offs of each of them and you'll come to intuitively know where to apply each pattern in your own components.
      When you're finished with this course, hopefully you'll have a list of actionable things you can do to rework the
      components that you're building to make them more flexible, simpler, and more fun to build, use, and maintain.

      Enjoy!
    `,
  },
  {
    title: `The Beginner's Guide to ReactJS`,
    resources: [
      '[repo](https://github.com/eggheadio-projects/the-beginner-s-guide-to-reactjs)',
    ],
    tags: ['react'],
    presentations: [
      {
        event:
          '[Egghead.io](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)',
        date: '2017-12-04',
      },
    ],
    abstract: `
      This course is for React newbies and those looking to get a better understanding of React fundamentals.
      With a focus on React fundamentals, you'll come out of this course knowing what problems React can solve
      for you and how it goes about solving those problems. You will have a good grasp on what JSX is and how
      it translates to regular JavaScript function calls and objects.

      Each lesson in this course is just a single \`index.html\` file which will help you keep your focus on
      learning React and not distracted by all the tools that make production applications work. The course
      wraps up with a lesson on how to move from these \`index.html\` files to a more production ready development
      environment and even how to deploy your app to a great service like Netlify.

      Enjoy!
    `,
  },
  {
    title: 'Code Transformation and Linting',
    resources: [
      '[slides](http://slides.com/kentcdodds/asts-workshop)',
      '[repo](https://github.com/kentcdodds/asts-workshop)',
    ],
    tags: ['babel', 'eslint', 'codemod', 'Abstract Syntax Trees', 'asts'],
    presentations: [
      {
        event:
          '[Frontend Masters](https://frontendmasters.com/workshops/code-transformation-linting-asts/)',
        date: '2017-04-26',
      },
      {
        event: 'Self-organized PayPal practice-run',
        date: '2017-04-19',
        recording:
          'https://youtu.be/DdqiXcYDv-8?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    abstract: `
      Have you ever needed to change the API to a widely used function in your JavaScript application?
      Find and replace can really only take you so far. What about the frustration of iterating over and
      over again on pull requests because of simple code mistakes developers keep making? These are only some
      of the problems that you can solve with a basic understanding of Abstract Syntax Trees and the tools
      you can use to inspect and manipulate them.

      Join Kent C. Dodds and learn invaluable skills you can take back to improve the developer experience
      in your JavaScript applications.
    `,
  },
  {
    title: 'Testing JavaScript Applications',
    resources: [
      '[slides](http://slides.com/kentcdodds/testing-workshop)',
      '[repo](https://github.com/kentcdodds/testing-workshop)',
    ],
    tags: ['testing', 'jest', 'cypress'],
    presentations: [
      {
        event:
          '[Frontend Masters](https://frontendmasters.com/workshops/unit-testing-javascript/)',
        date: '2017-04-25',
      },
      {
        event: 'Self-organized PayPal practice-run',
        date: '2017-04-20',
        recording:
          'https://youtu.be/DdqiXcYDv-8?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
    ],
    abstract: `
      Building and deploying web applications with confidence is challenging. Verifying that what you're
      deploying to production actually works requires a solid suite of automated tests. Knowing how to
      configure tools and write tests that enhance your development experience is vital to your success.

      In this class, we'll explore the merits and tradeoffs of different forms of testing and get into configuring
      and using specific tools to increase confidence in deploying our applications. Join Kent C. Dodds and
      learn invaluable skills you can take back to improve your JavaScript applications.
    `,
  },
  {
    title: 'ES6 and Beyond',
    resources: [
      '[slides](http://slides.com/kentcdodds/es6-workshop#/)',
      '[workshop repo](https://github.com/kentcdodds/es6-workshop)',
      '[app repo](https://github.com/kentcdodds/es6-todomvc)',
    ],
    tags: ['ES.next', 'ES6', 'webpack'],
    presentations: [
      {
        event: 'Self-organized PayPal workshop day (Part 2)',
        date: '2017-03-07',
        recording:
          'https://youtu.be/eOKQDh50ECU?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event: 'Self-organized PayPal workshop day (Part 1)',
        date: '2017-01-23',
        recording:
          'https://youtu.be/t3R3R7UyN2Y?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
      },
      {
        event:
          '[The Strange Loop](http://www.thestrangeloop.com/2016/es6-and-beyond.html)',
        date: '2016-09-15',
        recording: 'https://youtu.be/dnF-wrw0Q_w',
      },
      {
        event: '[Connect.Tech](http://connect.tech/)',
        date: '2016-10-20',
        recording: 'https://youtu.be/nCP6jsN9XPI',
      },
      {
        event: '[The Kansas City Developer Conference](http://www.kcdc.info/)',
        date: '2016-06-22',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2015-08-12',
        recording:
          'https://youtu.be/aeY6ctvsurs?list=PLV5CVI1eNcJi1ZdXFSxR23QUeNVbauL3A',
      },
      {
        event:
          '[SLC JS Learners](http://www.meetup.com/SLC-JS-Learners/events/220770922/)',
        date: '2015-04-21',
        recording: 'https://youtu.be/_Pn32tTtbuQ',
      },
    ],
    abstract: `
      The EcmaScript standard is now on a yearly release cycle. With ES6 complete and ES2016 almost ratified, we have a
      ton of awesome new features to use in our daily software development. In this training, we'll learn about the
      features you're likely to use and benefit from on a day-to-day basis. In the afternoon, we'll take an existing
      application and update it to leverage these features using with modern tools like Babel. My goal is that after
      this training, you'll be able to go back to your projects and add these tools so you can write ES.next code today.

      This is a very hands-on training and you'll need to make sure that you're machine is set up. Please ensure that
      you have git, Node, npm, and a text editor / IDE installed on your machine. With that, you'll be ready to rock
      and roll. Feel free to hit me up on twitter if you have any questions.
    `,
  },
  {
    title: 'Intro to ReactJS',
    resources: [
      '[repo](https://github.com/kentcdodds/react-workshop)',
      '[app](https://github.com/kentcdodds/react-github-profile)',
    ],
    tags: ['react'],
    presentations: [
      {
        event: 'Internally at PayPal',
        recording: 'https://youtu.be/VZaQfb2y6BI',
        date: '2016-12-13',
      },
      {
        event: 'Internally at PayPal',
        recording: 'https://youtu.be/e-A4qAwr9Tg',
        date: '2016-10-06',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2016-08-10',
      },
    ],
    abstract: `TODO 😅`,
  },
  {
    title: 'Webpack Deep Dive',
    resources: [
      '[slides](https://slides.com/kentcdodds/webpack-deep-dive)',
      '[app repo](https://github.com/kentcdodds/es6-todomvc)',
    ],
    tags: ['webpack'],
    presentations: [
      {
        event: '[Frontend Masters](http://kcd.im/fem-webpack)',
        date: '2016-08-08',
        recording: 'http://kcd.im/fem-webpack',
      },
      {
        event:
          '[Egghead.io](https://egghead.io/courses/using-webpack-for-production-javascript-applications)',
        date: '2016-06-17',
        recording:
          'https://egghead.io/courses/using-webpack-for-production-javascript-applications',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2015-08-12',
        recording:
          'https://youtu.be/a96r7Tjf0Ps?list=PLV5CVI1eNcJi1ZdXFSxR23QUeNVbauL3A',
      },
    ],
    abstract: `
      Building and deploying complex frontend applications can get complicated quickly. Webpack simplifies this with a
      huge list of features that cater to all kinds of JavaScript apps. In this class, we'll explore these features to
      optimize an application for performance and simplicity. In this workshop, you'll learn:

      - The role of webpack and fundamental concepts like loaders and plugins
      - How to setup a webpack file (and use webpack-validator to save yourself hours of debugging typos)
      - How to setup a unit testing environment for a webpack project
      - How tree-shaking works and how to leverage it for smaller bundles
      - How to maintain sane file sizes with webpack code splitting
      - How to leverage hashing for long term caching
      - How to group vendor/common files with the CommonsChunkPlugin to save bytes in the code that changes regularly
      - The latest features of Webpack 2!
    `,
  },
  {
    title: 'How to Write an Open Source JavaScript Library',
    resources: ['[repo](https://github.com/kentcdodds/starwars-names)'],
    tags: ['open source'],
    presentations: [
      {
        event: '[Frontend Masters](http://kcd.im/fem-oss)',
        date: '2016-08-09',
        recording: 'http://kcd.im/fem-oss',
      },
      {
        event: '[Egghead.io](http://kcd.im/write-oss)',
        date: '2015-08-24',
        recording: 'http://kcd.im/write-oss',
      },
    ],
    abstract: `
      Participating in open source has been one of the most rewarding experiences of my career. The feeling of sharing
      something I've created, and hearing that others are using it in their applications is incredible. But writing and
      managing an open source project is challenging. I want to help you get started with open source or improve your
      current projects with some of the things I've learned by publishing and maintaining over 60 npm packages.

      - Learn how to set up a new project locally and on GitHub for development
      - Learn how to configure npm for publishing the project to the npm registry
      - Learn how to transpile the source with babel
      - Learn how to add unit tests and code coverage
      - Learn how to add CI (with Travis CI) to run tests automatically and report coverage stats to codecov.io
      - Learn how to automate releases with semantic-release
      - Learn how to distribute a browser build with webpack
    `,
  },
  {
    title: 'React + AVA = ❤️',
    resources: ['[repo](https://github.com/kentcdodds/react-ava-workshop)'],
    tags: ['react', 'testing'],
    presentations: [
      {
        event: 'Internally at PayPal',
        date: '2016-02-16',
        recording: 'https://youtu.be/UmDNx06472I',
      },
      {
        event: 'Hangout with my team',
        date: '2016-04-13',
        recording: 'https://youtu.be/RxLW6-3dk5A',
      },
    ],
    abstract: `
      **NOTE**: _I no longer recommend using AVA in React Projects_. Instead I recommend using Jest. Incidentally, I
      have a workshop for that too: [react-jest-workshop](https://github.com/kentcdodds/react-jest-workshop).
    `,
  },
  {
    title: 'How to Contribute to an Open Source Project on GitHub',
    tags: ['open source'],
    presentations: [
      {
        event:
          '[Egghead.io](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)',
        date: '2016-02-18',
        recording:
          'https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github',
      },
    ],
    abstract: `
      "Feel free to submit a PR!" - words often found in GitHub issues, but met with confusion and fear by many.
      Getting started with contributing open source is not always straightforward and can be tricky. With this series,
      you'll be equipped with the the tools, knowledge, and understanding you need to be productive and contribute to
      the wonderful world of open source projects. Much of this series speaks about GitHub, but most of the concepts
      are generally applicable to contributing to any open source project, regardless of where it's hosted.

      So enjoy the course and start contributing to the projects you use and love today!
    `,
  },
  {
    title: 'Intro to Webpack and Migrating from Require.js to Webpack ',
    resources: [
      '[repo](https://github.com/kentcdodds/require-to-webpack-todomvc)',
    ],
    tags: ['webpack'],
    presentations: [
      {
        event: 'JS @ PayPal',
        date: '2015-12-17',
        recording: 'https://youtu.be/NEJyIBwo-ik',
      },
    ],
  },
  {
    title: 'Angular and Webpack for Modular Applications',
    tags: ['angular', 'webpack'],
    presentations: [
      {
        event:
          '[Egghead.io](https://egghead.io/courses/angular-and-webpack-for-modular-applications)',
        date: '2015-09-05',
        recording:
          'https://egghead.io/courses/angular-and-webpack-for-modular-applications',
      },
    ],
    abstract: `
      How much work would it take for you to move all of your directives and their templates to several different new
      directories? You'd have to update the templateUrl, script tags, etc., etc. With webpack, this can be trivial. For
      example, you don't need to worry about loading your templates in the $templateCache ever again. Webpack will help
      you modularize your css and tests. All of these things and more in this series so you can start using webpack
      with Angular today.
    `,
  },
  {
    title: 'angular-formly',
    resources: [
      '[slides](http://slides.com/kentcdodds/angular-formly)',
      '[repo](https://github.com/kentcdodds/angular-formly-convert)',
    ],
    tags: ['angular'],
    presentations: [
      {
        event: '[ng-conf](https://www.ng-conf.org/)',
        date: '2015-03-04',
      },
    ],
  },
  {
    title: 'AngularJS Authentication with JWT',
    tags: ['angular'],
    presentations: [
      {
        event:
          '[Egghead.io](https://egghead.io/courses/angularjs-authentication-with-jwt)',
        date: '2014-09-22',
        recording:
          'https://egghead.io/courses/angularjs-authentication-with-jwt',
      },
    ],
    abstract: `
      JSON Web Tokens (JWT) are a more modern approach to authentication. As the web moves to a greater separation
      between the client and server, JWT provides a terrific alternative to traditional cookie based authentication
      models. For more information on JWT visit http://jwt.io/

      In this series, we'll be building a simple application to get random user information from a node server with an
      Angular client. We'll then implement JWT to protect the random user resource on the server and then work through
      the frontend to get JWT authentication working.

      By the end, we'll have an application which has a single username/password combination (for simplicity) and uses
      tokens to authorize the client to see the random user information. You'll be able to login, get random users, and
      logout.
    `,
  },
  {
    title: 'Intro to AngularJS',
    resources: [
      '[slides](http://slides.com/kentcdodds/intro-to-angularjs)',
      '[workshop](http://kentcdodds.com/ng-workshop/)',
    ],
    tags: ['angular'],
    presentations: [
      {
        event: '[JFokus 2015](http://www.jfokus.se/jfokus/)',
        date: '2015-02-06',
      },
      {
        event: '[BYU](https://byu.edu/)',
        date: '2014-01-20',
        recording: 'https://youtu.be/GmVUw_Efi_M',
      },
    ],
    abstract: `
      AngularJS is one of the most popular frontend frameworks out there right now. If you haven't tried it yet,
      prepare to be amazed! Here's what we'll cover:

      1. Templates/Expressions - Your View
      2. Module - Your app's namespace
      3. Directives - DOM Interface
      4. Filters - Display utils
      5. Scope - What on earth is this thing!?
      6. Controllers - The View Model
      7. Services - Common utilities
      8. Working with third-party modules
      9. Routing - Single Page App with state in the URL
      10. Firebase & AngularFire - A full web application with no server setup required!

      We'll be following through a repository hosted on GitHub. There's a branch for each concept, so you can play
      around with the code and then catch right back up with the next branch. So come on, and let's learn AngularJS!
    `,
  },
]
  .map(preparePresentationData)
  .sort(sortPresentations)
