
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAkI3qY-GjMTnCHfyLFebfYu-P_tsDbR5k",
    authDomain: "train-schedule-815cc.firebaseapp.com",
    databaseURL: "https://train-schedule-815cc.firebaseio.com",
    projectId: "train-schedule-815cc",
    storageBucket: "train-schedule-815cc.appspot.com",
    messagingSenderId: "23887215978"
  };
  firebase.initializeApp(config);


var database = firebase.database();
var trainName = "";
var trainDestination = "";
var trainStartTime = "";
var trainFrequency = 0;
var trainArray = [];
var currentDay = moment();
console.log(currentDay);
console.log(currentDay.format("hh:mm a"));

database.ref().on("value", function(snapshot) {
    $("#trainDisplay").empty();
    // $("#trainDisplay").append("<tr><th>Train Name</th><th>Destination</th><th>Frequency (min)</th><th>Next Arrival</th><th>Minutes Away</th></tr>");

    if(snapshot.val()===null){}
    else{
      trainArray = snapshot.val().trainArray;
      console.log(trainArray);
      for(var i = 0; i < trainArray.length; i++){
        if(trainArray[i] !== undefined){
          var row = $("<tr>");
          row.append("<td>" + trainArray[i].name + "</td>");
          row.append("<td>" + trainArray[i].destination + "</td>");
          row.append("<td>" + trainArray[i].frequency + "</td>");
          setStart(trainArray[i].startTime);
          row.append("<td>" + nextTrain(trainArray[i].frequency) + "</td>");
          row.append("<td>" + untilTrain() + "</td>")
          $("#trainDisplay").append(row);
        }
      }
    }
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

$("#addTrain").on("click", function(event){
  event.preventDefault();
  trainName = $("#nameInput").val().trim();
  console.log("Train name: " + trainName);
  trainDestination= $("#destinationInput").val().trim();
  console.log("Train Destination: " + trainDestination);
  trainStartTime = $("#startTimeInput").val().trim();
  trainFrequency = $("#frequencyInput").val().trim();
  currentDay.minutes(trainStartTime.substring(trainStartTime.indexOf(":")+1,trainStartTime.length));
  currentDay.hours(trainStartTime.substring(0, trainStartTime.indexOf(":")));
  var startMinute = currentDay.minutes() + currentDay.hours()*60;
  currentDay=moment();
  console.log(trainStartTime);
  var train = {
    "name": trainName,
    "destination": trainDestination,
    "startTime": startMinute,
    "frequency": trainFrequency
  }

  trainArray.push(train);
  database.ref().set({
    trainArray: trainArray
  });
});

function untilTrain(){
  return currentDay.diff(moment(), "minutes");
}
function nextTrain(freq){
  var minutes = moment().diff(currentDay, "minutes");
  console.log(minutes);
  if(minutes < 0){
    return currentDay.format("hh:mm a");
  }
  else{
    var trainsDone = Math.floor(minutes/freq);
    currentDay.add((trainsDone + 1)*freq, 'minutes');
    return currentDay.format("hh:mm a");
  }
};

function setStart(startTime){
  currentDay.minutes(startTime % 60);
  currentDay.hours(Math.floor(startTime/60));
};