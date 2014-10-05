(function() {
  'use strict';

  angular.module('Buzzed.controllers').controller('HomeCtrl', ['$scope', '$location', 'User', 'BuzzedFirebase', 'user', HomeCtrl]);

  function HomeCtrl($scope, $location, User, BuzzedFirebase, user) {
    var vm = this;
    vm.user = user;
    vm.fizzes = [];
    vm.goTo = goTo;


    initialize();
    //////////////////

    function initialize() {
      BuzzedFirebase.fizzesRef.limit(10).on('child_added', function(snapshot) {
        $scope.$apply(function() {
          vm.fizzes.unshift(snapshot.val());
        });
      });
    }

    function goTo(url) {
      $location.path(url);
    }
  }
}());
