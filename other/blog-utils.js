const fs = require('fs')

async function createJSONFile(graphql, filePath) {
  const queryResult = await graphql(`
    {
      blogposts: allMdx(
        sort: {fields: frontmatter___date, order: DESC}
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "//content/blog//"}
        }
      ) {
        edges {
          node {
            fields {
              id
              slug
              productionUrl
              title
              categories
              keywords
              description: plainTextDescription
            }
          }
        }
      }
    }
  `)

  const posts = queryResult.data.blogposts.edges.map(edge => edge.node.fields)

  fs.writeFileSync(`${filePath}`, JSON.stringify(posts))
}

module.exports = {createJSONFile}
