var partialNumbers = {}

function loadIncomplete(incompleteName){
  chrome.storage.sync.get(incompleteName, function(obj){
    partialNumbers[incompleteName] = obj[incompleteName] || requestNumber(incompleteName);
  });
}

function requestNumber(incomplete) {
	var complete = prompt("Enter complete student number for " + incomplete);
  var data = {[incomplete]: complete};
  chrome.storage.sync.set(data, function() {
  console.log("Linked '" + incomplete + "' to '" + complete + "'.");
});
	return complete;
}

function sendGrades() {
  var students = {};
  var studentCount = body.getElementById('StudentCount').value;
  var outOf = body.getElementById('OutOf').value;

  var i; for (i = 0; i < studentCount; i++) {
    var workingRow = body.getElementsByTagName('tr').item(i);
    var workingId = workingRow.getElementsByTagName('td')[0].innerHTML;

    var matches = /\(([^)]+)\)/.exec(workingId); // remove enclosing brackets
    workingId = (matches != null) ? matches[1] : "000"; 

    var workingGrade = workingRow.getElementsByTagName('input')[1].value;
    workingGrade = Math.round(workingGrade / outOf * 100).toString();
    students[workingId] = workingGrade;
  }
  chrome.runtime.sendMessage({data: students});
}

body = $('[name="GradeTaskBody"]')[0].contentWindow.document;
footer = $('[name="GradeTaskBottom"]')[0].contentWindow.document;

footer.getElementById("Submit1").addEventListener("click", function () {
  sendGrades(); });
