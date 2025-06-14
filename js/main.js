document.addEventListener("DOMContentLoaded", () => {
    const storedTask = JSON.parse(localStorage.getItem('tasks'));
    if (storedTask) {
        storedTask.forEach((task) => tasks.push(task));
        updateTasksList();
        updatestats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        updateTasksList();
        updatestats();
        saveTasks();
        taskInput.value = '';
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updatestats();
    saveTasks();

    const completeTasks = tasks.filter((task) => task.completed).length;
    if (completeTasks === tasks.length && tasks.length > 0) {
        blaster();
    }
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updatestats();
    
};

const deleteTask = (index) => {
    const taskList = document.getElementById("task-list");
    const taskItem = taskList.children[index];

    if (taskItem) {
        taskItem.classList.add("fall-out");
        taskItem.addEventListener("animationend", () => {
            tasks.splice(index, 1);
            updateTasksList();
            updatestats();
            saveTasks();
        });
    }
};

const updatestats = () => {
    const completeTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completeTasks}/${totalTasks}`;
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="img/edit.png" onclick="editTask(${index})" />
                <img src="img/bin.png" onclick="deleteTask(${index})" />
            </div>
        </div>`;
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

const blaster=()=>{
    const end = Date.now() + 1 * 1000;


const colors = ["#bb0000", "#ffffff"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });

  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
}
