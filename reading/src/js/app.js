var app = angular.module("thisApp", ['ngSanitize']);

var txts= function($scope, $http) {
  $http.get('src/txts.json').
    success(function(data, status, headers, config) {
      $scope.txts = data;
      $scope.random = function(){return 0.5 - Math.random();};
    }).
    error(function(data, status, headers, config) {
      // log error
    })
};
