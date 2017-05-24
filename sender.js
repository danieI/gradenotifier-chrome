chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request.data);
		$.post("https://gradenotifier.com/sms/send", 
			{ data: JSON.stringify(request.data) }
		);	
		sendResponse({result: "Done"}); 
	}
);