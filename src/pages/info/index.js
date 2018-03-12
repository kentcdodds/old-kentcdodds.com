import Markdown from '../../components/markdown'

export default Links

function Links() {
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{fontSize: 50, marginBottom: 20}}>Info</h1>
      <em>Info about me</em>
      <div
        style={{maxWidth: 600, margin: 'auto', textAlign: 'left', fontSize: 18}}
      >
        <div>
          <h2>Photo</h2>
          <a href="/photo.png">
            <img style={{maxWidth: 200}} alt="my profile" src="/photo.png" />
          </a>
          <small style={{display: 'block', marginTop: 8}}>
            <a href="/photo.png">Full image</a>
          </small>
        </div>
        <hr />
        <div>
          <h2>Bio</h2>
          <div>
            <strong>Long</strong>
            <Markdown>{`
              I am Kent C. Dodds. I work at [PayPal](https://www.paypal.com) as a full stack JavaScript
              engineer. I represent PayPal on [the TC39](https://github.com/tc39). I'm actively involved in
              the [open source community](https://github.com/kentcdodds). I'm an instructor on
              [egghead.io](https://egghead.io/instructors/kentcdodds),
              [Frontend Masters](https://frontendmasters.com), and [Workshop.me](https://workshop.me/?a=kent).
              I'm also a [Google Developer Expert](https://developers.google.com/experts/people/kent-c-dodds).
              I'm happily married and the father of four kids. I like my family, code, JavaScript, and React.
            `}</Markdown>
          </div>
          <div style={{marginTop: 40}}>
            <strong>Third Person</strong>
            <Markdown>{`
              Kent C. Dodds works at [PayPal](https://www.paypal.com) as a full stack JavaScript
              engineer. He represents PayPal on [the TC39](https://github.com/tc39). He's actively involved in
              the [open source community](https://github.com/kentcdodds). He's an instructor on
              [egghead.io](https://egghead.io/instructors/kentcdodds),
              [Frontend Masters](https://frontendmasters.com), and [Workshop.me](https://workshop.me/?a=kent).
              He's also a [Google Developer Expert](https://developers.google.com/experts/people/kent-c-dodds).
              Kent is happily married and the father of four kids. He likes his family, code, JavaScript, and React.
            `}</Markdown>
          </div>
          <div style={{marginTop: 40}}>
            <strong>Short</strong>
            <Markdown>{`
              My name is Kent C. Dodds and I'm a JavaScript engineer at [PayPal](https://www.paypal.com)
              and I'm active in the open source community. I'm also a teacher.
              I like my family, JavaScript, and React.
            `}</Markdown>
          </div>
          <div style={{marginTop: 40}}>
            <strong>Short Third Person</strong>
            <Markdown>{`
              Kent C. Dodds is a JavaScript engineer at [PayPal](https://www.paypal.com)
              and is active in the open source community. He's also a teacher.
              He likes his family, JavaScript, and React.
            `}</Markdown>
          </div>
        </div>
      </div>
    </div>
  )
}
