function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	var dates = [];

	tweet_array = runkeeper_tweets.map(function(tweet) {
		dates.push(Date.parse(new Date(tweet.created_at))); //i can put this here right
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
	var earliestDate;
	var latestDate;

	//WHAT THE HELL IS A DATE OBJECT!!!!!!!!!!
	earliestDate = new Date(dates.sort()[0]).toDateString().split(" "); //wow i can parse the date and format it in one go
	latestDate = new Date(dates.sort()[dates.length-1]).toDateString().split(" ");
	//console.log(dates);
	//console.log(earliestDate);
	
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
			//console.log(currentTweet);
		}
		else {
			continue;
		}
	}

	//it's date updating time
	document.getElementById("firstDate").innerText = earliestDate[1] + " " + earliestDate[2] + ", " + earliestDate[3];
	document.getElementById("lastDate").innerText = latestDate[1] + " " + latestDate[2] + ", " + latestDate[3];

	//update all numbers
	document.getElementsByClassName('completedEvents')[0].innerText = completedEvents;
	document.getElementsByClassName('completedEvents')[1].innerText = completedEvents;
	document.getElementsByClassName('liveEvents')[0].innerText = liveEvents;
	document.getElementsByClassName('achievements')[0].innerText = achievements;
	document.getElementsByClassName('miscellaneous')[0].innerText = miscellaneous;
	document.getElementsByClassName('written')[0].innerText = written;

	//update percentages aka i really should've processed these before attempting to update them but this works so i don't really care
	document.getElementsByClassName('completedEventsPct')[0].innerText = ((completedEvents / tweet_array.length) * 100).toFixed(2) + "%";
	document.getElementsByClassName('liveEventsPct')[0].innerText = ((liveEvents / tweet_array.length) * 100).toFixed(2) + "%";
	document.getElementsByClassName('achievementsPct')[0].innerText = ((achievements / tweet_array.length) * 100).toFixed(2) + "%";
	document.getElementsByClassName('miscellaneousPct')[0].innerText = ((miscellaneous / tweet_array.length) * 100).toFixed(2) + "%";
	document.getElementsByClassName('writtenPct')[0].innerText = ((written / completedEvents) * 100).toFixed(2) + "%";
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});