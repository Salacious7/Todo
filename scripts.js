var newTaskButton = document.getElementById('create-task-button');
var list = document.getElementById('task-list');
var taskText = document.getElementById('create-task-text');
var clearButton = document.getElementById('clear-button');
var tasks = JSON.parse(localStorage.getItem("tasks"));
var taskData = [];
// Add event listeners to static inputs
clearButton.addEventListener('click', ClearTasks);
newTaskButton.addEventListener('click', AddTask);
taskText.addEventListener('keypress', function (e) {
    if (e.key === "Enter")
        AddTask();
});
// Cache data objects if they exist in local storage
if (localStorage.getItem('tasks'))
    taskData = JSON.parse(localStorage.getItem('tasks'));
function UpdateCheckbox(e) {
    var checkbox = taskData.find(function (task) { return task.id === e.dataset.id; });
    if (taskData === undefined) {
        throw new TypeError('The value was promised to always be there!');
    }
    checkbox.checked = !checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(taskData));
}
function LoadTasks() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    var list = document.getElementById('task-list');
    list.innerHTML = '';
    if (!tasks)
        return;
    for (var i = 0; i < tasks.length; i++) {
        list.innerHTML += "<li class=\"task\">\n        <input type=\"checkbox\" onclick=UpdateCheckbox(this) data-id=\"".concat(tasks[i].id, "\" ").concat(tasks[i].checked ? 'checked' : '', ">\n        <span onkeydown=\"SaveTaskText(this, this.parentElement)\" onkeyup=\"SaveTaskText(this, this.parentElement)\" contenteditable=\"true\">").concat(tasks[i].value, "</span>\n        <input type=\"button\" class=\"deleteButton\" onclick=\"DeleteTask(this.parentElement)\">\n        </li>");
    }
}
function SaveTaskText(span, task) {
    var id = task.querySelector("[type='checkbox']").dataset.id;
    if (span.innerHTML == '') {
        DeleteTask(task);
        localStorage.setItem("tasks", JSON.stringify(taskData));
        return;
    }
    var toEdit = taskData.find(function (task) { return task.id === id; });
    if (taskData === undefined) {
        throw new TypeError('The value was promised to always be there!');
    }
    toEdit.value = span.innerHTML;
    localStorage.setItem("tasks", JSON.stringify(taskData));
}
function DeleteTask(task) {
    var id = task.querySelector("[type='checkbox']").dataset.id;
    var toRemove = taskData.find(function (task) { return task.id === id; });
    if (taskData === undefined) {
        throw new TypeError('The value was promised to always be there!');
    }
    taskData.splice(taskData.indexOf(toRemove), 1);
    localStorage.setItem("tasks", JSON.stringify(taskData));
    LoadTasks();
}
function AddTask() {
    var taskText = document.getElementById('create-task-text');
    if (taskText.value == null)
        return;
    taskText.value = taskText.value.charAt(0).toUpperCase() + taskText.value.slice(1);
    taskData.push({ value: taskText.value, checked: false, id: '' + Date.now() });
    localStorage.setItem("tasks", JSON.stringify(taskData));
    taskText.value = null;
    LoadTasks();
}
function ClearTasks() {
    taskData = [];
    if (list != null)
        list.innerHTML = '';
    localStorage.clear();
}
window.onload = function () {
    LoadTasks();
};
