angular.module('kent', ['ga', 'uxGenie']).config(function($locationProvider) {
  $locationProvider.html5Mode(true);
}).controller('MainCtrl', function($scope, $location) {
  $scope.lampVisible = false;
  $scope.networks = [];
  function addNetwork(name, summary, magicWord, url, icon) {
    $scope.networks.push({
      name: name,
      summary: summary,
      url: url
    });

    genie({
      action: url,
      magicWords: magicWord,
      data: {
        uxGenie: {
          iIcon: 'fa fa-' + icon
        }
      }
    });
  }
  
  addNetwork('email', 'Email me', 'Email', 'mailto:kent@doddsfamily.us', 'envelope');
  addNetwork('phone', 'Call me', 'Phone', '/?call=true', 'phone-square');
  addNetwork('twitter', 'Follow me @kentcdodds', 'Twitter', 'http://www.twitter.com/kentcdodds', 'twitter-square');
  addNetwork('github', 'Fork me', 'GitHub', 'http://www.github.com/kentcdodds', 'github');
  addNetwork('google', 'Circle me', 'Google+', 'https://plus.google.com/+KentCDodds', 'google-plus-square');
  addNetwork('linkedin', 'Connect with me', 'LinkedIn', 'http://www.linkedin.com/pub/kent-dodds/1a/844/275/', 'linkedin-square');
  addNetwork('facebook', 'Friend me', 'Facebook', 'http://www.facebook.com/kentcdodds', 'facebook-square');
  addNetwork('resume', 'Hire me', 'My Resume', 'http://kentcdodds.github.io/resume', 'file-text');
  addNetwork('careers', 'Hire me', 'Stack Overflow Careers', 'http://careers.stackoverflow.com/kentcdodds', 'signal');
  addNetwork('stack-overflow', 'Ask me', 'Stack Overflow Profile', 'http://stackoverflow.com/users/971592/kentcdodds', 'stack-overflow');
  addNetwork('mormon', 'I\'m a Mormon', 'My Mormon Profile', 'http://mormon.org/me/1J5N', 'book');

  $scope.getBackgroundImage = function(networkName) {
    return './images/' + networkName + '.png';
  };

  $scope.projects = [];
  function addProject(name, url, description, icon) {
    $scope.projects.push({
      name: name,
      url: url,
      description: description
    });

    genie({
      action: url,
      magicWords: name,
      data: {
        uxGenie: {
          iIcon: 'fa fa-' + icon
        }
      }
    });
  }

  addProject('GenieJS', 'http://kentcdodds.github.io/genie', 'Your wish is my command. Better keyboard control for your website.', 'globe');
  addProject('SpendMyCents.com', 'http://wwww.spendmycents.com', 'Reverse product search. Find Amazon products by price.', 'globe');
  addProject('KeymasterJS', 'http://kentcdodds.github.io/keymaster', 'My forked version of KeymasterJS with added support for keyboard combinations.', 'github');
  addProject('JSPoint', 'http://kentcdodds.github.io/js-point', 'Turn your PowerPoint into an interesting presentation in the web.', 'github');
  addProject('InfiniteWPM', 'http://kentcdodds.github.io/InfiniteWPM', 'What HackerTyper have been. It\'s faster and has a number of great features.', 'github');
  addProject('DoubleTake Script Loader', 'http://kentcdodds.github.io/dt-script-loader', 'A simple script that provides an easy fallback for failed CDNs.', 'github');

  $scope.wishMade = function(wish) {
    if (wish && wish.magicWords) {
      ga('send', 'event', 'wish', 'made', wish.magicWords);
    }
  };

  function addQuestionWish(question, strong, content, type, url) {
    genie({
      magicWords: question,
      action: function() {
        updateAlert(strong, content, type, url);
      },
      data: {
        uxGenie: {
          iIcon: 'fa fa-question-circle'
        }
      }
    });
  }

  addQuestionWish('What\'s a AtTasker?', 'AtTasker:', 'An employee of the coolest company on earth.', 'info', 'http://www.attask.com');
  addQuestionWish('What\'s a Mormon?', 'Mormon (ˈmɔrmən):', 'A member of the Church of Jesus Christ of Latter-Day Saints.', 'info', 'http://www.mormon.org');
  addQuestionWish('Where do you go to school?', 'Brigham Young University (BYU)', 'I will be graduating with a Master of Information Systems degree in April 2014.', 'info', 'http://mism.byu.edu');
  addQuestionWish('What about your family?', '', 'I was married July 8th, 2011 to Brooke. We had our first daughter about a year later. We had our second child, a son this time, 17 months after that. Yeah, I\'m a family man :)', 'info');
  addQuestionWish('Tech enthusiast huh?', '', 'Yeah, I\'m interested in anything to do with technology. I love hearing/reading/talking about the next big thing (which is not always Samsung as they would lead you to believe). I\'m fascinated by the future. I\'m a Mac and Android lover. Yeah, I know...', 'info');
  addQuestionWish('Web developer huh?', '', 'Yep, I love JavaScript. I\'m especially in love with the MEAN stack because I can code JS all day long. I like to focus on the front end. I love making the user\'s experience awesome which is why I wrote Genie :)', 'info');
  addQuestionWish('Why the full name?', 'Why Kent C. Dodds?', 'Well, one day I decided that I\'d buy kentcdodds.com and started using it for my email. People started calling me by my full name because of that and it just kinda stuck. Now I really like it :)', 'info');


  $scope.alert = {};

  function updateAlert(strong, content, type, link) {
    $scope.alert.strong = strong;
    $scope.alert.content = content;
    $scope.alert.type = type;
    $scope.alert.link = link;
    $scope.alert.visible = !!strong || !!content;
  }
  
  $scope.$watch(function() {
    return $location.search().call === 'true';
  }, function(showPhone) {
    $scope.showPhone = showPhone;
  });
  
  $scope.hidePhone = function() {
    $location.url($location.path());
  };
  
  $scope.preventHidePhone = function($event) {
    $event.stopPropagation();
  };
  
  $scope.shortcutHidePhone = function($event) {
    if ($scope.showPhone && $event.keyCode === 27) {
      $scope.hidePhone();
    }
  }
});