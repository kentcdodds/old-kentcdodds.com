'use strict';
(function() {
  var app = angular.module('kent');

  app.value('modals', (function() {
    var modalsStuff = {};
    var modals = {};
    
    var addModal = function(name, classToAdd) {
      modals[name] = {
        active: false,
        classToAdd: classToAdd
      };
    };

    modalsStuff.isModalActive = function() {
      for (var name in modals) {
        if (modals[name].active) {
          return true;
        }
      }
      return false;
    };
    
    modalsStuff.activateModal = function(name, $location) {
      modalsStuff.deactivateModals($location);
      if ($location) {
        $location.search(name, true);
      }
      modals[name].active = true;
    };
    
    modalsStuff.deactivateModals = function($location) {
      for (var name in modals) {
        modals[name].active = false;
        if ($location) {
          $location.search(name, null);
        }
      }
    };
    
    addModal('phone', 'blur');
    modalsStuff.modals = modals;
    return modalsStuff;
  })());
})();