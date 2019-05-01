---
slug: 'how-to-use-react-context-effectively'
title: 'How to use React Context effectively'
date: '2019-04-29'
author: 'Kent C. Dodds'
description: '_How to create and expose React Context providers and consumers_'
categories:
  - 'react'
keywords:
  - 'react'
  - 'javascript'
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Pathum Danthanarayana](https://unsplash.com/photos/KLbUohEjb04)'
---

In
[Application State Management with React](/blog/application-state-management-with-react),
I talk about how using a mix of local state and React Context can help you
manage state well in any React application. I showed some examples and I want to
call out a few things about those examples and how you can create React context
consumers effectively so you avoid some problems and improve the developer
experience and maintainability of the context objects you create for your
application and/or libraries.

> Note, please do read
> [Application State Management with React](/blog/application-state-management-with-react)
> and follow the advice that you shouldn't be reaching for context to solve
> every state sharing problem that crosses your desk. But when you do need to
> reach for context, hopefully this blog post will help you know how to do so
> effectively. Also, remember that context does NOT have to be global to the
> whole app, but can be applied to one part of your tree and you can (and
> probably should) have multiple logically separated contexts in your app.

First, let's create a file at `src/count-context.js` and we'll create our
context there:

```javascript
// src/count-context.js
import React from 'react'

const CountContext = React.createContext()
```

First off, I don't have an initial value for the `CountContext`. If I wanted an
initial value, I would call `React.createContext({count: 0})`. But I don't
include a default value and that's intentional. The `defaultValue` is only
useful in a situation like this:

```javascript {2}
function CountDisplay() {
  const {count} = React.useContext(CountContext)
  return <div>{count}</div>
}

ReactDOM.render(<CountDisplay />, document.getElementById('⚛️'))
```

Because we don't have a default value for our `CountContext`, we'll get an error
on the highlighted line where we're destructing the return value of
`useContext`. This is because our default value is `undefined` and you cannot
destructure `undefined`.

None of us likes runtime errors, so your knee-jerk reaction may be to add a
default value to avoid the runtime error. However, what use would the context be
if it didn't have an actual value? If it's just using the default value that's
been provided, then it can't really do much good. 99% of the time that you're
going to be creating and using context in your application, you want your
context consumers (those using `useContext`) to be rendered within a provider
which can provide a useful value.

> Note, there are situations where default values are useful, but most of the
> time they're not necessary or useful.

[The React docs](https://reactjs.org/docs/context.html#reactcreatecontext)
suggest that providing a default value "can be helpful in testing components in
isolation without wrapping them." While it's true that it allows you to do this,
I disagree that it's better than wrapping your components with the necessary
context. Remember that every time you do something in your test that you don't
do in your application, you reduce the amount of confidence that test can give
you. [There are reasons to do this](/blog/the-merits-of-mocking), but that's not
one of them.

> Note: If you're using Flow or TypeScript, not providing a default value can be
> really annoying for people who are using `React.useContext`, but I'll show you
> how to avoid that problem altogether below. Keep reading!

## The Custom Provider Component

Ok, let's continue. For this context module to be useful _at all_ we need to use
the Provider and expose a component that provides a value. Our component will be
used like this:

```javascript {3,6}
function App() {
  return (
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('⚛️'))
```

So let's make a component that can be used like that:

```javascript
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

export {CountProvider}
```

Ok, so there are a few things to talk about here. Let's go over them one by one:

**`React.useState`**: Your context provider can provide anything you want. This
provider could use dozens of hooks if it needed to. This is just a small
contrived example.

**`React.useMemo`**: 99% of the time, your context providers should probably be
using `useMemo`. I'm not going to go too far into this one (I'll leave that to
my friends [here](https://github.com/kentcdodds/ama/issues/673)), but just know
that context providers do an equality check on the `value` you provide and if
it's different between renders it will re-render every consumer (this can be a
big performance problem if your context has many consumers). So we're using
`useMemo` here to avoid our context value being re-created on every re-render.

> NOTE: Please don't just throw `useMemo` and `useCallback` around for no real
> reason other than "I guess I should" or "I think this is maybe slow." It's
> not, and
> [you could be making things WORSE](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578).

**`value`**: The `value` variable is being assigned to an object that has the
state (`count`) and a mechanism for updating the state `setCount`. There are
lots of ways to do this. I've seen people actually put these in two completely
different contexts (I believe that react-redux actually does this with their
hooks), and you just consume the thing you want. I personally think that's
over-abstraction, but I can understand why people may want to split it up (if
you have a component that only needs to update the state and doesn't care about
the value, then you can avoid unnecessary re-renders by splitting them up). I
just don't see those situations being common enough for it to be something you
should do in your day-to-day context consumer.

**`<CountContext.Provider value={value} {...props} />`**: First I'll say that
props for your providers could have some legit props that you want to configure
how the provider operates, so you'd want to remove those from the spread on the
context provider component. But other than that, spreading like this has a
specific effect that I'd like to callout. **Here's a strong tip for you.** By
spreading the given props _after_ the `value`, I not only accept and forward the
`children` prop that we need to do, but I _also_ allow the user to override the
`value` prop. This has the powerful effect of being able to fully customize this
for testability purposes. Yes, this results in a similar trade-off to using a
`defaultValue` for your context, but this allows you to customize the value of
the context from within your test which gives you more flexibility and is more
obvious than indirectly relying on a static default value.

## The Custom Consumer Hook

Most of the APIs for context usages I've seen in the wild look something like
this:

```javascript
import React from 'react'
import {SomethingContext} from 'some-context-package'

function YourComponent() {
  const something = React.useContext(SomethingContext)
}
```

But I think that's a missed opportunity at providing a better user experience.
Instead, I think it should be like this:

```javascript
import React from 'react'
import {useSomething} from 'some-context-package'

function YourComponent() {
  const something = useSomething()
}
```

This has the benefit of you being able to do a few things which I'll show you in
the implementation now:

```javascript {17-28,30}
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
  const increment = () => setCount(c => c + 1)
  return {
    count,
    increment,
  }
}

export {CountProvider, useCount}
```

First, the `useCount` custom hook uses `React.useContext(CountContext)` to get
the provided context value from the nearest `CountProvider`. However, if there
is no value, then we throw a helpful error message indicating that `useCount` is
not being called within a function component that is rendered within a
`CountProvider`. This is most certainly a mistake, so providing the error
message is valuable. _**#FailFast**_

Also note that I'm only exposing the things that people _NEED_ today (you don't
have access to `setCount` directly, only `count` and `increment`). It's WAY
easier to expose too little and add more later than to expose too much and
change/remove it later. So start with exposing only what's necessary today.

I should mention that we could have put `increment` in the context value within
the provider, but I've found that it's often easier to keep the context value
provider smaller and then the custom hook can have some helpful (and
configurable) utilities. There are definitely situations where utilities at the
provider level are useful as well, but start with the hook level first. You'll
be more likely to avoid mistaken unnecessary re-renders and the ability to
customize each use (via arguments to the custom hook) is a nice benefit.

## The Custom Consumer Component

If you're able to use hooks at all, then skip this section. However if you need
to support React `<` 16.8.0, or you think the Context needs to be consumed by
class components, then here's how you could do something similar with
the render-prop based API for context consumers:

```javascript
function CountConsumer({children}) {
  return (
    <CountContext.Consumer>
      {context => {
        if (!context) {
          throw new Error('CountConsumer must be used within a CountProvider')
        }
        const {count, setCount} = context
        const increment = () => setCount(c => c + 1)
        return children({
          count,
          increment,
        })
      }}
    </CountContext.Consumer>
  )
}
```

This is what I used to do before we had hooks and it worked well. I would not
recommend bothering with this if you can use hooks though. Hooks are much
better.

## TypeScript

I promised I'd show you how to avoid issues with skipping the `defaultValue`
when using TypeScript or Flow. Guess what! By doing what I'm suggesting, you
avoid the problem by default! It's actually not a problem at all. Check it out:

```typescript {4-7,9-11,30-33}
// src/count-context.tsx
import * as React from 'react'

type CountContextValue = {
  count: number
  setCount: (updater: (count: number) => number) => void
}

const CountContext = React.createContext<CountContextValue | undefined>(
  undefined,
)

type CountProviderProps = {
  value?: CountContextValue
  children: React.ReactNode
}

function CountProvider(props: CountProviderProps) {
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
  const increment = () => setCount(c => c + 1)
  return {
    count,
    increment,
  }
}

export {CountProvider, useCount}
```

With that, anyone can use `useCount` without having to do any undefined-checks
because we're doing it for them!

[Here's a working codesandbox](https://codesandbox.io/s/m4wk8wlpy8)

## Conclusion

So here's the final version of the code:

```javascript
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
  const increment = () => setCount(c => c + 1)
  return {
    count,
    increment,
  }
}

export {CountProvider, useCount}
```

[Here's a working codesandbox](https://codesandbox.io/s/3vryq4qrp).

Note that I'm _NOT_ exporting `CountContext`. This is intentional. I expose only
one way to provide the context value and only one way to consume it. This allows
me to ensure that people are using the context value the way it should be and it
allows me to provide useful utilities for my consumers.

I hope this is useful to you! Remember:

1. You shouldn't be reaching for context to solve every state sharing problem
   that crosses your desk.
2. Context does NOT have to be global to the whole app, but can be applied to
   one part of your tree
3. You can (and probably should) have multiple logically separated contexts in
   your app.

Good luck!
