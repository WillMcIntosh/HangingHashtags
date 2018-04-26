// store student filter choices in array
const studentFilters = document.getElementById("filter-menu").querySelectorAll("li");

// event listener for filter clicks
for (student of studentFilters) {
  student.addEventListener("click", filterChange);
}

// event listener for batch recommend
const batchRecommendButton = document.getElementById("batch-submit");
batchRecommendButton.addEventListener("click", supportView);

// store support links in array
const supportLinks = document.getElementById("support-table").querySelectorAll("div.student-number > button");

// event listener for student links
for (supportLink of supportLinks) {
  supportLink.addEventListener("click", supportView);
}

// globally declare filter value for use in chart later
let studentFilterChoice = 0;

function filterChange(event) {
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  const filterChoice = event.currentTarget;
  const choiceID = filterChoice.id;

  const highSupport = document.getElementById("high-support");
  const medSupport = document.getElementById("moderate-support");
  const lowSupport = document.getElementById("low-support");

  switch (choiceID) {
    case "all":
      // default values
      highSupport.innerHTML = "8";
      medSupport.innerHTML = "3";
      lowSupport.innerHTML = "4";
      studentFilterChoice = 0;
      break;
    case "third-grade":
      // hard coded values for example
      highSupport.innerHTML = "5";
      medSupport.innerHTML = "3";
      lowSupport.innerHTML = "2";
      studentFilterChoice = 3;
      break;
    case "fourth-grade":
      highSupport.innerHTML = "3";
      medSupport.innerHTML = "0";
      lowSupport.innerHTML = "2";
      studentFilterChoice = 4;
      break;
    default: 
      break;
  }
}

// sample data as array, assuming json was parsed
const students = 
  [
    {name:"Steve", grade:"3rd", support:"high"},
    {name:"Steve", grade:"3rd", support:"high"},
    {name:"Steve", grade:"3rd", support:"high"},
    {name:"Steve", grade:"3rd", support:"high"},
    {name:"Steve", grade:"3rd", support:"high"},
    {name:"Steve", grade:"4th", support:"high"},
    {name:"Steve", grade:"4th", support:"high"},
    {name:"Steve", grade:"4th", support:"high"},
    {name:"Steve", grade:"3rd", support:"moderate"},
    {name:"Steve", grade:"3rd", support:"moderate"},
    {name:"Steve", grade:"3rd", support:"moderate"},
    {name:"Steve", grade:"3rd", support:"low"},
    {name:"Steve", grade:"3rd", support:"low"},
    {name:"Steve", grade:"4th", support:"low"},
    {name:"Steve", grade:"4th", support:"low"}
  ]

function supportView(event) {
  const supportTable = document.getElementById("table-location");
  supportTable.innerHTML = ""; // clear html of supportTable

  const highSupport = students.filter(student => student.support == "high");
  const modSupport = students.filter(student => student.support == "moderate");
  const lowSupport = students.filter(student => student.support == "low");

  // determine which button called function for support levels
  let chartStudents; // declare so it can be modified by filter choices
  const target = event.currentTarget;
  const targetID = target.id;

  switch (targetID) {
    case "high-link":
      chartStudents = highSupport;
      break;
    case "mod-link":
      chartStudents = modSupport;
      break;
    case "low-link":
      chartStudents = lowSupport;
      break;
    default:
      chartStudents = students;
      break;
  }
  // determine if grade filters active
  if (studentFilterChoice == 3) {
    chartStudents = chartStudents.filter(student => student.grade == "3rd");
  }
  else if (studentFilterChoice == 4) {
    chartStudents = chartStudents.filter(student => student.grade == "4th");
  }

  let result = `<table border=1>
                  <tr>
                    <th>Student</th> 
                    <th>Grade</th> 
                    <th>Support Level</th> 
                  </tr>`;
  for (student of chartStudents) {
    result += `<tr>
    <td>${student.name}</td>
    <td>${student.grade}</td>
    <td>${student.support}</td>
      </tr>`
  }
  result += "</table>";

  const newDiv = document.createElement("div");
  newDiv.innerHTML = result;
  supportTable.appendChild(newDiv); // add to modal 
}
