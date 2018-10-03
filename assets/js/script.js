$(document).ready(function () {
   
    // Twilio module
    var TwilioSMS = (function ($) {
        var accountSid = 'ACe70d929fd6bb14f0e85eb6c187777777';
        var authToken = '2d51f4cef7c30e1f0cbbd955d7777777';
        var testEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/SMS/Messages.json';
        var liveEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';
        var sendMessage = function (to, from, body, successCallback, failCallback) {
            var data = {
                To: to,
                From: from,
                Body: body
            };
            // ajax call 
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
        event.preventDefault();
          // THIS IS THE MOMENT.JS CODE
        //Console log form validation 
       // console.log($("#main_form").valid());
      // this would take the value from user input on form for date of event
      var eventDate = $("#date").val().trim();
      console.log(eventDate);
      var format = "MM/DD/YYYY";
      var convertedDate = moment(eventDate, format);
       //var eventTestDate = 5000;
       //variable that places the person's number to recieve the message
       var recepientNumber = $("#phone").val().trim();
       //var recepientNumber = "+15205762500";
       console.log(recepientNumber);
       // variable that retrieves user message and sets it
       var userMessage = $("#message").val().trim();
       console.log(userMessage);
       // this sets the above value as a variable to use in the set timeout function
       var setTimeoutVar = moment(convertedDate).diff(moment(), "milliseconds");
      
       console.log("this console.log shows the setTimeoutVar value " + setTimeoutVar);
       //console.log(moment(eventTestDate).diff(moment()));
       // the timeout function
       setTimeout(function () {
           TwilioSMS.sendMessage(
               recepientNumber, // going to be user input number stored in a variable
               
               
               '+17027932751', // Twilio allowed test number
               // 14804051263 other test number if need be
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
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAr-QeskGgdwbqO4XlO1zQUrgo41nFaI1I",
    authDomain: "mushy-pushy.firebaseapp.com",
    databaseURL: "https://mushy-pushy.firebaseio.com",
    projectId: "mushy-pushy",
    storageBucket: "mushy-pushy.appspot.com",
    messagingSenderId: "618877734187"
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
        var newRef = database.ref().push(newPushy);
        var key = newRef.key;
        // Logs everything to console
        console.log(key);
        console.log(newPushy.name);
        console.log(newPushy.recepientNumber);
        console.log(newPushy.eventDate);
        console.log(newPushy.userMessage);
      
        // Clears all of the text-boxes
        $("#name").val("");
        $("#phone").val("");
        $("#date").val("");
        $("#message").val("");
    });
    // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        var snapshotKey = childSnapshot.key;
        console.log(childSnapshot.key);
        // Store everything into a variable.
        var name = childSnapshot.val().name;
        var recepientNumber = childSnapshot.val().recepientNumber;
        var eventDate = childSnapshot.val().eventDate;
        var userMessage = childSnapshot.val().userMessage;
        
       
        // Create the new row
        var newRow = $("<tr>").append(
           
            $("<th>").text(name),
            $("<td>").text(userMessage),
            $("<td>").html(`<button class='btn btn-delete btn-sm m-0 waves-effect btn-remove key-btn float-right' data-key=${snapshotKey}>Delete</button>`),
           
            
        );
        // Append the new row to the table
        $(".table > tbody").append(newRow);
        $(document).on("click",".btn-remove",function(){
            
            var key = $(this).attr("data-key");


            $(this).parent().parent().remove();
            var dbRef = database.ref(key);
            console.log(dbRef); 
            dbRef.remove();
            
            
        });
    });
 
    
});
