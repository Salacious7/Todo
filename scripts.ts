let newTaskButton = document.getElementById('create-task-button');
let list = document.getElementById('task-list');
let taskText = document.getElementById('create-task-text');
let clearButton = document.getElementById('clear-button');
let tasks = JSON.parse(localStorage.getItem("tasks"));
let taskData = [];

// Add event listeners to static inputs

clearButton.addEventListener('click', ClearTasks);
newTaskButton.addEventListener('click', AddTask);
taskText.addEventListener('keypress', function (e)
{
    if (e.key === "Enter") AddTask();
});

// Cache data objects if they exist in local storage
if (localStorage.getItem('tasks'))
    taskData = JSON.parse(localStorage.getItem('tasks'));

function UpdateCheckbox(e: HTMLInputElement): void
{
    let checkbox = taskData.find(task => task.id === e.dataset.id)
    checkbox.checked = !checkbox.checked
    localStorage.setItem("tasks", JSON.stringify(taskData))
}

function LoadTasks(): void
{
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let list = document.getElementById('task-list');

    list.innerHTML = '';

    if (!tasks) return;
    for (let i = 0; i < tasks.length; i++)
    {
        list.innerHTML += `<li class="task">
        <input type="checkbox" onclick=UpdateCheckbox(this) data-id="${tasks[i].id}" ${tasks[i].checked ? 'checked' : '' }>
        <span onkeydown="SaveTaskText(this, this.parentElement)" onkeyup="SaveTaskText(this, this.parentElement)" contenteditable="true">${tasks[i].value}</span>
        <input type="button" class="deleteButton" onclick="DeleteTask(this.parentElement)">
        </li>`;
    }
}

function SaveTaskText(span, task): void
{
    let id = task.querySelector("[type='checkbox']").dataset.id

    if(span.innerHTML == '')
    {
        DeleteTask(task);
        localStorage.setItem("tasks", JSON.stringify(taskData));
        return;
    }

    let toEdit = taskData.find(task => task.id === id);
    toEdit.value = span.innerHTML;

    localStorage.setItem("tasks", JSON.stringify(taskData));
}

function DeleteTask(task): void
{
    let id = task.querySelector("[type='checkbox']").dataset.id;
    let toRemove = taskData.find(task => task.id === id);
    taskData.splice(taskData.indexOf(toRemove), 1);
    localStorage.setItem("tasks", JSON.stringify(taskData));
    LoadTasks();
}

function AddTask(): void
{
    let taskText: any = document.getElementById('create-task-text');

    if (taskText.value == null) return;

    taskText.value = taskText.value.charAt(0).toUpperCase() + taskText.value.slice(1);

    taskData.push({ value: taskText.value, checked: false, id: '' + Date.now() });

    localStorage.setItem("tasks", JSON.stringify(taskData));
    taskText.value = null;
    LoadTasks();
}

function ClearTasks(): void
{
    taskData = [];

    if(list != null)
        list.innerHTML = '';

    localStorage.clear();
}

window.onload = function ()
{
    LoadTasks();
}