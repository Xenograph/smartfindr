 function hello() {
	var userText = document.getElementById('searchText').value;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, userText);
	});
}

document.getElementById('checkPage').addEventListener('click', hello);