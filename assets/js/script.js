$(document).ready(function () {
    /*
    curl -X POST 'https://api.twilio.com/2010-04-01/Accounts/AC5ef872f6da5a21de157d80997a64bd33/Messages.json' \
    --data-urlencode 'To=+16518675309'  \
    --data-urlencode 'From=+14158141829'  \
    --data-urlencode 'Body=Hey Jenny! Good luck on the bar exam!'  \
    -d 'MediaUrl=http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg' \
    -u AC5ef872f6da5a21de157d80997a64bd33:[AuthToken]
    */

    // Twilio module

    var TwilioSMS = (function ($) {

        var accountSid = 'ACe2465b3e5688360848d8c4597480e6fd';
        var authToken = 'dbec63d456da69c238ade025293d54c4';

        var testEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/SMS/Messages.json';
        var liveEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';

        var sendMessage = function (to, from, body, successCallback, failCallback) {
            var data = {
                To: to,
                From: from,
                Body: body
            };

            $.ajax({
                method: 'POST',
                url: liveEndpoint,
                data: data,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded', // !
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization",
                        "Basic " + btoa(accountSid + ":" + authToken) // !
                    );
                },
                success: function (data) {
                    console.log("Got response: %o", data);

                    if (typeof successCallback == 'function')
                        successCallback(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("Request failed: " + textStatus + ", " + errorThrown);

                    if (typeof failCallback == 'function')
                        failCallback(jqXHR, textStatus, errorThrown);
                }
            });
        }

        return {
            sendMessage: sendMessage
        };

    })(jQuery);



    $("#confirm_push").on("click", function () {

          // THIS IS THE MOMENT.JS CODE
        
      // this would take the value from user input on form for date of event
      var eventDate = $("#date").val().trim();
       // this will return a value in milleseconds 
       moment(eventDate).diff(moment());
       // variable that places the person's number to recieve the message
       var recepientNumber = $("#phone").val().trim();
       // variable that retrieves user message and sets it
       var userMessage = $("#message").val().trim();
       // this sets the above value as a variable to use in the set timeout function
       var setTimeoutVar = moment(eventDate).diff(moment());
       console.log("this console.log shows the setTimeoutVar value " + setTimeoutVar);
       console.log(moment(eventDateTest).diff(moment()));
       // the timeout function
       setTimeout(function () {
           TwilioSMS.sendMessage(
               ("+" + recepientNumber), // going to be user input number stored in a variable
               '+17029197457', // Twilio allowed test number
               userMessage, // going to be a user input message stored in a variable

               function ok() {
                   console.log("Message sent!");
               },
               function fail() {
                   console.log("Failed to send your message!");
               }
           )
       }, setTimeoutVar); // going to be a moment.js calculated number stored as a variable 


    });



    // firebase functions --------------------------------------------------------------------------------------------
    var config = {
        apiKey: "AIzaSyDfd7IuGiABlKTH44EIiNq8q00M0axgY3Y",
        authDomain: "train-1391e.firebaseapp.com",
        databaseURL: "https://train-1391e.firebaseio.com",
        projectId: "train-1391e",
        storageBucket: "train-1391e.appspot.com",
        messagingSenderId: "69452928137"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // Button for adding pushy to fire base
    $("#confirm_push").on("click", function (event) {
        event.preventDefault();

        // Grabs user input
        var name = $("#name").val().trim();
        var recepientNumber = $("#phone").val().trim();
        var eventDate = $("#date").val().trim();
        var userMessage = $("#message").val().trim();


        // Creates object for holding pushy data
        var newPushy = {
            name: name,
            recepientNumber: recepientNumber,
            eventDate: eventDate,
            userMessage: userMessage,
        };

        // Uploads pushy data to the database
        database.ref().push(newPushy);

        // Logs everything to console
        console.log(newPushy.name);
        console.log(newTrain.recepientNumber);
        console.log(newTrain.eventDate);
        console.log(newTrain.userMessage);

        alert("Train successfully added");

        // Clears all of the text-boxes
        $("#name").val("");
        $("#phone").val("");
        $("#date").val("");
        $("#message").val("");
    });

    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        // Store everything into a variable.
        var name = childSnapshot.val().name;
        var recepientNumber = childSnapshot.val().recepientNumber;
        var eventDate = childSnapshot.val().eventDate;
        var userMessage = childSnapshot.val().userMessage;
        var nextArrival = timearrive;
        var minutesAway = minTilTrain;


       

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(userMessage)
        );

        // Append the new row to the table
        $(".table > tbody").append(newRow);
    });
});
