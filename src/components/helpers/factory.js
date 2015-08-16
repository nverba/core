angular.module('Core:And', [])

angular.module('Core:And').factory('And', [andFactoryFn]);

function andFactoryFn() {
  
	return {
		
		applyChanges: function applyChangesFn(newValue, oldValue) {
			
	    if (!angular.equals(newValue, oldValue)) {
	      angular.extend(this, newValue);
	    }
	  }
	};
}
