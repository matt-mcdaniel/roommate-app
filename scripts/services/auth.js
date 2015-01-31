'use strict';

app.factory('Auth',
	function($rootScope, $location, $q, $timeout, $firebase, $firebaseSimpleLogin, firebaseUrl) {
		
		var refDownload = new Firebase(firebaseUrl + 'housemates');
	
		var sync = $firebase(refDownload); 
		
		var ref = sync.$asObject();
		
		var authClient = new FirebaseSimpleLogin(refDownload, function(error, user) {
			if (error) {
				$rootScope.error = error.code;
			}
			if (user) {
				// 1
				// user authenticated
				var deferred = $q.defer();
				$rootScope.$broadcast('login');
				
				deferred.promise.then(function() {
					$rootScope.$broadcast('foundStatus');
				});
			
				deferred.resolve(Auth.findById(user.id));


				// Auth.findById(user.id);				
			} else {
				var defer = $q.defer()
				$rootScope.$broadcast('logout');
				$rootScope.$broadcast('foundStatus');
			}
		});
	
		var Auth = {
			
			housemates: ref,
			
			changeColor: function(color) {
				var id = $rootScope.currentUser.id.toString();
				refDownload.child(id).update({ color: color });
				$rootScope.currentUser.color = color;
			},

			
			create: function(authUser, usr) {
				refDownload.child(authUser.id).set({
					initials: usr.initials,
					email: authUser.email,
					password: usr.password,
					color: 'Blue',
					id: authUser.id,
					uid: authUser.uid
				});
				
			},
			
			// 3
			findById: function(id) {
				refDownload.on('value', function(snapshot) {
						var data = snapshot.val();
						$rootScope.currentUser= data[id];
						return data[id];
					}, function (error) {
						console.log(error);
				});
			},
			
			login: function(user) {
				authClient.login('password', {
					email: user.email,
					password: user.password,
					rememberMe: true
				});
			},
			
			logout: function() {
				delete $rootScope.currentUser;
				return authClient.logout();
			},
			
			register: function(user) {
				var userSimple = user;
				authClient.createUser(user.email, user.password, function(error, user) {
					if(!error) {
						var userComplex = user;
						Auth.login(userSimple);
						Auth.create(userComplex, userSimple);
						return user;
					} else {
						console.log(error);
					}
				});
				
			},
			
			
		};

		return Auth;
	
	
	});