app.controller('SocialCtrl', ['$scope', function($scope) {
  $scope.networks = [
    {
      name: 'google',
      url: 'https://plus.google.com/114245123507194646768'
    },
    {
      name: 'twitter',
      url: 'http://www.twitter.com/kentcdodds'
    },
    {
      name: 'github',
      url: 'http://www.github.com/kentcdodds'
    },
    {
      name: 'facebook',
      url: 'http://www.facebook.com/kentcdodds'
    },
    {
      name: 'linkedin',
      url: 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/'
    }
  ];
}]);