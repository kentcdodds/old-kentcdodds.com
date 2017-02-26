import InlineScript from '../../components/scripts/inline-script'

export default FourOFour

function FourOFour() {
  return (
    <div style={{textAlign: 'center'}}>
      <h1 style={{fontSize: 50, marginBottom: 20}}>
        Page not found
      </h1>
      <p>
        This page doesn't exist. It is quite possible that you were linked here from one of my GitHub projects. Those
        are now only available via the <a href="https://kentcdodds.github.io">kentcdodds.github.io</a> url.
      </p>
      <p>
        {`If this is the case, then you'll find the page you're looking for here: `}
        <a href="https://kentcdodds.github.io/" id="replace-location-pathname">
          https://kentcdodds.github.io/
        </a>
        <InlineScript fn={replaceLocationPathname} />
      </p>
      <p>
        Otherwise, go <a href="/">here</a> to go back home.
      </p>
    </div>
  )
}

function replaceLocationPathname() {
  /* eslint-disable */ // this is run by the browser and not transpiled
  var anchor = document.getElementById('replace-location-pathname');
  anchor.href = 'https://kentcdodds.github.io' + window.location.pathname;
  anchor.textContent = anchor.href;
  /* eslint-enable */
}
