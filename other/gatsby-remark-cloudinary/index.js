// gatsby remark cloudinary thing
const visit = require('unist-util-visit')

// yes, I did write this myself 😬
const cloudinaryUrlRegex = /^https?:\/\/res\.cloudinary\.com\/(?<cloudName>.+?)\/image\/upload(\/(?<transforms>(?!v\d+).+?))?(\/(?<version>v\d+))?\/(?<publicId>.+$)/

function affiliateLinkTransformer({markdownAST}) {
  visit(markdownAST, 'image', function visitor(node) {
    const urlString = String(node.url)
    const match = urlString.match(cloudinaryUrlRegex) || {}
    const groups = match.groups
    if (groups) {
      const {cloudName, transforms, version, publicId} = groups
      // don't add transforms if they're already included
      if (transforms) return
      const defaultTransforms = 'f_auto,q_auto,dpr_2.0'
      node.url = [
        `https://res.cloudinary.com/${cloudName}/image/upload`,
        defaultTransforms,
        version,
        publicId,
      ]
        .filter(Boolean)
        .join('/')
    }
  })
}

module.exports = affiliateLinkTransformer
