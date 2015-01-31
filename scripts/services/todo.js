'use strict';

app.factory('Todo',
	function($firebase, firebaseUrl, $rootScope, Dte, Auth) {
	
		var ref = new Firebase(firebaseUrl + 'todo');
	
		var todoList = $firebase(ref).$asArray();
		
		var Todo = {
			
			list: todoList,

			submit: function(item) {
				var id = ref.push({title: item, completed: false}).name();
				ref.child(id).update({id: id, initials: $rootScope.currentUser.initials, color: $rootScope.currentUser.color, date: Dte.currentMonth() + ' ' + Dte.currentDate()});
			},
			
			updateValue: function(item) {
				var value = item.completed;
				var path = item.$id;
				return ref.child(path).update({completed: !value});
			},
			
			deleteItem: function(item) {
				ref.child(item.id).remove();
			},
			

		};
		
		return Todo;
		
	}
);