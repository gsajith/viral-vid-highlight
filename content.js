// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      var numVideos = 0;
      var sumViralityScore = 0;
      var maxScore = Number.MIN_VALUE;
      var minScore = Number.MAX_VALUE;
      var scores = [];
      $(".yt-lockup-meta-info").each(function() {
          var views = $(this)[0].childNodes[0].innerText;
          views = views.substr(0, views.indexOf(" "));
          views = views.replace(/,/g, "");
          views = parseInt(views);
          console.log(views);

          var time = $(this)[0].childNodes[1].innerText;
          var isYears = time.substr(time.indexOf(" ")+1);
          var isYears = isYears.substr(0, isYears.indexOf(" "));
          time = time.substr(0, time.indexOf(" "));
          if (isYears == "years" || isYears == "year") {
              time = (parseInt(time) * 365 + 180) * 24 * 60;
          } else if (isYears == "months" || isYears == "month") {
              time = (parseInt(time) * 30 + 15) * 24 * 60;
          } else if (isYears == "weeks" || isYears == "week") {
              time = (parseInt(time) * 7 + 3) * 24 * 60;
          } else if (isYears == "days" || isYears == "day") {
              time = (parseInt(time) * 24 + 10) * 60;
          } else if (isYears == "hours" || isYears == "hour") {
              time = parseInt(time) * 60 + 25; 
          } else if (isYears == "minutes" || isYears == "minute") {
              time = parseInt(time);
          } else {
              time = 1;
          }

          console.log(time);
          var viralityScore = (1.0 * views) / time;
          console.log("Virality score: " + viralityScore);

          if (viralityScore > maxScore) {
              maxScore = viralityScore;
          }
          if (viralityScore < minScore ) {
              minScore = viralityScore;
          }
          numVideos++;
          sumViralityScore += viralityScore;
          scores.push(viralityScore);
      });

      var averageViralityScore = sumViralityScore/numVideos;
      console.log("Total vids: " + numVideos + " average virality score: " + averageViralityScore);
      
      var count = 0;
      var maxPercentAboveAverage = (maxScore - averageViralityScore)/averageViralityScore;
      var minPercentAboveAverage = (minScore - averageViralityScore)/averageViralityScore;
      $(".yt-lockup-dismissable").each(function() {
          var percentAboveAverage = (scores[count]-averageViralityScore)/averageViralityScore;
          count++;
        if (percentAboveAverage > 0) {
            var alpha = (percentAboveAverage/maxPercentAboveAverage);
            console.log("alpha: " + alpha);
            console.log("percent: " + percentAboveAverage);
            $(this).css({"backgroundColor": "rgba(255, 0, 0, " + alpha +")"});         
        } else {
            var alpha = (percentAboveAverage/minPercentAboveAverage);
            console.log("alpha: " + alpha);
            console.log("Percent: " + percentAboveAverage);
            $(this).css({"backgroundColor": "rgba(0, 0, 255, " + alpha + ")"});
        }
      });
    }
  }
);
