angular.module('kent').controller('SocialCtrl', ['$scope', 'socialFactory', '$routeParams', '$location', function($scope, socialFactory, $routeParams, $location) {
  $scope.viewMore = false;
  $scope.mainNetworks = socialFactory.getMainNetworks();
  $scope.otherNetworks = socialFactory.getOtherNetworks();
  
  $scope.getBackgroundImage = function(networkName) {
    return '/images/' + networkName + '-hover.png';
  };
  
  $scope.mainNetworkClick = function(index) {
    if ($scope.mainNetworks[index].onClick) {
      $scope.mainNetworks[index].onClick($scope);
    }
  };
  
  $scope.otherNetworkClick = function(index) {
    if ($scope.otherNetworks[index].onClick) {
      $scope.otherNetworks[index].onClick($scope);
    }
  };
  
  var searchParams = $location.search();
  var clickSearchParams = function(networks) {
    for (var i = 0; i < networks.length; i++) {
      var network = networks[i];
      if (searchParams[network.name] === 'true') {
        network.onClick($scope);
      }
    }
  }
  
  clickSearchParams($scope.mainNetworks);
  clickSearchParams($scope.otherNetworks);
}]);