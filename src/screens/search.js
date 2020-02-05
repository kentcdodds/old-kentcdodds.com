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

function BlogPostCard({siteUrl, blogpost}) {
  const {slug, title, description, keywords, banner} = blogpost
  const defaultCopyText = 'Copy URL'
  const [copyText, setCopyText] = React.useState(defaultCopyText)

  React.useEffect(() => {
    let current = true
    if (copyText !== defaultCopyText) {
      setTimeout(() => {
        if (current) {
          setCopyText(defaultCopyText)
        }
      }, 3000)
    }
    return () => (current = false)
  }, [copyText])

  function copy(event) {
    event.preventDefault()
    navigator.clipboard.writeText(`${siteUrl}${slug}`).then(
      () => {
        setCopyText('Copied')
      },
      () => {
        setCopyText('Error copying text')
      },
    )
  }
  return (
    <div
      css={{
        margin: 20,
        width: 320,
        background: theme.colors.white,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
        padding: 30,
        position: 'relative',
        paddingBottom: 60,
      }}
    >
      <Link to={slug} css={{color: 'initial'}}>
        <h2 css={{marginTop: 0}}>{title}</h2>
        <div css={{width: '100%'}}>
          <button
            css={{
              display: 'block',
              width: '100%',
              position: 'absolute',
              bottom: '0',
              left: '0',
              borderTopRightRadius: '0',
              borderTopLeftRadius: '0',
            }}
            onClick={copy}
          >
            {copyText}
          </button>
        </div>
        <Img fluid={banner.childImageSharp.fluid} alt={keywords.join(', ')} />
        <div css={{margin: '16px 0 0 0'}}>{description}</div>
      </Link>
    </div>
  )
}
BlogPostCard = React.memo(BlogPostCard)

function useQueryParamState(searchParamName) {
  const [value, setValue] = React.useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }
    const searchParams = new URL(window.location).searchParams
    if (searchParams.has(searchParamName)) {
      return searchParams.get(searchParamName)
    } else {
      return ''
    }
  })

  React.useEffect(() => {
    const newUrl = new URL(window.location)
    newUrl.searchParams.set(searchParamName, value)
    if (value) {
      window.history.replaceState(window.history.state, '', newUrl)
    } else {
      newUrl.searchParams.delete(searchParamName)
      window.history.replaceState(window.history.state, '', newUrl)
    }
  }, [searchParamName, value])

  return [value, setValue]
}

function SearchScreen() {
  const result = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
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

  const [search, setSearch] = useQueryParamState('q')
  const [filteredBlogPosts, setFilteredBlogPosts] = React.useState(
    // if there's a search, let's wait for it to load
    // otherwise let's initialize to the blogposts
    search ? [] : blogposts,
  )
  React.useEffect(() => {
    if (!search) {
      setFilteredBlogPosts(blogposts)
    }
    getMatchSorterWorker()
      .searchAndSort(blogposts, search, {
        keys: [
          'title',
          {
            key: 'categories',
            threshold: matchSorterRankings.CONTAINS,
            maxRanking: matchSorterRankings.CONTAINS,
          },
          {
            key: 'keywords',
            threshold: matchSorterRankings.CONTAINS,
            maxRanking: matchSorterRankings.CONTAINS,
          },
          {
            key: 'description',
            threshold: matchSorterRankings.CONTAINS,
            maxRanking: matchSorterRankings.CONTAINS,
          },
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
      <div css={{position: 'relative'}}>
        <label
          htmlFor="search-input"
          css={{margin: '0 10px 0 0', display: 'block'}}
        >
          Search Blogposts
        </label>
        <input
          id="search-input"
          css={{width: '100%', paddingRight: 50}}
          onChange={event => setSearch(event.target.value)}
          type="search"
          value={search}
          autoFocus
        />
        <div
          css={{
            position: 'absolute',
            right: 14,
            top: 35,
            opacity: 0.6,
            fontSize: '0.8rem',
          }}
        >
          {filteredBlogPosts.length}
        </div>
      </div>
      <small css={{marginTop: 10}}>
        {`If you can't find what you're looking for with this, try `}
        <a href="https://www.google.com/search?q=site%3Akentcdodds.com%2Fblog+testing">
          using Google
        </a>
        {'.'}
      </small>
      <div
        css={{
          marginTop: 20,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {filteredBlogPosts.map(blogpost => (
          <BlogPostCard
            key={blogpost.id}
            blogpost={blogpost}
            siteUrl={result.site.siteMetadata.siteUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchScreen

/*
eslint
  no-func-assign: "off"
*/
