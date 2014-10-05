(function() {
  'use strict';

  angular.module('Buzzed.services').factory('User', User);

  function User($q, BuzzedFirebase, Location, Storage) {
    var service = {
      getUser: getUser,
      geolocateUser: geolocateUser,
      saveUser: saveUser
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
    var buzzes = angular.copy(clone.buzzes);
    var fizzes = angular.copy(clone.fizzes);
    delete clone.buzzes;
    delete clone.fizzes;

    BuzzedFirebase.usersRef.child(user.id).set(clone);
    if (buzzes) {
      BuzzedFirebase.usersRef.child(user.id).child('buzzes').set(buzzes);
    }

    if (fizzes) {
      BuzzedFirebase.usersRef.child(user.id).child('fizzes').set(fizzes);
    }
  }

  function BuzzedUser() {
    this.id = -1;
    this.location = {
      lat: 32.7150,
      lng: -117.1625
    };
    this.buzzes = [];
    this.fizzes = [];
  }

  User.$inject = ['$q', 'BuzzedFirebase', 'Location', 'Storage'];
}());
