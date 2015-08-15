
angular.module('side:menu', []);
angular.module('side:menu').directive('sideMenu', ['$timeout', sideMenuFn]);

function sideMenuFn ($timeout) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: './js/directives/side-menu/side-menu.html',
    link: function(scope, elem, attrs) {

      var element = elem[0];
			var hasFocus = false;
			
			element.tabIndex = 1;
			
			// This toggle function can be refactored into a seperate directive for re-use
			
			scope.app.toggleMenu = function() {

				if (!hasFocus)	{
					$timeout(function () {
						hasFocus = true
					  element.focus()
					}, 0);
				} 
			}
			element.onblur = function() {
				$timeout(() => hasFocus = false, 300)
			}
    }
  };
}