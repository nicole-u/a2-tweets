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
        if (this.text.startsWith("Just completed")) {
            typeOfEvent = "completed_event";
        } else if (this.text.startsWith("Achieved a new")) {
            typeOfEvent = "achievement";
        } else if (this.text.startsWith("Watch my")) {
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
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}