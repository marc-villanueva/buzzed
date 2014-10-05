(function() {
  'use strict';

  angular.module('Buzzed.services', ['ngResource', 'LocalStorageModule']);
  angular.module('Buzzed.directives', ['Buzzed.services']);
  angular.module('Buzzed.controllers', ['Buzzed.services', 'Buzzed.directives']);


  var buzzed = angular.module('Buzzed', ['ngRoute', 'ui.bootstrap', 'templates', 'firebase',  'Buzzed.controllers']);

  buzzed.value('firebaseUrl', 'https://radiant-torch-198.firebaseio.com/');

  buzzed.constant('UserService',{
      user : ['User',function(User){
        return User.geolocateUser(false)
      }]
  });

  buzzed.config(['$routeProvider', '$locationProvider', '$injector', function($routeProvider, $locationProvider, $injector) {
    $routeProvider.
      when("/",
        {
          templateUrl: "app/views/home.html",
          controller: "HomeCtrl as vm",
          resolve: $injector.get('UserService')
        }).
      when("/buzz",
        {
          templateUrl: "app/views/buzz.html",
          controller: "BuzzCtrl as vm",
          resolve: $injector.get('UserService')
        }).
      when("/fizz",
        {
          templateUrl: "app/views/fizz.html",
          controller: "FizzCtrl as vm",
          resolve: $injector.get('UserService')
        });

    $locationProvider.html5Mode(true);
  }]);

}());
