 function hello() {
	var userText = document.getElementById('searchText').value;
	
	var xmlHttp = new XMLHttpRequest();
	var url = "http://smartfindr-server.mybluemix.net/" + userText;
	console.log(url);
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    var synonyms = xmlHttp.responseText;
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, synonyms);
	});
}
document.getElementById('checkPage').addEventListener('click', hello);