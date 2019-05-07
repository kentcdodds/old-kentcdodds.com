---
slug: 'always-use-memo-your-context-value'
title: 'Always useMemo your context value'
date: '2019-05-06'
author: 'Kent C. Dodds'
description:
  "_Why and how you should always use React's useMemo hook for your context
  provider value prop_"
categories:
  - 'react'
keywords:
  - 'javascript'
  - 'react'
  - 'useMemo'
  - 'react hooks'
  - 'react context'
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Paweł Czerwiński](https://unsplash.com/photos/_nqApgG-QrY)'
---

When I
[explained how I create and use context for my React applications](/blog/how-to-use-react-context-effectively),
I touched briefly on the importance of using React's `useMemo` hook. Here's that
example again:

```javascript {8-14}
// src/count-context.js
import React from 'react'

const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => {
    return {
      count,
      setCount,
    }
  }, [count])
  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  const {count, setCount} = context
  const increment = React.useCallback(() => setCount(c => c + 1), [setCount])
  return {
    count,
    increment,
  }
}

export {CountProvider, useCount}
```

I got a lot of questions about why `useMemo` is necessary here, so I'm going to
demonstrate how _not_ using `useMemo` _can_ result in unnecessary re-renders for
folks who want to use `React.memo` (which is like `PureComponent` and
`shouldComponentUpdate` for function components).

Here's the final app that we're going to build to demonstrate this:

[![App Screenshot showing force render button, current count, and increment count button](./images/screenshot-of-app.png)](https://codesandbox.io/s/ryyqj2nl6n)

The boxes each represent an individual component and the number in gray
represents the render count of that component. Here's the codesandbox:

https://codesandbox.io/s/ryyqj2nl6n?view=editor

Here's the basic structure of the components:

```javascript
<App>
  <CountProvider>
    <CountDisplay />
    <Counter />
  </CountProvider>
</App>
```

So when `<App />` re-renders, it'll re-render all of the other components. Most
of the time this isn't a problem, mostly because the `<App />` shouldn't
re-render very often. But you could imagine this being in any part of the tree
of our application. Let's say that rendering `<CountDisplay />` and
`<Counter />` is expensive for one reason or another, so we've put that in a
`React.memo`.

With that setup, we can click the "force render" button which will trigger a
re-render of the `<App />` component, but because the props to the memoized
`<CountDisplay />` and `<Counter />` components does not change, those don't
re-render.

Great! We're all set to reveal this problem. You'll notice that things are only
re-rendering when they should. Let's click on "force render" three times and
"Increment count" twice:

![clicking "force render" three times and "Increment count" twice](./images/memoized.gif)

Notice that the `<App />` has now been rendered 4 times and the others have only
been rendered 3 times. This is exactly what we want. The count components get a
re-render only when they need it, which is what we get from `React.memo`.

So now let's remove the `useMemo` from the context provider:

```javascript {3}
function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = {count, setCount}
  return <CountContext.Provider value={value} {...props} />
}
```

Now let's try to do the same thing again:

![clicking "force render" three times and "Increment count" twice](./images/not-memoized.gif)

Oh no! Everything is getting rendered when we click "force render" and the
memoized components are getting re-rendered anyway. So why is that happening?
It's happening because of the way that React context works.

From
[the React `Context.Provider` documentation](https://reactjs.org/docs/context.html#contextprovider):

> All consumers that are descendants of a Provider will re-render whenever the
> Provider’s `value` prop changes. The propagation from Provider to its
> descendant consumers is not subject to the `shouldComponentUpdate` method, so
> the consumer is updated even when an ancestor component bails out of the
> update.
>
> Changes are determined by comparing the new and old values using the same
> algorithm as `Object.is`.

That last bit is the important part. `Object.is` is really similar to `===`.

So `const value = {count, setCount}` in the `CountProvider` function is creating
a brand new object every time it's called. So when React does it's check
`Object.is(previousValue, newValue)`, it will _always_ be false, meaning that
_every_ time `CountProvider` is re-rendered, _every_ context consumer will be
re-rendered as well, even if the actual relevant values are unchanged.

And by the way, we can't solve this by memoizing `CountProvider` with
`React.memo`, because the `children` prop will change every render, so it wont
be effective anyway.

## Conclusion

Most of the time, this wont be a huge deal, especially if your context value
doesn't change very often, but it's normally pretty easy to memoize the value
with `React.useMemo` anyway so may as well do it all the time for your context
value and avoid the problem.

Good luck!

## An alternative

I should mention there's an alternative approach to this which does not require
`useMemo`. It involves separating the state and the mechanism for updating that
state into two separate contexts. Here's that:

https://codesandbox.io/s/ynn88nx9x?view=editor

Not only do you not need to `useMemo` in this case, but you actually can avoid
re-rendering the components that just use the updater context:

![clicking "force render" three times and "Increment count" twice](./images/split-contexts.gif)

Notice that this is the same as with the `useMemo` solution, except because the
`<Counter />` component's context isn't getting updated, we avoid the re-render
of that component entirely which is cool.

I personally feel like this is more complicated of an API than is necessary for
most situations, so I'll stick with the `useMemo` solution for my own code. But
if you really have a context with a lot of consumers and many only update the
context value (not consume it as well), then consider splitting the state
updater from the state value itself.
