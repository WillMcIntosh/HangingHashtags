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

function toggleCommentBox(event) {
  event.preventDefault();
  const commentForm = document.getElementById("new-comment-form");
  if (commentForm.style.display === "block") {
    commentForm.style.display = "none";
  }
  else {
    commentForm.style.display = "block";
  }
}

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

