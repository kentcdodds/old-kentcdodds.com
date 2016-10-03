export default Home

function Home() {
  return (
    <div style={{textAlign: 'center'}}>
      <h1
        style={{
          fontSize: 100,
          marginBottom: 20,
        }}
      >
        Kent C. Dodds
      </h1>
      <div>
        <div
          style={{
            fontSize: 24,
          }}
        >
          Building awesome and making software development more accessible.
        </div>
        <p>
          {listOfThings([
            'Mormon', 'Husband', 'Father',
            {text: 'Speaker', url: 'https://kcd.im/talks'},
            {text: 'Trainer', url: 'https://kcd.im/talks#workshops'},
            {text: 'Open Sourcerer', url: 'https://github.com/kentcdodds'},
            {text: 'GDE', url: 'https://kcd.im/gde'},
          ])}
        </p>
        <p>
          {listOfThings([
            'JavaScript',
            {text: 'PayPal', url: 'https://paypal.com/careers'},
            {text: 'egghead.io', url: 'https://kcd.im/egghead'},
            {text: 'Frontend Masters', url: 'https://frontendmasters.com/'},
            {text: 'JavaScriptAir', url: 'https://javascriptair.com'},
          ])}
        </p>
        <p>
          {listOfThings([
            {text: 'Ask Me Anything', url: 'https://kcd.im/ama'},
            {text: 'Twitter', url: 'https://twitter.com/kentcdodds'},
            {text: 'GitHub', url: 'https://github.com/kentcdodds'},
            {text: 'Email', url: 'mailto:kent@doddsfamily.us'},
          ])}
        </p>
        <p>
          <small>
            If you're unimpressed with my website
            it's because I'm too busy<br />
            hanging out with my family,<br />
            building awesome things,<br />
            teaching people JavaScript,<br />
            and doing stuff for the community.
          </small>
        </p>
      </div>
    </div>
  )
}

function listOfThings(things) {
  return things.reduce((items, thing, i) => {
    const {text, url} = thing
    if (url) {
      items.push(<a href={url} key={i}>{text}</a>)
    } else {
      items.push(thing)
    }
    const isLast = i === things.length - 1
    if (!isLast) {
      items.push(', ')
    }
    return items
  }, [])
}
