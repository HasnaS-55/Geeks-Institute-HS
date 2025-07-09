const tasks = [];
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');


function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        done: false
    };
    
    tasks.push(task);
    renderTask(task);
    taskInput.value = '';
}


function renderTask(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.setAttribute('data-task-id', task.id);
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => doneTask(task.id));
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text' + (task.done ? ' completed' : '');
    taskText.textContent = task.text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteBtn);
    
    taskList.appendChild(taskItem);
}


function doneTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.done = !task.done;
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            const textElement = taskElement.querySelector('.task-text');
            textElement.classList.toggle('completed', task.done);
        }
    }
}


function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (taskElement) {
            taskElement.remove();
        }
    }
}


function clearTasks() {
    tasks.length = 0;
    taskList.innerHTML = '';
}


taskForm.addEventListener('submit', addTask);
clearBtn.addEventListener('click', clearTasks);



exampleTasks.forEach(task => {
    tasks.push(task);
    renderTask(task);
});