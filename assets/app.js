var exampleApp = angular.module('exampleApp', ['ngRoute']);

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

  // default redirect to home page
  .when('/', {
    redirectTo: '/home',
  })

  // route for the home page
  .when('/home', {
    controller: 'homeController',
    templateUrl: 'assets/pages/home.tmpl.html'
  })

  // route for the demo page
  .when('/demo', {
    controller: 'demoController',
    templateUrl: 'assets/pages/demo.tmpl.html'
  })

  // default redirect
  .otherwise({
    redirectTo: '/'
  });
});

exampleApp.controller('homeController', function($scope) {
  // controller for the home view
});

exampleApp.controller('demoController', function($scope) {
  // controller for the demo view
});

exampleApp.directive('demo', function () {
  function link(scope, element, attrs) {
    // register DOM listeners and update DOM here
    scope.test = "World!"
  }

  return {
    restrict: 'E',
    templateUrl: 'assets/templates/demo.tmpl.html',
    link: link
  }
})
