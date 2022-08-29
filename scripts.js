let buttonId = document.getElementById('create-task-button')
let listId = document.getElementById('task-list')
let newListText = document.getElementById('create-task-text')
let todos = JSON.parse(localStorage.getItem("todos"))
let todosArr = []

if (localStorage.getItem('todos')) {
    todosArr = JSON.parse(localStorage.getItem('todos'));
}

buttonId.addEventListener('click', OnClickTaskButton)
newListText.addEventListener('keypress', function(e)
{
    if (e.key === "Enter") 
        OnClickTaskButton
})

function OnClickTaskButton()
{
    if(newListText.value == '')
        return

    newListText.value = newListText.value.charAt(0).toUpperCase() + newListText.value.slice(1)

    let newCheckbox = document.createElement('input')
    newCheckbox.type = 'checkbox'
    newCheckbox.id = 'task-check'

    let newListObj = document.createElement('li')
    newListObj.id = 'task'
    
    let newText = document.createTextNode(newListText.value)

    newListObj.appendChild(newCheckbox)
    newListObj.appendChild(newText)
    listId.appendChild(newListObj)

    // Local storage
    todosArr.push(newListObj.innerHTML)
    localStorage.setItem("todos", JSON.stringify(todosArr))

    newListText.value = null
}

window.onload=function()
{
    listId.innerHTML = ''

    if(todos)
    {
        for(let i = 0; i < todos.length; i++)
        {      
            listId.innerHTML += `${todos[i]}`
        }
    }
}