const path = require('path')
const slugify = require('@sindresorhus/slugify')
const {createFilePath} = require('gatsby-source-filesystem')
const _ = require('lodash')

const PAGINATION_OFFSET = 7

const createPosts = (createPage, createRedirect, edges) => {
  edges.forEach(({node}, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    if (node.fields.redirects) {
      node.fields.redirects.forEach(fromPath => {
        createRedirect({
          fromPath,
          toPath: pagePath,
          redirectInBrowser: true,
          isPermanent: true,
        })
      })
    }

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

function createBlogPages({
  blogPath,
  filterRegex,
  paginationTemplate,
  actions,
  graphql,
}) {
  graphql(`
    query {
      allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "${filterRegex}"}
        }
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            fileAbsolutePath
            id
            parent {
              ... on File {
                name
                sourceInstanceName
              }
            }
            excerpt(pruneLength: 250)
            fields {
              title
              slug
              description
              date
            }
            code {
              scope
            }
          }
        }
      }
    }
  `).then(({data, errors}) => {
    if (errors) {
      return Promise.reject(errors)
    }

    if (_.isEmpty(data.allMdx)) {
      return Promise.reject('There are no posts!')
    }

    const {edges} = data.allMdx
    const {createRedirect, createPage} = actions
    createPosts(createPage, createRedirect, edges)
    createPaginatedPages(
      actions.createPage,
      edges,
      blogPath,
      paginationTemplate,
      {
        categories: [],
      },
    )
    return null
  })
}

exports.createPages = ({actions, graphql}) => {
  createBlogPages({
    blogPath: '/blog',
    filterRegex: '//content/blog//',
    paginationTemplate: path.resolve(`src/templates/blog.js`),
    actions,
    graphql,
  })
  createBlogPages({
    blogPath: '/writing/blog',
    filterRegex: '//content/writing-blog//',
    paginationTemplate: path.resolve(`src/templates/writing-blog.js`),
    actions,
    graphql,
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  })
}

function createPaginatedPages(
  createPage,
  edges,
  pathPrefix,
  paginationTemplate,
  context,
) {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    acc[pageIndex].push(value.node.id)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`
    const nextPagePath = index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: paginationTemplate,
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    })
  })
}

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    let slug =
      node.frontmatter.slug ||
      createFilePath({node, getNode, basePath: `pages`})
    let isWriting = false

    if (node.fileAbsolutePath.includes('content/blog/')) {
      slug = `/blog/${node.frontmatter.slug || slugify(parent.name)}`
    } else if (node.fileAbsolutePath.includes('content/writing-blog/')) {
      isWriting = true
      slug = `/writing/blog/${node.frontmatter.slug || slugify(parent.name)}`
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'author',
      node,
      value: node.frontmatter.author || 'Kent C. Dodds',
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'bannerCredit',
      node,
      value: node.frontmatter.bannerCredit,
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'redirects',
      node,
      value: node.frontmatter.redirects,
    })

    createNodeField({
      name: 'noFooter',
      node,
      value: isWriting ? false : node.frontmatter.noFooter || false,
    })

    createNodeField({
      name: 'isWriting',
      node,
      value: isWriting,
    })
  }
}
