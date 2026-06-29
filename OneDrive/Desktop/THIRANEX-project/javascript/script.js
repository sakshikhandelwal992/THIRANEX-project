let tasks = [];  // it will stores all the task in the form of array

let currentFilter = "all";  // stores all tasks can be completed or active
// if user clicks on active then it currentFilter = active and same for completed

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(function(btn){

    btn.addEventListener(
        "click",
        function(){

            currentFilter =
                btn.dataset.filter;

            renderTasks();

        }
    );

});

addBtn.addEventListener("click", addTask);

function renderTasks(){

    let filteredTasks = tasks;

    if(currentFilter === "active"){  // for active tasks

        filteredTasks = tasks.filter(function(task){

            return task.completed === false;

        });

    }

    if(currentFilter === "completed"){   // fro completed tasks

        filteredTasks = tasks.filter(function(task){

            return task.completed === true;

        });

    }

    taskList.innerHTML = "";

    filteredTasks.forEach(function(task){

        const li = document.createElement("li");
        li.dataset.id = task.id;

    // for checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.classList.add("complete-checkbox");

        const span = document.createElement("span");
        span.textContent = task.text;

        if(task.completed){
            span.style.textDecoration = "line-through";
        }

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

}
//for adding  tasks
function addTask(){

    const taskText = taskInput.value;

    if(taskText === ""){
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();

    renderTasks();
    taskInput.value = "";
}
taskList.addEventListener(
    "click",
    handleTaskActions
);
function handleTaskActions(event){
    if(event.target.classList.contains("complete-checkbox")){

    const li = event.target.parentElement;

    const taskId = Number(li.dataset.id);

    const task = tasks.find(function(task){
        return task.id === taskId;
    });

    task.completed = !task.completed;
    saveTasks();

    renderTasks();
}
//for delete working
    if(
        event.target.classList.contains(
            "delete-btn"
        )
    ){
        const li =
              event.target.parentElement;

        const taskId =
              Number(li.dataset.id);

        tasks =
            tasks.filter(function(task){
                return task.id !== taskId;
            });
        saveTasks();
        renderTasks();
    }

// for edit working 
    if(
    event.target.classList.contains(
        "edit-btn"
    )
){

    const li =
          event.target.parentElement;

    const taskId =
          Number(li.dataset.id);

    const task =
          tasks.find(function(task){

              return task.id === taskId;

          });

    const newText =
          prompt(
              "Edit Task",
              task.text
          );

    if(newText === null){
        return;
    }

    if(newText.trim() === ""){
        return;
    }

    task.text = newText;
    saveTasks();

    renderTasks();

}

}
function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}
function loadTasks(){

    const storedTasks =
        localStorage.getItem("tasks");

    if(storedTasks){

        tasks =
            JSON.parse(storedTasks);

        renderTasks();

    }

}
loadTasks();