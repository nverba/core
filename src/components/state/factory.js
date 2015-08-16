import { createStore } from 'redux';

angular.module('Core:State', [])
angular.module('Core:State').factory('State', [stateFactoryFn]);

function stateFactoryFn($rootScope, $location) {
	
	return { createStore: createStore }
	
}
