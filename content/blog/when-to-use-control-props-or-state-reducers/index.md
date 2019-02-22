---
slug: when-to-use-control-props-or-state-reducers
title: When to use Control Props or State Reducers
date: '2018-06-11'
author: Kent C. Dodds
description:
  _Comparing two similar patterns that enable many of the same use cases._
keywords:
  - JavaScript
  - React
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Casey
  Horner](https://unsplash.com/photos/4ORoz9btfgI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
  on_[Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)'
---

You've probably used components or elements that implement the control props
pattern. For example:

```jsx
<input value={this.state.inputValue} onChange={this.handleInputChange} />
```

Read more about the concept of control props in
[the react docs](https://reactjs.org/docs/forms.html).

You may not have had much experience with the idea of a
[state reducer](https://blog.kentcdodds.com/the-state-reducer-pattern--b40316cfac57).
In contrast to control props, built-in react elements don't support state
reducers (though I hear that reason-react does). My library
[downshift](https://github.com/paypal/downshift) supports a state reducer.
Here's an example of using it to prevent the menu from closing after an item is
selected:

```jsx
function stateReducer(state, changes) {
  if (changes.type === Downshift.stateChangeTypes.clickItem) {
    // when the user clicks an item, prevent
    // keep the isOpen to true
    return {...changes, isOpen: true}
  }
  return changes
}
const ui = (
  <Downshift stateReducer={stateReducer}>
    {() => <div>{/* some ui stuff */}</div>}
  </Downshift>
)
```

You can learn how to implement these patterns from
[my Advanced React Component Patterns material](https://kentcdodds.com/workshops/#advanced-react-component-patterns).

Both of these patterns help you expose state management to component consumers
and while they have significantly different APIs, they allow much of the same
capabilities. So today I'd like to answer the question I've gotten many times
which is: "When should I expose a state reducer or a control prop?"

Control Props are objectively more powerful because they allow complete control
over state from outside the component. Let's take my favorite Toggle component
as an example:

```jsx
class Example extends React.Component {
  state = {on: false, inputValue: 'off'}
  handleToggle = on => {
    this.setState({on, inputValue: on ? 'on' : 'off'})
  }
  handleChange = ({target: {value}}) => {
    if (value === 'on') {
      this.setState({on: true})
    } else if (value === 'off') {
      this.setState({on: false})
    }
    this.setState({inputValue: value})
  }
  render() {
    const {on} = this.state
    return (
      <div>
        {/*  
          here we're using the `value` control prop  
          exposed by the <input /> component  
        */}
        <input value={this.state.inputValue} onChange={this.handleChange} />
        {/*  
          here we're using the `on` control prop  
          exposed by the <Toggle /> component.  
        */}
        <Toggle on={on} onToggle={this.handleToggle} />
      </div>
    )
  }
}
```

Here's a rendered version of this component:

![](./images/0.gif)

<figcaption>
  gif of the rendered component showing an input and toggle that sync
  their state
</figcaption>

As you can see, I can control the state of the toggle button by changing the
text of the input component, and control the state of the input by clicking on
the toggle. This is powerful because it allows me to have complete control over
the state of these components.

Control props do come with a cost however. They require that the consumer
completely manage state themselves which means the consumer must have a class
component with state and change handlers to update that state.

State reducers do not have to manage the component's state themselves (though
they can manage some of their own state as needed). Here's an example of using a
state reducer:

```jsx
class Example extends React.Component {
  initialState = {timesClicked: 0}
  state = this.initialState
  handleToggle = (...args) => {
    this.setState(({timesClicked}) => ({
      timesClicked: timesClicked + 1,
    }))
  }
  handleReset = (...args) => {
    this.setState(this.initialState)
  }
  toggleStateReducer = (state, changes) => {
    if (this.state.timesClicked >= 4) {
      return {...changes, on: false}
    }
    return changes
  }
  render() {
    const {timesClicked} = this.state
    return (
      <div>
        <Toggle
          stateReducer={this.toggleStateReducer}
          onToggle={this.handleToggle}
          onReset={this.handleReset}
        />
        {timesClicked > 4 ? (
          <div>
            Whoa, you clicked too much!
            <br />
          </div>
        ) : (
          <div>Click count: {timesClicked}</div>
        )}
      </div>
    )
  }
}
```

And here's a gif of the rendered interaction.

![](./images/1.gif)

<figcaption>
  gif of the rendered component showing a toggle, reset button, and counter
  that's limited to 4 toggles.
</figcaption>

Now, you could definitely implement this experience using a control prop, but I
would argue that it's a fair bit simpler if you can use the state reducer. The
biggest limitation of a state reducer is that it's impossible to set state of
the component from outside it's normal `setState` calls (I couldn't implement
the first example using a state reducer).

I hope this is helpful! Feel free to see the implementation and play around with
things in [this codesandbox](https://codesandbox.io/s/n09418kvr0).

Good luck!

**Learn more about React from me**:

- [egghead.io (beginners)](http://kcd.im/beginner-react) — My Beginner's Guide
  to React absolutely _free_ on [egghead.io](http://egghead.io/).
- [egghead.io (advanced)](http://kcd.im/advanced-react) — My Advanced React
  Component Patterns course available on [egghead.io](http://egghead.io/) today!
- [Frontend Masters](https://frontendmasters.com/workshops/advanced-react-patterns/) — My
  Advanced React Patterns workshop
- [Workshop.me LIVE and ONLINE](https://workshop.me/2018-06-advanced-react?a=kent) — My
  Advanced React Patterns workshop
- [Workshop.me](https://workshop.me/2018-07-advanced-react?a=kent) — I'm giving
  my Advanced Component Patterns workshop in person in Portland in July!
- [Workshop.me](https://workshop.me/2018-08-react-intro?a=kent) — I'm giving my
  Intro to React workshop in person in Salt Lake City in August!

**Things to not miss**:

My friend [Jamund Ferguson](https://medium.com/u/c33d3263a7b4) and his wife Kari
have been working on a conference to bring awareness of mental health issues in
tech. The lineup looks amazing. Use the code TECH for \$25 off.
[www.anxietytech.com](https://www.anxietytech.com/)

![](./images/2.png)

- [**DevTips with Kent**](https://www.youtube.com/playlist?list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
  ❗️❗️❗️ I've started a new series of daily short videos about software
  development. I livestream them every weekday. Check out the playlist of videos
  I have up there already including
  [npm tips](https://www.youtube.com/watch?v=Dli_FisDdVU&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u),
  [TDD with react-testing-library](https://www.youtube.com/watch?v=kCR3JAR7CHE&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u),
  [webpack HMR](https://www.youtube.com/watch?v=JGXAvgVHC5A&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u),
  and more!
- [A bitter guide to open source](https://medium.com/@ken_wheeler/a-bitter-guide-to-open-source-a8e3b6a3c1c4)
  by [Ken Wheeler](https://twitter.com/ken_wheeler). It's **incredibly**
  insightful (and full of cursing, you've been warned).
