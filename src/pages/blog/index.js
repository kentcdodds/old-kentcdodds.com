import {PropTypes} from 'prop-types'
import Markdown from '../../components/markdown'

export default BlogHome

function BlogHome({posts}) {
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{fontSize: 50, marginBottom: 20}}>Blog</h1>
      <em>
        Search with <pre style={{display: 'inline'}}>⌘/ctrl + f</pre>
      </em>
      <div style={{fontSize: '0.9em', marginTop: 20}}>
        {`I'm in the process of moving my blog over to this. Find more posts `}
        <a href="https://medium.com/@kentcdodds">on Medium.com</a>
        .
      </div>
      <div
        style={{maxWidth: 600, margin: 'auto', textAlign: 'left', fontSize: 18}}
      >
        <ul>
          {posts
            .filter(p => !p.draft)
            .map(({url, title, subtitle, date}, i) => (
              <li key={i} style={{marginBottom: 4}}>
                <a href={url}>{title}</a>
                <span style={{fontSize: '0.7em', opacity: '0.7'}}> {date}</span>
                {subtitle ? (
                  <Markdown
                    noPTag
                    style={{
                      fontSize: '0.9em',
                      opacity: '0.75',
                      paddingLeft: 12,
                    }}
                  >
                    {subtitle}
                  </Markdown>
                ) : (
                  ''
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

BlogHome.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
    }),
  ),
}
