// Select the editable div and delete button
const editableDiv = document.getElementById("editable");
const deletebtn = document.getElementById("delete");

// Load saved content from local storage when the page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedContent = localStorage.getItem("todoContent");
  if (savedContent) {
    editableDiv.innerHTML = savedContent; // Load saved content into the div
  }
});

// Enable contentEditable to allow typing inside the div
editableDiv.setAttribute("contenteditable", "true");

// Save content to local storage on any input
editableDiv.addEventListener("input", () => {
  const content = editableDiv.innerHTML; // Get the current content of the div
  localStorage.setItem("todoContent", content); // Save it to local storage
});

// Handle keydown events for Alt + C and Enter
editableDiv.addEventListener("keydown", (event) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  if (event.altKey && event.key === "c") {
    // Prevent the default behavior
    event.preventDefault();

    // Insert a checkbox at the start of the current line
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Insert the checkbox node at the caret position
    range.insertNode(checkbox);

    // Add a space after the checkbox for text entry
    range.insertNode(document.createTextNode(" "));
    range.collapse(false); // Move caret after the inserted checkbox
  } else if (event.key === "Enter") {
    // Prevent default Enter behavior
    event.preventDefault();

    // Create a new line with a checkbox
    const newLine = document.createElement("div");
    const newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";

    // Append the checkbox to the new line
    newLine.appendChild(newCheckbox);
    newLine.appendChild(document.createTextNode(" "));

    // Insert the new line after the current line
    if (range.endContainer.nodeType === Node.TEXT_NODE) {
      range.setEndAfter(range.endContainer.parentNode);
    }
    range.insertNode(newLine);
    // Move the caret to the new line
    range.collapse(false);
    selection.collapse(newLine, 1);
  }
});
