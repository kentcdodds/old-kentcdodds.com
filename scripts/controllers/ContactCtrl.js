'use strict';
(function() {
  var app = angular.module('kent');
  
  app.controller('ContactCtrl', function($scope, $location, networks, modals) {
    $scope.networks = networks;
    $scope.modals = modals;
    $scope.getBackgroundImage = function(networkName) {
      return './images/social/' + networkName + '-hover.png';
    };

    $scope.activatePhoneModal = function() {
      $scope.modals.activateModal('phone', $location);
    };
    
    $scope.$watch(function() {
      return $location.search();
    }, function() {
        var searchParams = $location.search();
        for (var i = 0, total = $scope.networks.length; i < total; i++) {
          var network = $scope.networks[i];
          if (searchParams[network.name] && network.action) {
            network.action($scope);
          }
        }
      }
    );
    
    
  });
})();
