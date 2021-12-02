window.onload = function() {
	initPage();
	
	function initPage(){
		initTimer(300);
		
		document.querySelector('#timestring').addEventListener("keydown", newTimeStringEntered);
	};
	
	function initTimer(time){
		jQuery("#timer").countdowntimer("destroy");
		
		$("#timer").countdowntimer({
		seconds : time,
		size : "xl",
		displayFormat : "MS",
		timeUp : timeUp,
		pauseButton : "pauseButton",
		beforeExpiryTime : "00:00:00:06",
		beforeExpiryTimeFunction : anounceTimeLeft,
		tickInterval : 1,
		});
		
		jQuery("#timer").countdowntimer("stop", "stop");
	};
	
	function newTimeStringEntered(e){
		if (e.key !== 'Enter') {
			return;
		}
		
		var enteredString = document.querySelector('#timestring').value;
		var regExPattern = /\d*[sm]/i;
		
		if (regExPattern.test(enteredString) === false){
			return;
		}
		
		var unitRegEx = /[sm]/i;
		var unit = unitRegEx.exec(enteredString)[0];
		var valueRegEx = /\d*/i;
		var value = valueRegEx.exec(enteredString);
		
		var timerValue = 0;
    
		switch(unit) {
			case "s":
				timerValue = value;
				break;
			case "m":
				timerValue = value * 60;
				break;
			default:
				timerValue = 0;
		}
		
		initTimer(timerValue);
		
		jQuery("#timer").countdowntimer("stop", "start");
	};
	
	function timeUp() {
		var audio = new Audio("alerts/voice_time_is_up.mp3");
		audio.play();
	};
	
	function anounceTimeLeft(){
		var audio = new Audio("alerts/voice_five_four_three_two_one.mp3");
		audio.play();
	};
};