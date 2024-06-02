const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  //? Get the text from the input box and check if the input box is empty or not
  if (inputBox.value === "") {
    // Input box is empty then this alert will show
    alert("Please enter a task!");
  } else {
    // If value is entered  in the input field, create an li element with
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

//? For Marked the task as completed or not completed
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      // If we clicked on list item then this will toggle the state of the list item to checked or unchecked
      e.target.classList.toggle("checked");
      // Show the data every time when clicked on the list item
      saveData();
    } else if (e.target.tagName === "SPAN") {
      // If we clicked on span (Remove button) then this will remove the task from the list item
      e.target.parentElement.remove();
      // Show the data every time when clicked on the span remove icon
      saveData();
    }
  },
  false
);

//? Store the all the browser data in the internal storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

//? Store the list item on the browser internal storage
function showListTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showListTask();
