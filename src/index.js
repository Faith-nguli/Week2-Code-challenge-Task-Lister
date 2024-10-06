document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("create-task-form");
  const list = document.getElementById("tasks");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = document.getElementById("new-task-description").value;
    const taskPriority = document.getElementById("task-priority").value;

    if (task.trim() !== "") {
      const newTaskItem = addTodoList(task, taskPriority);
      list.appendChild(newTaskItem);
      form.reset();
    }
  });

  function addTodoList(task, priority) {
    const lists = document.createElement("li");
    lists.textContent = task;

    // Set color based on priority
    if (priority === "high") {
      lists.style.color = "red";
    } else if (priority === "medium") {
      lists.style.color = "yellow";
    } else {
      lists.style.color = "green";
    }

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.onclick = () => {
      lists.remove();
    };

    lists.appendChild(deleteButton);
    return lists;
  }
});
