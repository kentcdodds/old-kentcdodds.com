import {PropTypes} from 'react'
import slugify from 'slugify'
import {intersperse} from '../../utils'
import talks from './talk-data'

const availableColors = new Set([
  '#2E4347', '#C0D1C2', '#49281F', '#564334',
  '#5D4157', '#838689', '#413040', '#111625',
  '#341931', '#571B3C', '#805566', '#E35B5D',
  '#5CACC4', '#DE6262', '#64989D', '#410936',
  '#616668', '#A43955', '#5E3929', '#1B676B',
])
const colorMap = {}

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
  const {title, abstract, resources, presentations, tags} = talk
  const resourceEls = resources.map((r, i) => <span key={i} {...innerHTML(r)} />)
  const presentationEls = presentations.map(({event, recording, date, isFuture}, i) => (
    <li key={i}>
      <span {...innerHTML(event)} />
      {recording ? ' - ' : null}
      {recording ? <a href={recording}>video</a> : null}
      <span style={{paddingLeft: 10, fontSize: '0.7em'}}>
        {date.format('YYYY-MM-DD')} {isFuture ? 'upcoming' : null}
      </span>
    </li>
  ))
  const tagEls = tags.map((t, i) => {
    const isFirst = i === 0
    const isLast = i === tags.length - 1
    let color = colorMap[t]
    if (!color) {
      color = colorMap[t] = getRandomColor()
    }
    return (
      <span
        key={i}
        style={{
          backgroundColor: color,
          color: getTextColor(color),
          borderRadius: 2,
          padding: '2px 6px',
          marginLeft: isFirst ? 0 : 6,
          marginRight: isLast - 1 ? 0 : 6,
        }}
      >
        {t}
      </span>
    )
  })
  const anchor = slugify(title.toLowerCase())
  return (
    <div style={{marginBottom: 60}}>
      <a href={`#${anchor}`} name={anchor}>
        <h2
          {...innerHTML(title)}
          style={{marginBottom: 10}}
        />
      </a>
      <div style={{marginBottom: 6, fontSize: '0.75em'}}>{tagEls}</div>
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
    })).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
}

function innerHTML(string) {
  return {dangerouslySetInnerHTML: {__html: string}}
}

function getRandomColor() {
  if (!availableColors.size) {
    throw new Error('no more colors available')
  }
  const colors = Array.from(availableColors)
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  availableColors.delete(randomColor)
  return randomColor
}

function getTextColor(hex) {
  /* eslint no-bitwise:0 */
  const c = hex.substring(1)
  const rgb = parseInt(c, 16)
  const r = (rgb >> 16) & 0xff // extract red
  const g = (rgb >> 8) & 0xff // extract green
  const b = (rgb >> 0) & 0xff // extract blue

  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
  return luma < 130 ? 'white' : 'black'
}
