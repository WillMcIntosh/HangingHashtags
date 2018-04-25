// store all folder and comment tabs as two arrays
const folderTabs = document.getElementById("folder-tabs").querySelectorAll("ul.nav-tabs > li");
const commentTabs = document.getElementById("comment-tabs").querySelectorAll("ul.nav-tabs > li");

// store contents in two arrays
const folderContents = document.getElementById("folder-content").querySelectorAll(".tab-pane");
const commentContents = document.getElementById("comment-content").querySelectorAll(".tab-pane");

// event listeners for tab clicks
for (tab of folderTabs) {
  tab.addEventListener("click", tabClicked);
}

for (tab of commentTabs) {
  tab.addEventListener("click", tabClicked);
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
    commentForm.style.display = "block";
  }
}

function submitComment(event) {
  event.preventDefault();
  // prepend comment info to ul in comments
  // const node = document.createElement("li");
  // const newDiv = document.createElement("div");
  // const nodeContents = document.createTextNode("Hello");
  // newDiv.appendChild(nodeContents);
  // node.appendChild(newDiv);
  const node = document.createElement("li");
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class","sample-comment col-xs-12");
  newDiv.innerHTML = "<div class='comment-image clearfix'> \
                        <!-- github default user image --> \
                        <img src='images/userpic.png' alt='user image' \
                                                      class='profile-pic'> \
                      </div> \
                      <div class='comment-text'> \
                        <p> \
                          <strong>BECKY I EARL</strong> \
                          (Syracuse City Schools) \
                          <small>a year ago</small> \
                        </p> \
                        <p>Works well if you group low support with high support for \
                          second part of activity.</p> \
                        <p class='likes'> \
                          <i class='far fa-thumbs-up'></i> \
                          <span id='likes'>12</span> \
                        </p> \
                      </div>";

  node.appendChild(newDiv);
  const first = document.getElementById("first-comment");

  document.getElementById("comment-list").insertBefore(node, first);
  
  clearCommentBox();
  toggleCommentBox();
}

function clearCommentBox() {
  document.getElementById("new-comment-form").reset();
}
