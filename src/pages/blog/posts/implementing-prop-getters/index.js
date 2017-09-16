/* eslint max-len:off */
import {basename} from 'path'
import Markdown from '../../../../components/markdown'
import Disqus from '../../../../components/disqus'

export const title = 'How to give rendering control to users with prop getters'
export const draft = true

export default Post

function Post() {
  return (
    <div style={{maxWidth: 800, margin: 'auto', fontSize: '22px'}}>
      <h1 style={{textAlign: 'center', fontSize: '1.4em'}}>{title}</h1>
      <div>
        <Markdown>
          {`
            Since I [released downshift](https://medium.com/@kentcdodds/introducing-downshift-for-react-b1de3fca0817)
            a few weeks ago. Of all things, I think the most common question I've gotten has been about the
            "prop getters." As far as I know, [downshift](https://github.com/paypal/downshift) is the first library to
            implement this pattern, so I thought I'd explain why it's useful and how to implement it. If you're
            unfamiliar with downshift, please read
            [the intro post](https://medium.com/@kentcdodds/introducing-downshift-for-react-b1de3fca0817) before you
            continue. Don't worry, I'll wait...

            So, to recap from what you read, prop getters are one piece to the puzzle to let you hand rendering over to
            the users of your components (a great idea). I got the idea from
            [Jared Forsyth](https://twitter.com/jaredforsyth) one day at an airport. You can only really use it with the
            [render prop pattern](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9).
            It's basically a function which will return props when called and people must apply those props to the
            right element to hook all the elements that are rendered together to make the overarching component.
            Hopefully that's clear 😀

            To talk about this, we'll actually use a different component I wrote recently that uses this pattern called
            [~react-toggled~](https://github.com/kentcdodds/react-toggled). It's pretty small, so I'm just going to
            paste all of it here for you:

            ~~~
            import {Component} from 'react'
            import PropTypes from 'prop-types'

            const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

            class Toggle extends Component {
              static propTypes = {
                defaultOn: PropTypes.bool,
                on: PropTypes.bool,
                onToggle: PropTypes.func,
                children: PropTypes.oneOfType([PropTypes.func, PropTypes.array]).isRequired,
              }
              static defaultProps = {
                defaultOn: false,
                onToggle: () => {},
              }
              state = {
                on: this.getOn({on: this.props.defaultOn}),
              }

              getOn(state = this.state) {
                return this.isOnControlled() ? this.props.on : state.on
              }

              isOnControlled() {
                return this.props.on !== undefined
              }

              getTogglerProps = (props = {}) => ({
                'aria-controls': 'target',
                'aria-expanded': Boolean(this.getOn()),
                ...props,
                onClick: callAll(props.onClick, this.toggle),
              })

              getTogglerStateAndHelpers() {
                return {
                  on: this.getOn(),
                  getTogglerProps: this.getTogglerProps,
                  setOn: this.setOn,
                  setOff: this.setOff,
                  toggle: this.toggle,
                }
              }

              setOnState = (state = !this.getOn()) => {
                if (this.isOnControlled()) {
                  this.props.onToggle(state, this.getTogglerStateAndHelpers())
                } else {
                  this.setState({on: state}, () => {
                    this.props.onToggle(this.getOn(), this.getTogglerStateAndHelpers())
                  })
                }
              }

              setOn = this.setOnState.bind(this, true)
              setOff = this.setOnState.bind(this, false)
              toggle = this.setOnState.bind(this, undefined)

              render() {
                const renderProp = unwrapArray(this.props.children)
                return renderProp(this.getTogglerStateAndHelpers())
              }
            }

            /**
             * Takes an argument and if it's an array, returns the first item in the array
             * otherwise returns the argument
             * @param {*} arg the maybe-array
             * @return {*} the arg or it's first item
             */
            function unwrapArray(arg) {
              return Array.isArray(arg) ? arg[0] : arg
            }

            export default Toggle
            ~~~

            <p style="font-size:0.9em;opacity:0.8;margin-left:20px">
              You'll notice that ~this.props.children~ is unwrapped, this is for preact compatibility.
            </p>

            Here's how you could use ~react-toggled~:

            ~~~
            <Toggle>
              {({on, getTogglerProps}) => (
                <div>
                  <button {...getTogglerProps()}>Toggle me</button>
                  <div>{on ? 'Toggled On' : 'Toggled Off'}</div>
                </div>
              )}
            </Toggle>
            ~~~

            There are a few neat things about this component I may talk about in a future post, but for now, let's focus
            on the ~getTogglerProps~ function. The biggest question I get from folks about "prop getters" is:

            > Why are you using a function to get props? Why not just pass a regular object to my render callback and
            > let me spread that instead of having to call a function?

            What people are saying is they'd prefer to do: ~<button {...togglerProps} {...myOwnProps} />~ rather than
            ~<button {...getTogglerProps(myOwnProps)} />~. I can understand why folks might prefer that. It feels like
            you have more control that way. However, we're actually doing something useful with this function and the
            props that you provide...

            For this component, we care about the ~onClick~ prop you apply to your ~<button>~. We need to call
            ~this.toggle~. But what if you (as a user of the component) also wanted to have a handler for ~onClick~?
            You might try to write it like this: ~<button onClick={this.handleClick} {...togglerProps} />~. But you'd
            find that ~togglerProps~ overrides your custom ~onClick~ handler, so you could switch it to:
            ~<button {...togglerProps} onClick={this.handleClick} />~ and now you have the opposite problem! Your custom
            ~onClick~ is overriding the ~onClick~ from ~togglerProps~, so ~react-toggled~ isn't working at all.

            With that context, let's see how we avoid this problem by using a function. Check out the implementation of
            ~getTogglerProps~:

            ~~~
            getTogglerProps = (props = {}) => ({
              'aria-controls': 'target',
              'aria-expanded': Boolean(this.getOn()),
              ...props,
              onClick: callAll(props.onClick, this.toggle),
            })
            ~~~

            You'll notice that the ~onClick~ prop is assigned to ~callAll(props.onClick, this.toggle)~. The ~callAll~
            function is pretty simple:

            ~~~
            const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
            ~~~

            It does what it says. Calls all the functions it's given, if they exist. In our case, both of our ~onClick~
            handlers will be called as we need.

            ---

            To summarize, prop getters are one of the patterns that enable you to hand rendering responsibility to the
            user of your components (a really awesome idea). You can implement it with the render prop pattern.

            hi [example 1](https://twitter.com/lukeherrington/status/908110333155278848)


            https://twitter.com/sprjrx/status/908367026619506688
            Good luck to you all! 👍

            **Things to not miss:**

            _**P.S. If you like this, make sure to [subscribe](http://tinyletter.com/kentcdodds),
            [follow me on twitter](https://twitter.com/kentcdodds),
            [buy me lunch](http://kcd.im/donate),
            and [share this with your friends](https://tinyletter.com/kentcdodds) 😀**_
          `.replace(/~/g, '`')}
        </Markdown>
        <small>
          See more blogposts from me <a href="/post">here</a>.
        </small>
      </div>
      <Disqus
        style={{marginTop: 50}}
        id={title}
        url={`https://kentcdodds.com/post/${basename(__dirname)}`}
      />
    </div>
  )
}
