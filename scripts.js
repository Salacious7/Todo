

function OnClickTaskButton()
{
    let newListText = document.getElementById('create-task-text')

    if(newListText.value == '')
        return

    newListText.value = newListText.value.charAt(0).toUpperCase() + newListText.value.slice(1)
        

    let newCheckbox = document.createElement('input')
    newCheckbox.type = 'checkbox'
    newCheckbox.id = 'task-check'
    let newListObj = document.createElement('li')
    newListObj.id = 'task'
    
    let newText = document.createTextNode(newListText.value)

    let listId = document.getElementById('task-list')

    newListObj.appendChild(newCheckbox)
    newListObj.appendChild(newText)
    
    listId.appendChild(newListObj)
    

    newListText.value = null
}

window.onload=function()
{
    
    let buttonId = document.getElementById('create-task-button')
    let newListText = document.getElementById('create-task-text')
    buttonId.addEventListener('click', OnClickTaskButton)
    
    newListText.addEventListener('keypress', function(e)
    {
        if (e.key === "Enter") 
            OnClickTaskButton();          
    })
    
}


