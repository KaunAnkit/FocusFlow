document.addEventListener("DOMContentLoaded", () => {
    console.log("habit2.js loaded");

    const AddTaskBtn = document.getElementById("AddTaskBtn");
    const Taskinput = document.getElementById("Taskinput");
    const habittable = document.getElementById("habittable");
    const tableBody = habittable ? habittable.querySelector('tbody') : null;

    if (!AddTaskBtn || !Taskinput || !habittable || !tableBody) {
        console.error("Missing elements in HTML. Check IDs: AddTaskBtn, Taskinput, habittable, or missing tbody.");
        return;
    }

    const HABITS_STORAGE_KEY = 'focusFlowHabitsData';
    const LAST_RESET_DATE_KEY = 'focusFlowLastResetDate';

    let habits = [];

    function getCurrentDayIndex() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        return (dayOfWeek === 0) ? 6 : dayOfWeek - 1;
    }

    function getMostRecentMonday() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        const monday = new Date(today.setDate(diff));
        monday.setHours(0, 0, 0, 0);
        return monday;
    }

    function saveHabits() {
        localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
        localStorage.setItem(LAST_RESET_DATE_KEY, new Date().toISOString());
    }

    function loadHabits() {
        const storedHabits = localStorage.getItem(HABITS_STORAGE_KEY);
        const lastResetDateStr = localStorage.getItem(LAST_RESET_DATE_KEY);
        let lastResetDate = lastResetDateStr ? new Date(lastResetDateStr) : null;

        const mostRecentMonday = getMostRecentMonday();

        if (!lastResetDate || lastResetDate < mostRecentMonday) {
            console.log("It's a new week or first load. Resetting habits.");
            if (storedHabits) {
                habits = JSON.parse(storedHabits).map(habit => ({
                    name: habit.name,
                    completion: Array(7).fill(false)
                }));
            } else {
                habits = [];
            }
            saveHabits();
        } else {
            habits = storedHabits ? JSON.parse(storedHabits) : [];
        }

        renderHabits();
    }

    function renderHabits() {
        tableBody.innerHTML = '';

        const currentDayIdx = getCurrentDayIndex();

        habits.forEach((habit, habitIndex) => {
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = habit.name;
            row.appendChild(nameCell);

            habit.completion.forEach((completed, dayIdx) => {
                const cell = document.createElement("td");
                cell.textContent = completed ? "True" : "False";
                cell.className = completed ? "true" : "false";

                if (dayIdx === currentDayIdx) {
                    cell.classList.add('current-day');
                }

                if (dayIdx === currentDayIdx) {
                    cell.addEventListener("click", () => toggleCellState(cell, habitIndex, dayIdx));
                } else {
                    cell.classList.add('disabled-day');
                }

                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    }

    function toggleCellState(cell, habitIndex, dayIdx) {
        if (dayIdx !== getCurrentDayIndex()) {
            console.warn("Attempted to toggle a non-current day cell.");
            return;
        }

        habits[habitIndex].completion[dayIdx] = !habits[habitIndex].completion[dayIdx];

        cell.textContent = habits[habitIndex].completion[dayIdx] ? "True" : "False";
        cell.className = habits[habitIndex].completion[dayIdx] ? "true" : "false";
        cell.classList.add('current-day');

        saveHabits();
    }

    function addHabit(e) {
        e.preventDefault();
        const habitName = Taskinput.value.trim();
        if (!habitName) return;

        if (habits.some(h => h.name.toLowerCase() === habitName.toLowerCase())) {
            alert("Habit already exists!");
            return;
        }

        const newHabit = {
            name: habitName,
            completion: Array(7).fill(false)
        };
        habits.push(newHabit);
        saveHabits();

        Taskinput.value = '';
        renderHabits();
    }

    AddTaskBtn.addEventListener("click", addHabit);
    Taskinput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addHabit(e);
    });

    loadHabits();
});
