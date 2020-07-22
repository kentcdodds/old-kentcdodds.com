// eslint-disable-next-line require-await
async function client(
  url,
  {data, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Accept: 'application/json',
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(url, config).then(async response => {
    const responseData = await response.json()
    if (response.ok) {
      return responseData
    } else {
      return Promise.reject(responseData)
    }
  })
}

export {client}
