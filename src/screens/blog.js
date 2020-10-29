import * as React from 'react'
import Search from 'components/search'
import {useStaticQuery, graphql} from 'gatsby'

function BlogScreen() {
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
                productionUrl
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
  return <Search blogposts={result.blogposts} />
}

export default BlogScreen
