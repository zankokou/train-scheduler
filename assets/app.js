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

var time = "";
var format = "HH:mm";
var timeConverted = ""

var tMinutesLeft = "";
var nextTrain = "";
var nextTrainFormated = ""


var currentTime = "";
var tRemainder = "";
var diffTime = "";

$('.submitBtn').on('click',function(event){
    event.preventDefault();
    name = $('#name-input').val().trim();
    destination = $('#destination-input').val().trim();
    startTime = $('#startTime-input').val().trim();
    freq = $('#frequency-input').val().trim();

//convert time 
    time = startTime;
    timeConverted = moment(time, format).subtract(1, 'years')
    // console.log(timeConverted)
    currentTime = moment();
    
    //difference between start and current
    diffTime = moment().diff(moment(timeConverted), 'minutes');
    // console.log(diffTime);

    //Time apart
    tRemainder = diffTime % freq;
    // console.log(tRemainder);

    //Minutes until next train
    tMinutesLeft = freq - tRemainder;
    console.log('minutes until train '+ tMinutesLeft)

    //Next Train
    nextTrain = moment().add(tMinutesLeft, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    nextTrainFormated =  moment(nextTrain).format("hh:mm");


    var newTrain = {
        name : name,
        destination: destination,
        startTime: startTime,
        freq: freq,
        nextTrainFormated:nextTrainFormated,
        tMinutesLeft: tMinutesLeft,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

      };


    database.ref().push(newTrain)
});


//appending function
database.ref().on('child_added',function(snapshot){
    var sv = snapshot.val();

    var tName = sv.name;
    var tDestination = sv.destination;
    var tFreq = sv.freq;
    var tTrain = sv.nextTrainFormated;
    var tMinutes = sv.tMinutesLeft;

    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" +
    tFreq + ' minutes'+ "</td><td>" + tTrain + "</td><td>" + tMinutes + "</td></tr>");
  

});


});//ready