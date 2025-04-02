document.addEventListener("DOMContentLoaded", (event) => {
  const form = document.getElementById("create-task-form");
  const list = document.getElementById("tasks");

  // Load saved tasks when page loads
  loadTasks();

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const task = document.getElementById("new-task-description").value;
    const taskPriority = document.getElementById("task-priority").value;
    const dueDate = document.getElementById("dueDateInput").value;

    if (task.trim() !== "") {
      const newTaskItem = createTaskElement(task, taskPriority, dueDate);
      list.appendChild(newTaskItem);
      saveTasks(); // Save to localStorage
      form.reset();
    }
  });

  // Function to create task element
  function createTaskElement(task, priority, dueDate) {
    const taskItem = document.createElement("li");
    taskItem.classList.add(`${priority}-priority`);
    
    const taskContent = document.createElement("div");
    taskContent.classList.add("task-content");
    
    const taskText = document.createElement("span");
    taskText.textContent = task;
    
    const priorityBadge = document.createElement("span");
    priorityBadge.classList.add("task-priority");
    priorityBadge.textContent = priority.toLowerCase();
    
    taskContent.appendChild(taskText);
    taskContent.appendChild(priorityBadge);
    
    if (dueDate) {
      const dueDateElement = document.createElement("div");
      dueDateElement.classList.add("task-due-date");
      dueDateElement.textContent = `Due: ${formatDate(dueDate)}`;
      taskContent.appendChild(dueDateElement);
    }
    
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      taskItem.remove();
      saveTasks(); // Update localStorage after deletion
    };
    
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    
    return taskItem;
  }

  // Format date
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#tasks li').forEach(task => {
      tasks.push({
        text: task.querySelector('.task-content span:first-child').textContent,
        priority: task.classList.contains('high-priority') ? 'high' : 
                 task.classList.contains('medium-priority') ? 'medium' : 'low',
        dueDate: task.querySelector('.task-due-date') ? 
                 task.querySelector('.task-due-date').textContent.replace('Due: ', '') : ''
      });
    });
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }

  // Load tasks from localStorage
  function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('taskList'));
    if (savedTasks) {
      savedTasks.forEach(task => {
        const newTaskItem = createTaskElement(task.text, task.priority, task.dueDate);
        list.appendChild(newTaskItem);
      });
    }
  }
});