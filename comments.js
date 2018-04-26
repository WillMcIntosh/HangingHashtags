// event listener for comment form
const addCommentButton = document.getElementById("add-comment-button");
addCommentButton.addEventListener("click", toggleCommentBox);

// event listener for submit button
const commentSubmitButton = document.getElementById("comment-submit-button");
commentSubmitButton.addEventListener("click", submitComment);

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
