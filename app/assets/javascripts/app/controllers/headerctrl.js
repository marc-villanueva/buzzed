(function() {
  'use strict';

  angular.module('Buzzed.controllers').controller('HeaderCtrl', HeaderCtrl);

  function HeaderCtrl($location, User) {
    var vm = this;
    vm.user = User.getUser();
    vm.goTo = goTo;

    /////////////////////

    function goTo(url) {
      $location.path(url);
    }
  }

  HeaderCtrl.$inject = ['$location', 'User'];
}());
