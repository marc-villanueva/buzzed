(function() {
  'use strict';

  angular.module('Buzzed.services').factory('BuzzedFirebase', BuzzedFirebase)

  function BuzzedFirebase(firebaseUrl, $firebase) {
    var ref = new Firebase(firebaseUrl);

    var service = {
      rootRef: ref,
      usersRef: ref.child('users'),
      fizzesRef: ref.child('fizzes'),
      buzzesRef: ref.child('buzzes')
    };

    return service;
  }

  BuzzedFirebase.$inject = ['firebaseUrl', '$firebase'];
}());
