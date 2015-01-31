'use strict';

app.directive('ngScroll', function($timeout) {
	return {
		restrict: 'EA',
		require: ['?ngModel'],
		// always takes three below parameters. 
		// element is jqLite wrapped DOM element.
		// attrs is Javascript Object containing properties for all the attributes of the DOM element
		link: function(scope, element, attrs) {
			
			
			var loaded = function() {
				$('html, body').animate({scrollTop: 1060}, 'fast');
				return false;
				
			};
			
			$timeout(function() {
				$(element).find('chat').on('load', loaded());
			});

			
		}
			

	};
});