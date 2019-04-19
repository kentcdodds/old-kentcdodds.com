import React from 'react'
import reduce from 'lodash/reduce'
import axios from 'axios'
import {useStaticQuery, graphql} from 'gatsby'
import get from 'lodash/get'
import some from 'lodash/some'
import filter from 'lodash/filter'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import intersection from 'lodash/intersection'

const workshopQuery = graphql`
  query {
    data: allMdx(filter: {fields: {isWorkshop: {eq: true}}}) {
      edges {
        node {
          frontmatter {
            tech
            title
            description
            keywords
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`

function reducer(state, action) {
  const {loading, error, events} = action
  const {byKeywords, workshops} = state
  const activeWorkshops = filter(workshops, workshop => {
    return some(
      events,
      event => workshop.title.toLowerCase() === event.title.toLowerCase(),
    )
  })
  switch (action.type) {
    case 'loading':
      return {...state, loading}
    case 'response':
      return {
        ...state,
        events: filter(
          events.map(event => {
            const {keywords, slug} = find(activeWorkshops, workshop => {
              return workshop.title.toLowerCase() === event.title.toLowerCase()
            })
            return {
              ...event,
              keywords,
              workshop_slug: slug,
            }
          }),
          event =>
            isEmpty(byKeywords)
              ? true
              : !isEmpty(intersection(event.keywords, byKeywords)),
        ),
        workshops: activeWorkshops,
      }
    case 'error':
      return {...state, error}
    default:
      throw new Error()
  }
}

const useGetWorkshops = (byKeywords = []) => {
  const {data} = useStaticQuery(workshopQuery)

  const workshops = reduce(
    data.edges,
    (acc, edge) => {
      const {node} = edge
      return [
        ...acc,
        {
          tech: node.frontmatter.tech,
          title: node.frontmatter.title,
          slug: node.fields.slug,
          keywords: node.frontmatter.keywords,
        },
      ]
    },
    [],
  )

  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    events: [],
    workshops,
    byKeywords,
  })

  React.useEffect(() => {
    dispatch({type: 'loading', loading: true})

    const fetchData = async () => {
      try {
        const result = await axios(
          `${process.env.NETLIFY_FUNCTIONS_URL}/tickets`,
        )
        dispatch({type: 'loading', loading: false})
        dispatch({
          type: 'response',
          events: get(result, 'data.events', []),
        })
      } catch (error) {
        dispatch({type: 'loading', loading: false})
        dispatch({type: 'error', error})
      }
    }

    fetchData()
  }, [])

  return state
}

export default useGetWorkshops
