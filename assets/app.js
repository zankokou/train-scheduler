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

$('.submitBtn').on('click',function(){
    console.log('working');

    name = $('#name-input').val().trim();
    destination = $('#destination-input').val().trim();
    startTime = $('#startTime-input').val().trim();
    freq = $('#frequency-input').val().trim();


    // console.log(name);
    // console.log(destination);
    // console.log(startTime);
    // console.log(freq);

    database.ref().set({
        name : name,
        destination: destination,
        startTime: startTime,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

        
    });
    return false;


});



//convert time 

var time = "";
var format = "HH:mm";
var timeConverted = ""

database.ref().on('value',function(snapshot){
    var sv = snapshot.val();
    // console.log(sv);
    time = sv.startTime;
    timeConverted = moment(time, format).subtract(1, 'years')
    console.log(timeConverted)
    var currentTime = moment();
    
    //difference between start and current
    var diffTime = moment().diff(moment(timeConverted), 'minutes');
    console.log(diffTime);

    //Time apart
    var tRemainder = diffTime % sv.freq;
    console.log(tRemainder);

    //Minutes until next train
    var tMinutesLeft = sv.freq - tRemainder;
    console.log('minutes until train '+ tMinutesLeft)

    //Next Train
    var nextTrain = moment().add(tMinutesLeft, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
});


//push input to firebase
//append data from firebase to schedule




});//ready