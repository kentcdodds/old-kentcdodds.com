import React from 'react'
import user from '@testing-library/user-event'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import {UsernameForm} from '../components'

jest.mock('../api')

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

test('calls updateUsername with the new username (with act warning)', () => {
  const handleUpdateUsername = jest.fn()
  const fakeUsername = 'sonicthehedgehog'
  render(<UsernameForm updateUsername={handleUpdateUsername} />)
  const usernameInput = screen.getByLabelText(/username/i)
  user.type(usernameInput, fakeUsername)
  user.click(screen.getByText(/submit/i))
  expect(handleUpdateUsername).toHaveBeenCalledWith(fakeUsername)
})

test('calls updateUsername with the new username', async () => {
  const handleUpdateUsername = jest.fn()
  const fakeUsername = 'sonicthehedgehog'
  render(<UsernameForm updateUsername={handleUpdateUsername} />)
  const usernameInput = screen.getByLabelText(/username/i)
  user.type(usernameInput, fakeUsername)
  user.click(screen.getByText(/submit/i))
  expect(handleUpdateUsername).toHaveBeenCalledWith(fakeUsername)
  await waitForElementToBeRemoved(() => screen.getByText(/saving/i))
})

/*
eslint
  no-console: "off"
*/
