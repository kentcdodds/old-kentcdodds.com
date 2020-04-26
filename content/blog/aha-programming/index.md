---
slug: 'referential-equality'
title: 'Referential Equality in React'
date: '2020-04-26'
author: 'Tyler Haas'
description:
  '_How referential equality can bite you when using react and how to avoid it._'
categories:
  - 'react'
  - 'reactjs'
  - 'programming'
keywords:
  - 'react'
  - 'reactjs'
  - 'programming'
  - 'coding'
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Sharon McCutcheon](https://unsplash.com/photos/NeRKgBUUDjM)'
redirects:
  - '/blog/referential-equality-bug'
  - '/blog/referential-equality-bug/'
---

# The problem

Last week I was helping out a co-worker with a bug they were experiencing. While
building a custom hook they were retrieving some data, manipulating that data
and setting state. Even though their logs were showing the data was updated, the
component wasn't rendering what was being logged. Their code looked something
like this:

```javascript
const initialData = {
  foo: {
    list1: [],
    list2: [],
  },
  bar: {
    list1: [],
    list2: [],
  },
};

const useCustomData() {
  const [data, setData] = React.useState(initialData);
  React.useEffect(() => {
    fetch('/path/to/api')
      .then(res => res.json())
      .then(data => data.reduce(transformFn, initialData))
      .then(setData);
  }, [])
  return data;
}
```

Did you spot it? If not thats ok. This particular bug is subtle and easily
missed.

# How react determines when it should re-render

In the React docs we read the following:

> The setState function is used to update the state. It accepts a new state
> value and enqueues a re-render of the component.

What this is saying is, that anytime we call the state updater function
(`setData`) returned from `useState` react will ingest that and trigger a
re-render of our component. But this wasn't happening for us. Why not?

Further down in reacts docs on `useState` there is
[this section](https://reactjs.org/docs/hooks-reference.html#bailing-out-of-a-state-update)
about bailing out of state updates.

> If you update a State Hook to the same value as the current state, React will
> bail out without rendering the children or firing effects. (React uses the
> Object.is comparison algorithm.)

So when our updater function gets called, react will check the value we pass to
it for equality against what it is currently holding in state and if they're the
same it will bail out of re-rendering our component.

# The Object.is Algorithm

If we look at the docs for
[Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description)
on mdn we will find the description of the algorithm that is used for state
update comparisons.

> Object.is() determines whether two values are the same value. Two values are
> the same if one of the following holds:
>
> - both undefined
> - both null
> - both true or both false
> - both strings of the same length with the same characters in the same order
> - both the same object (means both objects have same reference)
> - both numbers and
>   - both +0
>   - both -0
>   - both NaN or
>   - both non-zero and both not NaN and both have the same value

The interesting part of this algorithm is how it deals with detrmining if two
objects are equal. This is done by the objects reference stored in memory. To
fully explain this we have to learn about what happens to an objects reference
when we update one.

## Object reference

When a new object is created and bound to a variable what is bound is not the
object itself but a reference to the location of that object in memory. For
example:

```javascript
const obj = {}
```

`obj` would store a memory location instead of the object itself. The result of
this is that when we reference the bound variable we are no longer referencing
the value of the object but instead we reference whatever is stored at that
location in memory. This is done for performance optimization reasons that is
outside the scope of this article.

# Solving our problem

Lets unwind what we have learned. Assigning objects to variables gives us a
memory location instead of the value of the object. React then uses the
reference to that memory location to determine if two objects are different and
only re-renders when the two objects are stored in different places in memory.
So if we take another look at our code through the lense of what is bound to our
variables. Our bug begins to make more sense. For simplicity we will represent
objects memory location with strings.

```javascript
const initialData = 'memoryLocation1';

const useCustomData() {
  const [data, setData] = React.useState('memoryLocation1');
  React.useEffect(() => {
    fetch('/path/to/api')
      .then(res => res.json())
      .then(data => data.reduce(transformFn, 'memoryLocation1'))
      .then(setData);
  }, [])
  return data;
}
```

with this psuedocode we can see that what we are initializing both `useState`
and our reduce fn accumulator to the object stored at `memoryLocation1`. Meaning
that when we call `setData` we are setting it with the same object reference.
Which kicks off the following conversation:

> Us: "Hey React can you update our state?"

> React: "Sure. What do you want me to update it with?"

> Us: "Please update it with the object stored at memoryLocation1"

> React: "No problem!" React: "Looks like I've already got that set in state
> nothing to do here!"

> Us: "No wait! React! There is definitely stuff to do because we updated the
> properties of the object."

So how do we solve this problem? Luckily the solution is fairly simple. We just
have to initialize our reducer function with a totally new object so that the
memory location doesn't match what is already stored in state. One way we could
do this would look like this:

```javascript
function createInitialObject() {
  return {
    foo: {
      list1: [],
      list2: [],
    },
    bar: {
      list1: [],
      list2: [],
    },
  };
}

const useCustomData() {
  const [data, setData] = React.useState(createInitialObject());
  React.useEffect(() => {
    fetch('/path/to/api')
      .then(res => res.json())
      .then(data => data.reduce(transformFn, createInitialObject()))
      .then(setData);
  }, [])
  return data;
}
```

This will ensure that we are creating a totally new object each time we invoke
our `createInitialObject` function.

# Conclusion

When working with state in react be mindful of how data is stored in memory and
how react determines that something has changed. In most cases objects are the
primary sticking point. So if you want re-renders to be triggered make sure you
are setting state with entirely new objects!
