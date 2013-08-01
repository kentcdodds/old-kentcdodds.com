'use strict';
(function() {
  var app = angular.module('kent');
  
  app.controller('MainCtrl', function($scope, $location, sections, ModalState, ie) {
    var i, total;
    var isSectionIsActive;

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

    $scope.$on('ModalState.update', function(event, state) {
      $scope.modalActive = state;
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
})();
