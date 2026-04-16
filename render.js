import { escapeHTML } from './validation.js';

export function renderTaskList(taskListElement, tasks) {
  taskListElement.innerHTML = '';

  if (tasks.length === 0) {
    taskListElement.innerHTML = `
      <li class="empty-state">
        <p>No tasks here yet!</p>
        <p>Add your first task above 👆</p>
      </li>
    `;
    return;
  }

  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.className = `task ${task.completed? 'completed' : ''}`;
    taskElement.dataset.id = task.id;
    taskElement.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed? 'checked' : ''}>
        <span>${escapeHTML(task.text)}</span>
      </label>
      <div class="task-actions">
        <button class="edit-btn" aria-label="Edit task">✏️</button>
        <button class="delete-btn" aria-label="Delete task">🗑</button>
      </div>
    `;
    taskListElement.appendChild(taskElement);
  });
}

export function updateStats(tasks) {
  const activeCount = tasks.filter(t =>!t.completed).length;
  document.getElementById('task-stats').textContent = 
    `${activeCount} ${activeCount === 1? 'task' : 'tasks'} left`;
}