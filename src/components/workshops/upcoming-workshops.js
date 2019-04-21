import React from 'react'
import ScheduledWorkshop from './scheduled-workshop'
import get from 'lodash/get'
import find from 'lodash/find'

import {css} from '@emotion/core'
import useGetWorkshops from './use-get-workshops'

const UpcomingWorkshops = ({byKeywords, headline}) => {
  const state = useGetWorkshops(byKeywords)
  return (
    <div>
      {state.events.length ? (
        <div
          css={css`
            margin-top: -30px;
            position: relative;
            z-index: 5;
          `}
        >
          {headline && (
            <h1
              css={css`
                margin-bottom: 45px;
              `}
            >
              {headline}
            </h1>
          )}
          {state.events.map(event => {
            const workshop = find(state.workshops, ws => {
              return ws.title.toLowerCase() === event.title.toLowerCase()
            })
            const discount = get(event, 'discounts.early', false)
            return (
              <ScheduledWorkshop
                buttonText={discount ? 'Secure a Discount' : 'Secure Your Seat'}
                tech={workshop.tech}
                description={workshop.description}
                title={event.title}
                imageUrl={event.logo.url}
                date={event.date}
                spotsRemaining={event.remaining}
                bookUrl={discount ? discount.url : event.url}
                url={workshop.slug}
                soldOut={event.remaining === 0}
                key={event.slug}
                startTime={event.startTime}
                endTime={event.endTime}
                discount={discount}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default UpcomingWorkshops
