'use strict';
(function() {
  var app = angular.module('kent');
  app.controller('ModalCtrl', function($scope, ModalState) {
    $scope.phoneModalActive = false;

    $scope.closeModal = function(index) {
      switch(index) {
        case 0:
          ModalState.phone.setState(false);
          break;
        default:
          break;
      }
    };
    $scope.$on('ModalState.phone.update', function(event, state) {
      $scope.phoneModalActive = state;
    });
  });
})();