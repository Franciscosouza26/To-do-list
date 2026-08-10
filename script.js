const button = document.getElementById("add");
const checkbox = document.getElementById("cbox");

function addEvent() {
  const label = document.createElement("label");
  label.classList.add("label");

  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("check");

  const task = document.createElement("input");
  task.type = "text";
  task.classList.add("task");

  label.appendChild(check);
  label.appendChild(task);

  checkbox.appendChild(label);
  
}

button.addEventListener("click", addEvent);
