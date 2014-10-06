(function() {
  'use strict';

  angular.module('Buzzed.controllers').controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope, $location, $timeout, User, BuzzedFirebase, user) {
    var vm = this;
    vm.user = user;
    vm.fizzes = [];
    vm.buzzes = [];

    initialize();
    //////////////////

    function initialize() {
      BuzzedFirebase.fizzesRef.limit(10).on('child_added', function(snapshot) {
        $timeout(function() {
          var fizz = snapshot.val();
          if (fizz.userId != vm.user.id) {
            vm.fizzes.unshift(fizz);
            User.checkFizzForUser(fizz, vm.user);
          }
        });
      });

      BuzzedFirebase.buzzesRef.limit(10).on('child_added', function(snapshot) {
        $timeout(function() {
          var buzz = snapshot.val();
          if (buzz.userId != vm.user.id)  {
            vm.buzzes.unshift(buzz);
          }
        });
      });
    }
  }

  HomeCtrl.$inject = ['$scope', '$location', '$timeout', 'User', 'BuzzedFirebase', 'user'];
}());
