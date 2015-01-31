'use strict';

/**
 * @ngdoc overview
 * @name harrisonApp
 * @description
 * # harrisonApp
 *
 * Main module of the application.
 */

 if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }

var app = angular.module('harrisonApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
		'firebase'
  ]);
  
  app.constant('firebaseUrl', 'https://harrison.firebaseIO.com/');
  
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller:'AuthCtrl'
			})
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
			})
      .when('/dexter', {
        templateUrl: 'views/dexter.html',
        controller: 'DexterCtrl'
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'TodoCtrl'
			})
			.when('/profile', {
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'AuthCtrl'
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'AuthCtrl'
			})
			/*
			.when('/prelogin', {
				templateUrl: 'views/dexter.html',
				controller: 'DexterCtrl'
			})
			*/
      .otherwise({
        redirectTo: '/'
      });
  });

	

