const path = require('path')
const config = require('./config/website')
const {createProxyMiddleware} = require('http-proxy-middleware')

const eggheadTransformer = require('./other/embedder-transformers/egghead')

const here = (...p) => path.join(__dirname, ...p)

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = config.siteUrl,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
  siteMetadata: {
    siteUrl,
    title: config.siteTitle,
    twitterHandle: config.twitterHandle,
    description: config.siteDescription,
    keywords: [
      'Software Engineer',
      'React Training',
      'Testing JavaScript Training',
    ],
    canonicalUrl: siteUrl,
    image: config.siteLogo,
    author: {
      name: config.author,
      minibio: config.minibio,
    },
    organization: {
      name: config.organization,
      url: siteUrl,
      logo: config.siteLogo,
    },
    social: {
      twitter: config.twitterHandle,
      fbAppID: '',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/writing-blog`,
        name: 'writing-blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/workshops`,
        name: 'workshops',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/podcast`,
        name: 'podcast',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'src',
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: here('./src/templates/markdown-page.js'),
        },
        extensions: ['.mdx', '.md', '.markdown'],
        gatsbyRemarkPlugins: [
          {resolve: 'gatsby-remark-copy-linked-files'},
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#fafafa',
              maxWidth: 1035,
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [eggheadTransformer],
            },
          },
          {
            resolve: require.resolve('./other/gatsby-remark-af'),
          },
        ],
      },
    },
    {
      resolve: 'gatsby-remark-images',
      options: {
        backgroundColor: '#fafafa',
        maxWidth: 1035,
      },
    },
    'gatsby-plugin-workerize-loader',
    'gatsby-plugin-twitter',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: 'white',
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        lang: config.lang,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icons: [
          {
            src: '/favicons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          getBlogFeed({
            filePathRegex: `//content/blog//`,
            blogUrl: 'https://kentcdodds.com/blog',
            output: '/blog/rss.xml',
            title: 'Kent C. Dodds Blog RSS Feed',
          }),
          getBlogFeed({
            filePathRegex: `//content/writing-blog//`,
            blogUrl: 'https://kentcdodds.com/writing/blog',
            output: '/writing/blog/rss.xml',
            title: `Kent's Writing Blog RSS Feed`,
          }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/lib/typography`,
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{userAgent: '*'}],
          },
          'branch-deploy': {
            policy: [{userAgent: '*', disallow: ['/']}],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{userAgent: '*', disallow: ['/']}],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    'gatsby-plugin-sitemap',
  ],
}

function getBlogFeed({filePathRegex, blogUrl, ...overrides}) {
  /**
   * These RSS feeds can be quite expensive to generate. Limiting the number of
   * posts and keeping each item's template lightweight (only using frontmatter,
   * avoiding the html/excerpt fields) helps negate this.
   */
  return {
    serialize: ({query: {allMdx}}) => {
      const stripSlash = slug => (slug.startsWith('/') ? slug.slice(1) : slug)
      return allMdx.edges.map(edge => {
        const url = `${siteUrl}/${stripSlash(edge.node.fields.slug)}`

        return {
          ...edge.node.frontmatter,
          date: edge.node.fields.date,
          url,
          guid: url,
          custom_elements: [
            {
              'content:encoded': `<div style="width: 100%; margin: 0 auto; max-width: 800px; padding: 40px 40px;">
                  <p>
                    I've posted a new article <em>"${edge.node.frontmatter.title}"</em> and you can <a href="${url}">read it online</a>.
                    <br>
                    ${edge.node.fields.plainTextDescription}
                    <br>
                    You can also <a href="${siteUrl}/subscribe">subscribe</a> for weekly emails on what I'm learning, working on, and writing about.
                  </p>
                </div>`,
            },
          ],
        }
      })
    },
    query: `
       {
         allMdx(
           limit: 25,
           filter: {
             frontmatter: {published: {ne: false}}
             fileAbsolutePath: {regex: "${filePathRegex}"}
           }
           sort: { order: DESC, fields: [frontmatter___date] }
         ) {
           edges {
             node {
               fields {
                 slug
                 date
                 plainTextDescription
               }
               frontmatter {
                 title
               }
             }
           }
         }
       }
     `,
    ...overrides,
  }
}
