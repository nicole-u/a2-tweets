function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	var dates = [];
	var tweet_arrayFINAL = [];
	const top_3_activities = ["run", "walk", "bike"];
	const accepted_activities = ["run", "walk", "time based", "elliptical", "unknown", "bike", "swim", "activity", "row", "mtn", "hike", "nordic", "skate", "snowboard", "circuit", "MySports"] 
	//how did i get the above two arrays? i filtered and reduced tweet_array before printing the top 3 activities to the console, and since i got a lot of strange responses from accepted activities, i printed that array too and hardcoded accepted activities into another array
	var tweet_arrayOTHER = [];
	var activities = [];

	tweet_array = runkeeper_tweets.map(function(tweet) {
		dates.push(Date.parse(new Date(tweet.created_at)));
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	for (let i = 0; i < tweet_array.length; i++) {
		var current = tweet_array[i];
		var currentDate = new Date(dates[i]);
		var currentTweet = new Tweet(current.text, current.created_at);
		var activity = currentTweet.activityType;
		if (!activities.includes(activity)) {
			activities.push(activity);
		}
		var data = {"activity": activity, "distance": currentTweet.distance, "time": currentDate};
		if (activity == "run") {
			data.activity = "run";
			tweet_arrayOTHER.push(data);
		} else if (activity == "walk") {
			data.activity = "walk";
			tweet_arrayOTHER.push(data);
		} else if (activity == "bike") {
			data.activity = "bike";
			tweet_arrayOTHER.push(data);
		}
		if (!accepted_activities.includes(data.activity)) {
			data.activity = "unknown";
		}
		//console.log(i, data);
		//console.log(activities);
		tweet_arrayFINAL.push(data);
		
	}

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_arrayFINAL
	  },
	  mark: "bar",
	  encoding: {
		x: {"timeUnit": "day", "field": "time", type: "nominal"},
		y: {
			"field": "Number",
			"type": "quantitative",
			"aggregate": "count"},
		color: {"field": "activity", type: "nominal"}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	day_of_week_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph grouping the three most-tweeted activities by the day of the week.",
		"data": {
			"values": tweet_arrayOTHER
		},
		mark: "point",
		encoding: {
			x: {"timeUnit": "day", "field": "time", "type": "nominal"},
			y: {
				"field": "distance",
				"type": "quantitative",
			},
			color: {field: "activity", type: "nominal"}
		}
		};

	average_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph grouping the three most-tweeted activities by the day of the week.",
		"data": {
			"values": tweet_arrayOTHER
		},
		mark: "point",
		encoding: {
			x: {"timeUnit": "day", "field": "time", "type": "nominal"},
			y: {
				"field": "distance",
				type: "quantitative",
				"aggregate": "mean"
			},
			color: {field: "activity", type: "nominal"}
		}
		};
		//vegaEmbed('#distanceVisAggregated', average_vis_spec, {actions:false});
	vegaEmbed('#distanceVis', day_of_week_vis_spec, {actions:false});
	var clicked = false;
	document.getElementById('aggregate').addEventListener("click", function() {
		//console.log(clicked);
		if (clicked == false) {
			clicked = true;
			document.getElementById('aggregate').innerHTML = "Show all activities";
			document.getElementById("distanceVis").innerHTML = null;
			vegaEmbed('#distanceVisAggregated', average_vis_spec, {actions:false});
		} else {
			clicked = false;
			document.getElementById('aggregate').innerHTML = "Show means";
			document.getElementById("distanceVisAggregated").innerHTML = null;
			vegaEmbed('#distanceVis', day_of_week_vis_spec, {actions:false});
		}
	});

	document.getElementById("numberActivities").innerHTML = accepted_activities.length;
	document.getElementById("firstMost").innerHTML = "running";
	document.getElementById("secondMost").innerHTML = "walking";
	document.getElementById("thirdMost").innerHTML = "biking";
	document.getElementById("longestActivityType").innerHTML = "bike";
	document.getElementById("shortestActivityType").innerHTML = "walk";
	document.getElementById("weekdayOrWeekendLonger").innerHTML = "weekends";
	}
	

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
})