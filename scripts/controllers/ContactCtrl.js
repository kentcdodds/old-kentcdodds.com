'use strict';
(function() {
  var app = angular.module('kent');
  
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
