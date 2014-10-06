(function() {
  'use strict';

  angular.module('Buzzed.services').factory('User', User);

  function User($q, BuzzedFirebase, Location, Storage) {
    var service = {
      getUser: getUser,
      geolocateUser: geolocateUser,
      saveUser: saveUser,
      checkFizzForUser: checkFizzForUser
    };

    return service;

    ////////////////////////

    function getUser() {
      var cachedUser = Storage.getValue('currentUser');
      if (cachedUser) {
        return cachedUser;
      } else {
        var user = BuzzedUser.create(BuzzedFirebase);
        Storage.setValue('currentUser', user);
        return user;
      }
    }

    function geolocateUser(breakCache) {
      function successGetLocation(location) {
        user.location = location;
        saveUser(user);
        deferred.resolve(user);
      }

      function failureGetLocation(error) {
        console.log(error);
      }

      var deferred = $q.defer();
      var user = getUser();

      Location.getLocation(breakCache).then(successGetLocation, failureGetLocation);

      return deferred.promise;
    }

    function saveUser(user) {
      BuzzedUser.update(BuzzedFirebase, user);
      Storage.setValue('currentUser', user);
    }

    function checkFizzForUser(fizz, user) {
      angular.forEach(user.buzzes, function(buzz) {
        if (buzz.breweryDbId == fizz.beer.breweryDbId) {
          if (!fizzAlreadyExists(fizz, user)) {
            user.fizzBuzz.push(fizz);
            saveUser(user);
          }
        }
      })
    }

    function fizzAlreadyExists(fizz, user) {
      var exists = false;

      angular.forEach(user.fizzBuzz, function(fizzBuzz) {
        if (fizzBuzz.beer.breweryDbId == fizz.beer.breweryDbId &&
            fizzBuzz.place.googlePlaceId == fizz.place.googlePlaceId &&
            fizzBuzz.createdAt == fizz.createdAt) {
            exists = true;
            return;
        }
      });

      return exists;
    }
  }

  BuzzedUser.create = function(BuzzedFirebase) {
    var user = new BuzzedUser();
    var userRef = BuzzedFirebase.usersRef.push(user);
    user.id = userRef.name();

    userRef.update(user);
    return user;
  }

  BuzzedUser.update = function(BuzzedFirebase, user) {
    var clone = angular.extend({}, user);
    clone.buzzes = angular.copy(clone.buzzes);
    clone.fizzes = angular.copy(clone.fizzes);
    clone.fizzBuzz = angular.copy(clone.fizzBuzz);

    BuzzedFirebase.usersRef.child(user.id).set(clone);
  }

  function BuzzedUser() {
    this.id = -1;
    this.location = {
      lat: 32.7150,
      lng: -117.1625
    };
    this.buzzes = [];
    this.fizzes = [];
    this.fizzBuzz = [];
  }

  User.$inject = ['$q', 'BuzzedFirebase', 'Location', 'Storage'];
}());
