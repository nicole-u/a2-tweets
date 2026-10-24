function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	//the variables
	var completedEvents = 0;
	var liveEvents = 0;
	var achievements = 0;
	var miscellaneous = 0;
	var written = 0;
	
	//the horrible terrible sorting loop
	for (let i = 0; i < tweet_array.length; i++) {
		var current = tweet_array[i];
		var currentTweet = new Tweet(current.text, current.created_at);
		if (currentTweet.source == "completed_event") {
			completedEvents++;
			if (currentTweet.written) {
				written++;
			}
		} 
		else if (currentTweet.source == "live_event") {
			liveEvents++;
		}
		else if (currentTweet.source == "achievement") {
			achievements++;
		}
		else if (currentTweet.source == "miscellaneous") {
			miscellaneous++;
		}
		else {
			continue;
		}
	}

	//update all html
	document.getElementsByClassName('completedEvents')[0].innerText = completedEvents;
	document.getElementsByClassName('completedEvents')[1].innerText = completedEvents;
	document.getElementsByClassName('completedEventsPct')[0].innerText = ((completedEvents / tweet_array.length) * 100).toFixed(2) + "%";

	document.getElementsByClassName('liveEvents')[0].innerText = liveEvents;
	document.getElementsByClassName('achievements')[0].innerText = achievements;
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneous;
	document.getElementsByClassName('written')[0].innerText = written;

	document.getElementsByClassName('liveEventsPct')[0].innerText = ((liveEvents / tweet_array.length) * 100).toFixed(2) + "%";
	document.getElementsByClassName('achievementsPct')[0].innerText = ((achievements / tweet_array.length) * 100).toFixed(2) + "%";
	document.getElementsByClassName('miscellaneousPct')[0].innerText = ((miscellaneous / tweet_array.length) * 100).toFixed(2) + "%";
	document.getElementsByClassName('writtenPct')[0].innerText = ((written / completedEvents) * 100).toFixed(2) + "%";
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});