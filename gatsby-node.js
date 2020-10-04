const fs = require('fs')
const path = require('path')
const {URL} = require('url')
const rimraf = require('rimraf')
const {spawnSync, spawn} = require('child_process')
const slugify = require('@sindresorhus/slugify')
const {createFilePath} = require('gatsby-source-filesystem')
const remark = require('remark')
const stripMarkdownPlugin = require('strip-markdown')
const {zipFunctions} = require('@netlify/zip-it-and-ship-it')
const config = require('./config/website')
const blogUtils = require('./other/blog-utils')

const twoDigits = n => (n.toString().length < 2 ? `0${n}` : n)

const createWorkshops = (createPage, edges) => {
  edges.forEach(({node}, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/workshop-page.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

function createWorkshopPages({data, actions}) {
  if (!data.edges.length) {
    throw new Error('There are no workshops!')
  }

  const {edges} = data
  const {createPage} = actions
  createWorkshops(createPage, edges)

  return null
}

function stripMarkdown(markdownString) {
  return remark()
    .use(stripMarkdownPlugin)
    .processSync(markdownString)
    .toString()
}

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

function createBlogPages({data, actions}) {
  if (!data.edges.length) {
    throw new Error('There are no posts!')
  }

  const {edges} = data
  const {createRedirect, createPage} = actions
  createPosts(createPage, createRedirect, edges)
  return null
}

const createEpisodes = (createPage, edges) => {
  edges.forEach(({node}) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/podcast-episode.js`),
      context: {
        slug: node.fields.slug,
        simpleCastId: node.frontmatter.simpleCastId,
        title: node.fields.title,
        season: node.frontmatter.season,
      },
    })
  })
}

function createPodcastPages({data, actions}) {
  if (!data.edges.length) {
    throw new Error('There are no podcast episodes!')
  }
  const {edges} = data
  const {createPage} = actions

  createEpisodes(createPage, edges)
  return null
}

const createPages = async ({actions, graphql}) => {
  const {data, errors} = await graphql(`
    fragment PostDetails on Mdx {
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
        redirects
      }
    }
    query {
      podcast: allMdx(
        filter: {fileAbsolutePath: {regex: "//content/podcast//"}}
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              simpleCastId
              season
            }
            fields {
              title
              slug
            }
          }
        }
      }
      blog: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "//content/blog//"}
        }
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
      writing: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "//content/writing-blog//"}
        }
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
      workshops: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "//content/workshops//"}
        }
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
    }
  `)

  if (errors) {
    return Promise.reject(errors)
  }

  const {blog, writing, workshops, podcast} = data

  createPodcastPages({
    podcastPath: '',
    data: podcast,
    actions,
  })

  createBlogPages({
    blogPath: '/blog',
    data: blog,
    actions,
  })
  createBlogPages({
    blogPath: '/writing/blog',
    data: writing,
    actions,
  })
  createWorkshopPages({
    data: workshops,
    actions,
  })
}

const onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

const onCreateNode = (...args) => {
  if (args[0].node.internal.type === `Mdx`) {
    onCreateMdxNode(...args)
  }
}

// eslint-disable-next-line complexity
function onCreateMdxNode({node, getNode, actions}) {
  const parentNode = getNode(node.parent)
  const {createNodeField} = actions
  let slug =
    node.frontmatter.slug || createFilePath({node, getNode, basePath: `pages`})
  let {isWriting, isWorkshop, isScheduled, isPodcast} = false

  if (node.fileAbsolutePath.includes('content/blog/')) {
    slug = `/blog/${node.frontmatter.slug || slugify(parentNode.name)}`
  }

  if (node.fileAbsolutePath.includes('content/podcast/')) {
    slug = `chats-with-kent-podcast/seasons/${twoDigits(
      node.frontmatter.season,
    )}/episodes/${node.frontmatter.slug}`
    isPodcast = true
  }

  if (node.fileAbsolutePath.includes('content/workshops/')) {
    isWriting = false
    isWorkshop = true
    isScheduled = false
    if (node.frontmatter.date) {
      isWriting = false
      isScheduled = true
    }
    slug = `/workshops/${
      node.frontmatter.slug || slugify(node.frontmatter.title)
    }`
  }

  if (node.fileAbsolutePath.includes('content/writing-blog/')) {
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
    name: 'plainTextDescription',
    node,
    value: stripMarkdown(node.frontmatter.description),
  })

  createNodeField({
    name: 'slug',
    node,
    value: slug,
  })

  const productionUrl = new URL(config.siteUrl)
  productionUrl.pathname = slug

  createNodeField({
    name: 'productionUrl',
    node,
    value: productionUrl.toString(),
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
    name: 'editLink',
    node,
    value: `https://github.com/kentcdodds/kentcdodds.com/edit/master${node.fileAbsolutePath.replace(
      __dirname,
      '',
    )}`,
  })

  createNodeField({
    name: 'historyLink',
    node,
    value: `https://github.com/kentcdodds/kentcdodds.com/commits/master${node.fileAbsolutePath.replace(
      __dirname,
      '',
    )}`,
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

  createNodeField({
    name: 'isWorkshop',
    node,
    value: isWorkshop,
  })

  createNodeField({
    name: 'isScheduled',
    node,
    value: isScheduled,
  })

  createNodeField({
    name: 'isPodcast',
    node,
    value: isPodcast,
  })
}

const onPreBootstrap = () => {
  if (process.env.gatsby_executing_command === 'develop') {
    return
  }
  require('./other/load-cache')
  // can't run cypress on gatsby cloud currently
  if (!process.env.SKIP_BUILD_VALIDATION && !process.env.GATSBY_CLOUD) {
    // fire and forget...
    spawn('./node_modules/.bin/cypress install', {
      shell: true,
      stdio: 'ignore',
    })
  }

  const result = spawnSync(
    './node_modules/.bin/npm-run-all --parallel lint test:coverage',
    {stdio: 'inherit', shell: true},
  )
  if (result.status !== 0) {
    throw new Error(`pre build failure. Status: ${result.status}`)
  }
}

const onPostBuild = async ({graphql}) => {
  if (process.env.gatsby_executing_command === 'develop') {
    return
  }
  require('./other/make-cache')
  blogUtils.createJSONFile(graphql, './public/blog.json')
  const srcLocation = path.join(__dirname, `netlify/functions`)
  const outputLocation = path.join(__dirname, `public/functions`)
  if (fs.existsSync(outputLocation)) {
    rimraf.sync(outputLocation)
  }
  fs.mkdirSync(outputLocation)
  await zipFunctions(srcLocation, outputLocation)
  // can't run cypress on gatsby cloud currently
  if (!process.env.SKIP_BUILD_VALIDATION && !process.env.GATSBY_CLOUD) {
    const result = spawnSync('npm run test:e2e', {
      stdio: 'inherit',
      shell: true,
    })
    if (result.status !== 0) {
      throw new Error(`post build failure. Status: ${result.status}`)
    }
  }
}

module.exports = {
  createPages,
  onCreateWebpackConfig,
  onCreateNode,
  onPreBootstrap,
  onPostBuild,
}

/*
eslint
  consistent-return: "off",
  max-statements: "off",
*/
