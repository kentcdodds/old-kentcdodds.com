---
slug: should-i-usestate-or-usereducer
date: 2019-02-11
title: 'Should I useState or useReducer?'
author: 'Kent C. Dodds'
description:
  Two built-in React hooks that handle state, which one should you use?
categories: ['react']
keywords: ['react', 'javascript', 'hooks']
published: false
banner: './banner.png'
bannerCredit:
  Photo by [Kyle
  Glenn](https://unsplash.com/photos/IFLgWYlT2fI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  on
  [Unsplash](https://unsplash.com/search/photos/uncertain?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
---

Whenever there are two things to do the same thing, people inevitably ask: "When
do I use one over the other?"

For example
["When do I use `useEffect` and `useLayoutEffect`?"](/blog/useeffect-vs-uselayouteffect)
Or
["When do I use Unit, Integration, or E2E tests?"](/blog/unit-vs-integration-vs-e2e-tests)
Or
["When to use Control Props or State Reducers?"](/blog/control-props-vs-state-reducers)

I think `useState` and `useReducer` are no exception to this at all. In fact,
[Matt Hamlin](https://twitter.com/immatthamlin) already posted
[useReducer, don't useState](https://matthamlin.me/blog/2019/february/why-you-should-useReducer/)
and he makes some great points there. I'd like to throw my hat in this
discussion though because
[I was asked about it on my AMA](https://github.com/kentcdodds/ama/issues/587).

> Congratulations on the new design of your website kentcdodds.com. Looking at
> the source code of your website, in the
> [`Subscribe`](https://github.com/kentcdodds/kentcdodds.com/blob/ed55aea3a58d24813a59cf72d8ffbdfbd96f769e/src/components/Forms/Subscribe.js)
> component, you used useState hooks to handle the state of this component. My
> question is, is not it more optimized to use a useReducer here instead of
> several useState? If not, why?

Here's the top of that Subscribe component

```jsx
const [submitted, setSubmitted] = React.useState(false)
const [loading, setLoading] = React.useState(false)
const [response, setResponse] = React.useState(null)
const [errorMessage, setErrorMessage] = React.useState(null)
```

Then there's logic throughout the component for calling those state updater
functions with the appropriate data, like here:

```jsx
async function handleSubmit(values) {
  setSubmitted(false)
  setLoading(true)
  try {
    const responseJson = await fetch(/* stuff */).then(r => r.json())
    setSubmitted(true)
    setResponse(responseJson)
    setErrorMessage(null)
  } catch (error) {
    setSubmitted(false)
    setErrorMessage('Something went wrong!')
  }
  setLoading(false)
}
```

If I were to rewrite this to use `useReducer` then it would look like this:

```jsx
const [state, dispatch] = React.useReducer(reducer, {
  submitted: false,
  loading: false,
  response: null,
  errorMessage: null,
})
```

Then the `reducer` would look something like this:

```jsx
const types = {
  SUBMIT_STARTED: 0,
}
function reducer(state, action) {
  switch (action.type) {
    case types.SUBMIT_STARTED: {
      return {...state, submitted: false, loading: true}
    }
    case types.SUBMIT_COMPLETE: {
      return {
        ...state,
        submitted: true,
        response: action.response,
        errorMessage: null,
        loading: false,
      }
    }
    case types.SUBMIT_ERROR: {
      return {
        ...state,
        submitted: false,
        errorMessage: action.errorMessage,
        loading: false,
      }
    }
    default: {
      return state
    }
  }
}
```

And the `handleSubmit` function would look like this:

```jsx
async function handleSubmit(values) {
  dispatch({type: types.SUBMIT_STARTED})
  try {
    const responseJson = await fetch(/* stuff */).then(r => r.json())
    dispatch({type: types.SUBMIT_COMPLETE, response: responseJson})
  } catch (error) {
    dispatch({type: types.SUBMIT_ERROR, errorMessage: 'Something went wrong!'})
  }
}
```

Matt Hamlin brings up in his blog post a few benefits to `useReducer` over
`useState`:

- Easier to manage larger state shapes
- Easier to reason about by other developers
- Easier to test

For this specific case I don't think that the first or second point really
applies. Four elements of state is hardly a "large state shape" and the
before/after here is no easier or harder to "reason about" for me. I think
they're equally simple/complex.

As for testing, I would definitely agree that you could test the `reducer` in
isolation and that could be a nice benefit if I were doing a bunch of business
logic in there, but I'm not really. It's pretty simple there.

Typically I prefer to write higher-level integration-like tests, so I wouldn't
want to write tests for that `reducer` in isolation and instead would test the
`<Subscribe />` component and my tests would treat the reducer as an
implementation detail.

> Now if there were some complex business logic in that `reducer` or several
> edge cases, then I definitely would want to test that in isolation (and I
> would use [`jest-in-case`](https://github.com/atlassian/jest-in-case) to do
> it!).

I think there is one main situation in which I prefer `useState` over
`useReducer`:

**When prototyping/building the component and you're not certain of the
implementation**

While building a new component, you're often adding/removing state from that
component's implementation. I think it would be harder to do that if you do this
with a reducer. Once you solidified what you want your component to look like
then you can go make the decision of whether converting from several `useState`s
to a `useReducer` makes sense. Additionally, maybe you'll decide that
`useReducer` makes sense for some of it and a custom hook that uses `useState`
would make sense for other parts of your component logic. I find it's almost
always better to wait until I know what my code is going to look like before I
start making abstractions.

Oh, and if you're prototyping, the code can be as unmaintainable as you want :)
So who cares? Do what's faster.

## Conclusion

So what's the answer? Really, it depends. `useState` is literally built on top
of `useReducer`. I don't think there are any relevant performance concerns
between the two so it's mostly a cosmetic/preferential decision.

While I conceptually like what Matt is encouraging, I think I may have a longer
threshold before I'll reach for `useReducer` to replace my `useState`. I also
really appreciate Matt for including this:

> they both have benefits and fallbacks that depend entirely upon their use

I think the best thing you can do to develop an intuition for when to reach for
one or the other is to feel the pain. Use them both and see how happy/sad they
make your life.

Good luck!
