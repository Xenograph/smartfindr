function searchText() {
 var searchQuery = document.getElementById("searchText").value;
 console.log(searchQuery);
 document.getElementById("result").innerHTML = searchQuery;

}

$("#checkPage").click(function(){
	var text1 = $("#search Text").val();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, text1);
	});
});