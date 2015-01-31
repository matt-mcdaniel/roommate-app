'use strict';

app.factory('Dte', 
	function($firebase, firebaseUrl, Fed) {
		
		var dateRef = new Firebase(firebaseUrl + 'date');
		
		var dateSync = $firebase(dateRef).$asArray();
		
		var date = new Date();
		
		var prevDate = new Date();
		
		prevDate.setDate(prevDate.getDate() - 1);
		
		/* use set firebase method to replace number of currentday, then use "on value update" to set yesterdayAm and yesterdayPm */
		
		var days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
		
		var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		
		var Dte = {
			
			currentDate: function() {
				dateRef.update({date: date.getDate()});
				return date.getDate();
			},
			
			setLastUpdated: function(day) {
				dateRef.set({lastUpdated: day});
			},
			
			// calls Fed function to reset bowl statuses
			compareReset: function(last) {
				var current = Dte.currentDate();
				if (last !== current) {
					Fed.newDay();
					Dte.setLastUpdated(current);
				} else {
					// do something if no reset?
				}
			},
			
			// get data snapshot
			load: function() {
				dateRef.on('value', function(snapshot) {
					if (snapshot.val() !== null) { 
						var data = snapshot.val();
						var updateValue = data.lastUpdated;
						Dte.compareReset(updateValue);
					} else {
						Dte.load();
					}
				});
			},
					
			nextDay: function() {
				return date.getDate() + 1;
			},
			
			currentDay: function() {
				return days[date.getDay()];
			},
			
			currentMonth: function() {
				return months[date.getMonth()];
			},
			
			previousDay: function() {
				return days[prevDate.getDay()];
			},
			
			previousMonth: function() {
				return months[prevDate.getMonth()];
			},
			
			previousDate: function() {
				return prevDate.getDate();
			}
			
		};
		

	
		return Dte;
	
	}
);