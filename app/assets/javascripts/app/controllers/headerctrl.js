(function() {
  'use strict';

  angular.module('Buzzed.controllers').controller('HeaderCtrl', HeaderCtrl);

  function HeaderCtrl($location) {
    var vm = this;
    vm.goTo = goTo;

    /////////////////////

    function goTo(url) {
      $location.path(url);
    }
  }
}());
