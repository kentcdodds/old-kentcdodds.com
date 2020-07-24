import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import {css} from '@emotion/core'
import {useAsync} from 'lib/use-async'
import {client} from 'lib/api-client'
import theme from '../../../config/theme'
import styled from '@emotion/styled'
import {rhythm} from '../../lib/typography'
import {bpMaxSM} from '../../lib/breakpoints'
import Message from '../confirm-message/message'
import {PleaseConfirmIllustration} from '../confirm-message/illustrations'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string(),
  acceptedCoC: Yup.bool().oneOf([true], 'Required'),
})

function PostSubmissionMessage({convertKitResponse}) {
  return (
    <div
      css={css`
        h2 {
          color: white !important;
        }
      `}
    >
      <Message
        illustration={PleaseConfirmIllustration}
        title="Great, one last thing..."
        body={
          convertKitResponse.status === 'quarantined'
            ? `[Please click here](${convertKitResponse.url}) to verify you are a human.`
            : 'I just sent you an email with the confirmation link. **Please check your inbox!**'
        }
      />
    </div>
  )
}

const SubscribeFormWrapper = styled.div({
  color: 'white',
  '& a': {color: 'white', textDecoration: 'underline'},
  maxWidth: '500px',
  padding: '40px',
  background: theme.colors.purple_dark,
  backgroundImage:
    'linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%), linear-gradient(32deg, rgba(255, 255, 255, 0.25) 33%, rgba(0, 0, 0, 0.25) 100%)',
  borderRadius: '5px',
})

const formCss = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  label {
    margin: 10px 0;
  }
  .field-error {
    display: block;
    color: rgba(255, 255, 255, 0.75);
    font-size: 80%;
  }
  input:not([type='checkbox']),
  label {
    width: 100%;
    font-size: 16px;
  }
  ${bpMaxSM} {
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    label,
    input {
      margin: 5px 0 0 0 !important;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  button {
    margin-top: 20px;
    font-size: 16px;
  }
`

const StyledFormikForm = styled(Form)`
  ${formCss}
`

function Subscribe({style}) {
  const {run, data, isLoading, error, isError, isSuccess} = useAsync()
  const [convertKitResponse] = data ?? []

  function handleSubmit(values) {
    run(
      Promise.all([
        client('https://app.convertkit.com/forms/1547100/subscriptions', {
          data: values,
        }),
        client(`${process.env.NETLIFY_FUNCTIONS_URL}/discord`, {data: values}),
      ]),
    )
  }

  const errorMessage = isError ? (
    <div css={{marginTop: 10}}>
      <div>
        Something went wrong! Try again, or hit me up on Twitter @kentcdodds
      </div>
      <div css={{fontFamily: 'monospace', fontWeight: 'bold', marginTop: 5}}>
        {error.message}
      </div>
    </div>
  ) : null

  return (
    <SubscribeFormWrapper style={style}>
      {isSuccess ? null : (
        <h3
          css={css`
            margin-bottom: ${rhythm(1)};
            margin-top: 0;
            color: white;
          `}
        >
          Join the KCD Discord Community
        </h3>
      )}

      {isSuccess ? null : (
        <Formik
          initialValues={{
            email_address: '',
            first_name: '',
            acceptedCoC: false,
          }}
          validationSchema={SubscribeSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <StyledFormikForm>
              <label htmlFor="first_name">
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                  `}
                >
                  First Name
                  <ErrorMessage
                    name="first_name"
                    component="span"
                    className="field-error"
                  />
                </div>
              </label>
              <Field
                id="first_name"
                aria-required="false"
                name="first_name"
                placeholder="Jane"
                type="text"
              />
              <label htmlFor="email">
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                  `}
                >
                  Email
                  <ErrorMessage
                    name="email_address"
                    component="span"
                    className="field-error"
                  />
                </div>
              </label>
              <Field
                id="email"
                aria-required="true"
                name="email_address"
                placeholder="jane@acme.com"
                type="email"
              />
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  marginTop: 10,
                }}
              >
                <Field
                  id="acceptedCoC"
                  aria-required="true"
                  name="acceptedCoC"
                  type="checkbox"
                />
                <label htmlFor="acceptedCoC">
                  <div
                    css={css`
                      margin-left: 10px;
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-end;
                    `}
                  >
                    <span>
                      Will you follow the{' '}
                      <a href="/conduct">Code of Conduct?</a>
                    </span>
                    <ErrorMessage
                      name="acceptedCoC"
                      component="span"
                      className="field-error"
                    />
                  </div>
                </label>
              </div>
              <button data-element="submit" type="submit">
                {isLoading ? 'Submitting...' : 'Subscribe'}
              </button>
            </StyledFormikForm>
          )}
        </Formik>
      )}
      {isSuccess ? (
        <PostSubmissionMessage convertKitResponse={convertKitResponse} />
      ) : null}
      {isError ? <div>{errorMessage}</div> : null}
    </SubscribeFormWrapper>
  )
}

export default Subscribe
