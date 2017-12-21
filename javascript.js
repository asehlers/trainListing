
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAkI3qY-GjMTnCHfyLFebfYu-P_tsDbR5k",
  authDomain: "train-schedule-815cc.firebaseapp.com",
  databaseURL: "https://train-schedule-815cc.firebaseio.com",
  projectId: "train-schedule-815cc",
  storageBucket: "",
  messagingSenderId: "23887215978"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var trainDestination = "";
var trainStartTime = 0;
var trainFrequency = 0;
var trainArray = [];
var currentDay = moment();
console.log(currentDay);
$("#addTrain").on("click", function(event){
  event.preventDefault();
  trainName = $("#nameInput").val().trim();
  trainDestination= $("#destinationInput").val().trim();
  trainStartTime = moment(currentDay + " " + $("#startTimeInput").val().trim(), "MM-DD-YYYY HH:mm");
  trainFrequency = $("#frequencyInput").val().trim();
  // moment(currentDay.minutes()
  console.log(trainStartTime);
  var train = {
    "name": trainName,
    "destination": trainDestination,
    "startTime": trainStartTime
  }
});