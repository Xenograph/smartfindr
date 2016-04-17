 function onClickSetQuery() {
	var userText = document.getElementById('searchText').value;
	
	var xmlHttp = new XMLHttpRequest();
	var url = "http://smartfindr-server.mybluemix.net/" + userText;
	console.log(url);
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var synonyms = xmlHttp.responseText;
	var synonymArray = JSON.parse(synonyms);
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "setquery", data: synonymArray});
	});
}
function onClickPrevious() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		console.log("senswer");
		chrome.tabs.sendMessage(tabs[0].id, {action: "previous"});
	});
}
function onClickNext() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "next"});
	});
}
document.getElementById('checkPage').addEventListener('click', onClickSetQuery);
document.getElementById('previous').addEventListener('click', onClickPrevious);
document.getElementById('next').addEventListener('click', onClickNext);