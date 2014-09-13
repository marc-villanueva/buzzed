(function() {
  'use strict';

  angular.module('Buzzed.directives').directive('buzz', ['FizzBuzz', 'User', Buzz]);

  function Buzz(FizzBuzz, User) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: 'app/views/directives/buzz.html',
      link: link
    }

    function link(scope, elem, attrs) {
      var vm = {
        mainToggle: true,
        beerSearchToggle: false,
        beerSelection: null,
        showBeerSearchForm: showBeerSearchForm,
        closeBeerSearchForm: closeBeerSearchForm,
        selectedBeer: selectedBeer,
        showSubmitButton: showSubmitButton,
        removeBuzz: removeBuzz,
        submit: submit,
        user: {}
      };

      scope.vm = vm;

      scope.$watch('user', function(value) {
        if (value) {
          vm.user = value;
        }
      });

      ////////////////////////

      function submit() {
        var icon = "";
        if (vm.beerSelection.labels) {
          icon = vm.beerSelection.labels.icon;
        }

        var buzz = {
          breweryDbId: vm.beerSelection.id,
          name: vm.beerSelection.name,
          brewery: vm.beerSelection.breweries[0].name,
          icon: icon,
          userId: vm.user.id
        }

        vm.user.buzzes.push(buzz);
        User.saveUser(vm.user);
        FizzBuzz.saveBuzz(buzz)
      }

      function removeBuzz(index) {
        vm.user.buzzes.splice(index, 1);
        User.saveUser(vm.user);
      }

      function showSubmitButton() {
        return vm.beerSelection;
      }

      function selectedBeer() {
        if (vm.beerSelection != null) {
          return vm.beerSelection.name;
        } else {
          return 'beer';
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
    }
  }
}());
