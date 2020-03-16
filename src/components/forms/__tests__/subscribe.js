import React from 'react'
import {render, screen} from '@testing-library/react'
import Subscribe from '../subscribe'

test('subscribe renders first name and email', () => {
  render(<Subscribe />)

  expect(screen.getByLabelText(/first name/i)).toBeDefined()
  expect(screen.getByLabelText(/email/i)).toBeDefined()
})
