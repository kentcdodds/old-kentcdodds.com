import React from 'react'
import {navigate} from 'gatsby-link'

function SubjectSelector({
  options,
  noSelectionUi,
  onChange = () => {},
  label,
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
      <div>
        <label htmlFor="subject-selector">{label}</label>
        <br />
        <select id="subject-selector" {...rest} onChange={handleChange}>
          {Object.keys(options).map(key => (
            <option key={key} value={key}>
              {options[key].display}
            </option>
          ))}
        </select>
      </div>
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
    fetch(`${process.env.NETLIFY_FUNCTIONS_URL}/contact`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(getFormValues(form)),
    }).then(
      () => {
        navigate('/contact/success')
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
      css={{
        display: 'grid',
        gridGap: 20,
      }}
    >
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
      <div css={{display: 'grid', gridGap: 20}}>
        <SubjectSelector
          label="Email Type"
          name="type"
          options={{
            workshop: {
              display: 'Enterprise Workshop Inquiry',
              ui: (
                <>
                  <div>
                    <label htmlFor="company-name-input">Company Name</label>
                    <br />
                    <input
                      type="text"
                      id="company-name-input"
                      name="company"
                      required
                      css={{width: '100%'}}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject-input">Email Subject</label>
                    <br />
                    <input
                      key="enterprise-workshop-subject"
                      defaultValue="My organization needs training"
                      type="text"
                      id="subject-input"
                      name="subject"
                      required
                      css={{width: '100%'}}
                    />
                  </div>
                </>
              ),
            },
            testimonial: {
              display: 'Submit a testimonial',
              ui: (
                <>
                  <small>
                    {`
                      I love hearing about people that I've helped.
                      I ocassionally use testimonials on my website.
                      If you had a good experience with some of my material,
                      I'd love to hear about it!
                    `}
                  </small>
                  <div>
                    <label htmlFor="subject-input">Email Subject</label>
                    <br />
                    <input
                      key="testimonial-subject"
                      defaultValue="I want to submit a testimonial"
                      type="text"
                      name="subject"
                      id="subject-input"
                      required
                      css={{width: '100%'}}
                    />
                  </div>
                  <div>
                    <label htmlFor="link-input">
                      {`Link to testimonial (tweet/blog post/etc.)`}
                    </label>
                    <small css={{marginLeft: 6}}>
                      {`(optional, but `}
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://twitter.com/intent/tweet"
                      >
                        appreciated
                      </a>
                      {`)`}
                    </small>
                    <br />
                    <input type="url" name="link" css={{width: '100%'}} />
                  </div>
                </>
              ),
            },
            help: {
              display: 'Help / Ask a question',
              ui: (
                <>
                  <div>
                    <small>
                      If you need help with one of my open source projects,
                      please either ask on the official support channel for the
                      project or open an issue on GitHub. Please do not ask
                      here.
                    </small>
                    <br />
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
                  </div>
                  <div>
                    <label htmlFor="subject-input">Help Subject</label>
                    <br />
                    <input
                      key="help-subject"
                      type="text"
                      name="subject"
                      id="subject-input"
                      required
                      css={{width: '100%'}}
                      defaultValue="I need help"
                    />
                  </div>
                </>
              ),
            },
            other: {
              display: 'Other...',
              ui: (
                <div>
                  <label htmlFor="subject-input">Subject</label>
                  <br />
                  <input
                    key="other-subject"
                    type="text"
                    name="subject"
                    id="subject-input"
                    required
                  />
                </div>
              ),
            },
          }}
        />
      </div>
      <div>
        <label htmlFor="body-textarea">Email body</label>
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
    const formControl = formNode.elements[key]
    const name = formControl.getAttribute('name')
    if (name && !obj[name]) {
      obj[name] = formControl.value
    }
    return obj
  }, {})
}

export default ContactForm
