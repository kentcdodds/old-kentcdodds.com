const visit = require(`unist-util-visit`)
const getYouTubeHTML = require('./get-youtube-html')
const getTwitterHTML = require('./get-twitter-html')

const transformers = [getYouTubeHTML, getTwitterHTML]

module.exports = async ({ markdownAST }) => {
  const transformations = []
  visit(markdownAST, 'text', node => {
    const { value } = node
    transformers.forEach(transformer => {
      if (transformer.shouldTransform(value)) {
        transformations.push(async () => {
          const html = await transformer(value)
          node.type = `html`
          node.value = html
        })
      }
    })
  })
  const promises = transformations.map(t => t())
  await Promise.all(promises)

  return markdownAST
}
