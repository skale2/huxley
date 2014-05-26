/**
 * Copyright (c) 2011-2014 Berkeley Model United Nations. All rights reserved.
 * Use of this source code is governed by a BSD License (see LICENSE).
 */

var ActionConstants = require('../constants/ActionConstants');
var Dispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _currentUser = {};

var CurrentUserStore = merge(EventEmitter.prototype, {
  getCurrentUser: function() {
    return _currentUser;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

Dispatcher.register(function(action) {
  switch (action.actionType) {
    case ActionConstants.LOGIN:
      _currentUser = action.user;
      break;
    case ActionConstants.LOGOUT:
      _currentUser = {};
      break;
  }

  CurrentUserStore.emitChange();
});

module.exports = CurrentUserStore;
