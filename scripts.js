let newTaskButton = document.getElementById('create-task-button')
let list = document.getElementById('task-list')
let taskText = document.getElementById('create-task-text')
let clearButton = document.getElementById('clear-button')
let tasks = JSON.parse(localStorage.getItem("tasks"))
let taskData = []

// Add event listeners to static inputs
clearButton.addEventListener('click', ClearTasks)
newTaskButton.addEventListener('click', AddTask)
taskText.addEventListener('keypress', function (e)
{
    if (e.key === "Enter") AddTask()
})

// Cache data objects if they exist in local storage
if (localStorage.getItem('tasks'))
    taskData = JSON.parse(localStorage.getItem('tasks'))

function UpdateCheckbox(e)
{
    let checkbox = taskData.find(task => task.id === e.dataset.id)
    checkbox.checked = !checkbox.checked
    localStorage.setItem("tasks", JSON.stringify(taskData))
}

function LoadTasks()
{
    let tasks = JSON.parse(localStorage.getItem("tasks"))
    let list = document.getElementById('task-list')

    list.innerHTML = ''

    if (!tasks) return
    for (let i = 0; i < tasks.length; i++)
    {
        list.innerHTML += `<li class="task">
        <input type="checkbox" onclick=UpdateCheckbox(this) data-id="${tasks[i].id}" ${tasks[i].checked ? 'checked' : '' }>
        <span>${tasks[i].value}</span>
        <input type="button" class="deleteButton" onclick="Delete(this.parentElement)">
        <input type="button" class="edit">
        </li>`
    }
}

function Delete(e)
{
    let tasks = JSON.parse(localStorage.getItem("tasks"))

    taskData.splice(taskData.indexOf(e.innerHTML), 1)
    let checkbox = e.querySelector('input[type=checkbox]')
    checkObj.splice(checkbox.id[checkbox.id.length - 1] , 1)
    
    

    localStorage.setItem("tasks", JSON.stringify(taskData))
    UpdateCheckbox()
    e.remove()
}

function AddTask()
{
    if (taskText.value == '') return

    taskText.value = taskText.value.charAt(0).toUpperCase() + taskText.value.slice(1)

    taskData.push({ value: taskText.value, checked: false, id: '' + Date.now() })

    localStorage.setItem("tasks", JSON.stringify(taskData))
    taskText.value = null
    LoadTasks()
}

function ClearTasks() 
{
    taskData = []
    checkObj = []
    list.innerHTML = ''
    localStorage.clear()
}

window.onload = function ()
{
    LoadTasks()
}