// gatsby remark affiliate link maker
const {URL} = require('url')
const visit = require('unist-util-visit')

function affiliateLinkTransformer({markdownAST}) {
  visit(markdownAST, 'link', linkNode => {
    if (linkNode.url.includes('amazon.com')) {
      const amazonUrl = new URL(linkNode.url)
      if (!amazonUrl.searchParams.has('tag')) {
        amazonUrl.searchParams.set('tag', 'kentcdodds-20')
        linkNode.url = amazonUrl.toString()
      }
    }
    if (linkNode.url.includes('egghead.io')) {
      const eggheadUrl = new URL(linkNode.url)
      if (!eggheadUrl.searchParams.has('af')) {
        eggheadUrl.searchParams.set('af', '5236ad')
        linkNode.url = eggheadUrl.toString()
      }
    }
  })
}

module.exports = affiliateLinkTransformer
