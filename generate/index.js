const pages = [
  './home',
  './404',
  './links',
  './talks',
  './blog',
]
pages.forEach(page => {
  require(page) // eslint-disable-line global-require
})
