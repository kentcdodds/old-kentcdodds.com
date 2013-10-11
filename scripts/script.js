angular.module('kent', ['ga']).controller('MainCtrl', function($scope) {
  $scope.networks = [];
  function addNetwork(name, summary, url, target, action) {
    $scope.networks.push({
      name: name,
      summary: summary,
      url: url
    });
  };
  
  addNetwork('email', 'Email me', 'mailto:kent@doddsfamily.us');
  addNetwork('google', 'Circle me', 'https://plus.google.com/114245123507194646768');
  addNetwork('github', 'Fork me', 'http://www.github.com/kentcdodds');
  addNetwork('twitter', 'Follow me @kentcdodds', 'http://www.twitter.com/kentcdodds');
  addNetwork('linkedin', 'Connect with me', 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/');
  addNetwork('facebook', 'Friend me', 'http://www.facebook.com/kentcdodds');
  addNetwork('resume', 'Hire me', 'http://kentcdodds.github.io/resume');
  addNetwork('careers', 'Hire me', 'http://careers.stackoverflow.com/kentcdodds');
  addNetwork('stack-overflow', 'Ask me', 'http://stackoverflow.com/users/971592/kentcdodds');
  addNetwork('mormon', 'I\'m a Mormon', 'http://mormon.org/me/1J5N');

  $scope.getBackgroundImage = function(networkName) {
    return './images/' + networkName + '.png';
  };

  $scope.projects = [];
  function addProject(name, url, description) {
    $scope.projects.push({
      name: name,
      url: url,
      description: description
    });
  }

  addProject('GenieJS', 'http://kentcdodds.github.io/genie', 'Your wish is my command. Better keyboard conntrol for your website.');
  addProject('SpendMyCents.com', 'http://wwww.spendmycents.com', 'Reverse product search. Find Amazon products by price.');
  addProject('Filtered List', 'http://kentcdodds.github.io/filtered-list', 'Load data and search through it easily. Useful for checking people in for events.');
  addProject('KeymasterJS', 'http://kentcdodds.github.io/keymaster', 'My forked version of KeymasterJS with added support for keyboard combinations.');
  addProject('JSPoint', 'http://kentcdodds.github.io/js-point', 'Turn your PowerPoint into an interesting presentation in the web.')
  addProject('InfiniteWPM', 'http://kentcdodds.github.io/InfiniteWPM', 'What HackerTyper have been. It\'s faster and has a number of great features.');
  addProject('DoubleTake Script Loader', 'http://kentcdodds.github.io/dt-script-loader', 'A simple script that provides an easy fallback for failed CDNs.');

});