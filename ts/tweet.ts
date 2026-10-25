class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        var typeOfEvent:string="";
        var lower = this.text.toLowerCase();
        if (lower.includes("completed") || lower.includes("just posted")) {
            typeOfEvent = "completed_event";
        } else if (lower.includes("achieved")) {
            typeOfEvent = "achievement";
        } else if (lower.includes("watch")) {
            typeOfEvent = "live_event";
        } else {
            typeOfEvent = "miscellaneous";
        }
        return typeOfEvent;
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        // all the ones with human text have a dash in them right
        if (this.text.includes("-")) {
            return true;
        } else {
            return false;
        }
    }

    get writtenText():string {
        var written:string = "";
        var separator:number;
        if(!this.written) {
            return "";
        } else {
            separator = this.text.indexOf("-");
            written = this.text.substring(separator);
            written = written.trim();
        }
        return written;
    }

    get activityType():string {
        //TODO: refine this bc i get a lot of weird values
        if (this.source != 'completed_event') {
            return "unknown";
        }
        var separatedTweet = this.text.split(" ");
        var activityType = separatedTweet[5];
        return activityType;
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        var splitSentence = this.text.split(" ");
        var dist:number = Number(splitSentence[3]);
        return dist;
    }

    getHTMLTableRow(rowNumber:number):string {
        // figure out how to access html table so i can get the item at index rowNumber
        document.getElementById("tweetTable");
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}