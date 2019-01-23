import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Debug } from './Debug'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a first name that long')
    .required('Required'),
})

const SignUp = ({ subscribed = false }) => (
  <div>
    <h2>Join the Newsletter</h2>
    <Formik
      initialValues={{
        email_address: '',
        first_name: '',
      }}
      validationSchema={SubscribeSchema}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
        }, 500)
      }}
      // https://app.convertkit.com/forms/834199/subscriptions
      render={({ errors, touched }) => (
        <Form>
          <label htmlFor="first_name">First Name</label>
          <Field name="first_name" placeholder="Jane" type="text" />
          <ErrorMessage
            name="first_name"
            component="div"
            className="field-error"
          />

          <label htmlFor="email">Email</label>
          <Field
            name="email_address"
            placeholder="jane@acme.com"
            type="email"
          />
          <ErrorMessage
            name="email_address"
            component="div"
            className="field-error"
          />

          <button data-element="submit" type="submit">
            Submit
          </button>
          {/* <Debug /> */}
        </Form>
      )}
    />
  </div>
)

export default SignUp
