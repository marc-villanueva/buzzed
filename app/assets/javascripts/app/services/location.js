(function() {
  'use strict';

  angular.module('Buzzed.services').factory('Location', Location);

  function Location($q, Storage) {
    var service = {
      getLocation: getLocation,
      withinRadius: withinRadius,
      nearbyPlaces: nearbyPlaces
    };

    return service;

    ////////////////////////////

    function getLocation(breakCache) {
      var deferred = $q.defer();

      var location = breakCache ? null : Storage.getValue('userLocation');

      if(location) {
        deferred.resolve(location);
      } else if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var coords = {lat: position.coords.latitude, lng: position.coords.longitude}
          Storage.setValue('userLocation', coords)
          deferred.resolve(coords);
        });
      } else {
        deferred.reject({message: 'Browser gelocation rejected.'});
      }

      return deferred.promise;
    }

    function withinRadius(center, radius, point) {
      var squareDistance = Math.sqrt(Math.pow(center.lat - point.lat, 2) + Math.pow(center.lng - point.lng, 2));
      return squareDistance <= radius;
    }

    function nearbyPlaces(center, container) {
      var deferred = $q.defer();

      var params = {
        location: new google.maps.LatLng(center.lat, center.lng),
        rankBy: google.maps.places.RankBy.DISTANCE,
        types: ['bar', 'cafe', 'convenience_store', 'food', 'grocery_or_supermarket', 'liquor_store', 'night_club', 'restaurant']
      }

      var service = new google.maps.places.PlacesService(container);
      service.nearbySearch(params, function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          deferred.resolve(results);
        } else {
          deferred.reject();
        }
      });

      return deferred.promise;
    }
  }
}());
