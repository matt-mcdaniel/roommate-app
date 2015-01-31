'use strict';

app.controller('ChatCtrl', 
	function($rootScope, $scope, Msg, Auth) {
		
		$scope.auth = Auth.housemates;
		
		$scope.msg = '';
		
		$scope.messages = Msg.chatLog;
		
		$scope.enterPress = function($event) {
			if ($event.which === 13) {
				$scope.submitMsg();
			}
		};
		
		$scope.submitMsg = function() {
			if ($scope.msg.message ===  undefined) {
				return;
			}
			Msg.send($scope.msg);
			$scope.msg = '';
		};
		
		// messages appear on left or right accordingly
		$scope.isOdd = function isEven (index) {
			if (index > 1) {
				if (index % 2 === 0) {
					return false;
				} else {
					return true;
				}
			} else if (index === 1) {
				return true;
			} else {
				return false;
			}
		};
		
		$scope.whichColor = function (color) {
			switch (color) {
			case 'Red':
				//return 'alert alert-danger';
				return 'red-chat';
			case 'Yellow':
				//return 'alert alert-warning';
				return 'yellow-chat';
			case 'Green':
				//return 'alert alert-success';
				return 'green-chat';
			case 'Blue':
				//return 'alert alert-info';
				return 'blue-chat';
			}
		};
		

});