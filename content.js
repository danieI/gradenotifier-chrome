function sendGrades() {
  var students = {};
  var studentCount = body.getElementById('StudentCount').value;
  var outOf = body.getElementById('OutOf').value;

  var i; for (i = 0; i < studentCount; i++) {
    var workingRow = body.getElementsByTagName('tr').item(i);
    var workingId = workingRow.getElementsByTagName('td')[0].innerHTML;

    // extract student number contained in brackets from innerHTML ^
    var matches = /\(([^)]+)\)/.exec(workingId);
    workingId = (matches != null) ? matches[1] : "cut off";

    var workingGrade = workingRow.getElementsByTagName('input')[1].value;
    workingGrade = Math.round(workingGrade / outOf * 100);

    students[workingId] = workingGrade;
  }
  students = JSON.stringify(students);
  chrome.runtime.sendMessage({data: students})
}

body = $('[name="GradeTaskBody"]')[0].contentWindow.document;
footer = $('[name="GradeTaskBottom"]')[0].contentWindow.document;

footer.getElementById("Submit1").addEventListener("click", function () {
  sendGrades();
});
