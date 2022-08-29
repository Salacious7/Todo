let button = document.getElementById('create-task-button')
let list = document.getElementById('task-list')
let taskText = document.getElementById('create-task-text')
let todos = JSON.parse(localStorage.getItem("todos"))
let todosObj = []

if (localStorage.getItem('todos')) {
    todosObj = JSON.parse(localStorage.getItem('todos'));
}

button.addEventListener('click', OnClickTaskButton)
taskText.addEventListener('keypress', function(e)
{
    if (e.key === "Enter") 
        OnClickTaskButton
})

function OnClickTaskButton()
{
    if(taskText.value == '')
        return

    taskText.value = taskText.value.charAt(0).toUpperCase() + taskText.value.slice(1)

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = 'task-check'

    let listObj = document.createElement('li')
    listObj.id = 'task'
    
    let text = document.createTextNode(taskText.value)

    listObj.appendChild(checkbox)
    listObj.appendChild(text)
    list.appendChild(listObj)

    // Local storage
    todosObj.push(listObj.innerHTML)
    localStorage.setItem("todos", JSON.stringify(todosObj))

    taskText.value = null
}

window.onload=function()
{
    list.innerHTML = ''

    if(todos)
    {
        for(let i = 0; i < todos.length; i++)
        {      
            list.innerHTML += `${todos[i]}`
        }
    }
}