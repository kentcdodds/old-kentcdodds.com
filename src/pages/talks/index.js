import {style} from 'glamor'
import Presentation from '../../components/presentation'
import talks from './talk-data'

const styles = {
  talksRoot: style({textAlign: 'center'}),
  talksHeading: style({fontSize: 50, marginBottom: 20}),
  searchPre: style({display: 'inline'}),
  talksContainer: style({
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'left',
    fontSize: 18,
  }),
}

export default Talks

function Talks() {
  return (
    <div {...styles.talksRoot}>
      <h1 {...styles.talksHeading}>
        Talks
      </h1>
      <em>Search with <pre {...styles.searchPre}>⌘/ctrl + f</pre></em>
      <div {...styles.talksContainer}>
        {talks.map((t, i) => (<Presentation key={i} {...t} />))}
      </div>
    </div>
  )
}

