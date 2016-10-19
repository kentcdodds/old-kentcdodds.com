import Markdown from '../../markdown'

export const title = 'Sunsetting JavaScript Air'

export default Post

function Post() {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {title}
      </h1>
      <div style={{maxWidth: 600, margin: 'auto'}}>
        <Markdown>{`
          With heavy 💔
        `}</Markdown>
      </div>
    </div>
  )
}
