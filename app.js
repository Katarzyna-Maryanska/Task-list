//Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM Load event
    document.addEventListener("DOMContentLoaded", getTasks);
    //Add task event
    form.addEventListener("submit", addTask);
    //Remove task event
    taskList.addEventListener("click", removeTask);
    //Clear task event
    clearBtn.addEventListener("click", clearTask);
    //Filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

//Get task from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null ) {
        tasks= [];
    } else {
        tasks =JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));

        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML ='<i class="fa fa-remove"></i>';

        li.appendChild(link);
        taskList.appendChild(li)
    })
}

//Add Task
function addTask(e) {
    if(taskInput.value === "") {
        alert("Add a task")
    }
    //create li elements
    const li = document.createElement("li");
    //add a class
    li.className = "collection-item";
    //create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));

    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";

    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    console.log(li);
    //append li to ul
    taskList.appendChild(li);
    
    //Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = "";

    e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null ) {
        tasks= [];
    } else {
        tasks =JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if(confirm("Are ou sure?")) {
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

//Remove from LS

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null ) {
        tasks= [];
    } else {
        tasks =JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks))
};

//Clear Task
function clearTask() {
    // taskList.innerHTML = "";

    //or faster

    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear()
}

//Filter tasks
function filterTasks(e) {
    const enteredText = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(enteredText) != -1) {
                task.style.display = "block"
            } else {
                task.style.display = "none"
            }
        }
    );
}