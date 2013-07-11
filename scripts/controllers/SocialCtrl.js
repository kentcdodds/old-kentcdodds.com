app.controller('SocialCtrl', ['$scope', 'socialFactory', '$routeParams', '$location', function($scope, socialFactory, $routeParams, $location) {
  $scope.networks = socialFactory.getNetworks();
  $scope.getBackgroundImage = function(networkName) {
    return '/images/' + networkName + '-hover.png';
  };
  $scope.click = function(index) {
    if ($scope.networks[index].click) {
      $scope.networks[index].click($scope);
    }
  }

  var searchParams = $location.search();
  for (var i = 0; i < searchParams.length; i++) {
    
  }
//  if ($location.search().phone === 'true') {
//    for (var j = 0; i < $scope.networks.length; i++) {
//      if ()
//    }
//  }
}]);