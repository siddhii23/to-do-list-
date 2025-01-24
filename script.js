// Get references to DOM elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Load saved tasks from localStorage (if any)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render all tasks
function renderTasks() {
  taskList.innerHTML = ''; // Clear the list before rendering
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task');
    if (task.completed) {
      li.classList.add('completed');
    }

    const taskText = document.createTextNode(task.text);
    li.appendChild(taskText);

    // Create a delete button for each task
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1); // Remove the task from the array
      saveTasks(); // Save updated tasks
      renderTasks(); // Re-render the list
    });

    // Create a toggle button to mark as completed
    li.addEventListener('click', () => {
      task.completed = !task.completed; // Toggle completed status
      saveTasks(); // Save updated tasks
      renderTasks(); // Re-render the list
    });

    // Append the delete button and task to the li
    li.appendChild(deleteBtn);

    // Append the li to the task list
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask(taskText) {
  if (taskText.trim() === '') return;

  // Create a new task object and add it to the tasks array
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);

  saveTasks(); // Save tasks to localStorage
  renderTasks(); // Re-render the list
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for adding a task
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value;
  addTask(taskText);
  taskInput.value = ''; // Clear input after adding task
});

// Allow Enter key to add tasks as well
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const taskText = taskInput.value;
    addTask(taskText);
    taskInput.value = ''; // Clear input after adding task
  }
});

// Render tasks when the page loads
renderTasks();
