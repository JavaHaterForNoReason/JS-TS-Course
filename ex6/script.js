const addInput = document.getElementById("add-input");
const addButton = document.getElementById("add-button");
const todoList = document.querySelector(".todo-list");

const createTask = (task) => {
  const check = document.createElement("input");
  check.type = "checkbox";
  const p = document.createElement("p");
  p.innerText = task.length > 15 ? task.slice(0, 15) + "..." : task;
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
  const li = document.createElement("li");

  li.appendChild(check);
  li.appendChild(p);
  li.appendChild(deleteButton);
  todoList.appendChild(li);
  addInput.value = "";
  saveTask();

  check.addEventListener("change", () => {
    p.classList.toggle("checked");
  });

  deleteButton.addEventListener("click", () => deleteTask(li));
};

const deleteTask = (element) => {
  element.remove();
  saveTask();
};

const saveTask = () => {
  const listItems = todoList.querySelectorAll("li");
  const tasks = [];

  for (let task of listItems) {
    tasks.push(task.children[1].innerText);
  }

  //Transforma o array de tarefas em um json e salva no localStorage do navegador
  const tasksJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJson);
};

const getSavedTasks = () => {
  let savedTasks = localStorage.getItem("tasks");
  savedTasks = JSON.parse(savedTasks);

  savedTasks.forEach((task) => createTask(task));
};

addButton.addEventListener("click", () => {
  if (!addInput.value.trim()) return;
  createTask(addInput.value);
});

addInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (!addInput.value.trim()) return;
    createTask(addInput.value);
  }
  return;
});

/*Sempre que a página carregar, chamará essa função e,
 * caso existam tarefas salvas, ele criará elas novamente
 */
getSavedTasks();
