(function() {
  'use strict';

  angular.module('Buzzed.services').factory('FizzBuzz', FizzBuzz);

  function FizzBuzz(BuzzedFirebase) {
    var service = {
      saveFizz: saveFizz,
      saveBuzz: saveBuzz
    };

    return service;

    ////////////////////////

    function saveFizz(fizz) {
      BuzzedFirebase.fizzesRef.push(fizz);
    }

    function saveBuzz(buzz) {
      BuzzedFirebase.buzzesRef.push(buzz);
    }
  }

  FizzBuzz.$inject = ['BuzzedFirebase'];
}());
