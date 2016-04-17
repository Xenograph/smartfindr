 var gQuery = null;
 
 function doQuery(userText) {
	 console.log(userText);
	gQuery = userText;
	var xmlHttp = new XMLHttpRequest();
	var url = "http://smartfindr-server.mybluemix.net/" + userText;
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var synonyms = xmlHttp.responseText;
	var synonymArray = JSON.parse(synonyms).map(function(e) {
		return e.toLowerCase();
	});
	if(synonymArray.indexOf(userText.toLowerCase()) == -1) {
		synonymArray.push(userText.toLowerCase());
	}
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {action: "setquery", data: synonymArray});
	});
}

function onClickPrevious() {
	var userText = document.getElementById('searchText').value;
	if(userText == "") {
		sendMessageToTab({action: "clear"});
	} else if(userText != gQuery) {
		doQuery(userText);
	} else {
		sendMessageToTab({action: "previous"});
	}
}

function onClickNext() {
	var userText = document.getElementById('searchText').value;
	if(userText == "") {
		sendMessageToTab({action: "clear"});
	} else if(userText != gQuery) {
		doQuery(userText);
	} else {
		sendMessageToTab({action: "next"});
	}
}

function sendMessageToTab(msg) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, msg);
		});
}

document.getElementById('previous').addEventListener('click', onClickPrevious);
document.getElementById('next').addEventListener('click', onClickNext);