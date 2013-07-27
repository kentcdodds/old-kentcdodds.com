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
    var i, total;
    var isSectionIsActive;


    $scope.underConstruction = true;
    $scope.sectionSelected = false;
    $scope.sections = [
      {
        sectionId: 'about-section',
        title: 'About',
        icon: 'icon-smile',
        path: '/about',
        active: false
      },
      {
        sectionId: 'projects-section',
        title: 'Projects',
        icon: 'icon-laptop',
        path: '/projects',
        active: false
      },
      {
        sectionId: 'blog-section',
        title: 'Blog',
        icon: 'icon-pencil',
        path: '/blog',
        active: false
      },
      {
        sectionId: 'contact-section',
        title: 'Contact',
        icon: 'icon-envelope',
        path: '/contact',
        active: false
      }
    ];
    
    $scope.$watch(function() {
      return $location.path();
    }, function() {
      _.each($scope.sections, function(section) {
        section.active = section.path === $location.path();
      });
    });
    
    isSectionIsActive = function() {
      for (i = 0, total = $scope.sections.length; i < total; i++) {
        if ($scope.sections[i].active) {
          return true;
        }
      }
      return false;
    };
    
    $scope.$watch(isSectionIsActive, function() {
      $scope.sectionSelected = isSectionIsActive();
    });

    $scope.closeSection = function(arg) {
      $location.path('/');
    };

    $scope.keyUp = function(e) {
      if (event.keyCode !== 27) {
        return;
      }
      var $section = $('section.bl-expand');
      //Check if a section or a work panel is open
      if ($('.bl-show-work').length) {
        //closeWorkPanel();
        console.log('close work panel... TODO');
      } else if ($section.length) {
        $scope.closeSection($section);
      }
    };
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