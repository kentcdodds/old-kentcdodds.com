import React from 'react'
import reduce from 'lodash/reduce'
import axios from 'axios'
import {useStaticQuery, graphql} from 'gatsby'
import get from 'lodash/get'

const workshopQuery = graphql`
  query {
    data: allMdx(filter: {fields: {isWorkshop: {eq: true}}}) {
      edges {
        node {
          frontmatter {
            tech
            title
            description
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
  switch (action.type) {
    case 'loading':
      return {...state, loading}
    case 'response':
      return {...state, events}
    case 'error':
      return {...state, error}
    default:
      throw new Error()
  }
}

const useGetWorkshops = () => {
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
        },
      ]
    },
    [],
  )

  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    events: [],
    workshops,
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
