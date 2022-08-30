let button = document.getElementById('create-task-button')
let list = document.getElementById('task-list')
let taskText = document.getElementById('create-task-text')
let clear = document.getElementById('clear-button')
let todos = JSON.parse(localStorage.getItem("todos"))
let inputs = JSON.parse(localStorage.getItem("inputs"))
let todosObj = []
let checkObj = []

if (localStorage.getItem('todos'))
    todosObj = JSON.parse(localStorage.getItem('todos'))

if (localStorage.getItem('inputs'))
    checkObj = JSON.parse(localStorage.getItem('inputs'))

clear.addEventListener('click', ClearTasks)
button.addEventListener('click', AddTask)
taskText.addEventListener('keypress', function (e)
{
    if (e.key === "Enter")
        AddTask()
})

function SaveCheckboxes()
{
    let inputs = JSON.parse(localStorage.getItem('inputs'))

    for (let i = 0; i < checkObj.length; i++)
        checkObj[i].checked = document.getElementById(inputs[i].id).checked

    localStorage.setItem('inputs', JSON.stringify(checkObj))
}

function LoadCheckboxes()
{

    let inputs = JSON.parse(localStorage.getItem('inputs'))

    for (let i = 0; i < inputs.length; i++)
        document.getElementById(inputs[i].id).checked = inputs[i].checked
}

function AddTask()
{
    if (taskText.value == '')
        return

    taskText.value = taskText.value.charAt(0).toUpperCase() + taskText.value.slice(1)

    let listObj = document.createElement('li')
    listObj.id = 'task'

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = (JSON.parse(localStorage.getItem('inputs'))) ? 'task-check' + JSON.parse(localStorage.getItem('inputs')).length : 'task-check' + 0
    checkbox.addEventListener('click', SaveCheckboxes)
    checkObj.push({ id: checkbox.id, checked: false })

    listObj.appendChild(checkbox)

    let text = document.createTextNode(taskText.value)
    listObj.appendChild(text)

    let deleteButton = document.createElement('input')
    deleteButton.type = 'button'
    deleteButton.className = 'deleteButton'
    listObj.appendChild(deleteButton)

    let edit = document.createElement('input')
    edit.type = 'button'
    edit.className = 'edit'
    listObj.appendChild(edit)

    list.appendChild(listObj)

    // Local storage
    todosObj.push(listObj.innerHTML)
    localStorage.setItem("todos", JSON.stringify(todosObj))
    localStorage.setItem('inputs', JSON.stringify(checkObj))

    taskText.value = null
    SaveCheckboxes()
}

function ClearTasks() 
{
    todosObj = []
    checkObj = []
    list.innerHTML = ''
    localStorage.clear()
}

window.onload = function ()
{
    list.innerHTML = ''

    if (todos)
        for (let i = 0; i < todos.length; i++)
            list.innerHTML += `<li id="task">${todos[i]}</li>`

    if (localStorage.getItem('inputs'))
    {
        let inputs = JSON.parse(localStorage.getItem("inputs"))

        LoadCheckboxes()

        for (let i = 0; i < inputs.length; i++)
            document.getElementById(inputs[i].id).addEventListener('click', SaveCheckboxes)
    }
}