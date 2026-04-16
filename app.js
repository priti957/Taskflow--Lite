import { loadTasks, saveTasks } from './storage.js';
import { renderTaskList, updateStats } from './render.js';
import { validateTaskInput } from './validation.js';

let tasks = loadTasks();
let currentFilter = 'all';

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function getFilteredTasks() {
  if (currentFilter === 'active') return tasks.filter(t =>!t.completed);
  if (currentFilter === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}

function render() {
  renderTaskList(taskList, getFilteredTasks());
  updateStats(tasks);
}

// Initial render
render();

// Add task
taskForm.addEventListener('submit', e => {
  e.preventDefault();
  if (validateTaskInput(taskInput.value)) {
    tasks.push(createTask(taskInput.value));
    saveTasks(tasks);
    render();
    taskInput.value = '';
  }
});

// Event delegation: toggle, delete, edit
taskList.addEventListener('click', e => {
  const taskElement = e.target.closest('.task');
  if (!taskElement) return;

  const taskId = Number(taskElement.dataset.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  // Toggle complete
  if (e.target.type === 'checkbox') {
    tasks[taskIndex].completed = e.target.checked;
    saveTasks(tasks);
    render();
  }

  // Delete
  if (e.target.classList.contains('delete-btn')) {
    if (confirm('Delete this task?')) {
      tasks.splice(taskIndex, 1);
      saveTasks(tasks);
      render();
    }
  }

  // Edit
  if (e.target.classList.contains('edit-btn')) {
    const newText = prompt('Edit task:', tasks[taskIndex].text);
    if (newText && validateTaskInput(newText)) {
      tasks[taskIndex].text = newText.trim();
      saveTasks(tasks);
      render();
    }
  }
});

// Filters
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Dark/Light mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark')? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark')? 'dark' : 'light');
});

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}
