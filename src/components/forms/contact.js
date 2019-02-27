import React from 'react'
import {navigate} from 'gatsby-link'

function SubjectSelector({
  options,
  noSelectionUi,
  onChange = () => {},
  ...rest
}) {
  const [value, setValue] = React.useState(
    rest.defaultValue || Object.keys(options)[0],
  )
  function handleChange(e) {
    setValue(e.target.selectedOptions[0].value)
    onChange(e)
  }
  return (
    <>
      <select {...rest} onChange={handleChange}>
        {Object.keys(options).map(key => (
          <option key={key} value={key}>
            {options[key].display}
          </option>
        ))}
      </select>
      {options[value] ? options[value].ui : noSelectionUi}
    </>
  )
}

function CountupTextarea({
  maxLength,
  defaultValue = '',
  onChange = () => {},
  wrapperClassName,
  ...rest
}) {
  const [length, setLength] = React.useState(defaultValue.length)
  function handleChange(e) {
    setLength(e.target.value.length)
    onChange(e)
  }
  // this allows us to increase the opacity exponensially as they near the maxLength
  const level = Math.pow(length, 6) / Math.pow(maxLength, 6)
  return (
    <div>
      <textarea
        maxLength={maxLength}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      />
      <div
        style={{
          opacity: level,
          fontSize: 12,
          color: level > 0.3 ? 'red' : null,
          fontWeight: level > 0.5 ? 'bold' : null,
        }}
      >
        <span>
          {length} / {maxLength}
        </span>
        <span>{length >= maxLength ? ' please be more brief' : null}</span>
      </div>
    </div>
  )
}

function ContactForm() {
  function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encode({
        'form-name': form.getAttribute('name'),
        ...getFormValues(form),
      }),
    }).then(
      () => {
        navigate(form.getAttribute('action'))
      },
      error => {
        /* eslint no-alert:0 */
        window.alert('There was a problem. Check the developer console.')
        /* eslint no-console:0 */
        console.log(error)
        throw error
      },
    )
  }

  return (
    <form
      name="contact"
      onSubmit={handleSubmit}
      method="post"
      action="/contact/success"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      css={{
        '& > div': {
          marginBottom: 20,
        },
      }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label htmlFor="name-input">Name</label>
        <br />
        <input id="name-input" type="text" name="name" required />
      </div>
      <div>
        <label htmlFor="email-input">Email</label>
        <br />
        <input id="email-input" type="email" name="email" required />
      </div>
      <div>
        <SubjectSelector
          options={{
            workshop: {
              display: 'Enterprise Workshop Inquiry',
              ui: (
                <div>
                  <small>My organization needs training</small>
                  <input
                    value="My organization needs training"
                    type="hidden"
                    name="subject"
                  />
                </div>
              ),
            },
            help: {
              display: 'Help',
              ui: (
                <div>
                  <small>
                    If you need help with one of my open source projects, please
                    either ask on the official support channel for the project
                    or open an issue on GitHub. Please do not ask here.
                  </small>
                  <br />
                  <label htmlFor="subject-input">Help Subject</label>
                  <br />
                  <input
                    type="text"
                    name="subject"
                    defaultValue="I need help"
                    required
                  />
                </div>
              ),
            },
            ama: {
              display: 'Ask a question',
              ui: (
                <div>
                  <small>
                    {`I prefer general questions to be asked on `}
                    <a href="https://kcd.im/ama">{`my AMA`}</a>
                    {`. If you ask here, `}
                    <strong>
                      {`I can't make any promises that `}
                      <a href="https://kcd.im/no-time">{`I'll have time`}</a>
                      {` to respond,`}
                    </strong>
                    {`but I'll try.`}
                  </small>
                  <br />
                  <label htmlFor="subject-input">AMA Subject</label>
                  <br />
                  <input
                    type="text"
                    name="subject"
                    defaultValue="I have a question"
                    required
                  />
                </div>
              ),
            },
            other: {
              display: 'Other...',
              ui: (
                <div>
                  <label htmlFor="subject-input">Subject</label>
                  <br />
                  <input type="text" name="subject" required />
                </div>
              ),
            },
          }}
        />
      </div>
      <div>
        <label htmlFor="body-textarea">How can I help you?</label>
        <CountupTextarea
          id="body-textarea"
          name="body"
          style={{width: '100%'}}
          rows="10"
          maxLength="1000"
          minLength="10"
          required
        />
      </div>
      <div>
        <button type="submit">Send</button>
      </div>
    </form>
  )
}

function getFormValues(formNode) {
  return Object.getOwnPropertyNames(formNode.elements).reduce((obj, key) => {
    obj[key] = formNode.elements[key].value
    return obj
  }, {})
}

function encode(data) {
  return Object.keys(data)
    .map(
      key =>
        `${window.encodeURIComponent(key)}=${window.encodeURIComponent(
          data[key],
        )}`,
    )
    .join('&')
}

export default ContactForm
