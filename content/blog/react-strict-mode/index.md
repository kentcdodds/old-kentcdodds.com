---
slug: react-strict-mode
title: Enable React Strict Mode
date: '2019-03-04'
author: Kent C. Dodds
description: _What it is and how to add it to your app._
keywords:
  - React
  - JavaScript
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Martin
  Sanchez](https://unsplash.com/photos/PgQgGuCGZNw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  on
  [Unsplash](https://unsplash.com/search/photos/lines?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
---

In January 2018, [Brian Vaughn](https://twitter.com/brian_d_vaughn)
[added `<React.StrictMode />`](https://github.com/facebook/react/pull/12083).
Here's how to start using it in your app today:

```diff
 ReactDOM.render(
-  <App />,
+  <React.StrictMode><App /></React.StrictMode>
   document.getElementById('root')
 )
```

Ok, so what does this do? Go ahead and give it a try in your app and see what
happens. Don't worry, I'll wait...

![waiting...](https://media.giphy.com/media/26gR1iYzSqtzcta4E/source.gif)

What happens will be different for everyone, but here's an example of what some
of you might have seen:

![warnings](./images/warnings.png)

Here's a copy/paste of those warnings:

```
Warning: A string ref, "myDiv", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using createRef() instead.

    in StringRef (created by App)
    in StrictMode (created by App)
    in App

Learn more about using refs safely here:
https://fb.me/react-strict-mode-string-ref

Warning: Unsafe lifecycle methods were found within a strict-mode tree:
    in StrictMode (created by App)
    in App

componentWillMount: Please update the following components to use componentDidMount instead: WillMount

componentWillReceiveProps: Please update the following components to use static getDerivedStateFromProps instead: WillReceiveProps

componentWillUpdate: Please update the following components to use componentDidUpdate instead: WillUpdate

Learn more about this warning here:
https://fb.me/react-strict-mode-warnings

Warning: Legacy context API has been detected within a strict-mode tree:
    in StrictMode (created by App)
    in App

Please update the following components: MyColorDiv, MyColorProvider

Learn more about this warning here:
https://fb.me/react-strict-mode-warnings

Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of FindDOMNode which is inside StrictMode. Instead, add a ref directly to the element you want to reference.

    in div (created by FindDOMNode)
    in FindDOMNode (created by App)
    in StrictMode (created by App)
    in App

Learn more about using refs safely here:
https://fb.me/react-strict-mode-find-node
```

And here's the code that I used to generate those warnings:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class WillMount extends React.Component {
  componentWillMount() {
    // nope. Use componentDidMount instead
  }
  render() {
    return null
  }
}

class WillReceiveProps extends React.Component {
  componentWillReceiveProps() {
    // nope. Use static getDerivedStateFromProps
  }
  render() {
    return null
  }
}

class WillUpdate extends React.Component {
  componentWillUpdate() {
    // nope. Use componentDidUpdate instead
  }
  render() {
    return null
  }
}

class StringRef extends React.Component {
  render() {
    // nope. Use React.createRef instead
    return <div ref="myDiv" />
  }
}

class FindDOMNode extends React.Component {
  componentDidMount() {
    // nope. Use React.createRef instead
    ReactDOM.findDOMNode(this)
  }
  render() {
    return <div />
  }
}

class MyColorDiv extends React.Component {
  // nope. Use React.createContext().Consumer instead (or even better useContext)
  static contextTypes = {color: PropTypes.string}
  render() {
    return <div style={{color: this.context.color}} />
  }
}

class MyColorProvider extends React.Component {
  // nope. Use React.createContext().Provider instead
  static childContextTypes = {color: PropTypes.string}
  getChildContext() {
    return {color: 'purple'}
  }

  render() {
    return this.props.children
  }
}

function App() {
  return (
    <React.StrictMode>
      <WillMount />
      <WillReceiveProps />
      <WillUpdate />
      <StringRef />
      <FindDOMNode />
      <MyColorProvider>
        <MyColorDiv />
      </MyColorProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

> And you can check this out for yourself in
> [this codesandbox](https://codesandbox.io/s/y01q7vmpnz).

Each of these warnings has a solid workaround that will make your code better in
various ways (most of them are related to concurrent mode which should hopefully
come to React later this year). Getting these warnings taken care of today will
make it much easier for you to upgrade to concurrent react bug-free when it
comes along.

---

Another thing that React Strict Mode does is run certain callbacks/methods twice
(in DEV mode ONLY). You read that right! The following callbacks/methods will be
run twice in Strict Mode (in DEV mode ONLY):

- Class component `constructor` method
- The `render` method (includes function components)
- `setState` updater functions (the first argument)
- The static `getDerivedStateFromProps` lifecycle
- The `React.useState` state initializer callback function
- The `React.useMemo` callback

> Checkout [this codesandbox](https://codesandbox.io/s/xvv55893mp) which logs to
> the console in hook callbacks and class methods to show you that certain
> things happen twice.

React does this because it cannot reliably warn you against side-effects you do
in those methods. But if those methods are idempotent, then calling them
multiple times shouldn't cause any trouble. If they are not idempotent, then you
should notice funny things which you should hopefully be able to notice and fix.

> Note that `useEffect` and `useLayoutEffect` callbacks are _not_ called twice
> even in dev mode + strict mode because the entire point of those callbacks
> _is_ to perform side-effects.

> Note that I also observed that the `reducer` you pass to `React.useReducer` is
> _not_ called twice in dev mode. I'm not sure why this is because I feel like
> that could also benefit from this kind of warning.

You'll note that if you download either of my codesandbox projects and run the
`build` script (which enables production mode), all of the warnings go away and
the callbacks are only called once. This is because these are only there to help
you during development and will not impact you in production.

## Conclusion

Again, you should be rendering your app in `React.StrictMode` because it will
warn you when a component is using a deprecated method or API and it will help
you catch things that can cause nasty bugs that can be hard to debug.

So what do you do when you get a warning like this in a third-party component? I
recommend seeing how easy it would be to
[open a PR](http://makeapullrequest.com) to the project. If that doesn't work
out, then you could just "vendor" (download and commit it) or "fork" that
dependency and move on.

I hope that doing this will help you catch nasty bugs in your React codebases!

See you around 💯

> Read more about Strict Mode from
> [the react docs](https://reactjs.org/docs/strict-mode.html)
