 var gQuery = null;
 var gKeywords = false;
 
 function doQuery(userText) {
	gQuery = userText;
	var xmlHttp = new XMLHttpRequest();
	var url = "http://smartfindr-server.mybluemix.net/synonyms/" + userText;
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
	gKeywords = false;
	var userText = document.getElementById('searchText').value;
	if(userText == "") {
		sendMessageToTab({action: "clear"});
	} else if(userText != gQuery) {
		doQuery(userText);
	} else {
		sendMessageToTab({action: "next"});
	}
}

function onClickKeywords() {
	if(gKeywords) {
		sendMessageToTab({action: "next"});
	} else {
		sendMessageToTab({action: "keywords"});
		gKeywords = true;
	}
}

function sendMessageToTab(msg) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, msg);
		});
}

document.getElementById('previous').addEventListener('click', onClickPrevious);
document.getElementById('next').addEventListener('click', onClickNext);