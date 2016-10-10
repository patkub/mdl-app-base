var exampleApp = angular.module('exampleApp', ['ngRoute', 'ngTemplates']);

// controller for the main app
exampleApp.controller('appCtrl', function($scope, $location) {
  // initialize data
  $scope.data = {};

  // current path
  $scope.location = $location;
});

// page routing
exampleApp.config(function($routeProvider) {
  $routeProvider

  // default article page
  .when('/', {
    templateUrl: 'assets/pages/article.tmpl.html'
  })

  // default redirect
  .otherwise({
    redirectTo: '/'
  });
});
