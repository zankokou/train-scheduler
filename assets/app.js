$(document).ready(function(){

//connect firebase
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCaeEhTC80U1N2WCgfczkjWryDBxT2w_no",
    authDomain: "train-scheduler-6aa4e.firebaseapp.com",
    databaseURL: "https://train-scheduler-6aa4e.firebaseio.com",
    projectId: "train-scheduler-6aa4e",
    storageBucket: "",
    messagingSenderId: "160888566452"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var startTime = "";
  var freq = "";

//get input from form
//create button to submit data

$('.submitBtn').on('click',function(event){
    event.preventDefault();
    var name = $('#name-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var freq = $('#frequency-input').val().trim();
    var trainTime = moment($('#startTime-input').val().trim(), 'HH:mm').format('HH:mm');

    var newTrain = {
        name : name,
        destination: destination,
        freq: freq,
        trainTime: trainTime,

      };


    database.ref().push(newTrain)

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#startTime-input").val("");
});




//appending function
database.ref().on('child_added', function(childSnapshot, prevChildkey){
    var sv = childSnapshot.val();

    var tName = sv.name;
    var tDestination = sv.destination;
    var tFreq = sv.freq;
    var tTrain = sv.trainTime;

    var now = moment();
    //convert time 
    // logs a formatted version of the current time 
    console.log("The current time is " + moment(now).format("HH:mm"));  

    var firstTrainTime = tTrain;
    console.log("The first train is at " + firstTrainTime);

    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  
    // the difference between time in minutes   
    var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
    
    // the remaining time when time difference is divided by the frequency
    var Remainder = diffTime % tFreq;
    
    // the remainder is subtracted from the frequency and stored in minutesAway
    var minutesAway = tFreq - Remainder;
    console.log("The next train is " + minutesAway + " minutes away");
    
    // minutesAway is added to the current time and stored in the nextArrival variable 
    var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("The next train arrives at " + nextArrival);

    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
    tFreq + ' minutes'+ "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  

});


});//ready