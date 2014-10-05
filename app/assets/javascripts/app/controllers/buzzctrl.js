(function() {
  'use strict';

  angular.module('Buzzed.controllers').controller('BuzzCtrl', BuzzCtrl);

  function BuzzCtrl(user) {
    var vm = this;
    vm.user = user;

    initialize();
    ////////////////////////

    function initialize() {

    }
  }

  BuzzCtrl.$inject = ['user'];
}());
