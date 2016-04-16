$(document).ready(function(){ 
	$("#checkPage").click(function(){
		var text1 = $("#search Text").val();
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, text);
		});
	});
});