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
  var ttime = moment($("#ftraintime").val().trim(), "HH:mm").format("X");
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

  // First time (pushed back 1 year to ensure it comes before current time)
  var firstTimeConverted = moment(ttime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("Current time: " + moment(currentTime).format("HH:mm"));

  // Difference between times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference between times: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tfreq;
  console.log(tRemainder);

  // Minutes until next train
  var minTillTrain = tfreq - tRemainder;

  // Next Train
  var nextTrain = moment(moment().add(minTillTrain, "minutes")).format("HH:mm");

  // Create new row
  var newRow = $("<tr>").append(
    $("<td>").text(tname),
    $("<td>").text(tdest),
    $("<td>").text(tfreq),
    $("<td>").text(nextTrain),
    $("<td>").text(minTillTrain)
  );

  $("#train-table > tbody").append(newRow);

});

console.log(moment());