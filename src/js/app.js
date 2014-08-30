var app = angular.module("thisApp", ['ngSanitize']);

var ntwks= function($scope, $http) {
  $http.get('/src/jsons/networks.json').
    success(function(data, status, headers, config) {
      $scope.ntwks = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
};

var people = function($scope, $http) {
  $http.get('/src/jsons/people.json').
    success(function(data, status, headers, config) {
      $scope.people = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
};

var apps= function($scope, $http) {
  $http.get('/src/jsons/apps.json').
    success(function(data, status, headers, config) {
      $scope.apps = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
};