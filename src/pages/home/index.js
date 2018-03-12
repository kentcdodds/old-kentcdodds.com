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
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 800,
            // height: 400,
            // border: 'solid 1px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 80,
            paddingBottom: 60,
          }}
        >
          <img
            alt="logo"
            style={{
              justifySelf: 'center',
              alignSelf: 'center',
              width: 150,
              marginBottom: 30,
            }}
            src="/logo.png"
          />
          <div
            style={{
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gridColumnGap: '10px',
              gridRowGap: '30px',
            }}
          >
            {[
              {
                imgFilename: 'github',
                href: 'https://github.com/kentcdodds',
                alt: 'My GitHub Profie',
              },
              {
                imgFilename: 'kcd-news',
                href: 'http://kcd.im/news',
                alt: 'My Weekly Newsletter',
              },
              {
                imgFilename: 'medium',
                href: 'https://blog.kentcdodds.com',
                alt: 'My Active Blog',
              },
              {imgFilename: 'speaking', href: '/talks', alt: 'My Talks'},
              {
                imgFilename: '3-minutes-with-kent',
                href: 'http://kcd.im/3-mins',
                alt: 'My 3 minute podcast',
              },
              {
                imgFilename: 'ama',
                href: 'http://kcd.im/ama',
                alt: 'Ask Me Anything',
              },
              {
                imgFilename: 'eggheadio',
                href: 'http://kcd.im/egghead',
                alt: 'See my videos and courses on Egghead.io',
              },
              {
                imgFilename: 'fem',
                href: 'http://kcd.im/fem',
                alt: 'See my workshops and courses on Frontend Masters',
              },
              {
                imgFilename: 'workshopme',
                href: 'http://kcd.im/wme',
                alt: 'See my workshops on Workshop.me',
              },
              {
                imgFilename: 'twitch',
                href: 'http://kcd.im/twitch',
                alt: 'I stream on Twitch',
              },
              {
                imgFilename: 'gde',
                href: 'http://kcd.im/gde',
                alt: 'My Google Developer Expert Profile',
              },
              {
                imgFilename: 'youtube',
                href: 'http://kcd.im/youtube',
                alt: 'My YouTube channel',
              },
            ].map(({imgFilename, href, alt}) => (
              <a
                key={imgFilename}
                href={href}
                style={{
                  placeSelf: 'center',
                }}
              >
                <img
                  alt={alt}
                  src={`/assets/things/${imgFilename}.png`}
                  style={{height: 64, width: 64}}
                />
              </a>
            ))}
          </div>
        </div>
        <p>
          {listOfThings([
            'Mormon',
            'Husband',
            'Father',
            {text: 'Speaker', url: '/talks'},
            {text: 'Trainer', url: '/workshops'},
            {text: 'Open Sourcerer', url: 'https://github.com/kentcdodds'},
            {text: 'GDE', url: 'http://kcd.im/gde'},
            {text: 'TC39', url: 'https://github.com/tc39'},
          ])}
        </p>
        <p>
          {listOfThings([
            'JavaScript',
            {text: 'PayPal', url: 'https://paypal.com/careers'},
            {text: 'egghead.io', url: 'http://kcd.im/egghead'},
            {text: 'Frontend Masters', url: 'http://kcd.im/fem'},
            {text: 'Workshop.me', url: 'http://kcd.im/wme'},
            {text: '3 Minutes with Kent', url: 'http://kcd.im/3-mins'},
          ])}
        </p>
        <p>
          {listOfThings([
            {text: 'Kent C. Dodds Mail', url: 'http://kcd.im/news'},
            {text: 'Ask Me Anything', url: 'http://kcd.im/ama'},
            {text: 'Twitter', url: 'https://twitter.com/kentcdodds'},
            {text: 'GitHub', url: 'https://github.com/kentcdodds'},
            {text: 'YouTube', url: 'http://kcd.im/youtube'},
            {text: 'Email', url: 'mailto:kent@doddsfamily.us'},
          ])}
        </p>
        <p>
          Find more interesting <a href="/links">links here</a>.
        </p>
        <p style={{fontSize: '1.15em', fontWeight: '600'}}>
          Support my work on <a href="http://kcd.im/patreon">Patreon</a> or buy
          me lunch on <a href="http://kcd.im/donate">PayPal</a>
        </p>
        <p>
          <small>
            {`If you're unimpressed with my website it's because I'm too busy`}
            <br />
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
      items.push(
        <a href={url} key={i}>
          {text}
        </a>,
      )
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
