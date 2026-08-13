const button = document.getElementById("add");
const checkbox = document.getElementById("cbox");

const API_URL = "/tasks";

function createTaskElement(taskData) {
  const label = document.createElement("label");
  label.classList.add("label");
  label.dataset.id =  taskData.id;

  const check = document.createElement("input");
  check.type = "checkbox";
  check.classList.add("check");
  check.checked = taskData.is_done;

  const task = document.createElement("input");
  task.type = "text";
  task.classList.add("task");
  task.value = taskData.title;

  const del = document.createElement("button");
  del.classList.add("delete");
  del.textContent = "x";
  
  const time = document.createElement("input");
  time.type = "time";
  time.classList.add("time");
  time.value = taskData.done_hour ?? "";
  

  label.appendChild(check);
  label.appendChild(task);
  label.appendChild(time);
  label.appendChild(del);

  check.addEventListener("change", () => {
    updateTask(taskData.id, {is_done: check.checked });
  });

  time.addEventListener("change", () => {
    updateTask(taskData.id, {done_hour: time.value });
  });

  task.addEventListener("blur", () => {
    updateTask(taskData.id, {title: task.value});
  });

  del.addEventListener("click", () => {
    deleteTask(taskData.id);
    label.remove();
  });

  return label;
}

async function addEvent() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({ title: "" }),
  });
  const newTask = await res.json();
  checkbox.appendChild(createTaskElement(newTask));
}

async function updateTask(id, changes) {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(changes),
  });
}

async function deleteTask(id)  {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"})
}

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  tasks.forEach((t) => checkbox.append(createTaskElment(t)));
}

button.addEventListener("click", addEvent);

loadTasks()