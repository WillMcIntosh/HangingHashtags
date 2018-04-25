// store all folder and comment tabs as two arrays
const folderTabs = document.getElementById("folder-tabs").querySelectorAll("ul.nav-tabs > li");
const commentTabs = document.getElementById("comment-tabs").querySelectorAll("ul.nav-tabs > li");

// store contents in two arrays
const folderContents = document.getElementById("folder-content").querySelectorAll(".tab-pane");
const commentContents = document.getElementById("comment-content").querySelectorAll(".tab-pane");

// store student filter choices in array
const studentFilters = document.getElementById("filter-menu").querySelectorAll("li");

// event listeners for tab clicks
for (tab of folderTabs) {
  tab.addEventListener("click", tabClicked);
}

for (tab of commentTabs) {
  tab.addEventListener("click", tabClicked);
}

// event listener for filter clicks
for (student of studentFilters) {
  student.addEventListener("click", filterChange);
}

// event listener for comment form
const addCommentButton = document.getElementById("add-comment-button");
addCommentButton.addEventListener("click", toggleCommentBox);

// event listener for submit button
const commentSubmitButton = document.getElementById("comment-submit-button");
commentSubmitButton.addEventListener("click", submitComment);

function tabClicked(event) {
  event.preventDefault(); // prevent URL from changing
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
  // event.preventDefault();
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
  event.preventDefault();
  // TODO: validate form before proceeding
  
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
  
  clearCommentBox();
  toggleCommentBox();
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
      break;
    case "third-grade":
      // hard coded values for example
      highSupport.innerHTML = "5";
      medSupport.innerHTML = "3";
      lowSupport.innerHTML = "2";
      break;
    case "fourth-grade":
      highSupport.innerHTML = "3";
      medSupport.innerHTML = "0";
      lowSupport.innerHTML = "2";
      break;
    default: 
      break;
  }
}
