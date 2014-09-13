(function() {
  'use strict';

  angular.module('Buzzed.directives').directive('fizz', ['FizzBuzz', 'User', Fizz]);

  function Fizz(FizzBuzz, User) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: 'app/views/directives/fizz.html',
      link: link
    }

    function link(scope, elem, attrs) {
      var vm = {
        mainToggle: true,
        beerSearchToggle: false,
        nearbyPlacesToggle: false,
        beerSelection: null,
        placeSelection: null,
        user: {},
        showBeerSearchForm: showBeerSearchForm,
        closeBeerSearchForm: closeBeerSearchForm,
        showNearbyPlacesForm: showNearbyPlacesForm,
        closeNearbyPlacesForm: closeNearbyPlacesForm,
        selectedBeer: selectedBeer,
        selectedPlace: selectedPlace,
        showSubmitButton: showSubmitButton,
        removeFizz: removeFizz,
        submit: submit
      }

      scope.vm = vm;

      scope.$watch('user', function(value) {
        if (value) {
          vm.user = value;
        }
      });

      /////////////////////////////

      function submit() {

        var icon = "";
        if (vm.beerSelection.labels) {
          icon = vm.beerSelection.labels.icon;
        }

        var beer = {
          breweryDbId: vm.beerSelection.id,
          name: vm.beerSelection.name,
          brewery: vm.beerSelection.breweries[0].name,
          icon: icon
        }

        var place = {
          googleId: vm.placeSelection.id,
          googlePlaceId: vm.placeSelection.place_id,
          vicinity: vm.placeSelection.vicinity,
          name: vm.placeSelection.name,
          location: {
            lat: vm.placeSelection.geometry.location.lat(),
            lng: vm.placeSelection.geometry.location.lng()
          }
        }

        var fizz = {
          place: place,
          beer: beer,
          createdAt: new Date().getTime(),
          userId: vm.user.id
        }

        vm.user.fizzes.push(fizz);
        User.saveUser(vm.user);
        FizzBuzz.saveFizz(fizz);
      }

      function removeFizz(index) {
        vm.user.fizzes.splice(index, 1);
        User.saveUser(vm.user);
      }

      function showSubmitButton() {
        return vm.beerSelection && vm.placeSelection;
      }

      function selectedBeer() {
        if (vm.beerSelection != null) {
          return vm.beerSelection.name;
        } else {
          return 'beer';
        }
      }

      function selectedPlace() {
        if (vm.placeSelection != null) {
          return vm.placeSelection.name;
        } else {
          return 'this place';
        }
      }

      function showBeerSearchForm() {
        vm.beerSearchToggle = true;
        vm.mainToggle = false;
        vm.nearbyPlacesToggle = false;
      }

      function closeBeerSearchForm() {
        vm.beerSearchToggle = false;
        vm.mainToggle = true;
        vm.nearbyPlacesToggle = false;
      }

      function showNearbyPlacesForm() {
        vm.beerSearchToggle = false;
        vm.mainToggle = false;
        vm.nearbyPlacesToggle = true;
      }

      function closeNearbyPlacesForm() {
        vm.beerSearchToggle = false;
        vm.mainToggle = true;
        vm.nearbyPlacesToggle = false;
      }

    }
  }
}());
