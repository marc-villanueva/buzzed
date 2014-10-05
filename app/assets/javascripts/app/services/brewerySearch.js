(function() {
  'use strict';

  angular.module('Buzzed.services').factory('BrewerySearch', BrewerySearch);

  function BrewerySearch($resource) {
    return $resource('/search', {}, {});
  }

  BrewerySearch.$inject = ['$resource'];
}());
