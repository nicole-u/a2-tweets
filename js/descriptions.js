var writtenTweets = [];
function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	for (let i = 0; i < runkeeper_tweets.length; i++) {
		var current = runkeeper_tweets[i];
		var currentTweet = new Tweet(current.text, current.created_at);
		if (currentTweet.written) {
			writtenTweets.push(currentTweet);
		}
	}
	//console.log(writtenTweets.length);
}

function addEventHandlerForSearch() {
	//add event handler. store input in a variable. search tweets for the string. use a loop to add everything that matches into table
	var searchBar = document.getElementById("textFilter");
	searchBar.addEventListener("keyup", (e)=> {
		var search = e.target.value.toLowerCase();
		var matchingTweets = writtenTweets.filter(tweet => {
			return tweet.activityType.toLowerCase().includes(search) ||
			tweet.text.toLowerCase().includes(search);
		});
		document.getElementById("searchText").innerHTML = search;
		document.getElementById("searchCount").innerHTML = matchingTweets.length;
		//console.log(matchingTweets);
		var tableBody = document.getElementById("tweetTable");
		tableBody.innerHTML = ""; //clear table before new content is put in
		for (let i = 0; i < matchingTweets.length; i++) {
			var currentTweet = matchingTweets[i];
			var row = tableBody.insertRow(i);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			cell1.innerHTML = String(i + 1);
			cell2.innerHTML = currentTweet.activityType;
			cell3.innerHTML = currentTweet.text;
		}
		matchingTweets=[]; //clear array once done putting content in
		if (search == "") {
			tableBody.innerHTML = "";
			document.getElementById("searchCount").innerHTML = 0;
			document.getElementById("searchText").innerHTML = "";
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});