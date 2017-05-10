var students = [];
footer = $('[name="GradeTaskBottom"]')[0].contentWindow.document;
body = $('[name="GradeTaskBody"]')[0].contentWindow.document;

function Student(id, grade) {
    this.id = id;
    this.grade = grade;
}

function sendGrades() {
       var studentCount = body.getElementById('StudentCount').value;
        var outOf = body.getElementById('OutOf').value;

        for (i = 0; i < studentCount; i++) {
              var workingRow = body.getElementsByTagName('tr').item(i);
              var workingId = workingRow.getElementsByTagName('td')[0].innerHTML;

              // extract student number contained in brackets from innerHTML ^
             var matches = /\(([^)]+)\)/.exec(workingId);  // matches = null when student number is cut off
               if (matches != null) { workingId = matches[1]; }

             else { workingId = prompt("Please enter the student ID for " + /* regex for student name */);
                      chrome.storage.sync.set()
                  }

            workingGrade = Math.round(workingRow.getElementsByTagName('input')[1].value / outOf * 100);

            students.push(new Student(workingId, workingGrade));
    }

}

footer.getElementById("Submit1").addEventListener("click", function () {
    sendGrades();
    chrome.runtime.sendMessage({text: "click", array: students})
  });
