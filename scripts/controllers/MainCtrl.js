'use strict';
(function() {
  var app = angular.module('kent');
  
  app.controller('MainCtrl', function($scope, $location, sections, modals, ie) {
    var i, total;
    var isSectionIsActive;

    $scope.isIE = !!ie;
    $scope.showIEMessage = true;
    $scope.showOfflineMessage = true;
    $scope.underConstruction = true;
    $scope.showUnderConstructionMessage = true;
    $scope.sectionSelected = false;
    $scope.sections = sections;
    $scope.modals = modals;
    
    $scope.deactivateModals = function() {
      $scope.modals.deactivateModals($location);
    }

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

    $scope.$watch($scope.modals.isModalActive, function() {
      $scope.modalActive = $scope.modals.isModalActive();
    });
    
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
      if (modals.isModalActive()) {
        $scope.deactivateModals();
      } else {
        $scope.closeSection();
      }
    };
  });
})();
