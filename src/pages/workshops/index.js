import React from 'react'
import glamorous from 'glamorous'
import Presentation from '../../components/presentation'
import workshops from './workshop-data'

export default Workshops

function Workshops() {
  return (
    <glamorous.Div textAlign="center">
      <glamorous.H1 fontSize={50} marginBottom={20}>
        Workshops
      </glamorous.H1>
      <em>
        Search with <glamorous.Pre display="inline">⌘/ctrl + f</glamorous.Pre>
      </em>
      <glamorous.Div
        maxWidth={600}
        margin="auto"
        textAlign="left"
        fontSize={18}
      >
        {workshops.map((t, i) => (
          <Presentation key={i} {...t} />
        ))}
      </glamorous.Div>
    </glamorous.Div>
  )
}
