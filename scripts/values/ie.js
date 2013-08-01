'use strict';
(function() {
  var app = angular.module('kent');

  app.value('ie', (function() {
    var undef = undefined;
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null) {
        rv = parseFloat( RegExp.$1 );
      }
    }
    return ((rv > -1) ? rv : undef);
  }()));
})();