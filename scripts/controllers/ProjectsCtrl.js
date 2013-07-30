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

})();
