/* eslint max-len:off */
import Markdown from '../../../../components/markdown'

export const title = 'From Atom Editor to Visual Studio Code'
export const draft = true

export default Post

function Post() {
  return (
    <div style={{maxWidth: 800, margin: 'auto', fontSize: '22px'}}>
      <h1 style={{textAlign: 'center', fontSize: '1.4em'}}>
        {title}
        <br />
        <small>My experience migrating editors</small>
      </h1>
      <div>
        <Markdown>{`
          Back in April (2016), [I moved from vim to Atom + vim mode](https://www.briefs.fm/3-minutes-with-kent/16).
          It's been such a nice change, but there have been a few things that have really bothered me with Atom. Two of
          these stick out more than others:

          1. [Autocomplete ordering of snippets](https://github.com/atom/autocomplete-plus/issues/785)
          2. Performance (Atom is a bit on the slow side, especially for big files)

          I tried Code around the same time I was switching from Vim, and found it to not be super awesome. It seemed to
          be lacking some features that I wanted. So I went with Atom. But I've heard that Code has changed a bit and is
          really improving, so I'm back to try it out again.

          I haven't really had too much time with it, but I think that I'm really going to enjoy myself with it. It's
          faster and the snippet support is excellent. I've been able to find plugins for most of the things I loved
          about Atom, and have been learning the differences.

          I've had a lot of help from friends on Twitter, and
          Gregor [asked](https://twitter.com/gr2m/status/793142173914980352) if I would share the answers I've received,
          so here they are!

          ## Q:
        `}</Markdown>
        <small>
          See more blogposts from me <a href="/post">here</a>.
        </small>
      </div>
    </div>
  )
}
