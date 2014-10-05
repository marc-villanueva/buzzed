(function() {
  'use strict';

  angular.module('Buzzed.services').factory('Storage', Storage);

  function Storage(localStorageService) {
    var service = {
      setValue: setValue,
      getValue: getValue,
      deleteValue: deleteValue,
      clearAll: clearAll
    }

    return service;

    ///////////////////////

    function setValue(key, value) {
      localStorageService.set(key, value);
    }

    function getValue(key) {
      return localStorageService.get(key);
    }

    function deleteValue(key) {
      localStorageService.remove(key);
    }

    function clearAll() {
      localStorageService.clearAll();
    }
  }

  Storage.$inject = ['localStorageService'];
}());
