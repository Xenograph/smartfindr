var gWordList;

function arrayOutput(element, index, array) {
	var TRange = null;
	if (parseInt(navigator.appVersion)<4)
		return;
	var strFound;
	if(window.find) {
		// CODE FOR BROWSERS THAT SUPPORT window.find
		strFound = self.find(element);
		if(!strFound) {
			strFound = self.find(element,0,1);
			while(self.find(element,0,1))
				continue;
		}
	}
	if(!strFound)
		alert("String '" + element + "' not found!");
}

function handleSetQuery(wordList) {
	gWordList = wordList;
}

function handlePrevious() {
	
}

function handleNext() {
	
}
 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.action == "setquery") {
		//request.forEach(arrayOutput)
		//arrayOutput(request.data[0] ,0, 0);
		handleSetQuery(request.data);
	} else if (request.action == "previous") {
		handlePrevious();
	} else if (request.action == "next") {
		handleNext();
	} else {
		alert("Error in message passing!");
	}
});