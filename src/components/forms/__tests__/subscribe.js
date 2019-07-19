import React from 'react'
import {render} from '@testing-library/react'
import Subscribe from '../subscribe'

test('subscribe renders first name and email', () => {
  const {getByLabelText} = render(<Subscribe />)

  expect(getByLabelText(/first name/i)).toBeDefined()
  expect(getByLabelText(/email/i)).toBeDefined()
})
