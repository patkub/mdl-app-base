var exampleApp = angular.module('exampleApp', ['ngRoute', 'ngTemplates']);

// controller for the main app
exampleApp.controller('appCtrl', function($scope, $location) {
  // initialize data
  $scope.data = {};

  // current path
  $scope.location = $location;

  // close drawer
  $scope.closeDrawer = function() {
    document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible');
    document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible');
  }
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
  }

  return {
    restrict: 'E',
    templateUrl: 'assets/templates/demo.tmpl.html',
    scope: {
      test: '@'
    },
    link: link
  }
})
