// store email filter choices in array
const emailRecipients = document.getElementById("email-choices").querySelectorAll("li");

// event listener for email choices
for (recipient of emailRecipients) {
  recipient.addEventListener("click", emailChoice);
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
