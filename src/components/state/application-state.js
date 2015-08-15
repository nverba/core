angular.module('Core:State', [])

angular.module('Core:State').factory('State', ['$rootScope', '$location', stateFactoryFn]);

function stateFactoryFn($rootScope, $location) {
	
	return {};
	
}
