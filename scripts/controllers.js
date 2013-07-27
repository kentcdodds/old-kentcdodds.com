'use strict';
(function() {
  var app = angular.module('kent');

  var transEndEventNames = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition' : 'transitionend',
    'OTransition' : 'oTransitionEnd',
    'msTransition' : 'MSTransitionEnd',
    'transition' : 'transitionend'
  };
  // transition end event name
  var transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];
  // support css transitions
  var supportTransitions = Modernizr.csstransitions;


  app.controller('MainCtrl', function($scope, $location) {


    $scope.underConstruction = true;
    $scope.sections = [
      {
        sectionId: 'about-section',
        title: 'About',
        icon: 'icon-smile',
        path: '/about'
      },
      {
        sectionId: 'projects-section',
        title: 'Projects',
        icon: 'icon-laptop',
        path: '/projects'
      },
      {
        sectionId: 'blog-section',
        title: 'Blog',
        icon: 'icon-pencil',
        path: '/blog'
      },
      {
        sectionId: 'contact-section',
        title: 'Contact',
        icon: 'icon-envelope',
        path: '/contact'
      },
    ];


    var getSection = function(index) {
      var selector = '#' + $scope.sections[index].sectionId;
      return $(selector);
    };

    $scope.onBoxClick = function(index) {
      var $section = getSection(index);
      if (!$section.data('open')) {
        $section.data('open', true).addClass('bl-expand bl-expand-top');
        $('#bl-sections').addClass('bl-expand-item'); 
        var sectionView = $scope.sections[index].path;
        $location.path(sectionView);
      }
    };

    $scope.closeSection = function(arg) {
      var $section = _.isNumber(arg) ? getSection(arg) : arg;
      $section.data('open', false).removeClass('bl-expand').on(transEndEventName, function(event) {
        if (!$(event.target).is('section')) {
          return false;
        }
        $(this).off(transEndEventName).removeClass('bl-expand-top');
      });

      if (!supportTransitions) {
        $section.removeClass('bl-expand-top');
      }
      $('#bl-sections').removeClass('bl-expand-item');
      $location.path('/');
    };

    $scope.keyUp = function(e) {
      if (event.keyCode !== 27) {
        return;
      }
      var $section = $('section.bl-expand');
      //Check if a section or a work panel is open
      if ($('.bl-show-work').length) {
        closeWorkPanel();
      } else if ($section.length) {
        $scope.closeSection($section);
      }
    };

    $(function() {
      var section = _.find($scope.sections, {path: $location.path()});
      if (section) {
        $scope.onBoxClick(_.indexOf($scope.sections, section));
      }
    });

  }); 

  app.controller('ProjectsCtrl', function($scope) {
    $scope.underConstruction = true;

    var getPanelAt = function(index) {
      return $('#bl-panel-work-items > [data-panel=panel-' + index + ']');
    };

    var getCurrentPanel = function() {
      return getPanelAt($scope.currentPanelIndex);
    };

    $scope.projects = [
      {
        title: 'SpendMyCents.com',
        img: null,
        description: 'Spend My Cents rocks!',
        contributors: [
          {
            name: 'Kent Dodds',
            role: 'Backend (and currently sole maintainer)',
            link: 'http://kent.doddsfamily.us'
          },
          {
            name: 'Mack Cope',
            role: 'Initial frontend',
            link: 'http://www.mackcope.com'
          }
        ]
      },
      {
        title: 'FriendStories',
        img: null,
        description: 'Friend Stories is going to be big!',
        contributors: [
          {
            name: 'Kent Dodds',
            role: 'Everyting',
            link: 'http://kent.doddsfamily.us'
          }
        ]
      }
    ];


    $scope.getContributors = function(index) {
      var contributors = $scope.projects[index].contributors;
      var totalContributors  = contributors.length;
      return 'contrib';
    };

    $scope.closeProjectPanels = function() {
      // scale up main section
      $('#bl-work-section').removeClass('bl-scale-down');
      $('#bl-panel-work-items').removeClass('bl-panel-items-show');
      getCurrentPanel().removeClass('bl-show-work');
    };

    $scope.clickProject = function(index) {
      console.log('Index: ' + index);
      var $workPanelsContainer = $('#bl-panel-work-items');
      var $panel = getPanelAt(index);

      $('#bl-work-section').addClass('bl-scale-down');
      $('#bl-panel-work-items').addClass('bl-panel-items-show');
      $scope.currentPanelIndex = index;
      $panel.addClass('bl-show-work');
    };

    $scope.changeProject = function(movement) {
      var $currentPanel = getCurrentPanel();
      var newIndex = $scope.currentPanelIndex + movement;
      if ($scope.isAnimating) {
        return false;
      }
      $scope.isAnimating = true;

      if (newIndex > $scope.projects.length - 1) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = $scope.projects.length - 1;
      }

      $currentPanel.removeClass('bl-show-work').addClass('bl-hide-current-work').on(transEndEventName, function(event) {
        if (!$(event.target).is('div')) return false;
        $(this).off(transEndEventName).removeClass('bl-hide-current-work');
        $scope.isAnimating = false;
      });

      if (!supportTransitions) {
        $currentPanel.removeClass('bl-hide-current-work');
        $scope.isAnimating = false;
      }

      $scope.clickProject(newIndex);
    };

  });
  
  app.controller('ContactCtrl', function($scope, $location, Networks) {
    var searchParams;

    $scope.networks = Networks.getNetworks();
    $scope.getBackgroundImage = function(networkName) {
      return './images/social/' + networkName + '-hover.png';
    };

    $scope.networkClick = function(index) {
      if ($scope.networks[index].onClick) {
        $scope.networks[index].onClick($scope);
      }
    };

    searchParams = $location.search();
    for (var i = 0, total = $scope.networks.length; i < total; i++) {
      var network = $scope.networks[i];
      if (searchParams[network.name] === 'true') {
        network.onClick($scope);
      }
    }
    
  });
})();