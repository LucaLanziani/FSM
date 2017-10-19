(function() {
  var FSM, exports;

  FSM = {};

  FSM.Machine = (function() {
    function Machine(context) {
      this.context = context;
      this._stateTransitions = {};
      this._stateTransitionsAny = {};
      this._defaultTransition = null;
      this._initialState = null;
      this._currentState = null;
    }

    Machine.prototype.addTransition = function(action, state, nextState, onEnter, onState) {
      if (!nextState) {
        nextState = state;
      }
      return this._stateTransitions[[action, state]] = [nextState, onEnter, onState];
    };

    Machine.prototype.addTransitions = function(actions, state, nextState, onEnter, onState) {
      var action, _i, _len, _results;
      if (!nextState) {
        nextState = state;
      }
      _results = [];
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        _results.push(this.addTransition(action, state, nextState, onEnter, onState));
      }
      return _results;
    };

    Machine.prototype.addTransitionAny = function(state, nextState, onEnter, onState) {
      if (!nextState) {
        nextState = state;
      }
      return this._stateTransitionsAny[state] = [nextState, onEnter, onState];
    };

    Machine.prototype.setDefaultTransition = function(state, onEnter, onState) {
      return this._defaultTransition = [state, onEnter, onState];
    };

    Machine.prototype.getTransition = function(action, state) {
      if (this._stateTransitions[[action, state]]) {
        return this._stateTransitions[[action, state]];
      } else if (this._stateTransitionsAny[state]) {
        return this._stateTransitionsAny[state];
      } else if (this._defaultTransition) {
        return this._defaultTransition;
      }
    };

    Machine.prototype.getCurrentState = function() {
      return this._currentState;
    };

    Machine.prototype.setInitialState = function(state) {
      this._initialState = state;
      if (!this._currentState) {
        return this.reset();
      }
    };

    Machine.prototype.reset = function() {
      return this._currentState = this._initialState;
    };

    Machine.prototype.process = function(action, options) {
      var result;
      result = this.getTransition(action, this._currentState);
      if (!result) {
        return;
      }
      if (result[1] && (result[1].call(this.context || (this.context = this), action, options) === false)) {
        return false;
      }
      this._currentState = result[0];
      if (result[2]) {
        return result[2].call(this.context || (this.context = this), action, options);
      }
    };

    return Machine;

  })();

  if (typeof window !== 'undefined') {
    window.FSM = FSM;
  }

  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = FSM;
  }

}).call(this);
