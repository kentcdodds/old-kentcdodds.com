'use strict';
(function() {
  var app = angular.module('kent');

  app.value('networks', (function() {
    var networks = [];
    var addNetwork = function(name, summary, url, target, action) {
      networks.push({
        name: name,
        summary: summary,
        url: url,
        target: target,
        action: action
      })
    };
    
    addNetwork('email', 'Email me', 'mailto:kent@doddsfamily.us');
    addNetwork('google', 'Circle me', 'https://plus.google.com/114245123507194646768');
    addNetwork('github', 'Fork me', 'http://www.github.com/kentcdodds');
    addNetwork('twitter', 'Follow me @kentcdodds', 'http://www.twitter.com/kentcdodds');
    addNetwork('linkedin', 'Connect with me', 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/');
    addNetwork('phone', 'Call me (maybe? ;D)', '#/contact?phone=true', '_self', function(scope) { scope.activatePhoneModal(); });
    addNetwork('facebook', 'Friend me', 'http://www.facebook.com/kentcdodds');
    addNetwork('careers', 'Hire me', 'http://careers.stackoverflow.com/kentcdodds');
    addNetwork('stack-overflow', 'Ask me', 'http://stackoverflow.com/users/971592/kentcdodds');
    addNetwork('mormon', 'I\'m a Mormon', 'http://mormon.org/me/1J5N');
    
    return networks;
  })());
})();