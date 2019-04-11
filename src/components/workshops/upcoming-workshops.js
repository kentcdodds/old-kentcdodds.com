import React from 'react'
import ScheduledWorkshop from './scheduled-workshop'
import get from 'lodash/get'
import axios from 'axios'
import {css} from '@emotion/core'

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {...state, loading: action.loading}
    case 'response':
      return {...state, events: action.events}
    case 'error':
      return {...state, error: action.error}
    default:
      throw new Error()
  }
}

const UpcomingWorkshops = () => {
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
        dispatch({type: 'response', events: get(result, 'data.events', [])})
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
          {state.events.map(event => (
            <ScheduledWorkshop
              title={event.title}
              imageUrl={event.logo.url}
              date={event.date}
              spotsRemaining={event.remaining}
              bookUrl={event.url}
              url={event.url}
              soldOut={event.remaining === 0}
              key={event.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default UpcomingWorkshops
