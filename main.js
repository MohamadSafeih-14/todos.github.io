let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
// localStorage.clear()


let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Tasks
    }
    input.value = ""; // Empty Input Field
};


//  Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    // Remove Task From Local Storage
    if (e.target.classList.contains("del")) {
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Delete Button
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array Of Tasks
    arrayOfTasks.push(task)
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To LocalStorage 
    addDataToLocalstorageFrom(arrayOfTasks)

}


function addElementsToPageFrom(arrayOfTasks) {
    // Empty the Tasks Div
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task) => {
        // Create Div Element
        let div = document.createElement("div");
        div.className = "task";
        // Check If Task is Done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        // Create Delete Element
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        // Add Task Div To Main Div
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalstorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalstorageFrom(arrayOfTasks)
};

function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false
        }
    }
    addDataToLocalstorageFrom(arrayOfTasks)
}

function deleteAll() {
    tasksDiv.innerHTML = "";
    window.localStorage.removeItem('tasks');
    arrayOfTasks = [];
};