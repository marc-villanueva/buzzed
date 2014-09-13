(function() {
  'use strict';

  angular.module('Buzzed.directives').directive('beerSearch', ['BrewerySearch', BeerSearch]);

  function BeerSearch(BrewerySearch) {

    return {
      replace: true,
      restrict: 'E',
      scope: {
        headerText: '@',
        beerSelection: '=',
        onCancel: '&'
      },
      templateUrl: 'app/views/directives/beer-search.html',
      link: link
    }

    function link(scope, elem, attrs) {
      var vm = {
        headerText: scope.headerText,
        query: '',
        submitted: false,
        items: [],
        search: search,
        selectBeer: selectBeer
      }

      scope.vm = vm;

      ////////////////

      function search(form) {
        vm.submitted = true;

        if (form.$valid) {
          BrewerySearch.query({q: vm.query}, function(data) {
            vm.items = data;
          });
        }
      }

      function selectBeer(beer) {
        scope.beerSelection = beer;
        scope.onCancel();
      }
    }
  }
}());
