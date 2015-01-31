'use strict';

app.directive('enter', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('mouseenter', function() {
				element.addClass(attrs.enter);
			})
		}
	}
	
});

app.directive('leave', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('mouseleave', function() {
				element.removeClass(attrs.leave);
			})
		}
	}
	
});