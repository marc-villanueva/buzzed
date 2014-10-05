(function() {
  'use strict';

  angular.module('Buzzed.services').factory('BrewerySearch', ['$resource', BrewerySearch]);

  function BrewerySearch($resource) {
    return $resource('/search', {}, {});
  }
}());
