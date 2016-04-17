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
	//request.forEach(arrayOutput)
	arrayOutput(request[0] ,0, 0);
});