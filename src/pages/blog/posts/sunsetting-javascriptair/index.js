import Markdown from '../../markdown'

export const title = 'Sunsetting JavaScript Air'
export const draft = true

export default Post

function Post() {
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>
        {title}
      </h1>
      <div style={{maxWidth: 600, margin: 'auto'}}>
        <div style={{textAlign: 'center'}}>
          <img src="javascript-air-logo.png" />
        </div>
        <Markdown>{`
          With heavy heart 💔, I must officially announce that I'm sunsetting
          [JavaScript Air](https://javascriptair.com). If you haven't heard of JavaScript Air (I'm surprised you're even
          reading this), it's the **live** broadcast podcast all about JavaScript and the web platform. Learn more about
          the background [here](https://medium.com/@kentcdodds/introducing-javascript-air-46700561f38d).

          On November 2nd, we'll have our last show with
        `}</Markdown>
      </div>
    </div>
  )
}
