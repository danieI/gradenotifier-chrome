chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		$.post("https://gradenotifier.com/sms/send", { 
		data: JSON.stringify(students)});
	}
);