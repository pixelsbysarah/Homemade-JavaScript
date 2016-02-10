/*****************
 *
 * ROLLINS ALERT
 * This will pull the latest message from RSS feed from Rave and display it on the top of the page.
 * The date/time will determine if the message appears.
 *
 * Safe phrase (for future use): "this is a test" - should be case insensitive
 * 
 * CONDITIONS FOR DISPLAY
 * 1. #AlertMsg must not exist. This is to allow for a manual override from the CMS
 * 2. It has been LESS THAN 24 hours since the alert message was sent from Rave.
 *
 * CONDITIONS FOR NOT BEING DISPLAYED
 * 1. #AlertMsg already exists
 * 2. It has been GREATER THAN 24 hours since the alert message was sent from Rave.
 * 3. If moment.js is unable to retrieve a number and the value becomes 'NaN'.
 *
 * Written July 2015. SJL.
 * Modified Aug 6 2015. added hours to the check. 
 *                      Safe phrase can be added, but it is NOT implemented at this time.
 * Modified Feb 10, 2016: adjusted hoursLapsed to show floating point number for a more accurate comparison to remove an alert (24 vs 24.5 hours).
 ****************/
window.onload = function(){
    var alertData = "http://www.rollins.edu/_common/rave/xmltojson.php",
        messageBar = $('#AlertMsg');

    $.getJSON(alertData, function(data){
        var chnl = data.channel, 
            latestAlert = chnl.item.description, 
            alertTime = moment(chnl.item.pubDate, "ddd, DD MMM YYYY HH:mm:ss"), 
            timeNow = moment(),
        	hoursLapsed = alertTime.diff(timeNow,'hours',true),
        	timeLapsed = moment(alertTime, "ddd, DD MMM YYYY HH:mm:ss").fromNow(true),
        	cleanAlert = latestAlert.toLowerCase(),
        	maxDisplayTime = 24; //hours
 
        //checking for existence of an AlertBar before outputting the alert
        if ( $(messageBar).length == 0 && (hoursLapsed != 'NaN' && hoursLapsed < maxDisplayTime) ){

            $('body').prepend('<div id="AlertMsg"><div class="msg"><p>'+latestAlert+' <a href="http://emergency.rollins.edu">Read More</a></p></div></div>');
        };

    });
};