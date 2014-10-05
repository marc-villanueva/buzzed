(function() {
  'use strict';

  angular.module('Buzzed.controllers').controller('FizzCtrl', FizzCtrl);

  function FizzCtrl($scope, User, user) {
    var vm = this;
    vm.user = user;

    ////////////////////////

    function successGetLocation(user) {
      vm.user = user;
    }

    function failureGetLocation(error) {
      console.log(error);
    }

    $scope.$on('geolocate-user', function() {
      User.geolocateUser(true).then(successGetLocation, failureGetLocation);
    });

  }

  FizzCtrl.$inject = ['$scope', 'User', 'user'];
}());
