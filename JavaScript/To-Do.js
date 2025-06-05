document.addEventListener('DOMContentLoaded', () => {
    const Taskinput = document.getElementById('Taskinput');
    const AddTaskBtn = document.getElementById('AddTaskBtn');
    const ListOfTask = document.getElementById('ListOfTask');

    const saveTaskLocalStorage = () => {
        const tasks = Array.from(ListOfTask.querySelectorAll('li')).map(li => ({
            text: li.querySelector('p').textContent,
            completed: li.querySelector('.checkbox').checked
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = Taskinput.value.trim();
        if (!taskText) return;

        createTaskElement(taskText, false);
        Taskinput.value = '';
        saveTaskLocalStorage();
    };

    const createTaskElement = (text, completed) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''}>
            <p>${text}</p>
            <div class="task-button">
                <button class="edit-btn">
                    <span class="material-symbols-outlined">edit</span>
                </button>
                <button class="delete-btn">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>`;

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.remove();
            saveTaskLocalStorage();
        });

        li.querySelector('.checkbox').addEventListener('change', saveTaskLocalStorage);

        ListOfTask.appendChild(li);
    };

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    };

    AddTaskBtn.addEventListener('click', addTask);
    Taskinput.addEventListener('keypress', (e) => {
        if (e.key === "Enter") addTask(e);
    });

    loadTasks(); 
});

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        subsubHeading.textContent = "Light Mode";
        subsubPara.textContent = "Click on the button to switch to Light mode";
        if (toggleButton && toggleButton.type === 'checkbox') {
            toggleButton.checked = true;
        }
    } else {
        document.body.classList.remove("dark-mode");
        subsubHeading.textContent = "Dark Mode";
        subsubPara.textContent = "Click on the button to switch to Dark mode";
        if (toggleButton && toggleButton.type === 'checkbox') {
            toggleButton.checked = false;
        }
    }
}
const minimize = document.getElementById("minimize");
function loadSidebar() {
    const savedBar = localStorage.getItem("minimizer");
    if (savedBar === "minimized") {
        document.body.classList.add("minimizer");
    } else {
        document.body.classList.remove("minimizer");
    }
}

function sidebarMin() {
    document.body.classList.toggle("minimizer");

    if (document.body.classList.contains("minimizer")) {
        localStorage.setItem("minimizer", "minimized");
    } else {
        localStorage.removeItem("minimizer");
    }
}

minimize.addEventListener("click", sidebarMin);
loadSidebar();

loadTheme();