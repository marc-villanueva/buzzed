(function() {
  'use strict';

  angular.module('Buzzed.controllers').controller('BuzzCtrl', ['user', BuzzCtrl]);

  function BuzzCtrl(user) {
    var vm = this;
    vm.user = user;

    initialize();
    ////////////////////////

    function initialize() {

    }
  }
}());
