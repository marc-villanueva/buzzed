(function() {
  'use strict';

  angular.module('Buzzed.services', ['ngResource', 'LocalStorageModule']);
  angular.module('Buzzed.directives', ['Buzzed.services']);
  angular.module('Buzzed.controllers', ['Buzzed.services', 'Buzzed.directives']);


  var buzzed = angular.module('Buzzed', ['ngRoute', 'ui.bootstrap', 'templates', 'firebase',  'Buzzed.controllers']);

  buzzed.value('firebaseUrl', 'https://radiant-torch-198.firebaseio.com/');

  buzzed.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when("/",
        {
          templateUrl: "app/views/home.html",
          controller: "HomeCtrl as vm",
          resolve: {
            user: function(User) {
              return User.geolocateUser(false)
            }
          }}).
      when("/buzz",
        {
          templateUrl: "app/views/buzz.html",
          controller: "BuzzCtrl as vm",
          resolve: {
              user: function(User) {
                return User.geolocateUser(false)
              }
          }}).
      when("/fizz",
        {
          templateUrl: "app/views/fizz.html",
          controller: "FizzCtrl as vm",
          resolve: {
            user: function(User) {
              return User.geolocateUser(false)
            }
          }});

    $locationProvider.html5Mode(true);
  }]);

}());
