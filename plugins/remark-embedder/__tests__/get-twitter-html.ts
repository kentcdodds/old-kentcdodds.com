import cases from 'jest-in-case'
import fetchMock from 'node-fetch'
import getTwitterHtml, { shouldTransform } from '../get-twitter-html'

jest.mock('node-fetch', () =>
  jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        html: `
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw">December 28, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    `.trim(),
      }),
  }),
)

beforeEach(() => {
  ;((fetchMock as unknown) as jest.Mock).mockClear()
})

cases(
  'url validation',
  ({ url, valid }: { url: string; valid: boolean }) => {
    expect(shouldTransform(url)).toBe(valid)
  },
  {
    nothing: { url: 'nothing', valid: false },
    'not a url but with twitter in it': {
      url: 'not a twitter url',
      valid: false,
    },
    'url with twitter': { url: 'https://not-a-twitter-url.com', valid: false },
    'not a status': {
      url: 'https://twitter.com/mentions',
      valid: false,
    },
    'valid url': {
      url: 'https://twitter.com/foobar/status/123',
      valid: true,
    },
  },
)

test('calls twitter API for the url', async () => {
  const html = await getTwitterHtml(
    'https://twitter.com/kentcdodds/status/1078755736455278592',
  )
  expect(html).toMatchInlineSnapshot(
    `"<blockquote class=\\"twitter-tweet\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>"`,
  )
})
