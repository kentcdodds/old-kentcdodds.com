import {PropTypes} from 'react'
import slugify from 'slugify'
import Markdown from '../../components/markdown'
import appearances from './appearances-data'

export default Appearances

function Appearances() {
  return (
    <div style={{textAlign: 'center'}}>
      <h1
        style={{fontSize: 50, marginBottom: 20}}
      >
        Appearances
      </h1>
      <em>Search with <pre style={{display: 'inline'}}>⌘/ctrl + f</pre></em>
      <div style={{maxWidth: 600, margin: 'auto', textAlign: 'left', fontSize: 18}}>
        {appearances.map(({title, appearances: things}) => (
          <SectionOfThings
            key={title}
            title={title}
            things={things}
          />
        ))}
      </div>
    </div>
  )
}

function SectionOfThings({things, title}) {
  const slug = slugify(title)
  return (
    <div>
      <h2>
        <a href={`#${slug}`} name={slug}>{title}</a>
      </h2>
      <ListOfThings things={things} />
    </div>
  )
}

SectionOfThings.propTypes = {
  things: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
}

function ListOfThings({things}) {
  return (
    <ul>
      {things.map(({thing, description}, i) => (
        <li key={i} style={{marginBottom: 4}}>
          <NoPMarkdown>{thing}</NoPMarkdown> {description ? (
            <span>- <NoPMarkdown style={{fontSize: '0.8em'}}>{description}</NoPMarkdown></span>
          ) : ''}
        </li>
      ))}
    </ul>
  )
}

ListOfThings.propTypes = {
  things: PropTypes.arrayOf(PropTypes.shape({
    thing: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  })),
}

function NoPMarkdown({children, style}) {
  return (
    <Markdown noPTag style={{display: 'inline', ...style}}>
      {children}
    </Markdown>
  )
}

NoPMarkdown.propTypes = {children: PropTypes.any, style: PropTypes.any}
