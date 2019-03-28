// Initialize Firebase
var config = {
  apiKey: "AIzaSyB443qE125NU0gIVZ3OR7-ySFyhGVSMhdE",
  authDomain: "train-schedule-a9192.firebaseapp.com",
  databaseURL: "https://train-schedule-a9192.firebaseio.com",
  projectId: "train-schedule-a9192",
  storageBucket: "train-schedule-a9192.appspot.com",
  messagingSenderId: "519871597091"
};
firebase.initializeApp(config);

var database = firebase.database();

// On-click to add train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grab user input
  var tname = $("#train-name").val().trim();
  var tdest = $("#destination").val().trim();
  var ttime = moment($("#ftraintime").val().trim(), "hh:mm a").format("X");
  var tfreq = $("#frequency").val().trim();

  var newTrain = {
    tname: tname,
    tdest: tdest,
    ttime: ttime,
    tfreq: tfreq
  };

  database.ref().push(newTrain);

  console.log(newTrain);
  alert("Train has been added");

  // Clear text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#ftraintime").val("");
  $("#frequency").val("");
});

// Listener for adding train to database
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  var tname = snapshot.val().tname;
  var tdest = snapshot.val().tdest;
  var ttime = snapshot.val().ttime;
  var tfreq = snapshot.val().tfreq;

  // Convert unix to readable time

  // Calculate min away and next arrival

  // Create new row
  var newRow = $("<tr>").append(
    $("<td>").text(tname),
    $("<td>").text(tdest),
    $("<td>").text(tfreq),
    $("<td>").text("placeholder"),
    $("<td>").text("placeholder")
  );

  $("#train-table > tbody").append(newRow);

});