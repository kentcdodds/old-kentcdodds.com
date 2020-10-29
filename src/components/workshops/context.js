import * as React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import intersection from 'lodash/intersection'
import emojiStrip from 'emoji-strip'
import {useAsync} from 'lib/use-async'

const normalize = s => emojiStrip(s.toLowerCase()).trim()

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

const WorkshopEvents = React.createContext()

function WorkshopEventsProvider(props) {
  const {run, data, error, isLoading} = useAsync()
  React.useEffect(() => {
    run(
      window
        .fetch(`${process.env.NETLIFY_FUNCTIONS_URL}/tickets`, {
          headers: {Accept: 'application/json'},
        })
        .then(r => r.json()),
    )
  }, [run])
  const value = React.useMemo(() => ({data, error, isLoading}), [
    data,
    error,
    isLoading,
  ])
  return <WorkshopEvents.Provider value={value} {...props} />
}

function useStaticWorkshops() {
  const {data} = useStaticQuery(workshopQuery)
  const workshops = data.edges.reduce((acc, edge) => {
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
  }, [])
  return workshops
}

function useWorkshopEvents({keywords: keywordsFilter} = {}) {
  const context = React.useContext(WorkshopEvents)
  const workshops = useStaticWorkshops()
  if (!context) {
    throw new Error(
      'useWorkshopEvents must be used within a WorkshopEventsProvider',
    )
  }
  const {data} = context
  const events = get(data, 'events', []).map(event => {
    const workshop =
      workshops.find(w => normalize(w.title) === normalize(event.title)) || {}
    return {
      ...workshop,
      ...event,
      workshop,
      // by adding the title as keywords it helps us capture workshops
      // which don't have associated events, but *do* have words like "testing"
      // or "react" in them.
      keywords: normalize(event.title)
        .split(' ')
        .concat(event.keywords)
        .filter(Boolean),
      workshopSlug: workshop.slug,
    }
  })
  const eventsByKeywords = isEmpty(keywordsFilter)
    ? []
    : events.filter(
        event => !isEmpty(intersection(event.keywords, keywordsFilter)),
      )
  return {
    ...context,
    events,
    eventsByKeywords,
  }
}

export {WorkshopEventsProvider, useWorkshopEvents}
