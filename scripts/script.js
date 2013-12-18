angular.module('kent', ['ga', 'uxGenie']).controller('MainCtrl', function($scope) {
  $scope.networks = [];
  function addNetwork(name, summary, magicWord, url) {
    $scope.networks.push({
      name: name,
      summary: summary,
      url: url
    });

    genie({
      action: url,
      magicWords: 'Connect: ' + magicWord
    });
  };
  
  addNetwork('email', 'Email me', 'Email', 'mailto:kent@doddsfamily.us');
  addNetwork('google', 'Circle me', 'Google+', 'https://plus.google.com/+KentCDodds');
  addNetwork('github', 'Fork me', 'GitHub', 'http://www.github.com/kentcdodds');
  addNetwork('twitter', 'Follow me @kentcdodds', 'Twitter', 'http://www.twitter.com/kentcdodds');
  addNetwork('linkedin', 'Connect with me', 'LinkedIn', 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/');
  addNetwork('facebook', 'Friend me', 'Facebook', 'http://www.facebook.com/kentcdodds');
  addNetwork('resume', 'Hire me', 'My Resume', 'http://kentcdodds.github.io/resume');
  addNetwork('careers', 'Hire me', 'Stack Overflow Careers', 'http://careers.stackoverflow.com/kentcdodds');
  addNetwork('stack-overflow', 'Ask me', 'Stack Overflow Profile', 'http://stackoverflow.com/users/971592/kentcdodds');
  addNetwork('mormon', 'I\'m a Mormon', 'My Mormon Profile', 'http://mormon.org/me/1J5N');

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

    genie({
      action: url,
      magicWords: 'Project: ' + name
    });
  }

  addProject('GenieJS', 'http://kentcdodds.github.io/genie', 'Your wish is my command. Better keyboard conntrol for your website.');
  addProject('SpendMyCents.com', 'http://wwww.spendmycents.com', 'Reverse product search. Find Amazon products by price.');
  addProject('Filtered List', 'http://kentcdodds.github.io/filtered-list', 'Load data and search through it easily. Useful for checking people in for events.');
  addProject('KeymasterJS', 'http://kentcdodds.github.io/keymaster', 'My forked version of KeymasterJS with added support for keyboard combinations.');
  addProject('JSPoint', 'http://kentcdodds.github.io/js-point', 'Turn your PowerPoint into an interesting presentation in the web.')
  addProject('InfiniteWPM', 'http://kentcdodds.github.io/InfiniteWPM', 'What HackerTyper have been. It\'s faster and has a number of great features.');
  addProject('DoubleTake Script Loader', 'http://kentcdodds.github.io/dt-script-loader', 'A simple script that provides an easy fallback for failed CDNs.');

  $scope.wishMade = function(wish) {
    if (wish && wish.magicWords) {
      ga('send', 'event', 'wish', 'made', wish.magicWords);
    }
  };

  genie([
    {
      magicWords: 'What\'s a Domosapien?',
      action: function() {
        updateAlert('Domosapien (doh-moh sey-pee-uhn):', 'An employee of the coolest company on earth.', 'info', 'http://www.domo.com');
      }
    },
    {
      magicWords: 'What\'s a Mormon?',
      action: function() {
        updateAlert('Mormon (ˈmɔrmən):', 'A member of the Church of Jesus Christ of Latter-Day Saints.', 'info', 'http://www.mormon.org');
      }
    },
    {
      magicWords: 'Where do you go to school?',
      action: function() {
        updateAlert('Brigham Young University (BYU)', 'I will be graduating with a Master of Information Systems degree in April 2014.', 'info', 'http://mism.byu.edu');
      }
    },
    {
      magicWords: 'What about your family?',
      action: function() {
        updateAlert('', 'I was married July 8th, 2011 to Brooke. We had our first daughter about a year later. We had our second child, a son this time, 17 months after that. Yeah, I\'m a family man :)', 'info')
      }
    }
  ]);

  $scope.alert = {};

  function updateAlert(strong, content, type, link) {
    $scope.alert.strong = strong;
    $scope.alert.content = content;
    $scope.alert.type = type;
    $scope.alert.link = link;
    $scope.alert.visible = !!strong || !!content;
  }

});