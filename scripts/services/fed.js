'use strict';

app.factory('Fed', 
	function($firebase, firebaseUrl, $rootScope, Auth) {
		
		var refDownload = new Firebase(firebaseUrl + 'dexterfeed');
		
		var ref = $firebase(refDownload).$asObject(); 
		
		/*
		refDownload.child('yesterdayAm/value').set(3);
		refDownload.child('yesterdayPm/value').set(4);
		refDownload.child('todayAm/value').set(1);
		refDownload.child('todayPm/value').set(2);
		
		refDownload.child('yesterdayAm/isFed').set(true);
		refDownload.child('yesterdayPm/isFed').set(true);
		refDownload.child('todayAm/isFed').set(true);
		refDownload.child('todayPm/isFed').set(true);
		
		refDownload.child('yesterdayAm/fedBy').set('MM');
		refDownload.child('yesterdayPm/fedBy').set('CH');
		refDownload.child('todayAm/fedBy').set('MC');
		refDownload.child('todayPm/fedBy').set('MM');
		*/
		
		
		var Fed = {
			
			values: ref,
			
			newDay: function() {
				console.log('newDay ran');
				ref.$loaded().then(function(values) {
					var todayAmValue = values.todayAm.isFed;
					var todayPmValue = values.todayPm.isFed;
					refDownload.child('yesterdayAm').update({isFed: todayAmValue});
					refDownload.child('yesterdayPm').update({isFed: todayPmValue});
					refDownload.child('todayAm').update({isFed: false, fedBy: ''}); //
					refDownload.child('todayPm').update({isFed: false, fedBy: ''}); //
				});
			},
			
			updateValue: function(when) {
				var value = ref[when].isFed;
				refDownload.child(when).update({fedBy: $rootScope.currentUser.initials});
				refDownload.child(when).update({color: $rootScope.currentUser.color});
				return refDownload.child(when).update({isFed: !value});
			},
			
			
			onComplete: function onComplete(error) {
				if (error) {
					console.log('Sync failed');
				} else {
				}
			}
	
			
		};

		return Fed;

	}
);