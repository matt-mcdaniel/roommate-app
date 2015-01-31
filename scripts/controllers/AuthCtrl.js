'use strict';

app.controller('AuthCtrl',
	function($rootScope, $scope, $timeout, $location, Auth) {

		if ('addEventListener' in document) {
			document.addEventListener('DOMContentLoaded', function() {
				FastClick.attach(document.body);
			}, false);
		}
		
		$scope.userStatus = false;
		
		$rootScope.$on('foundStatus', function() {
			console.log('$on ran');
			$scope.userStatus = true;
		});
		
		$rootScope.$on('login', function() {
			console.log('broadcast login')
			$scope.signedIn = true;
			$location.path('/dexter');
			$scope.$apply();
		});
		
		$rootScope.$on('logout', function() {
			console.log('broadcast logout');
			$scope.signedIn = false;
			$scope.$apply();
		});
		
		$scope.register = function() {
			if ($scope.user !== undefined) {
				$scope.signedIn = true;
				Auth.register($scope.user);
				$location.path('/dexter');
		} else {
			console.log('nothing entered');
			}
		};
		
		$scope.login = function() {
			return Auth.login($scope.user);
		};

	
		$scope.chatCat = {name: 'Chat', url: '#/chat', icon: 'glyphicon glyphicon-envelope', active: ''};
		
		$scope.todoCat = {name: 'To-Do', url: '#/todo', icon: 'glyphicon glyphicon-th-list', active: ''};
		
		$scope.dexterCat = {name: 'Dex', url: '#/dexter', icon: 'images/bowl-01.png', active: 'active'};
		
		$scope.userProfile = {name: 'User Profile', url: '#/profile', icon: 'glyphicon glyphicon-user', active: ''};
	
		$scope.loginCat = {name: 'Login', url: '#/login', active: ''};
		
		$scope.registerCat = {name: 'Register', url: '#/register', active: ''};
	
	});
