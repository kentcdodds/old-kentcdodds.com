import {PropTypes} from 'react'
import slugify from 'slugify'
import Markdown from '../../components/markdown'
import appearances from './appearances-data'

const thingClassName = 'blahblahunique🐌blah'

export default Appearances

function Appearances() {
  return (
    <div style={{textAlign: 'center', maxWidth: 600, margin: 'auto'}}>
      <style>{`
        /* I know, crazy right? lol :shipit: */
        .${thingClassName} a {color: inherit;}
        .${thingClassName} a:hover, .${thingClassName} a:focus {color: gray;}
      `}</style>
      <h1
        style={{fontSize: 50, marginBottom: 20}}
      >
        Appearances
      </h1>
      <em>Search with <pre style={{display: 'inline'}}>⌘/ctrl + f</pre></em>
      <div style={{textAlign: 'left', fontSize: 18}}>
        {appearances.map(({title, appearances: things}) => (
          <SectionOfThings
            key={title}
            title={title}
            things={things}
          />
        ))}
      </div>
      <hr style={{margin: '50px 0'}} />
      <Markdown style={{textAlign: 'left'}}>{`
        You may also be interested in:
        - [My Talks](http://kcd.im/talks)
        - [My AMA](http://kcd.im/ama)
        - My [tech chats](https://github.com/kentcdodds/ama/issues/125) on [YouTube](http://kcd.im/tech-chats)
      `}</Markdown>
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
      {things.map(({thing, description, duration, date, isFuture}, i) => (
        <li key={i} style={{marginBottom: 4}}>
          <NoPMarkdown className={thingClassName}>{thing}</NoPMarkdown>: {description ? (
            <span> <NoPMarkdown>{description}</NoPMarkdown></span>
          ) : ''}
          <span style={{fontSize: '0.7em'}}>
            {' '}
            {date.format('YYYY-MM-DD')} {isFuture ? 'upcoming' : null}
            {' '}
            {duration ? `- ${duration}` : null}
          </span>
        </li>
      ))}
    </ul>
  )
}

ListOfThings.propTypes = {
  things: PropTypes.arrayOf(PropTypes.shape({
    thing: PropTypes.string.isRequired,
    description: PropTypes.string,
    date: PropTypes.object.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  })),
}

function NoPMarkdown({children, style, ...otherProps}) {
  return (
    <Markdown
      noPTag
      style={{display: 'inline', ...style}}
      {...otherProps}
    >
      {children}
    </Markdown>
  )
}

NoPMarkdown.propTypes = {children: PropTypes.any, style: PropTypes.any}
