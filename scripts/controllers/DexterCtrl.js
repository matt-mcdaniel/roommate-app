'use strict';

app.controller('DexterCtrl', 
	function($scope, Auth, $timeout, Dte, Fed) {
		
		// testing out Date Factory
		// Dte.setLastUpdated(22);
		
		Dte.load();
		
		$scope.bowl = Fed.values;

		$scope.day = Dte.currentDay();
		$scope.month = Dte.currentMonth();
		$scope.date = Dte.currentDate();
		$scope.prevDay = Dte.previousDay();
		$scope.prevMonth = Dte.previousMonth();
		$scope.prevDate = Dte.previousDate();
		
		
		var filled = 'images/dextergreenfilled-01.svg';
		var satFilled = 'images/SATdextergreenfilled.svg';
		var empty = 'images/dextergrayempty-01.svg';
		var satEmpty = 'images/SATdextergreenempty.svg';
		
		// click action
		$scope.changeValue = function changeValue(when) {
			Fed.updateValue(when);
		};


		$scope.saturated = function(whenValue) {
			if (whenValue) {
				return filled;
			} else {
				return empty;
			}
		};
		
		$scope.unsaturated = function(whenValue) {
			if (whenValue) {
				return satFilled;
			} else {
				return satEmpty;
			}
		};
	
		
		$scope.whichColor = function (color) {
			switch (color) {
			case 'Red':
				return 'alert alert-danger';
			case 'Yellow':
				return 'alert alert-warning';
			case 'Green':
				return 'alert alert-success';
			case 'Blue':
				return 'alert alert-info';
			}
		};

		
		



	});
