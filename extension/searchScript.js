var gTextNodes = textNodesUnder(document.body);
var gRanges = null;
var gSelectNum = null;

function handleSetQuery(wordList) {
	gRanges = getRanges(wordList);
	if(gRanges.length > 0) {
		selectRange(gRanges[0]);
		gSelectNum = 0;
	}
}

function handlePrevious() {
	if(gSelectNum > 0) {
		gSelectNum--;
		selectRange(gRanges[gSelectNum]);
	}
}

function handleNext() {
	if(gSelectNum < gRanges.length - 1) {
		gSelectNum++;
		selectRange(gRanges[gSelectNum]);
	}
}

function selectRange(range) {
	var sel = window.getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

function getRanges(words) {
	var ranges = [];
	gTextNodes.forEach(function(textNode) {
		words.forEach(function(word) {
			var indices = getIndicesOf(word, textNode.textContent, false);
			indices.forEach(function(index) {
				var range = document.createRange();
				range.setStart(textNode, index);
				range.setEnd(textNode, index + word.length);
				ranges.push(range);
			});
		});
	});
	return ranges.sort(function(a, b) {
		a.compareBoundaryPoints(Range.START_TO_START, b);
	});
}

function textNodesUnder(el) {
	var n;
	var a = [];
	var walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
	while(n = walk.nextNode()) {
		a.push(n);
	}
	return a;
}

function getIndicesOf(searchStr, str, caseSensitive) {
    var startIndex = 0, searchStrLen = searchStr.length;
    var index, indices = [];
    if(!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}
 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.action == "setquery") {
		handleSetQuery(request.data);
	} else if (request.action == "previous") {
		handlePrevious();
	} else if (request.action == "next") {
		handleNext();
	} else {
		alert("Error in message passing!");
	}
});