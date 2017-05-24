var students = {}

function setId(obj, incomplete) {
if (obj[incomplete] === undefined) {
  id = prompt("Enter comlete student id for " + incomplete);
  chrome.storage.sync.set({[incomplete]: id}, function (){
    console.log("success");
  });
  return(id);
}
else {
  return(obj[incomplete]);
  }
}

function getGrades(ids, td){
  var grade = "";
   for (i = 0; i < td.length; i++){
     if (tr[i].getElementsByTagName("td")[3].getElementsByTagName("select")[0].options[0].selected) {
      grade = Math.round(td[i].getElementsByTagName("input")[0].value / document.getElementById("OutOf").value * 100).toString();
      students[ids[i]] = grade;
   }
   else {
    // grade = "Grade Not Entered" *NR selected, or other excused codes or grade = "assignment not completed"
   }
     //students[ids[i]] = grade;
   }
 }
 

 function run() {
   alert("Complete");

    var body = document.getElementById("GradeTaskBody").contentWindow.document;
    var footer = document.getElementById("GradeTaskBottom").contentWindow.document;
var body = document;
    var  tr = body.getElementsByTagName("table")[0].getElementsByTagName("tr");
    var td = [];
    var ids = [];
    for (i = 0; i < tr.length; i++){
      td.push(tr[i].getElementsByTagName("td")[4]);
      var info = /\(([^)]+)\)/.exec(tr[i].getElementsByTagName("td")[0].innerHTML);
      var id = "";
      if (info === null){
        var incomplete = tr[i].getElementsByTagName("td")[0].innerHTML.trim();
        chrome.storage.sync.get(incomplete, function(obj){
          ids.push(setId(obj, incomplete));
        });
      }
          else {
            id = info[1];
            ids.push(id);
          }
      }

    footer.getElementById("Submit1").addEventListener("click", function () {
      getGrades(ids, td);
      chrome.runtime.sendMessage({data: students});
    });
 }

 

 if (document.readyState === "complete") {
   run();
}
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    run();
}
}
