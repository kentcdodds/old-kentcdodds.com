import {PropTypes} from 'react'
import slugify from 'slugify'
import {intersperse} from '../../utils'
import talks from './talk-data'

export default Talks

function Talks() {
  return (
    <div style={{textAlign: 'center'}}>
      <h1
        style={{fontSize: 50, marginBottom: 20}}
      >
        Talks
      </h1>
      <em>Search with <pre style={{display: 'inline'}}>⌘/ctrl + f</pre></em>
      <div style={{maxWidth: 600, margin: 'auto', textAlign: 'left', fontSize: 18}}>
        {talks.map((t, i) => (<Talk key={i} talk={t} />))}
      </div>
    </div>
  )
}

function Talk({talk}) {
  const {title, abstract, resources, presentations = []} = talk
  const resourceEls = resources.map((r, i) => <span key={i} {...innerHTML(r)} />)
  const presentationEls = presentations.map(({event, recording, date}, i) => (
    <li key={i}>
      <span {...innerHTML(event)} />
      {recording ? ' - ' : null}
      {recording ? <a href={recording}>video</a> : null}
      <span style={{paddingLeft: 10, fontSize: '0.7em'}}>
        {date.format('YYYY-MM-DD')}
      </span>
    </li>
  ))
  const anchor = slugify(title.toLowerCase())
  return (
    <div style={{marginBottom: 60}}>
      <a href={`#${anchor}`} name={anchor}>
        <h2
          {...innerHTML(title)}
          style={{marginBottom: 10}}
        />
      </a>
      <div style={{marginBottom: 8, fontSize: '0.9em'}}>
        <div>
          {intersperse(resourceEls, ' | ')}
        </div>
        <div>
          Presentations:
          <ul style={{listStyle: 'none', paddingLeft: 16, margin: 0}}>
            {presentationEls}
          </ul>
        </div>
      </div>
      {abstract ? (
        <div>
          <h3 style={{marginBottom: 2}}>Abstract</h3>
          <div {...innerHTML(abstract)} style={{marginTop: -12}} />
        </div>
      ) : null}
    </div>
  )
}

Talk.propTypes = {
  talk: PropTypes.shape({
    title: PropTypes.string.isRequired,
    abstract: PropTypes.string,
    resources: PropTypes.arrayOf(PropTypes.string).isRequired,
    presentations: PropTypes.arrayOf(PropTypes.shape({
      event: PropTypes.string.isRequired,
      recording: PropTypes.string,
      date: PropTypes.object.isRequired,
    })),
  }),
}

function innerHTML(string) {
  return {dangerouslySetInnerHTML: {__html: string}}
}
