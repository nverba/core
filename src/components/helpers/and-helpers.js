angular.module('and.helpers', [])

angular.module('and.helpers').factory('And', [andFactoryFn]);

function andFactoryFn() {
  
	return {
		
		applyChanges: function applyChangesFn(newValue, oldValue) {
			
	    if (!angular.equals(newValue, oldValue)) {
	      angular.extend(this, newValue);
	    }
	  }
	};
}
