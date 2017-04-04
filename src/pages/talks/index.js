import glamorous from 'glamorous'
import Presentation from '../../components/presentation'
import talks from './talk-data'

export default Talks

function Talks() {
  return (
    <glamorous.Div textAlign="center">
      <glamorous.H1 fontSize={50} marginBottom={20}>
        Talks
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
        {talks.map((t, i) => <Presentation key={i} {...t} />)}
      </glamorous.Div>
    </glamorous.Div>
  )
}
