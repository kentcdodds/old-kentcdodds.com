angular.module('kent').factory('socialFactory', function($modal) {
  return {
    getNetworks: function() {
      return [
        {
          name: 'google',
          url: 'https://plus.google.com/114245123507194646768',
          summary: 'Circle me',
          click: ''
        },
        {
          name: 'twitter',
          url: 'http://www.twitter.com/kentcdodds',
          summary: 'Follow me @kentcdodds'
        },
        {
          name: 'github',
          url: 'http://www.github.com/kentcdodds',
          summary: 'Fork me'
        },
        {
          name: 'facebook',
          url: 'http://www.facebook.com/kentcdodds',
          summary: 'Friend me'
        },
        {
          name: 'linkedin',
          url: 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/',
          summary: 'Connect with me'
        },
        {
          name: 'careers',
          url: 'http://careers.stackoverflow.com/kentcdodds',
          summary: 'Hire me'
        },
        {
          name: 'phone',
          click: function(scope) {
            scope.modal = {content: 'Hello Modal', saved: true};
            var modal = $modal({
              template: 'views/callModal.html',
              show: true,
              backdrop: 'static',
              scope: scope
            });
          },
          summary: 'Call me'
        }
      ];
    }
  };
});