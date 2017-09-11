import {PropTypes} from 'react'
import slugify from 'slugify'
import glamorous from 'glamorous'
import {intersperse} from '../utils'

let availableColors
updateColorsList()
function updateColorsList() {
  availableColors = new Set([
    '#2E4347',
    '#C0D1C2',
    '#49281F',
    '#564334',
    '#5D4157',
    '#838689',
    '#413040',
    '#111625',
    '#341931',
    '#571B3C',
    '#805566',
    '#E35B5D',
    '#5CACC4',
    '#DE6262',
    '#64989D',
    '#410936',
    '#616668',
    '#A43955',
    '#5E3929',
    '#1B676B',
  ])
}
const colorMap = {}

const TagSpan = glamorous.span(
  {
    ':first-child': {marginLeft: 0},
    ':last-child': {marginRight: 0},
  },
  ({color}) => ({
    backgroundColor: color,
    color: getTextColor(color),
    borderRadius: 2,
    padding: '2px 6px',
    marginLeft: 6,
    marginRight: 6,
  }),
)

export default Presentation

function Presentation({title, abstract, resources, presentations, tags}) {
  const resourceEls = resources.map((r, i) => (
    <span key={i} {...innerHTML(r)} />
  ))
  const presentationEls = presentations.map(
    ({event, recording, date, isFuture}, i) => (
      <li key={i}>
        <span {...innerHTML(event)} />
        {recording ? ' - ' : null}
        {recording ? <a href={recording}>video</a> : null}
        <glamorous.Span paddingLeft={10} fontSize="0.7em">
          {date.format('YYYY-MM-DD')} {isFuture ? 'upcoming' : null}
        </glamorous.Span>
      </li>
    ),
  )
  const tagEls = tags.map(t => {
    let color = colorMap[t]
    if (!color) {
      color = getRandomColor()
      colorMap[t] = color
    }
    return (
      <TagSpan key={t} color={color}>
        {t}
      </TagSpan>
    )
  })
  const anchor = slugify(title.toLowerCase())
  return (
    <glamorous.Div marginBottom={60}>
      <a href={`#${anchor}`} name={anchor}>
        <glamorous.H2 marginBottom={10} {...innerHTML(title)} />
      </a>
      <glamorous.Div marginBottom={6} fontSize="0.75em">
        {tagEls}
      </glamorous.Div>
      <glamorous.Div marginBottom={8} fontSize="0.9em">
        <div>{intersperse(resourceEls, ' | ')}</div>
        <div>
          Presentations:
          <glamorous.Ul listStyle="none" paddingLeft={16} margin={0}>
            {presentationEls}
          </glamorous.Ul>
        </div>
      </glamorous.Div>
      {abstract ? (
        <div>
          <glamorous.H3 marginBottom={2}>Abstract</glamorous.H3>
          <glamorous.Div {...innerHTML(abstract)} marginTop={-12} />
        </div>
      ) : null}
    </glamorous.Div>
  )
}

Presentation.propTypes = {
  title: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  resources: PropTypes.arrayOf(PropTypes.string).isRequired,
  presentations: PropTypes.arrayOf(
    PropTypes.shape({
      event: PropTypes.string.isRequired,
      recording: PropTypes.string,
      date: PropTypes.object.isRequired,
    }),
  ).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
}

function innerHTML(string) {
  return {dangerouslySetInnerHTML: {__html: string}}
}

function getRandomColor() {
  if (!availableColors.size) {
    updateColorsList()
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
