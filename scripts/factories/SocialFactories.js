angular.module('kent').factory('socialFactory', function($modal) {
  return {
    getMainNetworks: function() {
      return [
        {
          name: 'email',
          summary: 'Email me',
          url: 'mailto:kent@doddsfamily.us'
        },
        {
          name: 'google',
          summary: 'Circle me',
          url: 'https://plus.google.com/114245123507194646768'
        },
        {
          name: 'github',
          summary: 'Fork me',
          url: 'http://www.github.com/kentcdodds'
        },
        {
          name: 'twitter',
          summary: 'Follow me @kentcdodds',
          url: 'http://www.twitter.com/kentcdodds'
        },
        {
          name: 'linkedin',
          summary: 'Connect with me',
          url: 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/'
        },
        {
          name: 'more',
          summary: 'View more',
          onClick: function(scope) {
            scope.viewMore = !scope.viewMore;
            this.class = scope.viewMore ? 'hover' : '';
            this.name = scope.viewMore ? 'less' : 'more';
            
          }
        }
      ];
    },
    getOtherNetworks: function() {
      return [
        {
          name: 'phone',
          summary: 'Call me (maybe? ;D)',
          onClick: function(scope) {
            scope.modal = {content: '', saved: false};
            $modal({
              template: 'views/callModal.html',
              show: true,
              backdrop: 'static',
              scope: scope
            });
          }
        },
        {
          name: 'facebook',
          summary: 'Friend me',
          url: 'http://www.facebook.com/kentcdodds'
        },
        {
          name: 'careers',
          summary: 'Hire me',
          url: 'http://careers.stackoverflow.com/kentcdodds'
        },
        {
          name: 'stack-overflow',
          summary: 'Ask me',
          url: 'http://stackoverflow.com/users/971592/kentcdodds'
        },
        {
          name: 'mormon',
          summary: 'I\'m a Mormon',
          url: 'http://mormon.org/me/1J5N'
        }
      ];
    }
  };
});