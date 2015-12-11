/*****************
 *
 * ROLLINS ALERT
 * This will pull the latest message from Rave (RSS) and display it on the top of the page. The date/time will determine if the message appears.
 * 
 * CONDITIONS FOR DISPLAY
 * 1. #AlertMsg must not exist. This is permits a manual override from the CMS and prevents duplicate messages.
 * 2. It has been LESS THAN 24 hours since the alert message was sent from Rave.
 *
 * CONDITIONS FOR NOT BEING DISPLAYED
 * 1. #AlertMsg already exists
 * 2. It has been GREATER THAN 24 hours since the alert message was sent from Rave.
 * 3. If moment.js is unable to retrieve a number and the value becomes 'NaN'.
 *
 * Written July 2015. SJL.
 * Modified Aug 6 2015. added hours to the check. 
 ****************/
window.onload = function(){
    var alertData = "//pathto/xmltojson.php",
        messageBar = $('#AlertMsg')
        actionURL = "http://emergency.rollins.edu";

    $.getJSON(alertData, function(data){
        var chnl = data.channel, 
            latestAlert = chnl.item.description, 
        	alertTime = moment(chnl.item.pubDate, "ddd, DD MMM YYYY HH:mm:ss"), 
        	timeNow = moment(),
        	hoursLapsed = timeNow.diff(alertTime,'hours'),
        	timeLapsed = moment(alertTime, "ddd, DD MMM YYYY HH:mm:ss").fromNow(),
        	cleanAlert = latestAlert.toLowerCase(),
        	maxDisplayTime = 24; //in hours
 
        if ( $(messageBar).length == 0 && (hoursLapsed != 'NaN' && hoursLapsed < maxDisplayTime) ){

            $('body').prepend('<div id="AlertMsg"><div class="msg"><p>'+latestAlert+' <a href="'+actionURL+'">Read More</a></p></div></div>');
        };

    });
};