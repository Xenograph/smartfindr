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
 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("request");
	alert("2");
	if(request.action == "setquery") {
		//request.forEach(arrayOutput)
		//arrayOutput(request.data[0] ,0, 0);
		alert("setquery");
	} else if (request.action == "previous") {
		alert("prev");
	} else if (request.action == "next") {
		alert("next");
	} else {
		alert("Error!");
	}
});