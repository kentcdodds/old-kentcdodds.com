import React from 'react'
import Img from 'gatsby-image'
import {useStaticQuery, graphql, Link} from 'gatsby'
import {rankings as matchSorterRankings} from 'match-sorter'
import MatchSorterWorker from './match-sorter.worker'
import theme from '../../config/theme'

let matchSorterWorker

function getMatchSorterWorker() {
  if (!matchSorterWorker) {
    matchSorterWorker = new MatchSorterWorker()
  }
  return matchSorterWorker
}

function BlogPostCard({blogpost}) {
  const {slug, title, description, keywords, banner} = blogpost
  return (
    <Link to={slug} css={{color: 'initial', margin: 20, width: 320}}>
      <div
        css={{
          background: theme.colors.white,
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          borderRadius: 5,
          padding: '30px',
        }}
      >
        <h2 css={{marginTop: 0}}>{title}</h2>
        <Img fluid={banner.childImageSharp.fluid} alt={keywords.join(', ')} />
        <div css={{margin: '16px 0 0 0'}}>{description}</div>
      </div>
    </Link>
  )
}

function SearchScreen() {
  const result = useStaticQuery(
    graphql`
      query {
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
                title
                categories
                keywords
                description: plainTextDescription
                banner {
                  ...bannerImage260
                }
              }
              excerpt(pruneLength: 190)
            }
          }
        }
      }
    `,
  )

  // this will be the same every time and because this re-renders on every
  // keystroke I'm pretty sure useMemo is appropriate here.
  const blogposts = React.useMemo(() => {
    return result.blogposts.edges.map(e => ({
      ...e.node.fields,
      excerpt: e.node.excerpt,
    }))
  }, [result.blogposts.edges])

  const [search, setSearch] = React.useState('')
  const [filteredBlogPosts, setFilteredBlogPosts] = React.useState(blogposts)
  React.useEffect(() => {
    if (!search) {
      setFilteredBlogPosts(blogposts)
    }
    getMatchSorterWorker()
      .searchAndSort(blogposts, search, {
        keys: [
          'title',
          {key: 'categories', threshold: matchSorterRankings.CONTAINS},
          {key: 'keywords', threshold: matchSorterRankings.CONTAINS},
          {key: 'description', threshold: matchSorterRankings.CONTAINS},
          {key: 'excerpt', threshold: matchSorterRankings.CONTAINS},
        ],
      })
      .then(
        results => setFilteredBlogPosts(results),
        error => {
          // eslint-disable-next-line no-console
          console.error(error)
        },
      )
  }, [blogposts, search])

  return (
    <div>
      <div>
        <h1>Search Kent C. Dodds Blogposts</h1>
      </div>
      <small>
        {`If you can't find what you're looking for with this, try `}
        <a href="https://www.google.com/search?q=site%3Akentcdodds.com%2Fblog+testing">
          using Google
        </a>
        {'.'}
      </small>
      <div css={{marginTop: 50}}>
        <label
          htmlFor="search-input"
          css={{margin: '0 10px 0 0', display: 'block'}}
        >
          Search Blogposts
        </label>
        <input
          id="search-input"
          css={{width: '100%'}}
          onChange={event => setSearch(event.target.value)}
          type="search"
          autoFocus
        />
      </div>
      <div
        css={{
          marginTop: 20,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {filteredBlogPosts.map(blogpost => (
          <BlogPostCard key={blogpost.id} blogpost={blogpost} />
        ))}
      </div>
    </div>
  )
}

export default SearchScreen
