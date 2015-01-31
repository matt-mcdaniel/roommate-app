'use strict';

app.factory('Msg',
	function($rootScope, $firebase, firebaseUrl) {
	
		var msgRef = new Firebase(firebaseUrl + 'messages');
		
		var msgChatLog = msgRef.limit(30);
		
		var chatLogMessages = $firebase(msgChatLog).$asArray();
	
		var Msg = {
			chatLog: chatLogMessages,
			
			getTen: msgChatLog.on('child_added', function (snapshot) {
				var val = snapshot.val();
				return val;
			}, function (errorObject) {
				console.log('The read failed: ' + errorObject.code);
			}),
			
			getAll: msgRef.on('child_added', function (snapshot) {
				var val = snapshot.val();
				return val;
			}, function (errorObject) {
				console.log('The read failed: ' + errorObject.code);
			}),
			
			send: function (msg) {
				var id = msgRef.push(msg).name();
				console.log(id);
				msgRef.child(id).update({id: id, initials: $rootScope.currentUser.initials, color: $rootScope.currentUser.color});
			},
				

		};
		
		return Msg;
		
	}
);