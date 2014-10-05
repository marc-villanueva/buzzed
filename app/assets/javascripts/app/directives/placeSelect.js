(function() {
  'use strict';

  angular.module('Buzzed.directives').directive('placeSelect', PlaceSelect);

  function PlaceSelect(Location) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        placeSelection: '=',
        userLocation: '=',
        onCancel: '&'
      },
      templateUrl: 'app/views/directives/place-select.html',
      link: link
    }

    function link(scope, elem, attrs) {
      var vm = {
        userLocation: {},
        items: [],
        selectPlace: selectPlace,
        findLocation: findLocation,
        loadingData: true
      }

      scope.vm = vm;

      scope.$watch('userLocation', function(value) {
        if (value) {
          Location.nearbyPlaces(value, elem.find('.map-container').get(0)).then(
            function(results) {
              vm.items = results;
              vm.loadingData = false;
            },
            function() {
              vm.items = [];
              vm.loadingData = false;
            });
        }
      })

      //////////////////////

      function selectPlace(place) {
        scope.placeSelection = place;
        scope.onCancel();
      }

      function findLocation() {
        vm.loadingData = true;
        scope.$emit('geolocate-user');
      }
    }
  }

  PlaceSelect.$inject = ['Location'];
}());
