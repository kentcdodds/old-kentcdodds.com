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
  //       recording: '',
  //     },
  //   ],
  //   abstract: `
  //   `,
  // },
  {
    title: 'Faster JavaScript',
    resources: ['[slides](https://slides.com/kentcdodds/faster-javascript)'],
    tags: [],
    presentations: [
      {
        event: '[UtahJS meetup](https://www.meetup.com/UtahJS/events/234009949/)',
        date: '2016-11-03',
        recording: 'https://www.youtube.com/watch?v=kI_OiAUFLkQ',
      },
    ],
    abstract: `
      The more code you have, the more problems you have. One of these is the ability to learn the code. Code often has
      logic to handle edge cases which can distract a new contributor from the core logic of the code, making it
      challenging to learn. Another one of the problems with more code that's specific to JavaScript and the browser is
      the more you send over the wire to the browser, the slower it goes. This is due to network latency primarily, but
      also parsing, evaluating, and keeping relevant variables in memory.

      With a really interesting technique called [program slicing](https://en.wikipedia.org/wiki/Program_slicing), we
      can build tools to help to mitigate some of these problems. In this talk, I'm going to give you a peek at a tool
      I've been working on called \`slice-js\` 🍕. I'm super excited about the implications for a project like this!
    `,
  },
  {
    title: 'How to Open Source Your Stuff',
    resources: [
      '[slides](https://slides.com/kentcdodds/open-sourcing-your-stuff)',
      '[repo 1](https://github.com/kentcdodds/todomvc-angular)',
      '[repo 2](https://github.com/angular-todo-mvc/angular-todo-escape)',
    ],
    tags: ['open source', 'live coding'],
    presentations: [
      {
        event: '[Angular Remote Conf](http://angularremoteconf.com)',
        recording: 'https://www.youtube.com/watch?v=Zlu3QvuwruY',
        date: '2015-09-01',
      },
      {
        event: 'JS@PayPal',
        date: '2015-12-16',
      },
      {
        event: '[All Things Open](https://allthingsopen.org/talk/how-to-open-source-your-stuff/)',
        date: '2016-10-27',
      },
    ],
    abstract: `
      Modularity is the key to success with large apps. Build things so they work well in isolation, then piece them
      together to make the full application. One thing that really helps with this kind of strategy is to open source
      your stuff. In this talk, we'll talk about why you would want to open source your hard earned components. Then
      we'll take a look at an existing application, identify a good candidate component for open sourcing, and then go
      through the process of creating an open source project for that component and add it as a project dependency. I
      hope you like looking at code, because you're going to see a lot of it!
    `,
  },
  {
    title: 'Managing an Open Source Project',
    resources: [
      '[video](https://youtu.be/jKI1Kj5VXqE) (practice run at a meetup)',
      '[slides](https://kcd.im/manage-oss)',
    ],
    tags: ['open source', 'soft skills'],
    presentations: [
      {
        event: '[Space City JS](http://spacecity.codes/)',
        date: '2016-05-14',
      },
      {
        event: '[All Things Open](https://allthingsopen.org/talk/managing-an-open-source-project/)',
        date: '2016-10-27',
      },
    ],
    abstract: `
      Awesome! You’ve made it big! You’ve published an open source project and people are actually using it to make the
      world a better place. Achievement unlocked! Great job! But wait… what’s this? An issue? Oh, it’s just a bug.
      Pretty quick and easy. Fixed, released, done, #likeaboss 😎. What’s this? A PR? How cool! Wait… That’s not quite
      right… Oh, a question! Cool! And another! And another… eh… and another… Uh oh… I think I’ve just sold my soul to
      this project.

      You start an open source project to scratch your own itch and suddenly other people start using it and they need
      your help. This can easily start eating up your time big time and before you know it, your kids start feeling
      neglected.

      I’ve had to deal with this in a few projects and I’ve learned a thing or two about work/life/oss balance. I have a
      few tricks that help you make the project manage itself a bit more while still being friendly and helpful to users
      of the project.
    `,
  },
  {
    title: 'Testing React',
    resources: [
      '[slides](https://kcd.im/react-jest)',
      '[react-jest-workshop](https://github.com/kentcdodds/react-jest-workshop)',
      '[old slides (mocha)](https://kcd.im/testing-react)',
      '[react-mocha-workshop](https://github.com/kentcdodds/react-mocha-workshop)',
      '[older slides (ava)](https://kcd.im/react-ava)',
      '[react-ava-workshop](https://github.com/kentcdodds/react-ava-workshop)',
    ],
    tags: ['react', 'testing', 'live coding'],
    presentations: [
      {
        event: '[Connect.tech](http://connect.tech/)',
        date: '2016-10-21',
      },
      {
        event: 'JS@PayPal',
        date: '2016-09-23',
      },
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2016-08-11',
      },
    ],
    abstract: `
      I hope you're excited about testing! We all know we need to get testing better, but it can be really hard to know
      how and what to test. We'll learn about the four inputs to React components (user input, props, data, and context)
      and how to test for each of them. You'll discover that if you slightly modify the way you're writing your
      components, you can make them much easier to test. We'll be using the new super fast, simple, and feature full
      Jest testing framework with enzyme and snapshot testing. I hope you like code. You're gonna see some here!
    `,
  },
  {
    title: 'More than you want to know about ES6 Modules',
    resources: ['[slides](https://slides.com/kentcdodds/es6-modules)'],
    tags: ['ES6', 'babel'],
    presentations: [
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        date: '2016-08-12',
      },
      {
        event: 'JS@PayPal',
        recording: 'https://youtu.be/V0YQ0rnh-Hg',
        date: '2016-09-23',
      },
      {
        event: '[JavaScript KC Meetup](https://www.meetup.com/JavaScriptKC/events/231844450/)',
        recording: 'https://youtu.be/qi_rLTcXers',
        date: '2016-06-21',
      },
      {
        event: '[Modern Web Remote Meetup](https://www.bigmarker.com/modernweb/ES6-Modules-Mastering-Chrome-Developer-Tools-and-more) (video on the event page)', // eslint-disable-line
        date: '2016-03-19',
      },
    ],
    abstract: `
      ES6 Modules have been standardized and many have already started using them. They have a lot of benefits over
      CommonJS, AMD, and Globals.

      Unfortunately, there are many ways to deal with modules with this new syntax and it can be a bit confusing. In
      this talk, we'll explore the different ways you can use the new syntax and when you'd use the different methods.
      We'll also investigate what's going on at a high level. Buckle up for a firehose of ES6 information.
    `,
  },
  {
    title: 'Transform your code like Optimus Prime: ASTs for Beginners',
    resources: [
      '[slides](https://slides.com/kentcdodds/a-beginners-guide-to-asts)',
      '[code](http://kcd.im/beginner-asts-code)',
    ],
    tags: ['ECMAScript', 'babel', 'eslint', 'live coding'],
    presentations: [
      {
        event: 'Clevertech Engineering',
        recording: 'https://youtu.be/CFQBHy8RCpg?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
        date: '2016-01-14',
      },
      {
        event: '[JS Remote Conf](https://allremoteconfs.com/js-2016)',
        date: '2016-01-14',
      },
      {
        event: '[KCDC](http://www.kcdc.info/)',
        date: '2016-06-23',
      },
      {
        event: '[BeMyApp webinar](https://www.eventbrite.com/e/transform-your-code-like-optimus-prime-asts-for-beginners-wkent-c-dodds-tickets-26281147620)', // eslint-disable-line
        recording: 'https://youtu.be/WO7H2NHmN18',
        date: '2016-06-06',
      },
    ],
    abstract: `
      The Abstract Syntax Tree. It sounds a lot worse than it is. It’s actually quite simple and enables some powerful
      tools. BabelJS uses it to transform your code from ES.Next to ES5. ESLint uses it to lint your code. And with a
      knowledge of how it works, you can extend these and other tools to do some mind bustingly powerful things. Prepare
      to be amazed by ASTs!
    `,
  },
  {
    title: 'The First Pull Request',
    resources: ['[slides](http://slides.com/kentcdodds/1st-pr)'],
    tags: ['open source', 'soft skills'],
    presentations: [
      {
        event: '[Fluent Conf](http://conferences.oreilly.com/fluent/javascript-html-us/public/schedule/detail/46612)',
        recording: 'https://youtu.be/HjgZQeMrw6c',
        date: '2016-03-09',
      },
    ],
    abstract: `
      "Feel free to submit a pull request." For some, this is a welcome invitation, but for many developers, pull
      requests are intimidating, discouraging them from contributing to the community. Kent Dodds demonstrates how easy
      and fun it is to create a pull request as a first timer.

      To open source newcomers:

      You, open source newcomer, can be a valuable contributor to the open source community. We need you here. We want
      your input and contributions. But getting over that initial hump of contributing can be a real challenge. I call
      this the first-timer's dilemma. You want to contribute, but you don't know how, or you're afraid your pull request
      (PR) won't get merged. You'll learn that it's less frightening and easier to get started than you think, as you
      become familiar with the common patterns and processes you need to understand in order to contribute to an open
      source project.

      To open source project maintainers:

      You, open source project maintainer, are the lifeblood of the open source community. Developers power open source.
      The more people finding, reporting, and fixing bugs or adding/removing features the better. You have the power to
      help newcomers overcome the first-timer's dilemma. You'll see what challenges first-timers often face and how with
      just a few extra minutes of your time, you can help tear down these barriers and make your project more friendly
      to contributors (including first-timers).

      Whether you'e new to open source or a pro, Kent will help you as we strive to make the open source community more
      open and friendly.
    `,
  },
  {
    title: 'What we can learn about testing from the wheel',
    resources: [
      '[slides](https://drive.google.com/file/d/0BxZDtibcRzVWNFU3VXM2RzJ1SG8/view?usp=sharing)',
    ],
    tags: ['testing', 'lightning'],
    presentations: [
      {
        event: '[Ignite Fluent](http://conferences.oreilly.com/fluent/javascript-html-us/public/schedule/detail/48271)',
        recording: 'https://youtu.be/Da9wfQ0frGA?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf',
        date: '2016-03-08',
      },
    ],
    abstract: `
      Knowing what and how to test is almost more difficult than actually writing the test. If you write only end-to-end
      tests, you'll struggle with reliability and speed. If you write only unit tests, you'll struggle with surprising
      bugs integrating things together.

      In this ignite talk, we'll take these concepts away from code for a moment to see how we would test a wheel.
      Prepare for an enlightening, entertaining 5 minutes 😀.
    `,
  },
  {
    title: 'Zero to 60 in software development: How to jumpstart your career',
    resources: ['[slides](https://slides.com/kentcdodds/zero-to-60)'],
    tags: ['soft skills'],
    presentations: [
      {
        event: '[Foward 4 Web Summit](http://forwardjs.com/)',
        recording: 'https://youtu.be/-qPh6I2hfjw',
        date: '2016-02-11',
      },
      {
        event: '[BYU AIS club](http://ais.byu.edu/) Value Added Forum',
        date: '2016-10-13',
      },
    ],
    abstract: `
      Our industry has a problem. We have a "talent shortage," so we're loading the industry with new developers from
      various bootcamps, but they're having trouble finding jobs because many companies are unwilling to hire and train
      them. So these new developers are left to themselves to try and find ways to develop the skills they need to be
      "marketable."

      I graduated from college in April 2014, just shy of two years ago. In that time, I've been able to learn a ton,
      build a bunch of stuff, teach workshops, create egghead screencasts, speak at conferences, and generally
      contribute quite a bit to the JavaScript community. In this talk, I'll cover some solid principles of things that
      I’ve learned in my experience. This will help new-comers to jumpstart their career. And help old-timers know how
      they can help new-comers.
    `,
  },
  {
    title: 'Learning JavaScript and Staying Marketable',
    resources: [
      '[slides](http://slides.com/kentcdodds/learning-javascript)',
      '[tweet](https://twitter.com/ngnebraska/status/669319695015673856)',
    ],
    tags: ['soft skills'],
    presentations: [
      {
        event: '[ng-nebraska meetup November](http://www.meetup.com/ng-nebraska/events/226632455/)',
        date: '2015-11-24',
      },
    ],
    abstract: `
      Angular is amazing and has contributed to a major change in the landscape of frontend web development forever.
      But frameworks come and go. Even though Angular 1.x will still be around for a few years, it will eventually be
      totally antiquated and you'll need to show off other kinds of skills to attract employers. What if there were a
      way that you could learn skills you need to both be effective Angular developers today and develop skills that
      will make you marketable for many more years to come? Spoiler, I'm talking about JavaScript. Let's go over why
      that's important and a few ways to accomplish this.
    `,
  },
  {
    title: 'ES6, Webpack, Karma, and Code Coverage',
    resources: ['[repo](https://github.com/kentcdodds/random-user-coverage)'],
    tags: ['babel', 'testing', 'webpack', 'live coding'],
    presentations: [
      {
        event: '[UtahJS meetup](http://www.meetup.com/UtahJS/events/222630472/)',
        recording: 'https://youtu.be/P-1ZZkpEmQA',
        date: '2015-06-16',
      },
    ],
    abstract: `Setting up test coverage reporting with ES6 and Karma`,
  },
  {
    title: 'Angular Directive Scope: Explained and Code Structure',
    resources: ['[blog post](https://medium.com/@kentcdodds/19eee9e90e45)'],
    presentations: [
      {
        event: '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/222511910/)',
        recording: 'https://youtu.be/ii7J-k661Zg',
        date: '2015-05-28',
      },
    ],
  },
  {
    title: 'ES6',
    resources: ['[repo](https://github.com/kentcdodds/es6-workshop)'],
    presentations: [
      {
        event: '[SLC JS Learners meetup](http://www.meetup.com/SLC-JS-Learners/events/220770922/)',
        recording: 'https://youtu.be/_Pn32tTtbuQ',
        date: '2015-04-21',
      },
    ],
    abstract: `
      Kent C. Dodds is going to be introducing ECMAScript 6, which is the next version of JavaScript. If you want to
      look ahead, check this out: [github.com/lukehoban/es6features](https://github.com/lukehoban/es6features)
    `,
  },
  {
    title: 'Moxee: Enforcing modularity in AngularJS',
    resources: [
      '[slides](http://slides.com/kentcdodds/moxee#/)',
      '[repo](https://github.com/alianza-dev/moxee)',
    ],
    presentations: [
      {
        event: '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/221087489/)',
        date: '2015-03-26',
      },
    ],
    abstract: `
      Moxee will create tests for you which will ensure that no injectable function is requiring anything that the
      module doesn't provide on its own (or via one of its dependencies).
    `,
  },
  {
    title: 'JSON powered Forms',
    resources: [
      '[slides](http://slides.com/kentcdodds/angular-formly)',
      '[repo](https://github.com/kentcdodds/angular-formly-convert)',
    ],
    presentations: [
      {
        event: '[ng-nl](http://www.ng-nl.org)',
        recording: 'https://youtu.be/o90TMDL3OYc',
        date: '2015-02-13',
      },
      {
        event: '[MidwestJS](http://midwestjs.com)',
        recording: 'https://youtu.be/jUX2zcSwbRE',
        date: '2015-08-13',
      },
    ],
    abstract: `
      We're all really tired of writing the same code for every form. You need a label here and an input here and make
      sure their IDs are the same and unique and now you want me to add validation!? Daah! I got fed up with this pretty
      quick and found that I enjoy writing JavaScript a lot more than repeating myself with HTML. If you're like me,
      then you'll love angular-formly. In this talk, we'll see how you can very easily represent your model with a form
      using a few lines of JavaScript. You want validation, conditional fields, or custom templates? You need to react
      to changes to a field? Piece of cake. So come on, and let's make fields less painful and more delightful.
    `,
  },
  {
    title: 'Angular 2: Built for Huge, Long-lasting Applications',
    resources: [
      '[slides](http://slides.com/kentcdodds/ng2-introduction)',
      '[repo](https://github.com/kentcdodds/ng2-random-user/)',
    ],
    presentations: [
      {
        event: '[Philly ETE](http://phillyemergingtech.com/sessions/angularjs-2-0-leveling-up/)',
        recording: 'http://www.infoq.com/presentations/angularjs-2',
        date: '2015-04-08',
      },
    ],
    abstract: `
      Angular 2 is built for huge web applications that stand the test of time. To accomplish this, Angular 2 utilizes
      the latest and greatest web technologies like ES6 modules/classes and Web Components. Come get a preview of what
      this looks like with Egghead.io instructor Kent C. Dodds as he live codes an application using the pre-release
      alpha version of Angular 2.
    `,
  },
  {
    title: 'ng-model-options in 5 minutes',
    resources: [
      '[slides](http://slides.com/kentcdodds/ng-model-options-in-5-minutes#/)',
      '[JSBin](http://jsbin.com/qocekak/edit)',
      '[blog post](https://www.airpair.com/angularjs/posts/ngmodeloptions-total-model-control)',
    ],
    presentations: [
      {
        event: '[ng-conf](http://www.ng-conf.org/)',
        recording: 'https://youtu.be/k3t3ov6xHDw',
        date: '2015-03-06',
      },
    ],
    abstract: `
      Angular 1.3 brought a sweet new directive to the table called ng-model-options. It gives you more control over how
      your model gets updated and is very easy to use. Get a quick intro and start using this today!
    `,
  },
  {
    title: 'Using ReactJS with existing AngularJS codebase',
    resources: [
      '[app](http://kentcdodds.com/react-in-angular/app/)',
      '[repo](https://github.com/kentcdodds/react-in-angular)',
    ],
    presentations: [
      {
        event: '[Jfokus](http://www.jfokus.se/jfokus/)',
        recording: 'https://youtu.be/AiE4ajXh7dY',
        date: '2015-02-04',
      },
      {
        event: '[ReactJS Utah meetup January](http://www.meetup.com/ReactJS-Utah/events/219204576/)',
        recording: 'https://youtu.be/AiE4ajXh7dY',
        date: '2015-01-27',
      },
    ],
    abstract: `
      ReactJS is an amazing View library that promises (and delivers) high performance, composability, and
      maintainability. AngularJS is an amazing MV* framework.

      Tons of shops have adopted and totally bought into AngularJS for their entire frontend application. They're loving
      it, but some are finding that as these applications get bigger, they can become unwieldy, unperformant, and
      difficult to reason about. Many of these problems can be solved by doing things better with angular, but not all
      of them.

      In this talk, we'll go over why you don't need to re-write your whole application to get some of the wins of React
      and that it actually is quite easy to integrate the two. We'll talk about where it makes sense to bring in React
      to an existing Angular codebase and how it works well.
    `,
  },
  {
    title: 'Improving UX with GenieJS',
    resources: [
      '[slides](https://slides.com/kentcdodds/genie)',
      '[workshop](https://kentcdodds.github.io/genie/workshop/)',
    ],
    presentations: [
      {
        event: '[MidwestJS](http://midwestjs.com/)',
        recording: 'https://youtu.be/lqf5mrrf4ZY',
        date: '2014-08-14',
      },
      {
        event: '[UtahJS Orem meetup](http://www.meetup.com/UtahJS-Orem-Meetup/events/156148202/)',
        date: '2014-02-06',
      },
    ],
    abstract: `
      I believe that people are so much more productive when they don't need to use the mouse to click on something.
      One implementation intended to help with this is keyboard shortcuts. Unfortunately, these are limited to the
      number of sensible keys and key combinations and can be difficult for users to discover, remember, and use.
      Normally, only super users will ever use them. The goal of genie is to address the problems with keyboard
      combinations. Genie is a simple library to emulate the same kind of behavior seen in apps like Alfred (for
      macOS: [alfredapp.com](https://alfredapp.com)). Essentially, you register actions associated with keywords. Then
      you can request the genie to perform that action based on the best keyword match for a given keyword. This allows
      a user to type what they want to have happen and select from a list of the best matches for what they typed to
      perform an action. Over time, the genie will learn the actions more associated with specific keywords and those
      will be come first when a list of matching actions is requested. Check it out at
      [github.com/kentcdodds/genie](https://github.com/kentcdodds/genie)
    `,
  },
  {
    title: 'Watch your Watchers',
    resources: [
      '[slides](http://slides.com/kentcdodds/angular-bindonce#/)',
      '[kcd-angular](http://kentcdodds.com/kcd-angular)',
    ],
    presentations: [
      {
        event: '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/184204692/)',
        recording: 'https://youtu.be/hFOSXVT-Cps?t=1m34s',
        date: '2014-08-12',
      },
    ],
    abstract: `
      If you're not careful (especially with your ng-repeats) your watch count in your app can grow pretty quick. This
      isn't a problem itself, but its what that does to your digest cycle. Lots of watchers makes your digest cycle take
      longer. In my talk, we'll talk about what Angular 1.3 is doing to help solve this problem, the problem their
      solution presents, a solution to that problem, and what can be done for pre-Angular 1.3 code.
    `,
  },
  {
    title: 'Sharing code between Ionic and Web Angular Apps',
    presentations: [
      {
        event: '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/160366932/)',
        recording: 'https://youtu.be/EmWBbvWJDVY',
        date: '2014-08-08',
      },
    ],
    abstract: `
      This was an impromptu talk while we were waiting for the actual speakers to come, so I'm not on the schedule.
    `,
  },
  {
    title: 'How to Build a Demo with GitHub Pages',
    resources: ['[slides](http://slides.com/kentcdodds/gh-pages#/)'],
    presentations: [
      {
        event: '[UtahJS Orem meetup](http://www.meetup.com/UtahJS-Orem-Meetup/events/193499152/)',
        date: '2014-08-07',
      },
    ],
  },
  {
    title: `JWT: Not Your Grandma's Cookies`,
    resources: [
      '[slides](http://slides.com/kentcdodds/ng-jwt-workshop)',
      '[site](http://kentcdodds.com/ng-jwt-workshop/frontend/)',
      '[repo](https://github.com/kentcdodds/ng-jwt-workshop)',
    ],
    presentations: [
      {
        event: '[AngularJS Utah meetup](http://www.meetup.com/AngularJS-Utah/events/173788512/)',
        recording: 'https://youtu.be/vIGZxeQUUFU?t=1m51s',
        date: '2014-06-10',
      },
    ],
    abstract: `
      Cookies and sessions are the traditional way to keep track of user state on the server, but it can bite you later.
      JSON Web Tokens (JWT) is a stateless way to deal with users. I'll show how to use \`$httpInterceptors\` to make
      this easy as pie. :-)
    `,
  },
  {
    title: 'Intro to AngularJS',
    resources: [
      '[slides](https://slides.com/kentcdodds/intro-to-angularjs)',
      '[workshop](http://kentcdodds.com/ng-workshop/)',
    ],
    presentations: [
      {
        event: 'To my classmates at BYU',
        recording: 'https://youtu.be/GmVUw_Efi_M',
        date: '2014-01-30',
      },
      {
        event: '[UtahJS](http://conf.utahjs.com/schedule-2014)',
        date: '2014-06-06',
      },
      {
        event: '[Jfokus](http://www.jfokus.se/jfokus/)',
        date: '2015-02-03',
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
