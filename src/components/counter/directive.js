
angular.module('App:Counter', []);
angular.module('App:Counter').controller('CounterController', ['$scope', 'State', CounterControllerFn]);
angular.module('App:Counter').directive('counter', ['State', counterFn]);

function CounterControllerFn($scope, State) {
  
  // Create a Redux store holding the state of your app.
  // Its API is { subscribe, dispatch, getState }.
  let store = State.createStore(counter);
  
  var bindCount = angular.bind(this, function() {
    this.count = store.getState();
  })
  bindCount();
  
  function counter(state = 0, action) {
    switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
    }
  }
 
  // You can subscribe to the updates manually, or use bindings to your view layer.
  store.subscribe(bindCount);

  this.increment = function() { console.log('inc');
    store.dispatch({ type: 'INCREMENT' });
  }
  
  this.decrement = function() { console.log('dec');
    store.dispatch({ type: 'DECREMENT' });
  }
  
}

function counterFn (State) {
  return {
    restrict: 'A',
    scope: {},
    controller: 'CounterController',
    controllerAs: 'Counter',
    templateUrl: './components/counter/template.html',
    link: function(scope, elem, attrs) {
	
      
      
    }
  };
}