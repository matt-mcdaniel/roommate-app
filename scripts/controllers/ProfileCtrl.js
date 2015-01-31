'use strict';

app.controller('ProfileCtrl',
	function($rootScope, $scope, $location, Auth) {
		
		$scope.initials = '';
		
		// to store to Firebase
		$scope.changeColor = function(color) {
			Auth.changeColor(color);
		};
		
		// for ng-class of "current color"
		$scope.chooseColor = function(color) {
			switch (color) {
			case 'Green':
				return 'alert alert-success';
			case 'Yellow':
				return 'alert alert-warning';
			case 'Red':
				return 'alert alert-danger';
			case 'Blue':
				return 'alert alert-info';
			}
		};
		
		$scope.logout = function() {
			$rootScope.signedIn = false;
			$location.path('/home');
			Auth.logout();
			delete $rootScope.currentUser;
		};
	
		
	});