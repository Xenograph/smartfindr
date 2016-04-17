var gWordList;
var rangeArray;

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
	rangeArray = [];
	wordList.forEach(addWordRanges);
	alert(rangeArray);
	rangeArray.forEach(sortRangeArray);
	alert(rangeArray);
}

function handlePrevious() {
	
}

function handleNext() {
	
}

function addWordRanges(element, index, array) {
	var word = element;
	while(window.find(word)) {
		var range = window.getSelection().getRangeAt(0);
		rangeArray.push(range);
	}
	window.getSelection().empty();
}

function sortRangeArray() {
	var i;
	for (i = rangeArray.length; i > 0; i--) {
		var z;
		for (z=0; z < i-1; z++) {
			var compareValues = rangeArray[z].compareBoundaryPoints(Range.START_TO_START, rangeArray[z+1]);
			if(compareValues == 1) {
				var temp = rangeArray[z+1];
				rangeArray[z+1] = rangeArray[z];
				rangeArray[z] = temp;
			} else if (compareValues == -1 || compareValues == 0) {
				//dont swap
			} else {
				alert("error in comparing range values");
			}
		}
	}
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