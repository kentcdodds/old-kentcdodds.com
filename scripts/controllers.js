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


  app.controller('MainCtrl', function($scope, $location, sections, ie, ga) {
    var i, total;
    var isSectionIsActive;

    ga('set', 'dimension1', 'Hello!');
    ga('send', 'pageview', {title: 'Hello world!'});

    $scope.isIE = !!ie;
    $scope.showIEMessage = true;
    $scope.showOfflineMessage = true;
    $scope.underConstruction = true;
    $scope.sectionSelected = false;
    $scope.sections = sections;
    
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

    $scope.closeSection = function() {
      $location.path('/');
    };

    $scope.keyUp = function(event) {
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

  app.controller('ProjectsCtrl', function($scope, projects) {
    $scope.underConstruction = true;

    var getPanelAt = function(index) {
      return $('#bl-panel-work-items > [data-panel=panel-' + index + ']');
    };

    var getCurrentPanel = function() {
      return getPanelAt($scope.currentPanelIndex);
    };

    $scope.projects = projects;

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
  
  app.controller('ContactCtrl', function($scope, $location, networks) {
    var searchParams;

    $scope.networks = networks;
    $scope.getBackgroundImage = function(networkName) {
      return './images/social/' + networkName + '-hover.png';
    };

    $scope.networkClick = function(index) {
      if ($scope.networks[index].onClick) {
        $scope.networks[index].onClick($scope);
      }
    };
    
    $scope.closePhoneModal = function() {
      $('#modal-16').removeClass('md-show');
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