'use strict';
(function() {
  var app = angular.module('kent');
  
  app.service('ModalState', function($rootScope) {
    var modalState = {};
    var addState = function(name) {
      var state = {};
      state.active = false;
      state.setState = function(newActivityState) {
        state.active = newActivityState;
        $rootScope.$broadcast('ModalState.' + name + '.update', state.active);
        $rootScope.$broadcast('ModalState.update', state.active, name);
        return state;
      };
      state.toggle = function() {
        return state.setState(!state.active);
      };
      state.backgroundClass = 'blur';
      modalState[name] = state;
    };
    
    addState('phone');
    
    return modalState;
  });
})();