'use strict';

app.controller('TodoCtrl', 
	function($rootScope, Auth, $scope, Todo) {
	
		$scope.items = Todo.list;
		
		// gets number of checked items, adds to selectedItems
    $scope.$watch('items', function(items){
      var selectedItems = 0;
      angular.forEach(items, function(item){
        selectedItems += item.completed ? 1 : 0;
      });
      $scope.selectedItems = selectedItems;
			$scope.value(selectedItems);
    }, true);
		
		// value of progress bar
		$scope.value = function(selectedItems) {
			var checked = selectedItems;
			var total = $scope.items.length;
			var percentage = (checked/total) * 100;
			$scope.percentage = percentage;
		};        
		
		$scope.item = '';
		
		// update firebase value
		$scope.changeValue = function changeValue(item) {
			Todo.updateValue(item);
		};
		
		$scope.submitItem = function() {
			if (!$scope.item.length) {
				return;
			}
			Todo.submit($scope.item);
			$scope.item = '';
		};
		
		$scope.enterPress = function($event) {
			if ($event.which === 13) {
				$scope.submitItem();
			}
		};
		
		$scope.deleteItem = function(item) {
			Todo.deleteItem(item);
		};
		
		// green or gray checkbox if completed/not completed
		$scope.itemCompleted = function(completed) {
			if (completed) {
				return 'glyphicon glyphicon-ok checkbox-completed inline';
			} else {
				return 'glyphicon glyphicon-ok vertical-centered';
			}
		};
		
		// delete function in DOM
		$scope.postOwner = function(posterInitials) {
			var currentInitials = $rootScope.currentUser.initials;
			if (posterInitials === currentInitials) {
				return true;
			} else {
				return false;
			}
		};
		
		
		

});