// store all folder and comment tabs as two arrays
const folderTabs = document.getElementById("folder-tabs").querySelectorAll("ul.nav-tabs > li");
const commentTabs = document.getElementById("comment-tabs").querySelectorAll("ul.nav-tabs > li");

// event listeners for tab clicks
for (tab of folderTabs) {
  tab.addEventListener("click", tabClicked);
}
for (tab of commentTabs) {
  tab.addEventListener("click", tabClicked);
}

// store contents in two arrays
const folderContents = document.getElementById("folder-content").querySelectorAll(".tab-pane");
const commentContents = document.getElementById("comment-content").querySelectorAll(".tab-pane");

// store student filter choices in array
const studentFilters = document.getElementById("filter-menu").querySelectorAll("li");

// event listener for filter clicks
for (student of studentFilters) {
  student.addEventListener("click", filterChange);
}

// store email filter choices in array
const emailRecipients = document.getElementById("email-choices").querySelectorAll("li");

// event listener for email choices
for (recipient of emailRecipients) {
  recipient.addEventListener("click", emailChoice);
}

// event listener for comment form
const addCommentButton = document.getElementById("add-comment-button");
addCommentButton.addEventListener("click", toggleCommentBox);

// event listener for submit button
const commentSubmitButton = document.getElementById("comment-submit-button");
commentSubmitButton.addEventListener("click", submitComment);

// event listener for batch recommend
const batchRecommendButton = document.getElementById("batch-submit");
batchRecommendButton.addEventListener("click", supportView);

// store support links in array
const supportLinks = document.getElementById("support-table").querySelectorAll("div.student-number > button");

// event listener for student links
for (supportLink of supportLinks) {
  supportLink.addEventListener("click", supportView);
}

function tabClicked(event) {
  // prevent URL from changing
  // added for IE compatibility
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  // define tab clicked
  const clickedTab = event.currentTarget;
  // find parent of tab clicked to find if classList contains comments or folders

  const parent = clickedTab.parentElement;

  // remove active class from appropriate tabs and content sections
  if (parent.classList.contains("comment-section")) {
    for (tab of commentTabs) {
      tab.classList.remove("active");
    }

    for (content of commentContents) {
      content.classList.remove("active");
    }
  }
  else {
    for (tab of folderTabs) {
      tab.classList.remove("active");
    }
    for (content of folderContents) {
      content.classList.remove("active");
    }
  }

  // give clicked tab the active class
  clickedTab.classList.add("active");

  // add active class to content corresponding to tab clicked
  const activeContentId = clickedTab.querySelector("a").getAttribute("href");
  const activeContent = document.querySelector(activeContentId);

  activeContent.classList.add("active");
}

function toggleCommentBox(event) {
  const commentForm = document.getElementById("new-comment-box");
  if (commentForm.style.display === "block") {
    commentForm.style.display = "none";
  }
  else {
    hideWarning();
    commentForm.style.display = "block";
  }
}

function submitComment(event) {
  event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  
  // add form contents to variables
  const userName = document.getElementById("new-comment-form").userName.value.toUpperCase();
  const userComment = document.getElementById("new-comment-form").newComment.value;

  if (userName.length == 0 || userComment.length == 0) {
    showWarning();
    return;
  }

  // prepend comment info to ul in comments
  const node = document.createElement("li");
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class","sample-comment");
  newDiv.innerHTML = `<div class="comment-image col-xs-1 clearfix"> \
                        <!-- github default user image --> \
                        <img src="images/userpic.png" alt="user image" \
                                                      class="profile-pic"> \
                      </div> \
                      <div class="comment-text col-xs-11"> \
                        <p> \
                          <strong>${userName}</strong> \
                          (Syracuse City Schools) \
                          <small>just now</small> \
                        </p> \
                        <p> ${userComment}\
                          </p> \
                        <p class="likes"> \
                          <i class="far fa-thumbs-up"></i> \
                          <span id="likes">12</span> \
                        </p> \
                      </div>`;

  node.appendChild(newDiv);
  const first = document.getElementById("comment-list").getElementsByTagName("li")[0];

  document.getElementById("comment-list").insertBefore(node, first);
  incrementCommentCounts();
  
  clearCommentBox();
  toggleCommentBox();
}

function incrementCommentCounts() {
  let totalString = document.getElementById("total-comments");
  let totalInt = parseInt(totalString.innerHTML);
  let publicString = document.getElementById("public-comments");
  let publicInt = parseInt(publicString.innerHTML);
  let privateString = document.getElementById("private-notes-number");
  let privateInt = parseInt(privateString.innerHTML);

  publicInt++;
  totalInt = publicInt + privateInt;
  totalString.innerHTML = totalInt.toString();
  publicString.innerHTML = publicInt.toString();
}

function clearCommentBox() {
  document.getElementById("new-comment-form").reset();
}

function showWarning() {
  const warningText = document.getElementById("comment-form-warning");
    warningText.style.display = "block";
}

function hideWarning() {
  const warningText = document.getElementById("comment-form-warning");
  warningText.style.display = "none";
}

// globally declare filter value for use in chart later
let studentFilterChoice = 0;

function filterChange(event) {
  event.preventDefault();
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
  console.log(studentFilterChoice);
}

function emailChoice() {
  const emailRecipient = event.currentTarget;
  const choiceID = emailRecipient.id;

  const customEmail = document.getElementById("custom-email");

  switch (choiceID) {
    case "mark":
      customEmail.value = "mark@email.com";
      break;
    case "karen":
      customEmail.value = "karen@email.com";
      break;
    case "kelleigh":
      customEmail.value = "kelleigh@email.com";
      break;
    default:
      break;
  }
}

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
  // event.preventDefault ? event.preventDefault() : (event.returnValue = false);
  const supportTable = document.getElementById("table-location");
  // clear html of supportTable
  supportTable.innerHTML = "";

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
  
  // for (let row = 0; row < students.length; row++) {
  //   result += "<tr>";
  //   for (let col = 0; col < students[row].length; col++) {
  //     result += "<td>"+students[row][col]+ "</td>";
  //   }
  //   result += "</tr>";
  // }
  // result += "</table>";

  const newDiv = document.createElement("div");
  newDiv.innerHTML = result;
  supportTable.appendChild(newDiv); // add to modal 
}
