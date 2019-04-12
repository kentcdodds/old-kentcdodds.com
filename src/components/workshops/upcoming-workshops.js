import React from 'react'
import ScheduledWorkshop from './scheduled-workshop'
import get from 'lodash/get'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import axios from 'axios'
import {css} from '@emotion/core'
import {useStaticQuery, graphql} from 'gatsby'

const workshopQuery = graphql`
  query {
    data: allMdx(filter: {fields: {isWorkshop: {eq: true}}}) {
      edges {
        node {
          frontmatter {
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
  const {workshops, loading, error, events} = action
  switch (action.type) {
    case 'loading':
      return {...state, loading}
    case 'response':
      return {...state, events, workshops}
    case 'error':
      return {...state, error}
    default:
      throw new Error()
  }
}

const UpcomingWorkshops = () => {
  const {data} = useStaticQuery(workshopQuery)
  const workshops = reduce(
    data.edges,
    (acc, edge) => {
      const {node} = edge
      return [
        ...acc,
        {
          title: node.frontmatter.title,
          slug: node.fields.slug,
        },
      ]
    },
    [],
  )

  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    response: null,
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
          workshops,
        })
      } catch (error) {
        dispatch({type: 'loading', loading: false})
        dispatch({type: 'error', error})
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {state.loading ? 'loading....' : ''}
      {state.error ? 'ERROR' : ''}
      {state.events && (
        <div
          css={css`
            margin-top: -30px;
            position: relative;
            z-index: 5;
          `}
        >
          {state.events.map(event => {
            const workshop = find(workshops, ws => {
              return ws.title.toLowerCase() === event.title.toLowerCase()
            })
            return (
              <ScheduledWorkshop
                description={workshop.description}
                title={event.title}
                imageUrl={event.logo.url}
                date={event.date}
                spotsRemaining={event.remaining}
                bookUrl={event.url}
                url={workshop.slug}
                soldOut={event.remaining === 0}
                key={event.slug}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default UpcomingWorkshops
