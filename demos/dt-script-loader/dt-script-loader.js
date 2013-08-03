var DoubleTakeScriptLoader = function(scripts) {
  if (scripts) {
    if (Object.prototype.toString.call(scripts) !== '[object Array]' ) {
      scripts = [scripts];
    }
  } else {
    scripts = document.getElementsByTagName('script');
  }
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    var propName = script.propName || script.getAttribute('data-prop-name');
    var localSource = script.localSource || script.getAttribute('data-local-src');
    if (propName != null && localSource != null) {
      if (!window[propName]) {
        document.write('<script src="' + localSource + '" type="text/javascript"><' + '/script>');
        if (script.originalId) {
          script = document.getElementById(script.originalId);
        }
        !script.parentNode || script.parentNode.removeChild(script);
      }
    }
  }
};
DoubleTakeScriptLoader();
